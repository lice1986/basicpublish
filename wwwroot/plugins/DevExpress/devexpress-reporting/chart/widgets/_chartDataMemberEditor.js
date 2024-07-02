﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataMemberEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
export class ChartDataMemberEditor extends FieldListEditor {
    _isNumber(specifics) {
        return specifics.indexOf('integer') !== -1 || specifics.indexOf('float') !== -1;
    }
    _isDate(specifics) { return specifics.indexOf('date') !== -1; }
    _getArgumentDataMemberFilter(item) {
        const model = this._get('_model');
        const scaleType = model && model['argumentScaleType']();
        const itemSpecifics = item.specifics.toLowerCase();
        if (scaleType === 'Numerical') {
            return this._isNumber(itemSpecifics);
        }
        else if (scaleType === 'DateTime') {
            return this._isDate(itemSpecifics);
        }
        else {
            return true;
        }
    }
    _getValueDataMemberFilter(item) {
        const itemSpecifics = item.specifics.toLowerCase();
        if (this.name === 'weight') {
            return this._isNumber(itemSpecifics);
        }
        else {
            const model = this._get('_model');
            const scaleType = model && model['valueScaleType']();
            if (scaleType === 'Numerical') {
                return this._isNumber(itemSpecifics);
            }
            else {
                return this._isDate(itemSpecifics);
            }
        }
    }
    constructor(info, level, parentDisabled) {
        super(info, level, parentDisabled);
        this.treeListController.itemsFilter = (item) => {
            if (item.isList)
                return true;
            if (this.name === 'argumentDataMember') {
                return this._getArgumentDataMemberFilter(item);
            }
            else {
                return this._getValueDataMemberFilter(item);
            }
        };
    }
}