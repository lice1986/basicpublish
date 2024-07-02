/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/filtering/getDatesWithoutTime.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dateUtils from "../../../../../core/utils/date";
var getDatesWithoutTime = (min, max) => {
    var newMin = dateUtils.trimTime(min);
    var newMax = dateUtils.trimTime(max);
    newMax.setDate(newMax.getDate() + 1);
    return [newMin, newMax]
};
export default getDatesWithoutTime;
