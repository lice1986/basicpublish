﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionAddon.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class ParameterExpressionAddOn extends Disposable {
    constructor(_editor, _parameter) {
        super();
        this._editor = _editor;
        this._parameter = _parameter;
        this.imageTemplateName = 'dx-objectdatasource-expression';
        this._disposables.push(ko.computed(() => {
            if (this._parameter()) {
                const wrappedExpression = this._editor.value.peek();
                const expressionValue = wrappedExpression && wrappedExpression.value && wrappedExpression.value.peek();
                this._parameter().propertyExpressionMapper.getExpressionProperty(this._editor.name).showExpression(!!expressionValue);
            }
        }));
        this._disposables.push(this.isExpression = ko.pureComputed({
            read: () => {
                if (this._parameter()) {
                    return this._parameter().propertyExpressionMapper.getExpressionProperty(this._editor.name).showExpression();
                }
            },
            write: (value) => this._parameter() && this._parameter().propertyExpressionMapper.getExpressionProperty(this._editor.name).showExpression(value)
        }));
    }
    switchEditors() {
        this.isExpression(!this.isExpression());
    }
}
