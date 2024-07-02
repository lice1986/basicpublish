﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParameterHelper } from './parameterHelper';
import { viewerEditorTemplates } from '../widgets/editorTemplates';
import { parseDate, integerValueConverter, floatValueConverter } from '@devexpress/analytics-core/analytics-internal-native';
import { requiredValidationRules } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import * as $ from 'jquery';
import { nativeMultiPlatformEngine, subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
import { EventPropertyManager } from '@devexpress/analytics-core/analytics-utils-native';
export class PreviewParameterHelper extends ParameterHelper {
    constructor(knownEnums, callbacks) {
        super(undefined, undefined, 'native');
        this.callbacks = callbacks;
        this.initialize(knownEnums, callbacks);
    }
    mapLookUpValues(type, lookUpValues) {
        const converter = this.getValueConverter(type);
        return $.map(lookUpValues || [], (lookUpValue) => { return { value: converter(lookUpValue.Value), displayValue: lookUpValue.Description }; });
    }
    static fixPropertyName(propertyName) {
        return propertyName.replace(/\./g, '_');
    }
    static getPrivatePropertyName(propertyName) {
        return '_' + PreviewParameterHelper.fixPropertyName(propertyName);
    }
    createInfo(parameter) {
        const info = super.createInfo(parameter);
        info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameter.path);
        if (!parameter.isMultiValue && (parameter.lookUpValues || this.isEnumType(parameter))) {
            info.editorOptions.searchEnabled = true;
            if (!parameter.allowNull)
                info.editorOptions.allowClearing = false;
        }
        if (parameter.isRange) {
            info.editor = this.getRangeEditor();
            return info;
        }
        if ((parameter.type === 'System.DateTime' || parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) && !parameter.allowNull && !parameter.isMultiValue && !parameter.isMultiValueWithLookUp) {
            info.validationRules = requiredValidationRules;
        }
        else if (parameter.type === 'System.Guid') {
            info.editorOptions.displayCustomValue = false;
        }
        return info;
    }
    assignValueStore(info, parameter) {
        const _helper = this;
        if (!parameter.isMultiValueWithLookUp) {
            parameter.multiValueInfo['events'] = new EventPropertyManager();
            info.events = new EventPropertyManager();
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(info, 'valueStore', {
                read: () => {
                    let items = [];
                    let needSorting = false;
                    const lookupValues = parameter.lookUpValues;
                    if (parameter.isFilteredLookUpSettings || lookupValues && lookupValues.length !== 0) {
                        items = lookupValues;
                    }
                    else {
                        items = _helper.getEnumCollection(parameter);
                        needSorting = true;
                    }
                    if (parameter.valueStoreCache)
                        return parameter.valueStoreCache;
                    const itemsSource = _helper.getItemsSource(parameter.getParameterDescriptor(), items, needSorting);
                    if (itemsSource)
                        parameter.valueStoreCache = itemsSource;
                    return itemsSource;
                },
                write: (values) => {
                    parameter.lookUpValues = values;
                }
            }, [
                subscribableProperty(parameter, ['lookUpValues'])
            ]));
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(parameter.multiValueInfo, 'valueStore', {
                read: () => info.valueStore,
                write: (value) => info.valueStore = value
            }, [
                subscribableProperty(info, ['valueStore'])
            ]));
        }
    }
    isEnumType(parameter) {
        return parameter.isFilteredLookUpSettings || !!parameter.lookUpValues || super.isEnumType(parameter);
    }
    getValueConverter(type) {
        if (type === 'System.DateTime') {
            return (dateString) => { return parseDate(dateString); };
        }
        else if (['System.Int16', 'System.Int32', 'System.Int64'].indexOf(type) > -1) {
            return val => integerValueConverter(val, '0');
        }
        else if (['System.Single', 'System.Double', 'System.Decimal'].indexOf(type) > -1) {
            return val => floatValueConverter(val, '0');
        }
        return super.getValueConverter(type);
    }
    getRangeEditor() {
        return viewerEditorTemplates.rangeEditor;
    }
}