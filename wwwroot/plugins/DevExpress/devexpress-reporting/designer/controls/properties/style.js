﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\style.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { styleSerializationInfo } from '../metadata/properties/style';
import { createPaddingProperty } from '../utils/_paddingUtils';
export class StyleModel extends Disposable {
    constructor(model, parent, serializer) {
        super();
        this.parent = parent;
        this.className = () => {
            return 'stylemodel';
        };
        this.controlType = 'XRStyleModel';
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        ['backColor', 'foreColor', 'borderColor'].forEach((propertyName) => {
            this._disposables.push(this[propertyName] = ko.pureComputed({
                read: () => { return this['_' + propertyName] && this['_' + propertyName](); },
                write: (val) => { this['_' + propertyName](val); }
            }));
        });
        createPaddingProperty(this, parent);
    }
    getInfo() {
        return styleSerializationInfo;
    }
    isPropertyModified(name) {
        const needName = this['_' + name] ? '_' + name : name;
        const property = ko.unwrap(this[needName]);
        if (property instanceof Object) {
            return !property.isEmpty();
        }
        else {
            return !!property;
        }
    }
    displayType() {
        return getLocalization('Control Style', 'DevExpress.XtraReports.UI.XRControlStyle');
    }
}
StyleModel.unitProperties = ['paddingObj'];
