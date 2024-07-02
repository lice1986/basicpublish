﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellGroupActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { XRTableCellViewModel } from '../controls/xrTableCell';
export declare class TableCellGroupActions extends BaseActionsProvider {
    private _selectionProvider;
    private _distributeColumnsAction;
    private _distributeRowsAction;
    constructor(selectionProvider: ISelectionProvider);
    _distributeColumns(): void;
    _distributeRows(): void;
    _calculateMinimalHeight(cell: XRTableCellViewModel): number;
    _calculateTextHeight(cell: XRTableCellViewModel): number;
    _calculateBordersHeight(cell: XRTableCellViewModel): number;
    _isCellTextControl(cell: XRTableCellViewModel): boolean;
    _calculatePaddingsHeight(cell: XRTableCellViewModel): number;
    _calculatePaddingsWidth(cell: XRTableCellViewModel): number;
    _selectedCells(): any[];
    condition(context: any): boolean;
}
