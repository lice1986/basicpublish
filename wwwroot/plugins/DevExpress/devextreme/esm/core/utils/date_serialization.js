/**
 * DevExtreme (esm/core/utils/date_serialization.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import config from "../config";
import {
    getFormatter as getLDMLFormatter
} from "../../localization/ldml/date.formatter";
import defaultDateNames from "../../localization/default_date_names";
import {
    isString,
    isDate,
    isNumeric as isNumber
} from "./type";
var NUMBER_SERIALIZATION_FORMAT = "number";
var DATE_SERIALIZATION_FORMAT = "yyyy/MM/dd";
var DATETIME_SERIALIZATION_FORMAT = "yyyy/MM/dd HH:mm:ss";
var ISO8601_PATTERN = /^(\d{4,})(-)?(\d{2})(-)?(\d{2})(?:T(\d{2})(:)?(\d{2})?(:)?(\d{2}(?:\.(\d{1,3})\d*)?)?)?(Z|([+-])(\d{2})(:)?(\d{2})?)?$/;
var ISO8601_TIME_PATTERN = /^(\d{2}):(\d{2})(:(\d{2}))?$/;
var ISO8601_PATTERN_PARTS = ["", "yyyy", "", "MM", "", "dd", "THH", "", "mm", "", "ss", ".SSS"];
var DATE_SERIALIZATION_PATTERN = /^(\d{4})\/(\d{2})\/(\d{2})$/;
var MILLISECOND_LENGHT = 3;
var dateParser = function(text, skipISO8601Parsing) {
    var result;
    if (isString(text) && !skipISO8601Parsing) {
        result = parseISO8601String(text)
    }
    return result || parseDate(text)
};

function getTimePart(part) {
    return +part || 0
}

function parseDate(text) {
    var isDefaultSerializationFormat = getDateSerializationFormat(text) === DATE_SERIALIZATION_FORMAT;
    var parsedValue = !isDate(text) && Date.parse(text);
    if (!parsedValue && isDefaultSerializationFormat) {
        var parts = text.match(DATE_SERIALIZATION_PATTERN);
        if (parts) {
            var newDate = new Date(getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[3]));
            newDate.setFullYear(getTimePart(parts[1]));
            newDate.setMonth(getTimePart(parts[2]) - 1);
            newDate.setDate(getTimePart(parts[3]));
            return newDate
        }
    }
    return isNumber(parsedValue) ? new Date(parsedValue) : text
}

function parseISO8601String(text) {
    var parts = text.match(ISO8601_PATTERN);
    if (!parts) {
        parts = text.match(ISO8601_TIME_PATTERN);
        if (parts) {
            return new Date(0, 0, 0, getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[4]))
        }
        return
    }
    var year = getTimePart(parts[1]);
    var month = --parts[3];
    var day = parts[5];
    var timeZoneHour = 0;
    var timeZoneMinute = 0;
    var correctYear = d => {
        year < 100 && d.setFullYear(year);
        return d
    };
    timeZoneHour = getTimePart(parts[14]);
    timeZoneMinute = getTimePart(parts[16]);
    if ("-" === parts[13]) {
        timeZoneHour = -timeZoneHour;
        timeZoneMinute = -timeZoneMinute
    }
    var hour = getTimePart(parts[6]) - timeZoneHour;
    var minute = getTimePart(parts[8]) - timeZoneMinute;
    var second = getTimePart(parts[10]);
    var millisecond = function(part) {
        part = part || "";
        return getTimePart(part) * Math.pow(10, MILLISECOND_LENGHT - part.length)
    }(parts[11]);
    if (parts[12]) {
        return correctYear(new Date(Date.UTC(year, month, day, hour, minute, second, millisecond)))
    }
    return correctYear(new Date(year, month, day, hour, minute, second, millisecond))
}
var getIso8601Format = function(text, useUtc) {
    var parts = text.match(ISO8601_PATTERN);
    var result = "";
    if (!parts) {
        parts = text.match(ISO8601_TIME_PATTERN);
        if (parts) {
            return parts[3] ? "HH:mm:ss" : "HH:mm"
        }
        return
    }
    for (var i = 1; i < ISO8601_PATTERN_PARTS.length; i++) {
        if (parts[i]) {
            result += ISO8601_PATTERN_PARTS[i] || parts[i]
        }
    }
    if ("Z" === parts[12]) {
        result += "'Z'"
    }
    if (parts[14]) {
        if (parts[15]) {
            result += "xxx"
        } else if (parts[16]) {
            result += "xx"
        } else {
            result += "x"
        }
    }
    return result
};
var deserializeDate = function(value) {
    if ("number" === typeof value) {
        return new Date(value)
    }
    return dateParser(value, !config().forceIsoDateParsing)
};
var serializeDate = function(value, serializationFormat) {
    if (!serializationFormat) {
        return value
    }
    if (!isDate(value)) {
        return null
    }
    if (serializationFormat === NUMBER_SERIALIZATION_FORMAT) {
        return value && value.valueOf ? value.valueOf() : null
    }
    return getLDMLFormatter(serializationFormat, defaultDateNames)(value)
};
var getDateSerializationFormat = function(value) {
    if ("number" === typeof value) {
        return NUMBER_SERIALIZATION_FORMAT
    } else if (isString(value)) {
        var format;
        if (config().forceIsoDateParsing) {
            format = getIso8601Format(value)
        }
        if (format) {
            return format
        } else if (value.indexOf(":") >= 0) {
            return DATETIME_SERIALIZATION_FORMAT
        } else {
            return DATE_SERIALIZATION_FORMAT
        }
    } else if (value) {
        return null
    }
};
export default {
    dateParser: dateParser,
    deserializeDate: deserializeDate,
    serializeDate: serializeDate,
    getDateSerializationFormat: getDateSerializationFormat
};
