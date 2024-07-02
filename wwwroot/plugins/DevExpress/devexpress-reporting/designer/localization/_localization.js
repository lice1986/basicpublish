﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localization.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { getUnitProperties } from '../controls/utils/_initUtils';
import { componentInfo, cultureInfo, propertyNameInfo, propertyValueInfo } from './localizationMetadata';
export class LocalizationItem {
    constructor(model, serializer) {
        this.culture = ko.observable();
        this.component = ko.observable();
        this.propertyName = ko.observable();
        this.propertyValue = ko.observable();
        serializer = serializer || new ModelSerializer();
        model && serializer.deserialize(this, model);
    }
    getInfo() {
        return [componentInfo, cultureInfo, propertyNameInfo, propertyValueInfo];
    }
}
function getComponentInfo(localizationPropertyInfo) {
    return localizationPropertyInfo.component.getLocalizationProperty(localizationPropertyInfo.propertyName);
}
export function searchInLocalizationArray(localizationArray, controlPropertyName, component) {
    return localizationArray.filter(localizationItem => {
        return localizationItem.component == component && localizationItem.propertyName === controlPropertyName;
    })[0];
}
export class LocalizationDictionary {
    constructor() {
        this.cultures = {};
        this.count = () => {
            return Object.keys(this.cultures).length;
        };
        this.clear = (code) => {
            if (!code) {
                const defaultCultureInfo = this.cultures[defaultCulture];
                this.cultures = {};
                this.cultures[defaultCulture] = defaultCultureInfo;
            }
            else {
                this.cultures[code].properties = [];
                delete this.cultures[code];
            }
        };
    }
    add(code) {
        this.cultures[code] = new LocalizationInfo(code);
        this.cultures[code].createNodes(code, this);
        return this.cultures[code];
    }
    get(code) {
        return this.cultures[code];
    }
    keys() {
        return Object.keys(this.cultures);
    }
}
export class LocalizationInfo {
    constructor(code) {
        this.code = code;
        this.properties = [];
        this.isLocalized = ko.observable(false);
        this.setValue = (component, propertyName, value) => {
            const propertyValue = ko.unwrap(value);
            const setInfo = {
                component: component,
                propertyName: propertyName,
                value: propertyValue && propertyValue.toString() || propertyValue
            };
            const selfProperty = searchInLocalizationArray(this.properties, setInfo.propertyName, setInfo.component);
            const closestProperty = this.parent ? this.parent.findClosestProperty(setInfo) : undefined;
            if (selfProperty) {
                if (closestProperty && closestProperty.value == setInfo.value)
                    this.properties.splice(this.properties.indexOf(selfProperty), 1);
                else
                    selfProperty.value = setInfo.value;
            }
            else if (!closestProperty || closestProperty.value !== setInfo.value) {
                this._updateLocalizationInfoItem(setInfo);
                this.properties.push(setInfo);
            }
            this.isLocalized(this.properties.length > 0);
        };
    }
    getInheritedProperties() {
        const collectedProperties = this.properties.map(a => a);
        return this.parent ? this.parent.mergePropertiesWithChild(collectedProperties) : collectedProperties;
    }
    createNodes(code, list) {
        const parent = this.getParentCulture(code);
        if (!parent)
            return;
        if (!list.get(parent))
            list.add(parent);
        this.parent = list.get(parent);
    }
    mergePropertiesWithChild(childArray) {
        this.properties.forEach(property => {
            const mergeElement = childArray.filter(info => info.component === property.component && info.propertyName === property.propertyName);
            if (!mergeElement.length)
                childArray.push(property);
        });
        return this.parent ? this.parent.mergePropertiesWithChild(childArray) : childArray;
    }
    _recalculateUnit(item, serializationInfo, process) {
        let model = ko.unwrap(serializationInfo.from ? serializationInfo.from(item.value) : item.value);
        model = process(model);
        item.value = serializationInfo.toJsonObject ? serializationInfo.toJsonObject(model) : model.toString();
    }
    _updateLocalizationInfoItem(setInfo) {
        const localizedControl = getComponentInfo(setInfo);
        const serializationInfo = localizedControl && localizedControl.info;
        const unitProperties = getUnitProperties(setInfo.component);
        if (serializationInfo && unitProperties && unitProperties.properties.some(x => x === serializationInfo.propertyName)) {
            setInfo.recalculate = (coef) => {
                this._recalculateUnit(setInfo, serializationInfo, (value) => {
                    const valueUnits = getUnitProperties(value);
                    if (valueUnits) {
                        valueUnits.reCalculateObject(coef);
                        return value;
                    }
                    return unitProperties.calcProperty(value, coef);
                });
            };
        }
    }
    _createLocalizationItem(itemInfo) {
        const item = new LocalizationItem();
        item.culture(this.code);
        item.component(itemInfo.component);
        item.propertyName(itemInfo.propertyName);
        item.propertyValue(itemInfo.value.toString());
        return item;
    }
    serialize(canSerialize) {
        return this.properties.reduce((result, property) => {
            if (canSerialize(property.component)) {
                if (this.code === defaultCulture) {
                    const localizedProperty = getComponentInfo(property);
                    let defaultVal = ko.unwrap(localizedProperty.info.from ? localizedProperty.info.from(localizedProperty.info.defaultVal) : localizedProperty.info.defaultVal);
                    defaultVal = localizedProperty.info.toJsonObject ? localizedProperty.info.toJsonObject(defaultVal) : (defaultVal != null && defaultVal.toString() || defaultVal);
                    if (property.value != undefined && property.value.toString() !== defaultVal) {
                        result.push(this._createLocalizationItem(property));
                    }
                }
                else {
                    result.push(this._createLocalizationItem(property));
                }
            }
            return result;
        }, []);
    }
    findClosestProperty(mergeProperty) {
        for (let i = 0; i < this.properties.length; i++)
            if (this.properties[i].component === mergeProperty.component && this.properties[i].propertyName === mergeProperty.propertyName)
                return this.properties[i];
        return this.parent ? this.parent.findClosestProperty(mergeProperty) : undefined;
    }
    getParentCulture(cultureCode) {
        if (cultureCode == null || cultureCode == defaultCulture)
            return undefined;
        const parts = cultureCode.split('-');
        return parts.length == 1 ? defaultCulture : parts.splice(0, parts.length - 1).join('-');
    }
}