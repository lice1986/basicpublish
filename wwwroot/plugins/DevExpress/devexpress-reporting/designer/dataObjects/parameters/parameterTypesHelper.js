﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterTypesHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { enumValueConverter, floatValueConverter, integerValueConverter, parseDate } from '@devexpress/analytics-core/analytics-internal';
import { validateGuid } from '@devexpress/analytics-core/analytics-widgets-internal';
export class ParameterTypesHelper {
    constructor(knownEnums) {
        this.knownEnums = knownEnums;
        this.enumValueTypes = this.getEnumTypeValues();
    }
    _getTypeInfo(typeName) {
        var _a;
        const values = ParameterTypesHelper.typeValues.filter((type) => { return type.value === typeName; });
        if (values.length > 0)
            return values[0];
        if ((_a = this.enumValueTypes) === null || _a === void 0 ? void 0 : _a.length) {
            const enumValues = this.enumValueTypes.filter((enumInfo) => enumInfo.value === typeName);
            if (enumValues.length > 0)
                return enumValues[0];
        }
        return null;
    }
    _tryConvertValue(value, typeName) {
        const condition = val => { return val !== void 0 && val !== null && !isNaN(typeof val === 'string' ? '' : val); };
        if (!condition(value)) {
            return { isValid: false, newValue: null };
        }
        const typeValue = this._getTypeInfo(typeName), newValue = (typeValue && typeValue.valueConverter) ? typeValue.valueConverter(value, this.getDefaultValue(typeName)) : value;
        return { isValid: condition(newValue), newValue: newValue };
    }
    convertSingleValue(value, typeName) {
        const result = this._tryConvertValue(value, typeName);
        return result.isValid ? result.newValue : this.getDefaultValue(typeName);
    }
    getSpecifics(typeName) {
        const typeValue = this._getTypeInfo(typeName);
        return typeValue ? typeValue.specifics : 'default';
    }
    getIcon(typeName) {
        const typeValue = this._getTypeInfo(typeName);
        return typeValue && typeValue.icon;
    }
    getDefaultValue(typeName) {
        var _a, _b, _c;
        const typeValue = this._getTypeInfo(typeName);
        let _value = typeValue ? typeValue.defaultValue : '';
        if (_value === '' && !!((_a = this.knownEnums) === null || _a === void 0 ? void 0 : _a.length)) {
            const enumType = this.knownEnums.filter((enumInfo) => enumInfo.enumType === typeName)[0];
            if (!!enumType) {
                _value = (_c = (_b = enumType.values[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 0;
            }
        }
        else if (_value instanceof Date) {
            _value = new Date(_value);
        }
        return _value;
    }
    getEnumTypeValues() {
        var _a;
        if (!!((_a = this.knownEnums) === null || _a === void 0 ? void 0 : _a.length)) {
            const enumtypeValues = [];
            this.knownEnums.forEach(knownEnum => {
                enumtypeValues.push({
                    value: knownEnum.enumType,
                    displayValue: knownEnum.enumType,
                    defaultValue: knownEnum.values[0].value,
                    specifics: 'Enum',
                    valueConverter: function (val, defaultValue) { return enumValueConverter(val, defaultValue, knownEnum.values); }
                });
            });
            return enumtypeValues;
        }
    }
}
ParameterTypesHelper.defaultGuidValue = '00000000-0000-0000-0000-000000000000';
ParameterTypesHelper.typeValues = [
    { value: 'System.String', displayValue: 'String', defaultValue: '', specifics: 'String', valueConverter: function (val) { return val.toString(); }, localizationId: 'UtilsUIStringId.Parameter_Type_String' },
    { value: 'System.DateTime', displayValue: 'Date', defaultValue: new Date(new Date().setHours(0, 0, 0, 0)), specifics: 'Date', valueConverter: function (val) { return parseDate(val); }, localizationId: 'UtilsUIStringId.Parameter_Type_DateTime' },
    { value: 'System.Int16', displayValue: 'Number (16 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return integerValueConverter(val, defaultValue, 'System.Int16'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int16' },
    { value: 'System.Int32', displayValue: 'Number (32 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return integerValueConverter(val, defaultValue, 'System.Int32'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int32' },
    { value: 'System.Int64', displayValue: 'Number (64 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return integerValueConverter(val, defaultValue, 'System.Int64'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int64' },
    { value: 'System.Single', displayValue: 'Number (floating-point)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return floatValueConverter(val, defaultValue, 'System.Single'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Float' },
    { value: 'System.Double', displayValue: 'Number (double-precision floating-point)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return floatValueConverter(val, defaultValue, 'System.Double'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Double' },
    { value: 'System.Decimal', displayValue: 'Number (decimal)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return floatValueConverter(val, defaultValue, 'System.Decimal'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Decimal' },
    { value: 'System.Boolean', displayValue: 'Boolean', defaultValue: false, specifics: 'Bool', valueConverter: function (val) { return String(val).toLowerCase() === 'true' ? true : (String(val).toLowerCase() === 'false' ? false : null); }, localizationId: 'UtilsUIStringId.Parameter_Type_Boolean' },
    { value: 'System.Guid', displayValue: 'Guid', defaultValue: ParameterTypesHelper.defaultGuidValue, valueConverter: function (val) { return validateGuid(val) ? val : ParameterTypesHelper.defaultGuidValue; }, specifics: 'guid', localizationId: 'UtilsUIStringId.Parameter_Type_Guid' }
];