﻿/**
* DevExpress Analytics (serializer\_date.utiles.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
function toStringWithDelimiter(values, delimiter) {
    return (values || []).map(value => {
        let str = value !== undefined && value !== null ? value.toString() : '00';
        if (str.length === 1) {
            str = '0' + str;
        }
        return str;
    }).join(delimiter);
}
export function serializeDate(date, dateDelimiter) {
    const datePart = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
    const timePart = toStringWithDelimiter([date.getHours(), date.getMinutes(), date.getSeconds()], ':');
    if (dateDelimiter === '-' || timePart === '00:00:00') {
        const datePartString = toStringWithDelimiter([datePart[2], datePart[0], datePart[1]], '-');
        return timePart === '00:00:00' ? datePartString : datePartString + ' ' + timePart;
    }
    return timePart === '00:00:00' ? toStringWithDelimiter([datePart[2], datePart[0], datePart[1]], '-')
        : toStringWithDelimiter(datePart, '/') + ' ' + timePart;
}
export function deserializeDate(dateTime) {
    const dateTimeParts = dateTime.split(' ');
    let dateArgs = dateTimeParts[0].split('-');
    let timeArgs = [0, 0, 0];
    if (dateTimeParts.length > 1) {
        if (dateArgs.length !== 3) {
            dateArgs = dateTimeParts[0].split('/');
            dateArgs.splice(0, 0, dateArgs.splice(2, 1)[0]);
        }
        timeArgs = dateTimeParts[1].split(':').map(x => parseInt(x));
        if (timeArgs.length !== 3)
            return null;
    }
    if (dateArgs.length !== 3)
        return null;
    dateArgs = dateArgs.map(x => parseInt(x));
    return new Date(dateArgs[0], dateArgs[1] - 1, dateArgs[2], timeArgs[0], timeArgs[1], timeArgs[2]);
}
