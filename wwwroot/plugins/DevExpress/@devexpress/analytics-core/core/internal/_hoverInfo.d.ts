﻿/**
* DevExpress Analytics (core\internal\_hoverInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IHoverInfo {
    isOver: boolean;
    x: number;
    y: number;
    offsetX?: number;
    offsetY?: number;
    isNotDropTarget?: boolean;
}
export declare class HoverInfo implements IHoverInfo {
    private _x;
    private _y;
    isOver: boolean;
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
}
