﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { compareArrays, guid } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseModel, mutable, nativeMultiPlatformEngine, subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
import { Editor } from '@devexpress/analytics-core/analytics-widgets-native';
import ArrayStore from 'devextreme/data/array_store';
import { MultiValuesHelper } from './multiValuesHelper';
import { ParameterHelper, _convertLocalDateToUTC } from './parameterHelper';
import { PreviewParameterHelper } from './previewParameterHelper';
import { PreviewParameterValueValidator } from './previewParameterValueValidator';
export class PreviewParameter extends BaseModel {
    constructor(parameterInfo, parameterHelper) {
        super();
        this.valueStoreCache = null;
        this.intTypes = ['System.Int16', 'System.Int32', 'System.Int64'];
        this.floatTypes = ['System.Single', 'System.Double', 'System.Decimal'];
        this.isTypesCurrentType = (types, type) => types.indexOf(type) > -1;
        this.tag = parameterInfo.Tag;
        this.type = parameterInfo.TypeName;
        this.isRange = parameterInfo.Value && parameterInfo.Value.Start !== undefined && parameterInfo.Value.End !== undefined;
        this.path = parameterInfo.Path;
        this.assignProperty('visible', parameterInfo.Visible);
        this.assignProperty('enabled', parameterInfo.Enabled);
        this.isFilteredLookUpSettings = parameterInfo.IsFilteredLookUpSettings;
        this.hasBindedExpressions = !!(parameterInfo.EnabledExpression || parameterInfo.VisibleExpression);
        this.hasVisibleExpression = !!parameterInfo.VisibleExpression;
        this._originalLookUpValues = parameterInfo.LookUpValues ? parameterHelper.mapLookUpValues(this.type, parameterInfo.LookUpValues || []) : null;
        this.lookUpValues = this._originalLookUpValues;
        this.isMultiValue = parameterInfo.MultiValue;
        this.selectAllValues = parameterInfo.SelectAllValues;
        this.allowNull = parameterInfo.AllowNull;
        this.isMultiValueWithLookUp = this.isMultiValue && !!this.lookUpValues;
        this._originalValue = parameterInfo.Value;
        if (parameterInfo.ValueInfo && this.isTypesCurrentType(this.intTypes.concat(this.floatTypes), this.type) && !this.isMultiValueWithLookUp) {
            this._originalValue = parameterInfo.ValueInfo;
        }
        this.getParameterDescriptor = () => {
            return {
                description: parameterInfo.Description,
                displayName: parameterInfo.Description || parameterInfo.Name,
                name: parameterInfo.Name,
                tag: parameterInfo.Tag,
                type: parameterInfo.TypeName,
                value: this._originalValue,
                multiValue: parameterInfo.MultiValue,
                selectAllValues: parameterInfo.SelectAllValues,
                allowNull: parameterInfo.AllowNull,
                hasLookUpValues: !!this.lookUpValues || parameterHelper.isEnumType(this),
                visible: parameterInfo.Visible,
                enabled: parameterInfo.Enabled
            };
        };
        this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(this, `___${guid()}`, () => {
            const info = parameterHelper.getParameterInfo(this);
            info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameterInfo.Path);
            info.editor.editorType = info.editor.editorType || Editor;
            info.editorOptions.hasVerticalLabel = this.hasVerticalLabel;
            this.valueInfo = info;
        }, [
            subscribableProperty(this, ['type', 'hasVerticalLabel', 'lookUpValues']),
            subscribableProperty(parameterHelper, ['_customizeParameterEditors'])
        ]));
        this.initialize(this._originalValue, parameterHelper);
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'lookUpValues') {
            this.valueStoreCache = null;
        }
    }
    static _compareValues(value1, value2) {
        if (value1 instanceof Date && value2 instanceof Date) {
            return value1 - value2 === 0;
        }
        return value1 === value2;
    }
    safeAssignObservable(name, value) {
        if (name in this) {
            if (PreviewParameter._compareValues(this[name], value))
                this[name] = this.type === 'System.DateTime' ? new Date(0, 0, 0) : null;
            let isEqual = false;
            if (value instanceof MultiValuesHelper && Array.isArray(value.items))
                isEqual = compareArrays(this[name].items, value.items);
            else if (Array.isArray(value))
                isEqual = compareArrays(this[name], value);
            if (!isEqual) {
                this[name] = value;
            }
        }
        else {
            if (Array.isArray(value))
                this.assignArrayProperty(name, value);
            else
                this.assignProperty(name, value);
        }
    }
    _validateRangeType(value) {
        return Array.isArray(value) && value.every(x => x instanceof Date) && value.length === 2;
    }
    validateAndAssignValue(value) {
        if (value === undefined || value === null) {
            this.value = value;
            return;
        }
        if (this.isRange && !this._validateRangeType(value))
            throw new Error(`The '${this.path}' parameter must be in the format [Date, Date].`);
        if (!this.isRange) {
            const validator = new PreviewParameterValueValidator();
            if (validator.isNumericType(this.type))
                value = '' + value;
            if (!validator.validate(this.type, value))
                throw new Error(`The '${this.path}' parameter must be a '${this.type}' type.`);
        }
        this.value = value;
    }
    initialize(value, parameterHelper) {
        let resultValue;
        if (this.isMultiValueWithLookUp) {
            this.safeAssignObservable('_value', (value || []).map((arrayItem) => {
                return parameterHelper.getValueConverter(this.type)(arrayItem);
            }));
            const multiValuesHelper = new MultiValuesHelper(this);
            let newItems;
            if (parameterHelper.customizeParameterLookUpSource)
                newItems = parameterHelper.customizeParameterLookUpSource(this.getParameterDescriptor(), multiValuesHelper.dataSource);
            if (newItems) {
                multiValuesHelper.dataSource = newItems;
            }
            else {
                const store = new ArrayStore({
                    data: multiValuesHelper.dataSource,
                    key: 'value',
                });
                multiValuesHelper.dataSource = ParameterHelper.createDefaultDataSource(store);
            }
            resultValue = multiValuesHelper;
        }
        else if (this.isMultiValue) {
            resultValue = value ? parameterHelper.createMultiValueArray(value, this) : [];
        }
        else if (this.allowNull && !value && value !== false) {
            resultValue = null;
        }
        else if (this.isRange) {
            const converter = parameterHelper.getValueConverter(this.type);
            resultValue = [this._originalValue.Start, this._originalValue.End].map(x => converter(x));
        }
        else {
            resultValue = parameterHelper.getValueConverter(this.type)(value);
        }
        this.safeAssignObservable('value', resultValue);
    }
    serialize() {
        const convertItem = (item) => {
            return (this.type === 'System.DateTime' && !!item && (item instanceof Date)) ? _convertLocalDateToUTC(item) : item;
        };
        let value = this.isMultiValueWithLookUp ? this._value : this.value;
        if (this.allowNull) {
            if ((this.isMultiValue && Array.isArray(value) && value['length'] === 0) || value === '') {
                value = null;
            }
        }
        return { Value: ParameterHelper.getSerializationValue(value, convertItem), Key: this.path, TypeName: this.type };
    }
}
__decorate([
    mutable(false)
], PreviewParameter.prototype, "hasVerticalLabel", void 0);
__decorate([
    mutable(undefined)
], PreviewParameter.prototype, "valueInfo", void 0);
__decorate([
    mutable(undefined, { notify: 'always' })
], PreviewParameter.prototype, "lookUpValues", void 0);
__decorate([
    mutable(undefined)
], PreviewParameter.prototype, "multiValueInfo", void 0);
