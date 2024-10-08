﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deleteSelection, getLocalization } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { XRTableCellSurface, XRTableCellViewModel } from '../controls/xrTableCell';
import { TableRowActions } from './tableRowActions';
export class TableCellActions extends TableRowActions {
    constructor(selection, onComponentAdded, isDisabled = () => false) {
        super(selection);
        super.initActions([
            {
                text: 'Row Above',
                group: () => getLocalization('Insert', 'ReportStringId.Cmd_TableInsert'),
                displayText: () => getLocalization('Row Above', 'ReportStringId.Cmd_TableInsertRowAbove'),
                imageClassName: 'dxrd-image-actions-insert_row_above',
                imageTemplateName: 'dxrd-svg-actions-insert_row_above',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertRowAbove(); },
            }, {
                text: 'Row Below',
                group: () => getLocalization('Insert', 'ReportStringId.Cmd_TableInsert'),
                displayText: () => getLocalization('Row Below', 'ReportStringId.Cmd_TableInsertRowBelow'),
                imageClassName: 'dxrd-image-actions-insert_row_below',
                imageTemplateName: 'dxrd-svg-actions-insert_row_below',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertRowBelow(); },
            },
            {
                text: 'Column To Left',
                group: () => getLocalization('Insert', 'ReportStringId.Cmd_TableInsert'),
                displayText: () => getLocalization('Column To Left', 'ReportStringId.Cmd_TableInsertColumnToLeft'),
                imageClassName: 'dxrd-image-actions-insert_column_to_left',
                imageTemplateName: 'dxrd-svg-actions-insert_column_to_left',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertColumn(false); },
            }, {
                text: 'Column To Right',
                group: () => getLocalization('Insert', 'ReportStringId.Cmd_TableInsert'),
                displayText: () => getLocalization('Column To Right', 'ReportStringId.Cmd_TableInsertColumnToRight'),
                imageClassName: 'dxrd-image-actions-insert_column_to_right',
                imageTemplateName: 'dxrd-svg-actions-insert_column_to_right',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertColumn(true); },
            }, {
                text: 'Cell',
                group: () => getLocalization('Insert', 'ReportStringId.Cmd_TableInsert'),
                displayText: () => getLocalization('Cell', 'ReportStringId.Cmd_TableInsertCell'),
                imageClassName: 'dxrd-image-actions-insert_cell',
                imageTemplateName: 'dxrd-svg-actions-insert_cell',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertCell(); },
            }, {
                text: 'Row',
                group: () => getLocalization('Delete', 'ReportStringId.Cmd_TableDelete'),
                displayText: () => getLocalization('Row', 'ReportStringId.Cmd_TableDeleteRow'),
                imageClassName: 'dxrd-image-actions-delete_row',
                imageTemplateName: 'dxrd-svg-actions-delete_row',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.deleteRow(); },
            }, {
                text: 'Column',
                group: () => getLocalization('Delete', 'ReportStringId.Cmd_TableDelete'),
                displayText: () => getLocalization('Column', 'ReportStringId.Cmd_TableDeleteColumn'),
                imageClassName: 'dxrd-image-actions-delete_column',
                imageTemplateName: 'dxrd-svg-actions-delete_column',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.deleteColumn(); },
            }, {
                text: 'Cell',
                group: () => getLocalization('Delete', 'ReportStringId.Cmd_TableDelete'),
                displayText: () => getLocalization('Cell', 'ReportStringId.Cmd_TableDeleteCell'),
                imageClassName: 'dxrd-image-actions-delete_cell',
                imageTemplateName: 'dxrd-svg-actions-delete_cell',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.deleteCell(); },
            },
        ]);
        this.onComponentAdded = (e) => { onComponentAdded && onComponentAdded(e); };
    }
    get _cell() {
        return this.selection.focused().getControlModel();
    }
    get _row() {
        return this._cell.parentModel();
    }
    get _table() {
        return this._row.parentModel();
    }
    get _cellSurface() {
        const cell = this.selection.focused();
        return cell instanceof XRTableCellSurface && cell || null;
    }
    insertCell() {
        this._row.insertCellCopy(this._cell, false, this.onComponentAdded);
    }
    deleteCell() {
        deleteSelection(this.selection);
    }
    deleteRow() {
        this.selection.initialize(this._cellSurface.parent);
        deleteSelection(this.selection);
    }
    insertColumn(isRight) {
        this._table.insertColumn(this._cell, isRight, this.onComponentAdded);
    }
    deleteColumn() {
        this._cellSurface.selectColumn(this.selection);
        deleteSelection(this.selection);
    }
    condition(context) {
        return context instanceof XRTableCellViewModel && !!this._cellSurface;
    }
}
