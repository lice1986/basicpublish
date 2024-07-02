﻿/**
* DevExpress Analytics (core\snapLines\_snapLineSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface ISnapLine {
    position: number;
    limitInf: number;
    limSup: number;
}
export declare class SnapLineSurface {
    private static _blankPosition;
    private _position;
    transform(): string;
    updatePosition(position: {
        top: number;
        left: number;
        width: number;
        height: number;
    }): void;
    reset(): void;
}
