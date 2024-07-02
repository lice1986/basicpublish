﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellGroupActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, pixelToUnits } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class TableCellGroupActions extends BaseActionsProvider {
    constructor(selectionProvider) {
        super();
        this._selectionProvider = selectionProvider;
        this._distributeColumnsAction = {
            group: () => getLocalization('Table Cells', 'ASPxReportsStringId.ReportDesigner_PageGroup_TableCells'),
            text: 'Distribute Columns Evenly',
            displayText: () => getLocalization('Distribute Columns Evenly', 'ReportStringId.Cmd_TableDistributeColumnsEvenly'),
            imageClassName: 'dxrd-image-actions-distribute_columns_evenly',
            imageTemplateName: 'dxrd-svg-actions-distribute_columns_evenly',
            clickAction: () => { this._distributeColumns(); }
        };
        this._distributeRowsAction = {
            group: () => getLocalization('Table Cells', 'ASPxReportsStringId.ReportDesigner_PageGroup_TableCells'),
            text: 'Distribute Rows Evenly',
            displayText: () => getLocalization('Distribute Rows Evenly', 'ReportStringId.Cmd_TableDistributeRowsEvenly'),
            imageClassName: 'dxrd-image-actions-distribute_rows_evenly',
            imageTemplateName: 'dxrd-svg-actions-distribute_rows_evenly',
            clickAction: () => { this._distributeRows(); }
        };
        super.initActions([
            this._distributeColumnsAction,
            this._distributeRowsAction
        ]);
        this.setDisabled = (context) => {
            const status = { rows: false, cols: false }, cells = this._selectedCells();
            if (cells.length) {
                const row0 = cells[0].parentModel(), colIndex0 = row0.cells().indexOf(cells[0]);
                for (let i = 1; i < cells.length; i++) {
                    const rowi = cells[i].parentModel();
                    if (!status.rows && rowi.name() !== row0.name())
                        status.rows = true;
                    if (!status.cols && rowi.cells().indexOf(cells[i]) != colIndex0)
                        status.cols = true;
                    if (status.rows && status.cols)
                        break;
                }
            }
            this._distributeColumnsAction.disabled(!status.cols);
            this._distributeRowsAction.disabled(!status.rows);
        };
    }
    _distributeColumns() {
        const cellsByRows = this._selectedCells()
            .reduce((acc, x) => {
            const row = x.parentModel().name();
            if (acc[row])
                acc[row].push(x);
            else
                acc[row] = [x];
            return acc;
        }, {});
        Object.keys(cellsByRows).forEach(row => {
            const cells = cellsByRows[row];
            if (cells.length >= 2) {
                const weight = cells.reduce((acc, x) => acc + x.weight(), 0) / cells.length;
                cells
                    .sort((x, y) => x.left() - y.left())
                    .forEach(x => { x.weight(weight); });
            }
        });
    }
    _distributeRows() {
        const rowModels = this._selectedCells()
            .map(x => x.parentModel())
            .reduce((acc, x) => acc.indexOf(x) >= 0 ? acc : acc.concat(x), []);
        let weight = rowModels.reduce((acc, x) => acc + x.weight(), 0) / rowModels.length;
        rowModels.forEach(x => { x.weight(weight); });
        const minHeight = Math.max(...[].concat(...rowModels.map(x => x.cells()))
            .map(x => {
            let height = this._calculateMinimalHeight(x);
            const rowSpan = x['rowSpan']();
            if (rowSpan > 1) {
                const row = x.parentModel(), table = row.parentModel(), rowIdx = table.rows.indexOf(row);
                let divisor = 1;
                for (let i = 1; i < rowSpan; i++) {
                    const nextRow = table.rows()[rowIdx + i];
                    if (!nextRow)
                        break;
                    if (rowModels.indexOf(nextRow) >= 0)
                        divisor++;
                    else
                        height -= nextRow.size.height();
                }
                height /= divisor;
            }
            return height;
        })), height = rowModels[0].height();
        if (height < minHeight) {
            const table = rowModels[0].parentModel();
            table.size.height(table.size.height() + (minHeight - height) * rowModels.length);
            weight *= minHeight / height;
            rowModels.forEach(x => { x.weight(weight); });
        }
    }
    _calculateMinimalHeight(cell) {
        return Math.max(this._calculateTextHeight(cell) + this._calculateBordersHeight(cell) + this._calculatePaddingsHeight(cell), ...cell.controls().map(control => control.location.y() + control.size.height()));
    }
    _calculateTextHeight(cell) {
        if (!(cell.text && cell.text()))
            return 0;
        const wordWrap = ko.unwrap(cell['wordWrap']), width = wordWrap ? Math.max(1, cell.width() - this._calculatePaddingsWidth(cell)) + 'px' : 'auto', $div = $.fn.constructor('<div>')
            .css($.extend({
            'height': 'auto',
            'width': width,
            'overflow': 'hidden'
        }, cell.surface.cssCalculator.createFont(ko.unwrap(cell['font'])), cell.surface.cssCalculator.createWordWrap(wordWrap, cell.multiline())))
            .html(cell.text())
            .appendTo($.fn.constructor('body'));
        try {
            return pixelToUnits(Math.ceil($div[0].getBoundingClientRect().height) + 2, cell.root.measureUnit(), 1);
        }
        finally {
            $div.remove();
        }
    }
    _calculateBordersHeight(cell) {
        const borders = cell.borders();
        let toCount;
        if (borders == 'All')
            toCount = [true, true];
        else {
            toCount = [false, false];
            if (borders.indexOf('Top') >= 0)
                toCount[0] = true;
            if (borders.indexOf('Bottom') >= 0)
                toCount[1] = true;
        }
        const row = cell.parentModel();
        const rowIndex = row.parentModel().rows().indexOf(row);
        if (rowIndex != 0)
            toCount[0] = false;
        return toCount.filter(x => x).length * ko.unwrap(cell['borderWidth']);
    }
    _isCellTextControl(cell) { return cell.surface.getChildrenCollection()().length === 0; }
    _calculatePaddingsHeight(cell) { return this._isCellTextControl(cell) ? cell.paddingObj._get('top') + cell.paddingObj._get('bottom') : 0; }
    _calculatePaddingsWidth(cell) { return this._isCellTextControl(cell) ? cell.paddingObj._get('left') + cell.paddingObj._get('right') : 0; }
    _selectedCells() {
        const result = [];
        this._selectionProvider.selectedItems
            .map(x => x.getControlModel())
            .forEach(x => {
            switch (x.controlType) {
                case 'XRTableCell':
                    result.push(x);
                    break;
                case 'XRTableRow':
                    result.push(...x.cells());
                    break;
                case 'XRTable':
                    x.rows().forEach(row => result.push(...row.cells()));
                    break;
            }
        });
        return result;
    }
    condition(context) {
        return this._selectionProvider.selectedItems.length > 1
            && this._selectionProvider.selectedItems.every((x) => ['XRTableCell', 'XRTableRow'].indexOf(x.getControlModel().controlType) >= 0)
            || this._selectionProvider.selectedItems.length == 1
                && ['XRTable', 'XRTableRow'].indexOf(this._selectionProvider.selectedItems[0].getControlModel().controlType) >= 0;
    }
}
