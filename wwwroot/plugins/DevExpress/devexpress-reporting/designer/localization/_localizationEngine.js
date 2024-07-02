﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEngine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { replaceInvalidSymbols } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { LocalizationDictionary } from './_localization';
export class ReportLocalizationEngine extends Disposable {
    constructor(report) {
        super();
        this.report = report;
        this.items = new LocalizationDictionary();
        this.add = (cultureCode, component, propertyName, value) => {
            const node = this.items.get(cultureCode);
            if (!node) {
                this.items.add(cultureCode).setValue(component, propertyName, value);
            }
            else
                node.setValue(component, propertyName, value);
        };
        this.save = (cultureCode = this.report.language()) => {
            this.report.enumerateComponents().forEach((control) => {
                if (control.getLocalizationProperties) {
                    control.getLocalizationProperties().forEach(item => this.add(cultureCode, control, item.propertyName, item.value));
                }
            });
        };
        this.apply = (cultureCode) => {
            const localizationItem = this.items.get(cultureCode);
            if (!localizationItem) {
                this.items.add(cultureCode);
                this.apply(cultureCode);
            }
            else {
                const needUpdate = !this.report['_update']();
                needUpdate && this.report['_update'](true);
                localizationItem.getInheritedProperties().forEach(localizationPropertyInfo => {
                    localizationPropertyInfo.component.applyLocalization(localizationPropertyInfo.propertyName, localizationPropertyInfo.value);
                });
                needUpdate && this.report['_update'](false);
            }
        };
        this.serialize = () => {
            const outArray = [];
            const _avalibleComponents = this.report.enumerateComponents();
            const _avalibleComponentsDictionary = {};
            const _getUniqueName = (component) => {
                return replaceInvalidSymbols(component.controlType + ko.unwrap(component.name));
            };
            _avalibleComponents.forEach(component => {
                _avalibleComponentsDictionary[_getUniqueName(component)] = component;
            });
            const canSerialize = (component) => {
                const item = _avalibleComponentsDictionary[_getUniqueName(component)];
                return item && component === item;
            };
            this.items.keys().forEach(key => {
                outArray.push(...this.items.get(key).serialize(canSerialize));
            });
            return outArray;
        };
        report._localizationItems().forEach(item => {
            item.component() && this.add(item.culture(), item.component(), item.propertyName(), item.propertyValue);
        });
    }
    recalculateUnits(coef) {
        this.items.keys().forEach((key) => {
            key !== this.report.language() && this.items.get(key).properties.forEach(x => x.recalculate && x.recalculate(coef));
        });
    }
    hasCulture(cultureCode) {
        const item = this.items.get(cultureCode);
        return item && item.isLocalized();
    }
    isLocalized() {
        return this.items.keys().some((key) => {
            return key !== defaultCulture && this.items.get(key).properties.length > 0;
        });
    }
}
