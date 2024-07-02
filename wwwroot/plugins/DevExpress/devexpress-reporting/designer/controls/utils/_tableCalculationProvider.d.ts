﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableCalculationProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTableControlViewModel } from '../xrTable';
export interface ITableCalculationNode {
    column: number;
    row: number;
    calc: () => void;
}
export declare class TableCalculationProvider {
    private _table;
    private _tableOffset;
    private _calculationStarted;
    private _calculationTimeout;
    private _calculationNodes;
    private _resetState;
    private _startCalculation;
    constructor(_table: XRTableControlViewModel);
    addTableOffset(width: any, left: any): void;
    addCalculationNode(node: ITableCalculationNode): void;
    hasCalculationNode(rowIndex: number, cellIndex: number): boolean;
}