﻿/**
* DevExpress Analytics (core\utils\controlsFactory.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getLocalization } from '../../property-grid/localization/_localization';
import { extend } from '../../serializer/_utils';
import { ElementViewModel } from '../elements/elementViewModel';
import { getTypeNameFromFullName } from '../internal/_getNameHelpers';
export class ControlsFactory {
    constructor() {
        this.controlsMap = {};
    }
    getControlInfo(controlType) {
        const info = this.controlsMap[controlType] || null;
        return info;
    }
    getControlType(model) {
        const controlType = getTypeNameFromFullName(model['@ControlType'] || '');
        return this.controlsMap[controlType] ? controlType : 'Unknown';
    }
    createControl(model, parent, serializer) {
        const controlType = this.getControlType(model);
        return new (this.controlsMap[controlType] && this.controlsMap[controlType].type || ElementViewModel)(model, parent, serializer);
    }
    registerControl(typeName, metadata) {
        if (metadata.isToolboxItem !== undefined) {
            metadata.nonToolboxItem = !metadata.isToolboxItem;
        }
        Object.defineProperty(metadata, 'isToolboxItem', {
            get: () => {
                return !metadata.nonToolboxItem;
            },
            set: (newVal) => {
                metadata.nonToolboxItem = !newVal;
            },
            enumerable: true,
            configurable: true
        });
        this.controlsMap[typeName] = metadata;
        this.controlsMap[typeName].info = extend(true, [], metadata.info);
    }
    _getPropertyInfoByDisplayName(info, path, position) {
        return info.filter((x) => getLocalization(x.displayName, x.localizationId) === path[position])[0];
    }
    _getPropertyInfoByName(info, path, position) {
        return info.filter((x) => x.propertyName === path[position] || x.modelName === '@' + path[position] || x.modelName === path[position])[0];
    }
    _getPropertyInfo(info, path, position) {
        const propertyInfo = this._getPropertyInfoByDisplayName(info, path, position) || this._getPropertyInfoByName(info, path, position);
        if (position === path.length - 1) {
            return propertyInfo || null;
        }
        else {
            if (propertyInfo.info) {
                return this._getPropertyInfo(propertyInfo.info, path, position + 1);
            }
            else if (propertyInfo.from) {
                let object = null;
                try {
                    object = propertyInfo.from({});
                }
                catch (e) {
                    return null;
                }
                const newInfo = object.getInfo && object.getInfo();
                if (newInfo) {
                    return this._getPropertyInfo(newInfo, path, position + 1);
                }
            }
        }
        return null;
    }
    getPropertyInfo(controlType, path) {
        let properties = path;
        if (!$.isArray(path)) {
            properties = path.split('.');
        }
        return this._getPropertyInfo(this.controlsMap[controlType].info, properties, 0);
    }
}
