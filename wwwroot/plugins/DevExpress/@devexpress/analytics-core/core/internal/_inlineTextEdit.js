﻿/**
* DevExpress Analytics (core\internal\_inlineTextEdit.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { processTextEditorHotKeys } from './_processTextEditorHotKeys';
export class InlineTextEdit extends Disposable {
    constructor(selection) {
        super();
        this._showInline = ko.observable(false);
        this.text = ko.observable();
        let _controlText;
        this._disposables.push(selection.focused.subscribe(() => {
            if (this._showInline() && _controlText) {
                _controlText(this.text());
                this._showInline(false);
            }
            const controlModel = selection.focused() && selection.focused().getControlModel();
            _controlText = controlModel && (controlModel.textEditableProperty || controlModel.text || controlModel.alias);
        }));
        this._disposables.push(this.visible = ko.pureComputed({
            read: () => {
                return this._showInline();
            },
            write: (val) => {
                this._showInline(val);
            }
        }));
        this.show = (element) => {
            if (this._showInline()) {
                return;
            }
            this.element = element;
            const isSingleControlSelected = !!selection.selectedItems ? selection.selectedItems.length === 1 : !!selection.focused();
            if (isSingleControlSelected && _controlText && !selection.focused().locked) {
                this.text(_controlText());
                this._showInline(true);
                if (element) {
                    const textarea = $.fn.constructor(element).find('textarea')[0];
                    textarea && textarea['select']();
                }
            }
            else {
                this._showInline(false);
            }
        };
        this.keypressAction = (args) => {
            processTextEditorHotKeys(args.event, {
                esc: () => { this._showInline(false); },
                ctrlEnter: () => {
                    _controlText(this.text());
                    this._showInline(false);
                }
            });
        };
    }
}
