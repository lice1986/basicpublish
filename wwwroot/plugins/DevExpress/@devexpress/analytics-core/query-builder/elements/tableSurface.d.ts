﻿/**
* DevExpress Analytics (query-builder\elements\tableSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseSurface } from './queryElementSurface';
import { TableViewModel } from './tableModel';
import { ISurfaceContext } from '../../core/elements/baseSurface';
import { ColumnSurface } from './columnSurface';
import { AllColumnsSurface } from './allColumnsSurface';
import { CodeResolver } from '../../property-grid/internal/_codeResolver';
export declare class TableSurface extends QueryElementBaseSurface<TableViewModel> {
    constructor(control: TableViewModel, context: ISurfaceContext);
    showSourceName: boolean;
    columnsAsyncResolver: CodeResolver;
    asterisk: AllColumnsSurface;
    columns: ko.Computed<ColumnSurface[]>;
    contenttemplate: string;
    titletemplate: string;
    template: string;
    isInitialized: ko.Computed<boolean>;
    toggleSelected: () => void;
    selectedWrapper: ko.PureComputed<boolean>;
    resizable(resizeHandler: any, element: any): any;
}
