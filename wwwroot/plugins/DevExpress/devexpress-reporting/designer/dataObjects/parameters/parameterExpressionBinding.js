﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { reportFunctionDisplay } from '../../widgets/customFunctions';
import { WrappedExpressionOptions } from '../expressions/_wrappedExpressionOptions';
import { parameterExpressionBindingSerializationsInfo } from '../metadata/parameters/parameterExpressionBinding';
export function createExpressionProperty(object, propertyName, suffix = 'ExpressionObj') {
    if (!object.expressionBindings().filter(binding => binding.propertyName() === propertyName)[0]) {
        const newExpression = new ParameterExpressionBinding({});
        newExpression.propertyName(propertyName);
        object.expressionBindings.push(newExpression);
    }
    const propertyExpression = object.expressionBindings().filter(binding => binding.propertyName() === propertyName)[0];
    const expressionProperty = {
        value: propertyExpression.expression,
        customizeCategories: propertyName !== 'Value' ? () => { } : (tool, categories) => {
            const fields = categories.filter(item => item.content.name == 'dx-expressioneditor-fields')[0];
            if (fields)
                categories.splice(categories.indexOf(fields), 1);
        },
        functions: reportFunctionDisplay.filter(cat => cat.category != 'Summary' && cat.category != 'Aggregate')
    };
    const wrappedExpressionOptions = new WrappedExpressionOptions(expressionProperty, {
        addExpression: (value) => {
            if (object.expressionBindings().indexOf(propertyExpression) === -1)
                object.expressionBindings.push(propertyExpression);
            propertyExpression.expression(value);
        },
        removeExpression: (expression) => {
            object.expressionBindings.remove(propertyExpression);
            wrappedExpressionOptions.isValid(true);
        }
    });
    object._disposables.push(ko.computed(() => {
        if (object.expressionBindings().indexOf(propertyExpression) !== -1) {
            wrappedExpressionOptions.expression(propertyExpression);
        }
        else
            wrappedExpressionOptions.expression(null);
    }), wrappedExpressionOptions);
    object[propertyName + suffix] = wrappedExpressionOptions;
    return wrappedExpressionOptions;
}
export class ParameterExpressionBinding {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return parameterExpressionBindingSerializationsInfo;
    }
    isEmpty() {
        return !this.expression();
    }
}
ParameterExpressionBinding.expressionSuff = 'ExpressionObj';