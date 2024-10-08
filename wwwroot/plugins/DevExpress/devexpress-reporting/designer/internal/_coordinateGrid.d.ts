﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_coordinateGrid.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MeasureUnit } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class CoordinateGridViewModel extends Disposable {
    _initGrid(length: number, gridSize: number, gridLines: ko.ObservableArray<any>, flip?: boolean): void;
    constructor(options: {
        height: ko.Observable<number> | ko.Computed<number>;
        width: ko.Observable<number> | ko.Computed<number>;
        snapGridSize: ko.Observable<number> | ko.Computed<number>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>;
        flip?: ko.Observable<boolean> | ko.Computed<boolean>;
    });
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    verticalGridLines: ko.ObservableArray<any>;
    horizontalGridLines: ko.ObservableArray<any>;
    majorVerticalGridLines: ko.ObservableArray<any>;
    majorHorizontalGridLines: ko.ObservableArray<any>;
    dispose(): void;
}
