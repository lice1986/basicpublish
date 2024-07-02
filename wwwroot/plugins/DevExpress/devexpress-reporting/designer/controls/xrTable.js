﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { TableCalculationProvider } from './utils/_tableCalculationProvider';
import { XRControlSurfaceBase, XRControlViewModel } from './xrControl';
import { XRTableRowViewModel } from './xrTableRow';
export class XRTableControlViewModel extends XRControlViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        this.rows = ko.observableArray();
        this._disposables.push(this.rowsTotalWeight = ko.pureComputed(() => {
            let result = 0;
            this.rows().forEach(row => {
                result += row.weight();
            });
            return result;
        }));
        this._disposables.push(this.pixelHeightWeight = ko.pureComputed(() => {
            return this.size.height() !== 0 ? this.rowsTotalWeight() / this.size.height() : 0;
        }));
        const deserializedRows = deserializeArray(control.Rows, (item) => { return new XRTableRowViewModel(item, this, serializer); });
        this.rows(deserializedRows());
        this.tableCalculationProvider = new TableCalculationProvider(this);
    }
    _getAdjacentCells(condition) {
        const adjacentCells = [];
        this.rows().forEach((row) => {
            row.cells().filter((cell) => { return condition(cell); }).forEach((cell) => {
                adjacentCells.push(cell);
            });
        });
        return adjacentCells;
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.rows);
        this.resetObservableArray(this.rows);
    }
    updateRowLocation(row, deltaHeight) {
        const oldHeight = row.height();
        const rowIndex = this.rows().indexOf(row);
        if (rowIndex > 0) {
            const topRowHeight = this.rows()[rowIndex - 1].height;
            const topHeight = topRowHeight() - deltaHeight;
            topRowHeight(topHeight > 0 ? topHeight : 0);
        }
        else {
            const deltaWeight = (row.weight() / oldHeight) * deltaHeight;
            row.weight(row.weight() + deltaWeight);
            this.location.y(this.location.y() - deltaHeight);
            this.size.height(this.size.height() + deltaHeight);
        }
    }
    addChild(control, position, onComponentAdded) {
        if (control instanceof XRTableRowViewModel) {
            if (this.rows().indexOf(control) === -1) {
                control.parentModel(this);
                if (position != null) {
                    this.rows.splice(position, 0, control);
                }
                else {
                    this.rows.push(control);
                }
                if ($.isFunction(onComponentAdded))
                    onComponentAdded({ parent: this, model: control });
            }
        }
        else {
            throw new Error('Trying to add non a row to the table.');
        }
    }
    insertRow(selectedRow, isRowAbove, onComponentAdded) {
        const selectedRowHeight = selectedRow.height(), newRow = new XRTableRowViewModel({
            '@ControlType': 'XRTableRow',
            '@Weight': selectedRow.weight(),
            '@HeightF': selectedRowHeight,
        }, this), indexSelectedRow = this.rows.indexOf(selectedRow);
        selectedRow.cells().forEach((cell) => {
            newRow.createChild({ '@ControlType': 'XRTableCell', '@Weight': cell.weight(), '@Multiline': 'true' });
        });
        this.addChild(newRow, indexSelectedRow + (isRowAbove ? 0 : 1), onComponentAdded);
        this.size.height(this.size.height() + selectedRowHeight);
    }
    removeChild(selectedRow) {
        if (this.rows().length > 0 && this.rows().indexOf(selectedRow) !== -1) {
            const index = this.rows().indexOf(selectedRow);
            this.size.height(this.size.height() - selectedRow.height());
            this.rows.splice(index, 1);
        }
        if (this.rows().length === 0) {
            this.parentModel().removeChild(this);
        }
    }
    insertColumn(selectedCell, isRight, onComponentAdded) {
        const selectedCellX = selectedCell.surface.rect().left, selectedCellRight = selectedCell.surface.rect().left + selectedCell.surface.rect().width, adjacentCells = this._getAdjacentCells((cell) => { return isRight ? ((cell.surface.rect().left + cell.surface.rect().width) === selectedCellRight) : (cell.surface.rect().left === selectedCellX); });
        adjacentCells.forEach((cell) => {
            cell.parentModel().insertCellCopy(cell, isRight, onComponentAdded);
        });
    }
    addColumnToCalculation(diff, last = false) {
        const rows = this.rows();
        for (let i = 0; i < rows.length; i++) {
            rows[i].addCellToCalculation(last ? rows[i].cells().length - 1 : 0, diff);
        }
    }
}
export class XRTableSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, XRTableSurface._unitProperties);
        this._isUpdating = false;
        this.template = 'dxrd-table';
        this.selectiontemplate = 'dxrd-table-selection';
        this._disposables.push(this.css = ko.pureComputed(() => {
            return {};
        }));
        this._disposables.push(this.contentCss = ko.pureComputed(() => {
            return {};
        }));
    }
    _getChildrenHolderName() { return 'rows'; }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.rows);
        this.resetObservableArray(this.rows);
    }
    _isCellInColumn(cell, locationStart, locationEnd) {
        return Math.abs(cell.rect().left - locationStart) < 0.01 && Math.abs(cell.rect().left + cell.rect().width - locationEnd) < 0.01;
    }
    selectColumn(selection, cellSurface) {
        selection.initialize(this);
        const locationStart = cellSurface.rect().left, locationEnd = locationStart + cellSurface.rect().width;
        selection.selecting({ control: cellSurface, cancel: false });
        this.rows().forEach((rowSurface) => {
            rowSurface.cells().forEach((cellSurface) => {
                if (this._isCellInColumn(cellSurface, locationStart, locationEnd)) {
                    selection.selecting({ control: cellSurface, cancel: false });
                    return true;
                }
            });
        });
    }
    isThereIntersectionWithChildCollection() {
        return false;
    }
}
XRTableSurface._unitProperties = {
    _x: (o) => {
        return o.location.x;
    },
    _y: (o) => {
        return o.location.y;
    },
    _width: (o) => {
        return o.size.width;
    },
    _height: (o) => {
        return o.size.height;
    }
};
