/**
 * DevExtreme (esm/__internal/scheduler/m_date_adapter.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dateUtils from "../../core/utils/date";
var toMs = dateUtils.dateToMilliseconds;
class DateAdapterCore {
    constructor(source) {
        this._source = new Date(source.getTime ? source.getTime() : source)
    }
    get source() {
        return this._source
    }
    result() {
        return this._source
    }
    getTimezoneOffset() {
        var format = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        var value = this._source.getTimezoneOffset();
        if ("minute" === format) {
            return value * toMs("minute")
        }
        return value
    }
    getTime() {
        return this._source.getTime()
    }
    setTime(value) {
        this._source.setTime(value);
        return this
    }
    addTime(value) {
        this._source.setTime(this._source.getTime() + value);
        return this
    }
    setMinutes(value) {
        this._source.setMinutes(value);
        return this
    }
    addMinutes(value) {
        this._source.setMinutes(this._source.getMinutes() + value);
        return this
    }
    subtractMinutes(value) {
        this._source.setMinutes(this._source.getMinutes() - value);
        return this
    }
}
var DateAdapter = date => new DateAdapterCore(date);
export default DateAdapter;
