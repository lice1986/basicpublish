﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\sortBySummary.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { find } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { sortBySummaryConditionInfo, sortBySummaryInfo } from '../metadata/pivotgrid/sortBySummary';
export class SortBySummaryInfoCondition {
    constructor(model, fieldsProvider, serializer) {
        this._fieldsProvider = fieldsProvider;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        const fields = this._fieldsProvider.fieldsAvailableForCondition();
        if (fields.length < 1) {
            return sortBySummaryConditionInfo;
        }
        const conditionInfoClone = sortBySummaryConditionInfo.slice(0), fieldComponentName = find(sortBySummaryConditionInfo, item => item.modelName === '@FieldComponentName'), fieldComponentNameClone = $.extend(true, {}, fieldComponentName);
        fields.forEach(fieldName => { fieldComponentNameClone.valuesArray.push({ value: fieldName, displayValue: fieldName }); });
        conditionInfoClone.splice(conditionInfoClone.indexOf(fieldComponentName), 1, fieldComponentNameClone);
        return conditionInfoClone;
    }
    static createNew(parent, serializer) {
        return new SortBySummaryInfoCondition({}, parent, serializer);
    }
}
export class SortBySummaryInfo {
    constructor(model, field, serializer) {
        this._field = field;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model, sortBySummaryInfo);
        this.conditions = deserializeArray(model['Conditions'] || {}, item => new SortBySummaryInfoCondition(item, this, serializer));
    }
    _pivotGridFields() {
        return this._field.parentModel().fields;
    }
    getInfo() {
        const fields = this._pivotGridFields();
        if (!fields) {
            return sortBySummaryInfo;
        }
        const sortBySummaryInfoClone = sortBySummaryInfo.slice(0), fieldComponentName = find(sortBySummaryInfo, item => item.modelName === '@FieldComponentName'), fieldComponentNameClone = $.extend(true, {}, fieldComponentName);
        fields().forEach(field => {
            if (field.name() !== this._field.name()) {
                fieldComponentNameClone.valuesArray.push({ value: field.name(), displayValue: field.name() });
            }
        });
        sortBySummaryInfoClone.splice(sortBySummaryInfo.indexOf(fieldComponentName), 1, fieldComponentNameClone);
        return sortBySummaryInfoClone;
    }
    fieldsAvailableForCondition() {
        const fields = this._pivotGridFields();
        if (!fields) {
            return [];
        }
        const result = [];
        fields().forEach(field => {
            const condition = find(this.conditions(), item => item.fieldComponentName() === field.name());
            if (!condition) {
                result.push(field.name());
            }
        });
        return result;
    }
    static from(model, serializer) {
        return model;
    }
    static toJSON(viewModel, serializer, refs) {
        return (serializer || new ModelSerializer()).serialize(viewModel, sortBySummaryInfo, refs);
    }
}
