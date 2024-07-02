﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_dataMemberBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class DataMemberBase extends Disposable {
    constructor(value, valueScaleType) {
        super();
        this._separator = ';';
        this._assignValueDataMembers(this, value);
        if (valueScaleType) {
            this.valueScaleType = valueScaleType;
            this._disposables.push(this.valueScaleType.subscribe((newVal) => {
                this._assignValueDataMembers(this, '');
            }));
        }
    }
    _assignValueDataMembers(valueDataMember, value) {
        const values = (value || '').split(this._separator);
        valueDataMember.arrayValueDataMemberNames.forEach((name, index) => {
            if (valueDataMember[name])
                valueDataMember[name](values[index] || '');
            else
                valueDataMember[name] = ko.observable(values[index] || '');
        });
    }
    _valueDataMembersToString(valueDataMember) {
        const result = [];
        valueDataMember.arrayValueDataMemberNames.forEach(name => {
            result.push(valueDataMember[name]() || '');
        });
        return result.join(this._separator);
    }
    toString() {
        let shouldSerialize = false;
        this.arrayValueDataMemberNames.forEach(name => {
            shouldSerialize = shouldSerialize || this[name]();
        });
        return shouldSerialize ? this._valueDataMembersToString(this) : null;
    }
    get arrayValueDataMemberNames() { return []; }
}