﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableRowActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, deleteSelection } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { XRTableRowViewModel } from '../controls/xrTableRow';
export class TableRowActions extends BaseActionsProvider {
    constructor(selection, onComponentAdded, isDisabled = () => false) {
        super();
        this.selection = selection;
        super.initActions([
            {
                text: 'Insert Row Above',
                group: () => getLocalization('Table Rows', 'ASPxReportsStringId.ReportDesigner_PageGroup_TableRows'),
                displayText: () => getLocalization('Insert Row Above', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowAbove'),
                imageClassName: 'dxrd-image-actions-insert_row_above',
                imageTemplateName: 'dxrd-svg-actions-insert_row_above',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertRowAbove(); },
            }, {
                text: 'Insert Row Below',
                group: () => getLocalization('Table Rows', 'ASPxReportsStringId.ReportDesigner_PageGroup_TableRows'),
                displayText: () => getLocalization('Insert Row Below', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowBelow'),
                imageClassName: 'dxrd-image-actions-insert_row_below',
                imageTemplateName: 'dxrd-svg-actions-insert_row_below',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.insertRowBelow(); },
            }, {
                text: 'Delete Row',
                group: () => getLocalization('Table Rows', 'ASPxReportsStringId.ReportDesigner_PageGroup_TableRows'),
                displayText: () => getLocalization('Delete Row', 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteRow'),
                imageClassName: 'dxrd-image-actions-delete_row',
                imageTemplateName: 'dxrd-svg-actions-delete_row',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: () => { this.deleteRow(); },
            }
        ]);
        this.onComponentAdded = (e) => { onComponentAdded && onComponentAdded(e); };
    }
    get _row() {
        return this.selection.focused().getControlModel();
    }
    get _table() {
        return this._row.parentModel();
    }
    isDisabled() {
        const item = this.selection.focused();
        if (item) {
            const report = item.getControlModel().root;
            return report && report.language() !== defaultCulture;
        }
        return true;
    }
    insertRowAbove() {
        this._table.insertRow(this._row, true, this.onComponentAdded);
    }
    insertRowBelow() {
        this._table.insertRow(this._row, false, this.onComponentAdded);
    }
    deleteRow() {
        deleteSelection(this.selection);
    }
    condition(context) {
        return context instanceof XRTableRowViewModel;
    }
}
