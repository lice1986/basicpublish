﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableRow.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, roundingXDecimals } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { TableActionDirection, TableComponentSurface } from './utils/_tableComponentSurface';
import { XRControlViewModel } from './xrControl';
import { XRTableCellViewModel } from './xrTableCell';
export class XRTableRowViewModel extends XRControlViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        this.top = ko.observable(0);
        this.width = parent.size.width;
        this.cells = ko.observableArray();
        this._disposables.push(this.cellsTotalWeight = ko.pureComputed(() => {
            let result = 0;
            this.cells().forEach(cell => {
                result += cell.weight();
            });
            return result;
        }));
        this._disposables.push(this.pixelWidthWeight = ko.pureComputed(() => {
            return parent.size.width() !== 0 ? this.cellsTotalWeight() / parent.size.width() : 0;
        }));
        this._disposables.push(this.height = ko.pureComputed({
            read: () => {
                const result = parent.size.height() * this.weight() / parent.rowsTotalWeight();
                return roundingXDecimals(result);
            },
            write: (newHeight) => {
                const dHeight = newHeight - this.height(), newWeight = parent.pixelHeightWeight() * newHeight, dWeight = newWeight - this.weight(), thisRowIndex = parent.rows().indexOf(this);
                this.weight(newWeight);
                if (thisRowIndex < parent.rows().length - 1) {
                    parent.rows()[thisRowIndex + 1].weight(parent.rows()[thisRowIndex + 1].weight() - dWeight);
                }
                else {
                    parent.size.height(parent.size.height() + dHeight);
                }
            }
        }));
        this.size = new Size(0, 0);
        this._disposables.push(this.size.height = ko.pureComputed({ read: () => { return this.height(); }, write: (newVal) => { if (checkModelReady(this.root)) {
                this.height(newVal);
            } } }));
        this._disposables.push(this.size.width = ko.pureComputed({ read: () => { return this.width(); }, write: (newVal) => { if (checkModelReady(this.root)) {
                this.width(newVal);
            } } }));
        const deserializedCells = deserializeArray(control.Cells, (item) => { return this.getControlFactory().createControl(item, this, serializer); });
        this.cells(deserializedCells());
        const _top = ko.observable(null);
        this._disposables.push(this.top = ko.pureComputed({
            read: () => {
                const index = parent.rows().indexOf(this);
                if (index > 0) {
                    const previousRow = parent.rows()[index - 1];
                    _top(previousRow.top() + previousRow.height());
                }
                else {
                    _top(0);
                }
                return _top();
            },
            write: (val) => {
                parent.updateRowLocation(this, _top() - val);
                _top(val);
            }
        }));
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.cells);
        this.resetObservableArray(this.cells);
    }
    hasCalculationNode(cellIndex) {
        return this.parentModel().tableCalculationProvider.hasCalculationNode(this.parentModel().rows().indexOf(this), cellIndex);
    }
    addCellToCalculation(cellIndex, delta) {
        const cell = this.cells()[cellIndex];
        const newWeight = this.pixelWidthWeight() * (cell.width() + delta);
        this.parentModel().tableCalculationProvider.addCalculationNode({
            column: cellIndex,
            row: this.parentModel().rows().indexOf(this),
            calc: () => {
                cell.weight(newWeight);
            }
        });
    }
    addColumnToCalculation(diff, last) {
        this.parentModel().addColumnToCalculation(diff, last);
    }
    addTableOffset(width, left) {
        this.parentModel().tableCalculationProvider.addTableOffset(width, left);
    }
    addChild(control, position, onComponentAdded) {
        if (control instanceof XRTableCellViewModel) {
            if (this.cells().indexOf(control) === -1) {
                control.parentModel(this);
                if (position != null) {
                    this.cells.splice(position, 0, control);
                }
                else {
                    this.cells.push(control);
                }
                if ($.isFunction(onComponentAdded))
                    onComponentAdded({ parent: this, model: control });
            }
        }
        else {
            throw new Error('Trying to add non a cell to the table row.');
        }
    }
    insertCellCopy(selectedCell, isRight, onComponentAdded) {
        const newCellWeight = selectedCell.weight() / 2, newCell = new XRTableCellViewModel({ '@ControlType': 'XRTableCell', '@Weight': newCellWeight, '@Multiline': 'true' }, this), indexSelectedCell = this.cells.indexOf(selectedCell);
        this.addChild(newCell, indexSelectedCell + (isRight ? 1 : 0), onComponentAdded);
        if (newCell['text']) {
            newCell['text'](newCell.name());
        }
        selectedCell.weight(newCellWeight);
    }
    removeChild(selectedCell) {
        if (this.cells().length > 0 && this.cells().indexOf(selectedCell) !== -1) {
            const index = this.cells().indexOf(selectedCell), selectedCellWeight = selectedCell.weight();
            this.cells.splice(index, 1);
            if (this.cells()[index]) {
                this.cells()[index].weight(this.cells()[index].weight() + selectedCellWeight);
            }
            else if (this.cells()[index - 1]) {
                this.cells()[index - 1].weight(this.cells()[index - 1].weight() + selectedCellWeight);
            }
            if (this.cells().length === 0) {
                this.parentModel().removeChild(this);
            }
        }
    }
}
XRTableRowViewModel.unitProperties = [];
export class XRTableRowSurface extends TableComponentSurface {
    constructor(control, context) {
        super(control, context, XRTableRowSurface._unitProperties);
        this.direction = TableActionDirection.vertical;
        this._disposables.push(this.css = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.backGroundCss());
        }));
        this._disposables.push(this.contentCss = ko.pureComputed(() => {
            return {};
        }));
    }
    _getChildrenHolderName() { return 'cells'; }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.cells);
        this.resetObservableArray(this.cells);
    }
    getAdornTemplate() {
        let result = XRTableRowSurface._appendValue('', 'dxrd-image-surface-bounded', this.hasBindings);
        result = XRTableRowSurface._appendValue(result, 'dxrd-uiselected', this.selected());
        return result;
    }
}
XRTableRowSurface._unitProperties = {
    _height: (o) => {
        return o.height;
    },
    _width: (o) => {
        return o.width;
    },
    _y: (o) => {
        return o.top;
    }
};
