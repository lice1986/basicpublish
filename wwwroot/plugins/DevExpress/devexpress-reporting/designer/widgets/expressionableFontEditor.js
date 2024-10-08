﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressionableFontEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FontEditor, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { expressionableFontInfo } from '../controls/metadata/properties/metadata';
import { ExpressionableFontModel } from '../internal/_expressionableFontModel';
export class ExpressionableFontEditor extends FontEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    createObjectProperties() {
        const model = new ExpressionableFontModel(this.value, this._get('_model', 'wrapped'));
        this._disposables.push(model);
        return new ObjectProperties(ko.observable(model), {
            editors: expressionableFontInfo
        }, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch);
    }
}
