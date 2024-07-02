﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_model.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { guid, NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { availableFonts, FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { XRRichTextStreamType } from '../../designer/controls/xrRichText';
import { recalculateUnit } from '../../designer/internal/_utils';
import { createRichEdit, createRichEditOptions, getRichEditInstance } from '../instance';
import { RichEditLoadDispatcher } from './_loaddispatcher';
import { ToolbarSurface } from './_toolbar';
import { RichAction } from './_utils';
export class XRRichEditControlModel extends Disposable {
    constructor(element, inlineControl, selected) {
        super();
        this.disableCommands = [
            getRichEditInstance().HomeTabCommandId.Find,
            getRichEditInstance().HomeTabCommandId.Replace,
        ];
        this._verticalScrollOffset = 0;
        this._richHeight = null;
        this._disposables.push(this.visible = ko.pureComputed({
            read: () => { return inlineControl.visible() && selected(); },
            write: (value) => { inlineControl.visible(value); }
        }));
        this._disposables.push(this.className = ko.computed(() => {
            return ['dxrd-rich-surface', this.visible() ? '' : 'dxrd-richedit-readonly'].join(' ');
        }));
        this._element = element;
        this._element.id = 'rich' + guid().replace(/-/g, '');
        this._richEdit = createRichEdit()(element, this.createOptions());
        for (const commandId of this.disableCommands)
            this._richEdit.setCommandEnabled(commandId, false);
        this._dispatcher = new RichEditLoadDispatcher(this);
        this.createToolbar();
    }
    setRichHeight(value) {
        this._richHeight = value;
    }
    _elementExists() {
        return !!document.getElementById(this._element.id);
    }
    getToolbar() { return this._toolbar; }
    getRealControl() {
        return this._richEdit;
    }
    getRealControlNative() {
        return this._richEdit['_native'];
    }
    updateCanvasScroll() {
        this.getRealControlNative().core.viewManager.canvasListener.onCanvasScroll();
    }
    dispose() {
        super.dispose();
        this._toolbar.dispose();
        this._dispatcher.dispose();
        this._richEdit.dispose();
    }
    executeCommand(commandId, parameter, setFocus = false) {
        if (!this._richEdit.isDisposed) {
            this._richEdit.executeCommand(commandId, parameter);
            if (setFocus)
                this._richEdit.focus();
        }
    }
    insertHtml(html) {
        if (!this._richEdit.isDisposed)
            this.getRealControlNative().core.commandManager.getCommand(376).execute(false, html);
    }
    createOptions() {
        const options = createRichEditOptions()();
        options.ribbon.visible = false;
        options.view.viewType = getRichEditInstance().ViewType.Simple;
        options.autoCorrect.correctTwoInitialCapitals = true;
        options.confirmOnLosingChanges.enabled = false;
        options.width = '100%';
        options.height = '100%';
        options.contextMenu.enabled = false;
        options.view.simpleViewSettings.paddings = { left: 1.92, right: 1.92, top: 0.01, bottom: 0.01 };
        options.events.commandStateChanged = (s, e) => this._toolbar && this._toolbar.onCommandStateChanged(s, e);
        options.fonts = this.getRichEditFonts();
        const _self = this;
        options['internalApi'] = {
            getVerticalScrollOffset: () => {
                return this._verticalScrollOffset;
            },
            get getVisibleAreaHeight() {
                return _self._richHeight === null ? 0 : () => _self._richHeight;
            }
        };
        return options;
    }
    getFonts() {
        return Object.keys(ko.unwrap(availableFonts)).sort((a, b) => a < b ? -1 : 1);
    }
    getRichEditFonts() {
        const rdFonts = this.getFonts();
        const resultFonts = [];
        for (const fontName of rdFonts)
            resultFonts.push({ name: fontName, fontFamily: fontName });
        return {
            fonts: resultFonts,
            mappings: {
                defaultFontName: rdFonts[0],
            },
        };
    }
    createToolbar() {
        this._toolbar = new ToolbarSurface({
            executeCommand: this.executeCommand.bind(this),
            commandManager: this.getRealControlNative().core.commandManager,
            richEditPublic: this._richEdit,
            visible: this.visible,
            fonts: this.getFonts(),
        });
    }
    saveDocumentNative(documentFormat, onResultReady) {
        if (this._richEdit.hasUnsavedChanges) {
            if (onResultReady) {
                const handler = function (sender, arg2) {
                    onResultReady(arg2.base64);
                    sender.events.saving.removeHandler(handler, sender);
                };
                this._richEdit.events.saving.addHandler(handler, this._richEdit);
            }
            this._richEdit.saveDocument(documentFormat);
        }
        else {
            this._richEdit.exportToBase64((base64) => {
                if (onResultReady) {
                    onResultReady(base64);
                }
            }, documentFormat);
        }
    }
    newDocumentNative(onResultReady) {
        if (onResultReady) {
            const handler = function (sender, arg2) {
                onResultReady();
                sender.events.documentLoaded.removeHandler(handler, sender);
            };
            this._richEdit.events.documentLoaded.addHandler(handler, this._richEdit);
        }
        this.executeCommand(getRichEditInstance().FileTabCommandId.CreateDocument);
    }
    openDocumentNative(base64, documentFormat, onResultReady, onError) {
        const handler = function (sender, arg2) {
            onResultReady();
            sender.events.documentLoaded.removeHandler(handler, sender);
        };
        if (onResultReady) {
            this._richEdit.events.documentLoaded.addHandler(handler, this._richEdit);
        }
        this._richEdit.openDocument(base64, '', documentFormat, (result) => {
            if (!result && onError) {
                this._richEdit.events.documentLoaded.removeHandler(handler, this._richEdit);
                onError();
            }
        });
    }
    saveDocument(documentFormat, onResultReady) {
        this._dispatcher.process({ documentConverted: onResultReady, queueAction: RichAction.SaveDocument, documentFormat: documentFormat, base64: undefined, ready: undefined, errorCallBack: undefined });
    }
    newDocument(onResultReady) {
        this._dispatcher.process({ documentConverted: undefined, queueAction: RichAction.NewDocument, documentFormat: undefined, base64: undefined, ready: onResultReady, errorCallBack: undefined });
    }
    openDocument(base64, documentFormat, onResultReady, onError) {
        this._dispatcher.process({ documentConverted: undefined, queueAction: RichAction.OpenDocument, documentFormat: documentFormat, base64: base64, ready: onResultReady, errorCallBack: onError });
    }
    changeSize() {
        this._richEdit.adjust();
    }
    focusChanged(inFocus) {
        if (!inFocus) {
            this._richEdit.selection.setSelection(0);
        }
        this.changeSize();
    }
    getText(interval) {
        return this._richEdit.document.getText(interval);
    }
    documentIsEmpty() {
        return this._richEdit.document.length == 1;
    }
}
export class RichLoader extends Disposable {
    constructor(richEdit) {
        super();
        this.richEdit = richEdit;
    }
    set textConverted(textConverted) {
        this._textConverted = textConverted;
    }
    load(loadData) {
        if (!loadData.data || loadData.dataFormat === XRRichTextStreamType.HtmlText) {
            this.richEdit.newDocument(() => {
                this.richEdit.insertHtml(loadData.data || '');
                this.richEdit.saveDocument(2, (result) => {
                    this._textConverted(result);
                });
            });
            return;
        }
        let formatKey;
        if (loadData.dataFormat === XRRichTextStreamType.PlainText) {
            formatKey = getRichEditInstance().DocumentFormat.PlainText;
        }
        else if (loadData.dataFormat === XRRichTextStreamType.RtfText) {
            formatKey = 2;
        }
        else if (loadData.dataFormat === XRRichTextStreamType.XmlText) {
            formatKey = getRichEditInstance().DocumentFormat.OpenXml;
        }
        this.richEdit.openDocument(loadData.data, formatKey, () => {
            this.richEdit.saveDocument(2, (result) => {
                this._textConverted(result);
            });
        }, () => {
            this.richEdit.openDocument(loadData.oldText, 2, () => {
                this.richEdit.saveDocument(2, (result) => {
                    this._textConverted(result);
                    NotifyAboutWarning('The document is corrupted and cannot be opened', true);
                });
            });
        });
    }
}
export class RichEditPaddingModelWrapper extends Disposable {
    constructor(padding, _richEdit) {
        super();
        this._richEdit = _richEdit;
        this._paddingModel = new PaddingModel();
        this._disposables.push(padding.subscribe((newVal) => {
            this._paddingModel.applyFromString(newVal);
            this._setPaddings();
        }));
        this._disposables.push(this._paddingModel);
    }
    _setPaddings() {
        const rich = this._richEdit.getRealControl();
        const paddings = rich.simpleViewSettings.paddings;
        ['left', 'right', 'top', 'bottom'].forEach(side => paddings[side] = recalculateUnit(this._paddingModel[side]() || 0.01, this._paddingModel._get('dpi')));
        rich.simpleViewSettings.paddings = paddings;
    }
}
export class RichEditFontModel extends FontModel {
    constructor(value, richEdit, foreColor, controller) {
        super(value);
        this.richEdit = richEdit;
        this.controller = controller;
        for (const data of [
            [this.family, fontName => this.applyCommand(getRichEditInstance().HomeTabCommandId.ChangeFontName, fontName)],
            [this.size, size => this.applyCommand(getRichEditInstance().HomeTabCommandId.ChangeFontSize, size)],
            [foreColor, foreColor => this.applyCommand(getRichEditInstance().HomeTabCommandId.ChangeFontForeColor, foreColor)],
            [this.modificators.bold, bold => this.applyCommand(getRichEditInstance().HomeTabCommandId.ToggleFontBold, bold)],
            [this.modificators.italic, italic => this.applyCommand(getRichEditInstance().HomeTabCommandId.ToggleFontItalic, italic)],
            [this.modificators.strikeout, strikeout => this.applyCommand(getRichEditInstance().HomeTabCommandId.ToggleFontStrikeout, strikeout)],
            [this.modificators.underline, underline => this.applyCommand(getRichEditInstance().HomeTabCommandId.ToggleFontUnderline, underline)],
        ])
            this._disposables.push(data[0].subscribe(data[1]));
    }
    applyCommand(commandId, parameter) {
        this.richEdit.getRealControl().executeCommand(commandId, parameter);
        if (!this.richEdit.visible())
            this.richEdit.saveDocument(2, newRtf => this.controller.setRtfString(newRtf));
    }
}