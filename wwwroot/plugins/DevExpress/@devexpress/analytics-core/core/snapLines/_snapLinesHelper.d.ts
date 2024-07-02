﻿/**
* DevExpress Analytics (core\snapLines\_snapLinesHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISurfaceContext } from '../elements/baseSurface';
import { SnapLinesCollector } from './_snapLinesCollector';
import { ISnapLine, SnapLineSurface } from './_snapLineSurface';
export declare class SnapLinesHelper {
    static snapTolerance: number;
    private _snapTolerance;
    private _surfaceContext;
    private _snapLinesCollector;
    private _findClosestSnapLine;
    _getActiveSnapLines(position1: number, position2: number, snapLines: ISnapLine[]): {
        lines: any[];
        distance: number;
    };
    constructor(surface?: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, snapTolerance?: number, snapLinesCollector?: SnapLinesCollector);
    updateSnapLines(snapTargetToIgnore?: any): void;
    deactivateSnapLines(): void;
    activateSnapLines(position: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }): {
        left: number;
        top: number;
    };
    snapPosition(position: number, horizontal: boolean): number;
    snapLineSurfaces: SnapLineSurface[];
    verticalSnapLines: ISnapLine[];
    horizontalSnapLines: ISnapLine[];
}