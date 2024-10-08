﻿/**
* DevExpress Analytics (core\internal\_scrollProcessor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
export declare class dxScrollProcessor extends Disposable {
    private _container;
    private _updateTime;
    dispose(): void;
    private _currentOffsetY;
    private _currentOffsetX;
    private _scroll;
    private _updateInterval;
    private _startUpdateScrollPosition;
    private _calculateOffset;
    constructor(_container: Element, _updateTime?: number);
    getScrollOffset(): any;
    processOffset(screenPosition: {
        x: number;
        y: number;
    }): void;
}
