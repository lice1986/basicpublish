﻿/**
* DevExpress Analytics (query-builder\elements\querySurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { QueryViewModel, QueryViewModelBase } from './queryModel';
import { ISelectionTarget } from '../../core/selection/_selection';
import { IUnitProperties } from '../../core/utils/_units';
import { TableSurface } from './tableSurface';
import { RelationSurface } from './relationSurface';
import { IHoverInfo } from '../../core/internal/_hoverInfo';
import { IMargins } from '../../core/elements/margins';
import { ColumnSurface } from './columnSurface';
import { MeasureUnit } from '../../core/internal/_papperKindMapper';
export declare class QuerySurface extends SurfaceElementBase<QueryViewModelBase> implements ISelectionTarget, ISurfaceContext {
    static _unitProperties: IUnitProperties<QueryViewModel>;
    private _joinedColumns;
    constructor(query: QueryViewModelBase, zoom?: ko.Observable<number>);
    measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>;
    dpi: ko.Observable<number> | ko.Computed<number>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    placeholder: () => any;
    tables: ko.ObservableArray<TableSurface>;
    relations: ko.ObservableArray<RelationSurface>;
    allowMultiselect: boolean;
    focused: ko.Observable<boolean>;
    selected: ko.Observable<boolean>;
    underCursor: ko.Observable<IHoverInfo>;
    checkParent(surfaceParent: ISelectionTarget): boolean;
    pageWidth: ko.Observable<number> | ko.Computed<number>;
    templateName: string;
    getChildrenCollection(): ko.ObservableArray<TableSurface>;
    margins: IMargins;
    rtl: ko.Observable<boolean>;
    isJoined(column: ColumnSurface): boolean;
}