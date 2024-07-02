﻿/**
* DevExpress Analytics (diagram\utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export var PointSide;
(function (PointSide) {
    PointSide[PointSide["East"] = 0] = "East";
    PointSide[PointSide["South"] = 1] = "South";
    PointSide[PointSide["North"] = 2] = "North";
    PointSide[PointSide["West"] = 3] = "West";
})(PointSide || (PointSide = {}));
export const GRID_SIZE = 10;
export function determineConnectingPoints(startObject, endObject) {
    const result = { start: null, end: null };
    if (endObject.leftConnectionPoint.location.x() > startObject.rightConnectionPoint.location.x() + GRID_SIZE * 2) {
        result.start = startObject.rightConnectionPoint;
        result.end = endObject.leftConnectionPoint;
    }
    else if (startObject.leftConnectionPoint.location.x() > endObject.rightConnectionPoint.location.x() + GRID_SIZE * 2) {
        result.start = startObject.leftConnectionPoint;
        result.end = endObject.rightConnectionPoint;
    }
    else {
        const startCenter = (startObject.rightConnectionPoint.location.x() + startObject.rightConnectionPoint.location.x()) / 2;
        const endCenter = (endObject.rightConnectionPoint.location.x() + endObject.rightConnectionPoint.location.x()) / 2;
        if (startCenter > endCenter) {
            result.start = startObject.rightConnectionPoint;
            result.end = endObject.rightConnectionPoint;
        }
        else {
            result.start = startObject.leftConnectionPoint;
            result.end = endObject.leftConnectionPoint;
        }
    }
    return result;
}
