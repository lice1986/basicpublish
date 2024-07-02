﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\sortingOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { sortingOptionsSerializationsInfo } from '../metadata/properties/sortingOptions';
export class SortingOptions extends Disposable {
    constructor(model, report, serializer) {
        super();
        this._info = $.extend(true, [], sortingOptionsSerializationsInfo);
        this._fieldNameInfo = this._info.filter((info) => { return info.propertyName == 'fieldName'; })[0];
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model || {});
        Object.defineProperty(this._fieldNameInfo, 'valuesArray', {
            get: () => {
                let items = [];
                const currentBand = this.targetBand && this.targetBand();
                if (currentBand) {
                    items = this._getFieldNames(currentBand).map(fieldName => { return { value: fieldName, displayValue: fieldName }; });
                }
                return items;
            }
        });
        const _fieldName = this.fieldName;
        this._disposables.push(this.fieldName = ko.computed({
            read: () => {
                const value = _fieldName();
                return this._getFieldNames(this.targetBand()).indexOf(value) === -1 ? '' : value;
            },
            write: (newValue) => {
                _fieldName(newValue);
            }
        }));
    }
    _getFieldNames(targetBand) {
        const fieldArray = targetBand && (targetBand['sortFields'] || targetBand['groupFields']);
        return fieldArray ? fieldArray().map(item => item.fieldName()).filter(name => !!name) : [];
    }
    getInfo() {
        return this._info;
    }
    isPropertyDisabled(name) {
        return name == 'fieldName' && !this.targetBand();
    }
    resetValue() {
        this.targetBand(null);
        this.fieldName('');
    }
    getPath(propertyName) {
        return this.targetBand() && this.targetBand().getPath('groupFields') || '';
    }
}
