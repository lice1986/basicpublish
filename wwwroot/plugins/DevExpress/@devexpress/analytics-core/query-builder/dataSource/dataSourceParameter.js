﻿/**
* DevExpress Analytics (query-builder\dataSource\dataSourceParameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { integerValueConverter as integerValueConverterUtils, floatValueConverter as floatValueConverterUtils } from '../../widgets/_utils';
import { formatUnicorn } from '../../property-grid/widgets/internal/_utils';
import { DBColumn } from './dbColumn';
import { parseDate } from '../../property-grid/localization/_localization';
import { Disposable } from '../../serializer/disposable';
import { ExpressionType, IsDataAccessExpression, getEditorType } from '../../core/internal/_editorTypeMapper';
import { parameterValueSerializationsInfo, dsParameterSerializationInfo, validateName } from './dataSourceParameterMeta';
import { expressionFunctions } from '../widgets/expressionFunctions';
import { ModelSerializer } from '../../serializer/serializer';
import { extend } from '../../serializer/_utils';
function integerValueConverter(val, defaultVal, type) {
    return integerValueConverterUtils(val, defaultVal, type);
}
function floatValueConverter(val, defaultVal, type) {
    return floatValueConverterUtils(val, defaultVal, type);
}
function expressionValueConverter(val) {
    if (val instanceof Date) {
        const prependZero = (x) => (x < 10 ? '0' : '') + x;
        return formatUnicorn('#{0}/{1}/{2} {3}:{4}#', prependZero(val.getMonth() + 1), prependZero(val.getDate()), val.getFullYear(), prependZero(val.getHours()), prependZero(val.getMinutes()));
    }
    return (val || '').toString();
}
class DataSourceParameterTypeValue {
    constructor(name, defaultValue, _valueConverter, realTypeName) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.realTypeName = realTypeName;
        if (_valueConverter)
            this.valueConverter = (val) => _valueConverter(val, defaultValue, this.name);
    }
    get specifics() {
        return DBColumn.GetSpecific(this.realTypeName || this.name);
    }
}
const tryParseDate = val => {
    let date;
    try {
        date = parseDate(val);
    }
    catch (e) {
        date = dateDefaultValue();
    }
    return date;
};
const dateDefaultValue = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};
export class DataSourceParameter extends Disposable {
    constructor(model, serializer, _serializationsInfo = dsParameterSerializationInfo) {
        super();
        this._serializationsInfo = _serializationsInfo;
        this._valueInfo = ko.observable(parameterValueSerializationsInfo);
        this._parametersFunctions = expressionFunctions;
        this.isValid = ko.observable(true);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, extend(model, { '@ItemType': 'Parameter' }));
        this._disposables.push(this.name = ko.pureComputed({
            read: () => { return this._name(); },
            write: (value) => { if (validateName(value))
                this._name(value); }
        }));
        this._expressionValue = ko.observable({
            value: this._value,
            functions: this._parametersFunctions
        });
        this._disposables.push(this.type.subscribe((val) => {
            if (IsDataAccessExpression(val)) {
                this.resultType(this._previousResultType);
            }
            else {
                this.resultType(null);
                this._previousResultType = val;
            }
            this._updateValueInfo(val);
        }));
        this._previousResultType = (IsDataAccessExpression(this.type.peek()))
            ? this.resultType()
            : this.type();
        this.value = ko.pureComputed({
            read: () => {
                return IsDataAccessExpression(this.type()) ? this._expressionValue() : this._value();
            },
            write: (val) => {
                this._value(val);
            }
        });
        this._updateValueInfo(this.type.peek());
    }
    static _getTypeValue(typeName, resultType = null) {
        const result = DataSourceParameter._typeValues.filter((type) => { return type.name === typeName; });
        if (result.length > 0) {
            if (resultType && IsDataAccessExpression(typeName))
                result[0].realTypeName = resultType;
            return result[0];
        }
        return { name: typeName, defaultValue: null, specifics: 'String', disableEditor: true };
    }
    _getTypeValue(typeName) {
        return DataSourceParameter._getTypeValue(typeName, this.resultType());
    }
    _tryConvertValue(value, typeValue) {
        if (!DataSourceParameter._isValueValid(value))
            return typeValue.defaultValue;
        const converter = typeValue.valueConverter || (val => { return val; }), newValue = converter(value);
        return DataSourceParameter._isValueValid(newValue) ? newValue : typeValue.defaultValue;
    }
    static _isValueValid(value) {
        return value !== void 0 && value !== null && !isNaN(typeof value === 'string' ? '' : value);
    }
    getEditorType(type) {
        return getEditorType(type);
    }
    _updateValueInfo(newType) {
        const typeValue = this._getTypeValue(newType);
        const newValue = this._tryConvertValue(this._value(), typeValue);
        const expressionOptions = this._expressionValue.peek();
        this._expressionValue(null);
        this._value(null);
        this._valueInfo(extend({}, parameterValueSerializationsInfo, {
            editor: this.getEditorType(typeValue.name),
            disabled: typeValue.disableEditor === true,
            editorOptions: {
                onFocusOut: (params) => {
                    this.isValid(params.component.option('isValid'));
                }
            }
        }));
        this._expressionValue(expressionOptions);
        this._value(newValue);
    }
    get specifics() {
        const realTypeName = (IsDataAccessExpression(this.type.peek()))
            ? this.resultType()
            : this.type();
        const result = DataSourceParameter._typeValues.filter((type) => { return type.name === realTypeName; });
        if (result.length > 0)
            return result[0].specifics;
        return 'string';
    }
    getInfo() {
        if (this.type) {
            const info = extend(true, [], this._serializationsInfo);
            info.splice(info.indexOf(info.filter((prop) => { return prop.propertyName === 'value'; })[0]), 1, this._valueInfo());
            return info;
        }
        return this._serializationsInfo;
    }
    isPropertyVisible(propName) {
        if (propName === 'resultType')
            return IsDataAccessExpression(this.type());
        return true;
    }
}
DataSourceParameter._typeValues = [
    new DataSourceParameterTypeValue('System.DateTime', dateDefaultValue(), tryParseDate),
    new DataSourceParameterTypeValue('System.String', ''),
    new DataSourceParameterTypeValue('System.SByte', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.Int16', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.Int32', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.Int64', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.Byte', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.UInt16', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.UInt32', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.UInt64', '0', integerValueConverter),
    new DataSourceParameterTypeValue('System.Decimal', '0', floatValueConverter),
    new DataSourceParameterTypeValue('System.Double', '0', floatValueConverter),
    new DataSourceParameterTypeValue('System.Single', '0', floatValueConverter),
    new DataSourceParameterTypeValue('System.Boolean', false, val => val !== void 0 ? String(val).toLowerCase() === 'true' : val),
    new DataSourceParameterTypeValue('System.Guid', '00000000-0000-0000-0000-000000000000'),
    new DataSourceParameterTypeValue(ExpressionType, '', expressionValueConverter),
    new DataSourceParameterTypeValue('System.Char', ''),
];