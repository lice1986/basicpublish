﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { XRTableControlViewModel } from '../controls/xrTable';
import { XRTableCellViewModel } from '../controls/xrTableCell';
import { XRTableRowViewModel } from '../controls/xrTableRow';
import { IComponentAddedEventArgs } from '../utils/inititalizer';
import { TableRowActions } from './tableRowActions';
export declare class TableCellActions extends TableRowActions {
    get _cell(): XRTableCellViewModel;
    get _row(): XRTableRowViewModel;
    get _table(): XRTableControlViewModel;
    private get _cellSurface();
    constructor(selection: ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
    insertCell(): void;
    deleteCell(): void;
    deleteRow(): void;
    insertColumn(isRight: boolean): void;
    deleteColumn(): void;
    condition(context: any): boolean;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}