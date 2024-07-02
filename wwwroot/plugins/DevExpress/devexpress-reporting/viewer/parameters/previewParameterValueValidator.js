﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterValueValidator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { validateGuid, ValueEditorHelper } from '@devexpress/analytics-core/analytics-widgets-internal-native';
export class PreviewParameterValueValidator {
    constructor() {
        this._validatorMap = {};
        this._numericTypes = [
            'System.SByte',
            'System.Decimal',
            'System.Int64',
            'System.Int32',
            'System.Int16',
            'System.Single',
            'System.Double',
            'System.Byte',
            'System.UInt16',
            'System.UInt32',
            'System.UInt64'
        ];
        this._registerType('System.String', (value) => typeof value === 'string');
        this._registerType('System.Guid', (value) => typeof value === 'string' && validateGuid(value));
        this._registerType('System.Boolean', (value) => typeof value === 'boolean');
        this._registerType('System.DateTime', (value) => {
            return !isNaN(new Date(value));
        });
        this._numericTypes.forEach((type) => this._registerType(type, (value) => typeof value === 'string' && ValueEditorHelper.isValid(type, undefined, value)));
    }
    _registerType(typeName, validator) {
        this._validatorMap[typeName] = validator;
    }
    validate(type, value) {
        return this._validatorMap[type] ? this._validatorMap[type](value) : true;
    }
    isNumericType(type) {
        return this._numericTypes.some(x => x === type);
    }
}
