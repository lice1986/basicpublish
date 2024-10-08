﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_undoColorPickerEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColorPickerEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class UndoColorPickerEditor extends ColorPickerEditor {
    constructor(info, level, parentDisabled) {
        super(info, level, parentDisabled);
    }
    generateValue(undoEngine) {
        if (!this.generatedValue) {
            this._disposables.push(this.generatedValue = ko.computed({
                read: () => { return this._get('displayValue'); },
                write: (newVal) => {
                    undoEngine().start();
                    this._set('displayValue', newVal);
                    undoEngine().end();
                }
            }));
        }
        return this.generatedValue;
    }
}
