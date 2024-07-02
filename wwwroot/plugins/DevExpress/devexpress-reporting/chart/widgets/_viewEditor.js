﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_viewEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { getSeriesClassName } from '../_utils';
export class ViewEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.viewItems = [];
        this.contentValue = ko.computed(() => {
            return this.value() && this.value().model() || {};
        });
        this._disposables.push(this.contentValue);
    }
    generateHeaderValue(undoEngine) {
        if (!this.headerValue) {
            this._disposables.push(this.headerValue = ko.computed({
                read: () => { return this.value() && this.value().type(); },
                write: (newVal) => {
                    undoEngine().start();
                    this.value().type(newVal);
                    undoEngine().end();
                }
            }));
        }
        return this.headerValue;
    }
    generateViewItems() {
        if (!this.viewItems.length) {
            this.viewItems = this._get('values').map(x => {
                return Object.assign(Object.assign({}, x), { className: this.generateViewClassName(x.value), templateName: this.generateViewClassName(x.value, true) });
            });
        }
        return this.viewItems;
    }
    generateViewClassName(value, isTemplate = false) {
        const _name = (isTemplate ? 'dxrd-svg-fieldlist-' : 'dx-image-fieldlist-') + getSeriesClassName(value);
        if (isTemplate)
            return SvgTemplatesEngine.getExistingTemplate(_name);
        return _name;
    }
}
