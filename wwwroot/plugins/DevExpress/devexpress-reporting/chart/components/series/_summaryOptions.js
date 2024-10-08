﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_summaryOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { dateTimeSummaryOptionsSerializationInfoArray, numericSummaryOptionsSerializationInfoArray, summaryOptionsSerializationInfoArray } from './_summaryOptionsMetaData';
export class SummaryOptionsModelBase {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model || {});
    }
    getInfo() {
        return summaryOptionsSerializationInfoArray;
    }
    resetAllProperties() {
        this.getInfo().forEach(info => {
            if ('defaultVal' in info) {
                this[info.propertyName](info.defaultVal);
            }
            else if (info.propertyName === 'summaryFunction') {
                this.summaryFunction.functionName(null);
                this.summaryFunction.args([]);
            }
            else {
                this[info.propertyName](null);
            }
        });
    }
}
export class QualitativeSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model, serializer) {
        return new QualitativeSummaryOptionsModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, summaryOptionsSerializationInfoArray, refs);
    }
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
}
export class NumericSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model, serializer) {
        return new NumericSummaryOptionsModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, numericSummaryOptionsSerializationInfoArray, refs);
    }
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
    getInfo() {
        return numericSummaryOptionsSerializationInfoArray;
    }
}
export class DateTimeSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model, serializer) {
        return new DateTimeSummaryOptionsModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, dateTimeSummaryOptionsSerializationInfoArray, refs);
    }
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
    getInfo() {
        return dateTimeSummaryOptionsSerializationInfoArray;
    }
}
