﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableCell.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IArea, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider, ISelectionTarget, IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ContainerEditOptions } from './properties/editOptions';
import { TableActionDirection, TableComponentSurface } from './utils/_tableComponentSurface';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRTableRowViewModel } from './xrTableRow';
export declare class XRTableCellViewModel extends XRControlViewModel {
    static unitProperties: string[];
    constructor(model: any, parent: XRTableRowViewModel, serializer?: ModelSerializer);
    weight: ko.Observable<number> | ko.Computed<number>;
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    left: ko.Observable<number> | ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    surface: XRTableCellSurface;
    borders: ko.Observable<string> | ko.Computed<string>;
    parentModel: ko.Observable<XRTableRowViewModel>;
    textEditOptions: ContainerEditOptions;
}
export declare class XRTableCellSurface extends TableComponentSurface<XRTableCellViewModel> {
    private _row;
    private _table;
    private _cellIndex;
    private _rowIndex;
    private _getAdjacentCellByRowIndex;
    private _isShowBorder;
    static _unitProperties: IUnitProperties<XRTableCellViewModel>;
    dispose(): void;
    constructor(control: XRTableCellViewModel, context: ISurfaceContext);
    direction: TableActionDirection;
    controls: ko.ObservableArray<XRControlSurface>;
    x: ko.Observable<number> | ko.Computed<number>;
    rowSpan: ko.Computed<number>;
    heightWithRowSpan: () => number;
    offsetZIndex: () => number;
    selectColumn(selection: ISelectionProvider): void;
    checkParent(surfaceParent: ISelectionTarget): boolean;
    isThereIntersectionWithUsefulArea(): boolean;
    isThereIntersectionWithCrossBandControls(): boolean;
    isThereIntersectionWithNeighborsCollection(): boolean;
    isThereIntersectionWithParentCollection(): boolean;
    beforeRectUpdated(rect: IArea): IArea;
    canDrop(): boolean;
    getAdornTemplate(): string;
}
