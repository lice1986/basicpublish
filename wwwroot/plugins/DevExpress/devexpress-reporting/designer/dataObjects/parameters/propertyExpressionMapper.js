﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\propertyExpressionMapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class PropertyExpressionMapper {
    constructor() {
        this._mapper = {};
    }
    getExpressionPropertyName(propertyName) {
        return propertyName.substr(0, 1).toLocaleUpperCase() + propertyName.substr(1) + 'ExpressionObj';
    }
    registerExpressionProperty(property) {
        const newPropertyName = this.getExpressionPropertyName(property.propertyName);
        const expressionInfo = {
            propertyName: newPropertyName,
            editor: editorTemplates.getEditor('expressionEditor'),
            displayName: property.displayName,
            localizationId: property.localizationId
        };
        this._mapper[newPropertyName] = {
            showExpression: ko.observable(false)
        };
        return expressionInfo;
    }
    isPropertyVisible(propertyName, editingMode) {
        if (!editingMode)
            return !this._mapper[propertyName];
        const expressionProperty = this.getExpressionProperty(propertyName);
        return expressionProperty ? (!!this._mapper[propertyName] === expressionProperty.showExpression()) : true;
    }
    getExpressionProperty(propertyName) {
        return this._mapper[propertyName] || this._mapper[this.getExpressionPropertyName(propertyName)];
    }
}
PropertyExpressionMapper.propertiesWithExpressions = ['visible', 'enabled'];