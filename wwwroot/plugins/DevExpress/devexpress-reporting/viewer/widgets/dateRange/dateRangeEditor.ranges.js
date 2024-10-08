﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.ranges.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getLocalization } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseModel, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
class CSDateTime {
    constructor(_date = null) {
        this._date = _date;
    }
    static get today() {
        return new CSDateTime().now();
    }
    get date() {
        return this._date;
    }
    get day() {
        return this._date.getDay();
    }
    get month() {
        return this._date.getMonth();
    }
    get year() {
        return this._date.getFullYear();
    }
    addMonths(months) {
        return new CSDateTime(new Date(this._date.setMonth(CSDateTime.today.month + months)));
    }
    addDays(days) {
        const newDate = this.date.getDate() + days;
        return new CSDateTime(new Date(this._date.setDate(newDate)));
    }
    addHours(hours) {
        const newDate = this.date.getHours() + hours;
        return new CSDateTime(new Date(this._date.setHours(newDate)));
    }
    addYears(years) {
        return new CSDateTime(new Date(this._date.setFullYear(this._date.getFullYear() + years)));
    }
    now() {
        return new CSDateTime(new Date(new Date().setHours(0, 0, 0, 0)));
    }
}
function createRangeItem(displayName, localizationId, range) {
    const item = {
        displayName: getLocalization(displayName, localizationId),
        range: range
    };
    Object.defineProperty(item, 'displayName', {
        get: () => getLocalization(displayName, localizationId),
        configurable: true
    });
    return item;
}
const defaultRanges = [
    createRangeItem('Today', 'PreviewStringId.DateRangeParameterEditor_Today', () => [
        CSDateTime.today.date,
        CSDateTime.today.date
    ]),
    createRangeItem('Yesterday', 'PreviewStringId.DateRangeParameterEditor_Yesterday', () => [
        CSDateTime.today.addDays(-1).date,
        CSDateTime.today.addDays(-1).date
    ]),
    createRangeItem('Current Week', 'PreviewStringId.DateRangeParameterEditor_CurrentWeek', () => [
        CSDateTime.today.addDays(-CSDateTime.today.day).date,
        CSDateTime.today.addDays(-CSDateTime.today.day).addDays(6).date
    ]),
    createRangeItem('Last Week', 'PreviewStringId.DateRangeParameterEditor_LastWeek', () => [
        CSDateTime.today.addDays(-7).date,
        CSDateTime.today.date
    ]),
    createRangeItem('Previous Week', 'PreviewStringId.DateRangeParameterEditor_PreviousWeek', () => [
        CSDateTime.today.addDays(-CSDateTime.today.day - 7).date,
        CSDateTime.today.addDays(-CSDateTime.today.day - 1).date
    ]),
    createRangeItem('Current Month', 'PreviewStringId.DateRangeParameterEditor_CurrentMonth', () => [
        new Date(CSDateTime.today.year, CSDateTime.today.month, 1),
        new Date(CSDateTime.today.year, CSDateTime.today.month + 1, 0),
    ]),
    createRangeItem('Last Month', 'PreviewStringId.DateRangeParameterEditor_LastMonth', () => [
        CSDateTime.today.addMonths(-1).date,
        CSDateTime.today.date
    ]),
    createRangeItem('Previous Month', 'PreviewStringId.DateRangeParameterEditor_PreviousMonth', () => [
        new Date(CSDateTime.today.year, CSDateTime.today.month - 1, 1),
        new Date(CSDateTime.today.year, CSDateTime.today.month, 0),
    ]),
    createRangeItem('Current Quarter', 'PreviewStringId.DateRangeParameterEditor_CurrentQuarter', () => [
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3).date,
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3 + 3).date,
    ]),
    createRangeItem('Previous Quarter', 'PreviewStringId.DateRangeParameterEditor_PreviousQuarter', () => [
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3 - 3).date,
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3).date,
    ]),
    createRangeItem('Current Year', 'PreviewStringId.DateRangeParameterEditor_CurrentYear', () => [
        new Date(CSDateTime.today.year, 0, 1),
        new Date(CSDateTime.today.year, 11, 31),
    ]),
    createRangeItem('Last Year', 'PreviewStringId.DateRangeParameterEditor_LastYear', () => [
        CSDateTime.today.addYears(-1).date,
        CSDateTime.today.date
    ]),
    createRangeItem('Previous Year', 'PreviewStringId.DateRangeParameterEditor_PreviousYear', () => [
        new Date(CSDateTime.today.year - 1, 0, 1),
        new Date(CSDateTime.today.year - 1, 11, 31),
    ])
];
class PredefinedDateRangeModel extends BaseModel {
    onPropertyChanged(args) { }
}
__decorate([
    mutableArray(() => defaultRanges)
], PredefinedDateRangeModel.prototype, "ranges", void 0);
export const predefinedDateRangesModel = new PredefinedDateRangeModel();
export const predefinedDateRanges = predefinedDateRangesModel.ranges;
