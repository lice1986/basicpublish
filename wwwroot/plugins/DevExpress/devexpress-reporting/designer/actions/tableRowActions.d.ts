﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableRowActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { XRTableControlViewModel } from '../controls/xrTable';
import { XRTableRowViewModel } from '../controls/xrTableRow';
import { IComponentAddedEventArgs } from '../utils/inititalizer';
export declare class TableRowActions extends BaseActionsProvider {
    selection: ISelectionProvider;
    get _row(): XRTableRowViewModel;
    get _table(): XRTableControlViewModel;
    isDisabled(): boolean;
    constructor(selection: ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
    insertRowAbove(): void;
    insertRowBelow(): void;
    deleteRow(): void;
    condition(context: any): boolean;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
