﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_point.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { formatDate, parseDate as AnalitycsParseDate } from '@devexpress/analytics-core/analytics-internal';
import { colorFromString, colorToString, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { argumentSerializable } from '../../internal/meta/_common';
import { parseDate, serializeDate } from '../../_dateUtils';
export class SeriesPointModel extends SerializableModel {
    constructor(model, series, serializer) {
        super(model, serializer, seriesPointSerializationsInfo);
        this.series = series;
        this.arrayValueDataMemberNames = series.valueDataMembers().arrayValueDataMemberNames;
        this._assignValueDataMembers(this, this.valuesSerializable(), null);
        this._disposables.push(this.series.valueDataMembers.subscribe((newValue) => { this.arrayValueDataMemberNames = newValue.arrayValueDataMemberNames; }));
        this._disposables.push(this.series.valueScaleType.subscribe((newValue) => {
            this._assignValueDataMembers(this, null, null);
        }));
        this.valuesSerializable = ko.computed(() => {
            return this.arrayValueDataMemberNames.map(name => this[name]);
        });
        this.argumentSerializableInfo = ko.computed(() => {
            const argumentScaleType = series.argumentScaleType();
            let editor = editorTemplates.getEditor('text');
            if (argumentScaleType === 'Numerical') {
                editor = editorTemplates.getEditor('numeric');
            }
            else if (argumentScaleType === 'DateTime') {
                editor = editorTemplates.getEditor('date');
            }
            return $.extend(true, {}, argumentSerializable, { editor: editor });
        });
        this.getInfo = () => {
            const dataMember = this.series && this.series.valueDataMembers();
            if (!dataMember)
                return seriesPointSerializationsInfo;
            const valueDataMemberInfo = dataMember.getInfo().map(info => $.extend({}, info, { editor: this.isDateType ? editorTemplates.getEditor('date') : editorTemplates.getEditor('numeric') }));
            const info = $.extend(true, [], seriesPointSerializationsInfo);
            info.splice(info.indexOf(info.filter((prop) => { return prop.propertyName === 'argumentSerializable'; })[0]), 1, this.argumentSerializableInfo());
            return info.concat(valueDataMemberInfo);
        };
    }
    static getSerializationValue(array, dateConverter) {
        return array.map((item) => {
            const value = ko.unwrap(item);
            return (value instanceof Date) ? dateConverter(value) : value;
        });
    }
    static createNew(series) {
        return new SeriesPointModel(SeriesPointModel.getPointModelBySeries(series), series, new ModelSerializer());
    }
    static getPointModelBySeries(series) {
        let value = SeriesPointModel.getDefaultValueByScaleType(series.valueScaleType());
        value = (value instanceof Date) ? formatDate(value) : value.toString();
        for (let ind = 1; ind < series.valueDataMembers().arrayValueDataMemberNames.length; ind++) {
            value += (SeriesPointModel.separator + value);
        }
        const newModel = {
            '@ValuesSerializable': value
        };
        const argument = SeriesPointModel.getDefaultValueByScaleType(series.argumentScaleType());
        if (argument !== null && argument !== void 0) {
            newModel['@ArgumentSerializable'] = argument;
        }
        return newModel;
    }
    static getDefaultValueByScaleType(scaleType) {
        if (scaleType === 'Numerical') {
            return 0;
        }
        else if (scaleType === 'DateTime') {
            return new Date(new Date().setHours(0, 0, 0, 0));
        }
        return null;
    }
    static valueToJsonObject(value) {
        const result = SeriesPointModel.getSerializationValue(value, serializeDate);
        return (result instanceof Array) ? result.join(SeriesPointModel.separator) : result;
    }
    _valueDataMembersToString(valueDataMember, isDateType) {
        const result = [];
        valueDataMember.arrayValueDataMemberNames.forEach(name => {
            if (isDateType)
                result.push(serializeDate(valueDataMember[name]() || ''));
            result.push(valueDataMember[name]() || '');
        });
        return result.join(SeriesPointModel.separator);
    }
    _assignValueDataMembers(valueDataMember, value, defaultValue) {
        const values = (value || '').split(SeriesPointModel.separator);
        valueDataMember.arrayValueDataMemberNames.forEach((name, index) => {
            let newValue;
            if (this.isDateType && values[index]) {
                newValue = AnalitycsParseDate(values[index] || defaultValue, false, 'MM/dd/yyyy');
                if (!newValue)
                    newValue = parseDate(values[index] || defaultValue);
            }
            else {
                newValue = (values[index] || defaultValue);
            }
            if (valueDataMember[name])
                valueDataMember[name](newValue);
            else
                valueDataMember[name] = ko.observable(newValue);
        });
    }
    get isDateType() {
        return this.series.valueScaleType() === 'DateTime';
    }
}
SeriesPointModel.separator = ';';
export const valuesSerializable = { propertyName: 'valuesSerializable', modelName: '@ValuesSerializable', from: (val) => { return ko.observable(val); }, toJsonObject: SeriesPointModel.valueToJsonObject }, colorSerializable = { propertyName: 'colorSerializable', modelName: '@ColorSerializable', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.SeriesPoint.Color', from: colorFromString, toJsonObject: colorToString, editor: editorTemplates.getEditor('customColorEditor') };
export const seriesPointSerializationsInfo = [argumentSerializable, valuesSerializable, colorSerializable];
