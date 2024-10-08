﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\valueSourceSettingsHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Locker } from '../../../common/utils/_locker';
import { LookUpSettings, StaticListLookUpSettings } from './lookupSettings';
import { RangeParametersSettings } from './rangeSettings';
export class ValueSourceSettingsHelper {
    constructor(parameter) {
        this.parameter = parameter;
    }
    _updateValueSourceSettingsType(valueSourceSettings = this.parameter.valueSourceSettings()) {
        if (valueSourceSettings) {
            if (valueSourceSettings.objectType().indexOf('StaticListLookUpSettings') !== -1) {
                this.parameter.valueSourceSettingsType('StaticListLookUpSettings');
            }
            else if (valueSourceSettings.objectType().indexOf('DynamicListLookUpSettings') !== -1) {
                this.parameter.valueSourceSettingsType('DynamicListLookUpSettings');
            }
            else {
                this.parameter.valueSourceSettingsType('RangeParametersSettings');
            }
        }
    }
    _updateValueSourceSettings(valueSourceSettingsType) {
        const updateSettings = (settings) => {
            settings._isEditing(this.parameter._isEditing());
            return settings;
        };
        if (valueSourceSettingsType === 'StaticListLookUpSettings') {
            this.parameter.valueSourceSettings(updateSettings(this.parameter.objectsStorage.createStaticLookUpSetting()));
        }
        else if (valueSourceSettingsType === 'DynamicListLookUpSettings') {
            this.parameter.valueSourceSettings(this.parameter.objectsStorage.createDynamicLookUpSetting());
        }
        else if (valueSourceSettingsType === 'RangeParametersSettings') {
            this.parameter.isMultiValue(false);
            this.parameter.allowNull(false);
            this.parameter.selectAllValues(false);
            const rangeSetting = this.parameter.objectsStorage.createRangeSetting();
            rangeSetting.initializeParameters(this.parameter);
            this.parameter.valueSourceSettings(updateSettings(rangeSetting));
        }
        else {
            this.parameter.objectsStorage.objects.remove(this.parameter.valueSourceSettings());
            this.parameter.valueSourceSettings(null);
        }
    }
    initializeParameterSettingsType() {
        const locker = new Locker();
        const valueSourceSettings = this.parameter.valueSourceSettings(), lookUpValues = valueSourceSettings && (valueSourceSettings instanceof StaticListLookUpSettings) && valueSourceSettings.lookUpValues();
        if (lookUpValues) {
            lookUpValues.forEach((lookUpValue) => {
                lookUpValue.valueInfo = this.parameter.multiValueInfo;
                if (lookUpValue.isEmpty)
                    this.initializeLookUpValue(lookUpValue);
            });
        }
        this._updateValueSourceSettingsType();
        this.parameter._disposables.push(this.parameter.valueSourceSettings.subscribe((settings) => {
            locker.lock(() => this._updateValueSourceSettingsType(settings));
        }));
        this.parameter._disposables.push(this.parameter.valueSourceSettingsType.subscribe((newVal) => {
            locker.lock(() => this._updateValueSourceSettings(newVal));
        }));
        if (valueSourceSettings instanceof RangeParametersSettings) {
            valueSourceSettings.assingParameterInfo(this.parameter);
        }
    }
    initializeLookupValueSubscribe(report) {
        const self = this;
        this.parameter._disposables.push(ko.computed(() => {
            const valueSourceSettings = this.parameter.valueSourceSettings();
            if (valueSourceSettings instanceof LookUpSettings) {
                valueSourceSettings.updateFilter(this.parameter, report);
                if (valueSourceSettings instanceof StaticListLookUpSettings) {
                    this.parameter._disposables.push(valueSourceSettings.lookUpValues.subscribe(function (changes) {
                        for (let index = 0; index < changes.length; index++) {
                            if (changes[index].status === 'added') {
                                self.initializeLookUpValue(changes[index].value);
                                changes[index].value.valueInfo = self.parameter.multiValueInfo;
                            }
                            else if (changes[index].status === 'deleted') {
                                self.parameter.objectsStorage.objects.remove(changes[index].value._value());
                            }
                        }
                    }, null, 'arrayChange'));
                }
            }
        }));
    }
    initializeLookUpValue(lookUpValue) {
        const newValue = this.parameter.objectsStorage.addValue();
        newValue.type(this.parameter.type());
        newValue.content(this.parameter.defaultValue);
        lookUpValue._value(newValue);
    }
    updateLookUpValues(newType, value = null) {
        const valueSourceSettings = this.parameter.valueSourceSettings(), lookUpValues = valueSourceSettings && (valueSourceSettings instanceof StaticListLookUpSettings) && valueSourceSettings.lookUpValues();
        if (!valueSourceSettings || !lookUpValues)
            return;
        lookUpValues.forEach((lookUpValue) => {
            const lookUpVal = lookUpValue._value();
            lookUpVal.content(value);
            !!newType && lookUpVal.type(newType);
        });
    }
    updateSettingValues(newType, value = null) {
        const valueSourceSettings = this.parameter.valueSourceSettings();
        if (valueSourceSettings && valueSourceSettings instanceof StaticListLookUpSettings) {
            this.updateLookUpValues(newType, value);
            valueSourceSettings._isEditing(this.parameter._isEditing());
        }
        else if (valueSourceSettings instanceof RangeParametersSettings) {
            valueSourceSettings.startParameter().value(value);
            valueSourceSettings.endParameter().value(value);
            valueSourceSettings._isEditing(this.parameter._isEditing());
        }
    }
}
