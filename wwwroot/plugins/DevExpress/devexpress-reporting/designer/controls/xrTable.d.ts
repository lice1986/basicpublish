﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IElementViewModel, ISurfaceContext, Point, Size } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider, IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { TableCalculationProvider } from './utils/_tableCalculationProvider';
import { XRControlSurfaceBase, XRControlViewModel } from './xrControl';
import { XRTableCellSurface, XRTableCellViewModel } from './xrTableCell';
import { XRTableRowSurface, XRTableRowViewModel } from './xrTableRow';
export declare class XRTableControlViewModel extends XRControlViewModel {
    private _getAdjacentCells;
    dispose(): void;
    constructor(control: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    updateRowLocation(row: XRTableRowViewModel, deltaHeight: number): void;
    addChild(control: IElementViewModel, position?: number, onComponentAdded?: any): void;
    insertRow(selectedRow: XRTableRowViewModel, isRowAbove: boolean, onComponentAdded: any): void;
    removeChild(selectedRow: XRTableRowViewModel): void;
    insertColumn(selectedCell: XRTableCellViewModel, isRight: boolean, onComponentAdded: any): void;
    addColumnToCalculation(diff: number, last?: boolean): void;
    tableCalculationProvider: TableCalculationProvider;
    rows: ko.ObservableArray<XRTableRowViewModel>;
    rowsTotalWeight: ko.Computed<number>;
    pixelHeightWeight: ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    size: Size;
    location: Point;
    surface: XRTableSurface;
}
export declare class XRTableSurface extends XRControlSurfaceBase<XRTableControlViewModel> {
    private _isUpdating;
    static _unitProperties: IUnitProperties<XRTableControlViewModel>;
    _getChildrenHolderName(): string;
    dispose(): void;
    constructor(control: XRTableControlViewModel, context: ISurfaceContext);
    private _isCellInColumn;
    selectColumn(selection: ISelectionProvider, cellSurface: XRTableCellSurface): void;
    isThereIntersectionWithChildCollection(): boolean;
    rows: ko.ObservableArray<XRTableRowSurface>;
}