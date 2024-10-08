﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterHelper.js)
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
import { viewerEditorTemplates } from '../widgets/editorTemplates';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import * as $ from 'jquery';
import { koUtils, selectPlaceholder, SortedArrayStore } from '@devexpress/analytics-core/analytics-internal-native';
import ArrayStore from 'devextreme/data/array_store';
import { getEditorType as analytics_getEditorType } from '@devexpress/analytics-core/analytics-internal-native';
import DataSource from 'devextreme/data/data_source';
import { BaseRenderingMultiplatformModel, currentMultiPlatformEngine, mutable, subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
export function getEditorType(typeString) {
    if (typeString === 'multiValueWithLookUp') {
        return viewerEditorTemplates.multiValue;
    }
    if (typeString === 'multiValue') {
        return viewerEditorTemplates.multiValueEditable;
    }
    if (typeString === 'Enum') {
        return viewerEditorTemplates.selectBox;
    }
    return undefined;
}
export function _convertLocalDateToUTC(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
}
export class MultiValueItem extends BaseRenderingMultiplatformModel {
    constructor(engine) {
        super(undefined, undefined, engine);
    }
}
__decorate([
    mutable(undefined)
], MultiValueItem.prototype, "value", void 0);
export class ParameterHelper extends BaseRenderingMultiplatformModel {
    constructor() {
        super(...arguments);
        this.getUnspecifiedDisplayText = () => { return getLocalization('(none)', 'PreviewStringId.NoneString'); };
    }
    _isKnownEnumType(type) {
        return !!this._knownEnums && this._knownEnums.some((knownEnumType) => { return knownEnumType.enumType === type; });
    }
    static getSerializationValue(value, dateConverter) {
        if (value instanceof Array) {
            return value.map((item) => {
                const itemValue = (item === null || item === void 0 ? void 0 : item.value) ? currentMultiPlatformEngine.unwrap(item.value) : item;
                return (itemValue instanceof Date) ? dateConverter(itemValue) : itemValue;
            });
        }
        return (value instanceof Date) ? dateConverter(value) : value;
    }
    static createDefaultDataSource(store) {
        return new DataSource({
            store: store,
            paginate: true,
            pageSize: 100
        });
    }
    initialize(knownEnums, callbacks) {
        if (arguments.length > 0) {
            this._knownEnums = knownEnums;
            if (callbacks) {
                callbacks.customizeParameterEditors && this._set('_customizeParameterEditors', callbacks.customizeParameterEditors);
                callbacks.customizeParameterLookUpSource && (this.customizeParameterLookUpSource = callbacks.customizeParameterLookUpSource);
            }
        }
    }
    createInfo(parameter) {
        const parameterDescriptor = parameter.getParameterDescriptor();
        const typeString = this.isEnumType(parameter) ? 'Enum' : koUtils.unwrap(parameterDescriptor.type);
        const editorType = Object.assign({}, getEditorType(typeString) || analytics_getEditorType(typeString));
        const info = {
            propertyName: 'value',
            displayName: parameterDescriptor['displayName'],
            localizationId: parameterDescriptor['localizationId'],
            editor: editorType,
            editorOptions: {}
        };
        if (parameterDescriptor.type === 'System.Guid') {
            info.editorOptions.isNullable = parameterDescriptor.allowNull;
        }
        return info;
    }
    addShowCleanButton(info, parameter) {
        info.editorOptions.showClearButton = parameter.allowNull;
        this.addDisposable(this._getEngine().createComputedProperty(info.editorOptions, 'placeholder', () => {
            if (koUtils.unwrap(parameter.allowNull))
                return this.getUnspecifiedDisplayText();
            return koUtils.unwrap(parameter.isMultiValue) ? selectPlaceholder() : '';
        }, [
            subscribableProperty(parameter, ['allowNull', 'isMultiValue'])
        ]));
    }
    assignValueStore(info, parameter) {
        const items = this.getEnumCollection(parameter);
        info.valueStore = this.getItemsSource(parameter.getParameterDescriptor(), items, true);
        const multiValueInfo = this._getEngine().getPropertyValue(parameter, 'multiValueInfo');
        multiValueInfo.valueStore = info.valueStore;
    }
    createMultiValue(parameter, value) {
        const model = new MultiValueItem(this._engineType);
        if (value !== null && value !== void 0) {
            model._set('value', value);
        }
        model.getInfo = () => {
            return [
                this._getEngine().unwrap(this._getEngine().getPropertyValue(parameter, 'multiValueInfo'))
            ];
        };
        return model;
    }
    createMultiValueArray(fromArray, parameter, convertSingleValue) {
        const converter = convertSingleValue ? convertSingleValue : this.getValueConverter(koUtils.unwrap(parameter.type));
        return fromArray.map((item) => {
            return this.createMultiValue(parameter, converter(item));
        });
    }
    isEnumType(parameter) {
        return this._isKnownEnumType(koUtils.unwrap(parameter.type));
    }
    getItemsSource(parameterDescriptor, items, sort) {
        if (items) {
            let newItems;
            if (this.customizeParameterLookUpSource)
                newItems = this.customizeParameterLookUpSource(parameterDescriptor, items.slice(0));
            return newItems ? newItems : ParameterHelper.createDefaultDataSource(sort ? new SortedArrayStore(items, 'displayValue') : new ArrayStore(items));
        }
        return items;
    }
    getEnumCollection(parameter) {
        const type = koUtils.unwrap(parameter.type);
        if (this._isKnownEnumType(type)) {
            const currentKnownEnumInfo = this._knownEnums.filter((knownEnumType) => { return knownEnumType.enumType === type; })[0];
            if (currentKnownEnumInfo && currentKnownEnumInfo.values && currentKnownEnumInfo.values.length !== 0) {
                return currentKnownEnumInfo.values.map((val) => { return { value: val.value, displayValue: val.displayName }; });
            }
        }
    }
    getParameterInfo(parameter) {
        const valueInfo = this.createInfo(parameter);
        this._getEngine().setPropertyValue(parameter, 'multiValueInfo', ($.extend(true, {}, valueInfo, { propertyName: 'value' })));
        this.assignValueStore(valueInfo, parameter);
        if (parameter.allowNull !== undefined) {
            this.addShowCleanButton(valueInfo, parameter);
        }
        if (koUtils.unwrap(parameter.isMultiValue)) {
            const editorType = Object.assign({}, getEditorType(parameter['isMultiValueWithLookUp'] ? 'multiValueWithLookUp' : 'multiValue'));
            valueInfo.editor = editorType;
            valueInfo['addHandler'] = () => { return this.createMultiValue(parameter); };
        }
        valueInfo.editor.custom = valueInfo.editor.custom || 'dxrd-parameters-property-editor';
        if (this._get('_customizeParameterEditors')) {
            this._get('_customizeParameterEditors')(parameter.getParameterDescriptor(), valueInfo);
        }
        return valueInfo;
    }
    getValueConverter(type) {
        return (val => { return val; });
    }
}
__decorate([
    mutable(undefined)
], ParameterHelper.prototype, "_customizeParameterEditors", void 0);
