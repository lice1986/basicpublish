﻿/**
* DevExpress Analytics (query-builder\elements\columnSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { ColumnViewModel } from './columnModel';
import { QuerySurface } from './querySurface';
import { TableSurface } from './tableSurface';
export declare class ColumnSurface extends SurfaceElementBase<ColumnViewModel> {
    private _isJoined;
    private _isHovered;
    constructor(control: ColumnViewModel, context: ISurfaceContext);
    template: string;
    toggleSelected: () => void;
    selectedWrapper: ko.PureComputed<boolean>;
    isNotAvailable: ko.PureComputed<boolean>;
    isAggregate: ko.PureComputed<boolean>;
    isAscending: ko.PureComputed<boolean>;
    isDescending: ko.PureComputed<boolean>;
    cssClasses: (query: QuerySurface, columnDragHandler: {
        getDragColumn: () => ColumnViewModel;
    }, parent: TableSurface) => {
        'dxd-state-invalid': ko.PureComputed<boolean>;
        'dxd-state-active': boolean;
        'dxd-state-joined': ko.Computed<boolean>;
        'dxd-state-hovered': ko.Computed<boolean>;
    };
}
