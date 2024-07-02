/**
 * DevExtreme (esm/renovation/ui/scheduler/workspaces/utils.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    combineClasses
} from "../../../utils/combine_classes";
import {
    HORIZONTAL_GROUP_ORIENTATION,
    VERTICAL_GROUP_ORIENTATION
} from "../consts";
export var getKeyByDateAndGroup = (date, groupIndex) => {
    var key = date.getTime();
    if (!groupIndex) {
        return key.toString()
    }
    return (key + groupIndex).toString()
};
export var getKeyByGroup = (groupIndex, isVerticalGrouping) => {
    if (isVerticalGrouping && !!groupIndex) {
        return groupIndex.toString()
    }
    return "0"
};
export var addToStyles = (options, style) => {
    var nextStyle = null !== style && void 0 !== style ? style : {};
    var result = _extends({}, nextStyle);
    options.forEach(_ref => {
        var {
            attr: attr,
            value: value
        } = _ref;
        result[attr] = value || nextStyle[attr]
    });
    return result
};
export var addHeightToStyle = (value, style) => {
    var height = value ? "".concat(value, "px") : "";
    return addToStyles([{
        attr: "height",
        value: height
    }], style)
};
export var addWidthToStyle = (value, style) => {
    var width = value ? "".concat(value, "px") : "";
    return addToStyles([{
        attr: "width",
        value: width
    }], style)
};
export var getGroupCellClasses = function() {
    var isFirstGroupCell = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    var isLastGroupCell = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
    var className = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return combineClasses({
        "dx-scheduler-first-group-cell": isFirstGroupCell,
        "dx-scheduler-last-group-cell": isLastGroupCell,
        [className]: true
    })
};
export var getIsGroupedAllDayPanel = (hasAllDayRow, isVerticalGrouping) => hasAllDayRow && isVerticalGrouping;
export var isVerticalGroupingApplied = (groups, groupOrientation) => groupOrientation === VERTICAL_GROUP_ORIENTATION && !!groups.length;
export var isHorizontalGroupingApplied = (groups, groupOrientation) => groupOrientation === HORIZONTAL_GROUP_ORIENTATION && !!groups.length;
export var isGroupingByDate = (groups, groupOrientation, groupByDate) => {
    var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
    return groupByDate && isHorizontalGrouping
};