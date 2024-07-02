﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookUpValue.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { lookUpValueSerializationInfo } from '../metadata/parameters/lookUpValue';
export class LookUpValue {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.value = ko.pureComputed({
            read: () => {
                return this._value() && this._value().content();
            },
            write: (newValue) => {
                this._value() && this._value().content(newValue);
            }
        });
    }
    static createNew() {
        return new LookUpValue({});
    }
    static from(model, serializer) {
        return new LookUpValue(model, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, lookUpValueSerializationInfo, refs);
    }
    getInfo() {
        if (this.valueInfo) {
            return lookUpValueSerializationInfo.concat(this.valueInfo());
        }
        return lookUpValueSerializationInfo;
    }
    get isEmpty() {
        return this._value() === null || this._value() === undefined;
    }
}
