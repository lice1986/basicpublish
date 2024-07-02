﻿/**
* DevExpress HTML/JS Reporting (chart\_dateUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseDate as analyticParseDate } from '@devexpress/analytics-core/analytics-internal';
import { serializeDate as _aSerializeDate } from '@devexpress/analytics-core/analytics-utils';
export function parseDate(val) {
    if (!val)
        return null;
    if (val instanceof Date)
        return val;
    const chartDateParts = val.split('.');
    const date = analyticParseDate(chartDateParts[0]);
    if ((chartDateParts.length > 1) && date && (chartDateParts[1].length === 3)) {
        const milliseconds = parseInt(chartDateParts[1]);
        milliseconds && date.setMilliseconds(milliseconds);
    }
    return date;
}
export function serializeDate(date) {
    const milliseconds = date.getMilliseconds().toString();
    let zeros;
    switch (3 - milliseconds.length) {
        case 2:
            zeros = '00';
            break;
        case 1:
            zeros = '0';
            break;
        default:
            zeros = '';
    }
    return _aSerializeDate(date) + '.' + zeros + milliseconds;
}
