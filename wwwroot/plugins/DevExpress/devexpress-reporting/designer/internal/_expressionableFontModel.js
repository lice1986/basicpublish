﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_expressionableFontModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class ExpressionableFontModel extends FontModel {
    constructor(value, _model) {
        super(value);
        this._model = _model;
        this.isPropertyHighlighted = (propertyName) => {
            const controlModel = this._model();
            if (!controlModel)
                return false;
            propertyName = propertyName === 'family' ? 'name' : propertyName;
            return controlModel.isPropertyHighlighted && controlModel.isPropertyHighlighted.apply(controlModel, [propertyName, 'font']);
        };
        $.extend(this.modificators, {
            boldHasExpression: ko.computed(() => this.isPropertyHighlighted('bold')),
            italicHasExpression: ko.computed(() => this.isPropertyHighlighted('italic')),
            strikeoutHasExpression: ko.computed(() => this.isPropertyHighlighted('strikeout')),
            underlineHasExpression: ko.computed(() => this.isPropertyHighlighted('underline'))
        });
        this._disposables.push(this.modificators.boldHasExpression);
        this._disposables.push(this.modificators.italicHasExpression);
        this._disposables.push(this.modificators.strikeoutHasExpression);
        this._disposables.push(this.modificators.underlineHasExpression);
    }
}