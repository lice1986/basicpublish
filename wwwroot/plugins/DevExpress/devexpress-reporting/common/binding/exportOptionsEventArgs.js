﻿/**
* DevExpress HTML/JS Reporting (common\binding\exportOptionsEventArgs.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { koUtils } from '@devexpress/analytics-core/analytics-internal-native';
export class CustomizeExportOptionsEventArgs {
    constructor(options) {
        this._options = options;
    }
    HideExportOptionsPanel() { this._options.panelVisible = false; }
    HideFormat(format) { delete this._options.exportOptions[format.propertyName || format.format]; }
    HideProperties(format, ...paths) {
        const patchPropName = (propName, obj) => {
            const info = obj.getInfo && obj.getInfo();
            if (info) {
                const p = info.filter(x => x.modelName === propName || x.modelName === '@' + propName)[0];
                if (p)
                    return p.propertyName;
            }
            return propName;
        };
        const addPredicate = (obj, propName) => {
            propName = patchPropName(propName, obj);
            const oldPredicate = obj.isPropertyVisible;
            obj.isPropertyVisible =
                oldPredicate
                    ? ((x) => oldPredicate(x) && x !== propName)
                    : ((x) => x !== propName);
        };
        if (paths.length == 0) {
            addPredicate(this._options.exportOptions, format.format);
        }
        else {
            paths.forEach(property => {
                const path = Array.isArray(property)
                    ? property
                    : property.split('.');
                let obj = this._options.exportOptions[format.format];
                while (path.length > 1) {
                    obj = koUtils.unwrap(obj[patchPropName(path[0], obj)]);
                    path.splice(0, 1);
                }
                addPredicate(obj, path[0]);
            });
        }
    }
    GetExportOptionsModel(format) { return this._options.exportOptions[format.format]; }
}