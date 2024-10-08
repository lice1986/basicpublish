﻿/**
* DevExpress Analytics (diagram\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IConnectingPoint } from './elements/connectingPointModel';
export declare enum PointSide {
    East = 0,
    South = 1,
    North = 2,
    West = 3
}
export declare const GRID_SIZE = 10;
export declare function determineConnectingPoints<T extends {
    rightConnectionPoint: IConnectingPoint;
    leftConnectionPoint: IConnectingPoint;
}>(startObject: T, endObject: T): {
    start: IConnectingPoint;
    end: IConnectingPoint;
};
