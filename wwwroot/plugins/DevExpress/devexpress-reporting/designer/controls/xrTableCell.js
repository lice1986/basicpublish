﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableCell.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, roundingXDecimals } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ContainerEditOptions } from './properties/editOptions';
import { TableActionDirection, TableComponentSurface } from './utils/_tableComponentSurface';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class XRTableCellViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this._disposables.push(this.width = ko.pureComputed({
            read: () => {
                const result = parent.width() * this.weight() / parent.cellsTotalWeight();
                return roundingXDecimals(result, false, 3);
            },
            write: (newWidth) => {
                const currentIndex = parent.cells().indexOf(this);
                if (parent.hasCalculationNode(currentIndex))
                    return;
                const diff = newWidth - this.width();
                if (currentIndex < parent.cells().length - 1) {
                    parent.addCellToCalculation(currentIndex, diff);
                    parent.addCellToCalculation(currentIndex + 1, diff * -1);
                }
                else {
                    parent.addColumnToCalculation(diff, true);
                    parent.addTableOffset(diff);
                }
            }
        }).extend({ deferred: true }));
        this.textEditOptions = new ContainerEditOptions(model['EditOptions'] || {}, this, serializer);
        this.height = parent.height;
        this.size = new Size(0, 0);
        this.size.isPropertyDisabled = (name) => { return name === 'height'; };
        this._disposables.push(this.size.height = ko.pureComputed({ read: () => { return this.height(); }, write: (newVal) => { if (checkModelReady(this.root)) {
                this.height(newVal);
            } } }));
        this._disposables.push(this.size.width = ko.pureComputed({ read: () => { return this.width(); }, write: (newVal) => { if (checkModelReady(this.root)) {
                this.width(newVal);
            } } }));
        this._disposables.push(this.controls.subscribe(value => value.length > 0 && this.textEditOptions.enabled(false)));
        this._disposables.push(this.left = ko.pureComputed({
            read: () => {
                const index = parent.cells().indexOf(this);
                if (index > 0) {
                    const previousCell = parent.cells()[index - 1];
                    return previousCell.left() + previousCell.width();
                }
                else {
                    return 0;
                }
            },
            write: (val) => {
                if (val === this.left())
                    return;
                const index = parent.cells().indexOf(this);
                const diff = val - this.left();
                if (index > 0) {
                    parent.addCellToCalculation(index - 1, diff);
                    parent.addCellToCalculation(index, diff * -1);
                }
                else {
                    parent.addColumnToCalculation(diff * -1);
                    parent.addTableOffset(diff * -1, diff);
                }
            }
        }).extend({ deferred: true }));
    }
}
XRTableCellViewModel.unitProperties = ['paddingObj'];
export class XRTableCellSurface extends TableComponentSurface {
    constructor(control, context) {
        super(control, context, XRTableCellSurface._unitProperties);
        this._row = this.parent.getControlModel();
        this._table = this._row.parentModel();
        this._cellIndex = () => this._row.cells().indexOf(this.getControlModel());
        this._rowIndex = () => this._table.rows().indexOf(this._row);
        this.direction = TableActionDirection.horizontal;
        this['multiline'] = control['multiline'];
        this._disposables.push(this.contentSizes = ko.pureComputed(() => {
            if (this._isShowBorder('Left')) {
                return this.cssCalculator.contentSizeCss(this.rect().width, this.heightWithRowSpan(), this._context.zoom());
            }
            const bordersArray = control.borders().indexOf('All') === -1 ? control.borders().split(/\s*,\s*/g) : ['Left', 'Top', 'Right', 'Bottom'];
            const index = bordersArray.indexOf('Left');
            let width = this.rect().width;
            if (index !== -1) {
                bordersArray.splice(index, 1);
                width += 1;
            }
            return this.cssCalculator.contentSizeCss(width, this.heightWithRowSpan(), this._context.zoom(), bordersArray.join(','));
        }));
        this._disposables.push(this.css = ko.pureComputed(() => {
            const bottom = this.cssCalculator.cellBorder('Bottom', this._context.zoom());
            const right = this.cssCalculator.cellBorder('Right', this._context.zoom());
            const left = this._isShowBorder('Left') ? this.cssCalculator.cellBorder('Left', this._context.zoom()) : this.cssCalculator.createControlBorder('', 0, 'transparent', ['Left'], 'Left');
            const top = this._isShowBorder('Top') ? this.cssCalculator.cellBorder('Top', this._context.zoom()) : { borderTop: '' };
            return $.extend({}, this.cssCalculator.fontCss(), this.cssCalculator.backGroundCss(), right, bottom, top, left, this.cssCalculator.foreColorCss(), this.cssCalculator.textAlignmentCss());
        }));
        this._disposables.push(this.rowSpan = ko.pureComputed(() => {
            if (this.controls().length > 0) {
                return 1;
            }
            for (let i = 1; i <= this._rowIndex() && this._rowIndex() - i >= 0; i++) {
                const cell = this._getAdjacentCellByRowIndex(this._rowIndex() - i);
                if (cell && cell.surface.rowSpan() > i)
                    return 0;
            }
            const rowSpan = control['rowSpan']();
            let lastRowSpan = 1;
            const rowCount = this._table.rows().length;
            for (let i = 1; i < rowSpan && i + this._rowIndex() < rowCount; i++, lastRowSpan++) {
                const nextCell = this._getAdjacentCellByRowIndex(this._rowIndex() + i);
                if (!nextCell || nextCell.width() != control.width() || nextCell['rowSpan']() > 1 || nextCell.controls().length > 0) {
                    return lastRowSpan;
                }
            }
            return lastRowSpan;
        }));
        this._disposables.push(this.heightWithRowSpan = ko.pureComputed(() => {
            let _height = this.rect().height;
            if (this.rowSpan() > 1) {
                for (let i = 1; i < this.rowSpan(); i++) {
                    const cell = this._getAdjacentCellByRowIndex(this._rowIndex() + i);
                    if (cell && cell.surface)
                        _height += cell.surface.rect().height;
                }
            }
            else if (this.rowSpan() === 0) {
                return 0;
            }
            return _height;
        }));
        this.offsetZIndex = () => {
            const hasRowSpan = this.rowSpan() > 1;
            return hasRowSpan && (this.selected() || this.focused()) && 2 || hasRowSpan && 1 || null;
        };
        this.getUsefulRect = () => {
            const borderWidth = ko.unwrap(control['borderWidth']), borderFlags = control.borders();
            const rect = { top: 0, left: 0, width: this.rect().width, height: this.rect().height };
            if (borderWidth) {
                const allBorders = borderFlags === 'All';
                if ((allBorders || borderFlags.indexOf('Top') >= 0) && this._isShowBorder('Top')) {
                    rect.top += borderWidth;
                    rect.height -= borderWidth;
                }
                if (allBorders || borderFlags.indexOf('Right') >= 0)
                    rect.width -= borderWidth;
                if (allBorders || borderFlags.indexOf('Bottom') >= 0)
                    rect.height -= borderWidth;
                if ((allBorders || borderFlags.indexOf('Left') >= 0) && this._isShowBorder('Left')) {
                    rect.left += borderWidth;
                    rect.width -= borderWidth;
                }
            }
            return rect;
        };
    }
    _getAdjacentCellByRowIndex(rowIndex) {
        const nextRow = this._table.rows()[rowIndex];
        return nextRow && nextRow.cells && nextRow.cells().filter(cell => Math.round(cell.left() - this._control.left()) === 0)[0];
    }
    _isShowBorder(side) {
        if (side === 'Top') {
            const prevCell = this._getAdjacentCellByRowIndex(this._rowIndex() - 1);
            const borders = prevCell && prevCell['borders']();
            return (this._rowIndex() === 0) || (borders && borders !== 'All' && borders.indexOf('Bottom') === -1);
        }
        if (side === 'Left') {
            const prevCell = this._row.cells()[this._cellIndex() - 1], borders = prevCell && prevCell.borders();
            return (this._cellIndex() === 0) || (borders && borders !== 'All' && borders.indexOf('Right') === -1);
        }
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    }
    selectColumn(selection) {
        (this.parent.parent).selectColumn(selection, this);
    }
    checkParent(surfaceParent) {
        return this.parent.parent === surfaceParent;
    }
    isThereIntersectionWithUsefulArea() {
        return false;
    }
    isThereIntersectionWithCrossBandControls() {
        return false;
    }
    isThereIntersectionWithNeighborsCollection() {
        return false;
    }
    isThereIntersectionWithParentCollection() {
        return false;
    }
    beforeRectUpdated(rect) {
        const _rowSpan = this.rowSpan.peek();
        for (let i = 1; i < _rowSpan; i++) {
            const nextCell = this._getAdjacentCellByRowIndex(this._rowIndex() + i);
            nextCell && nextCell.surface.rect(rect);
        }
        return super.beforeRectUpdated(rect);
    }
    canDrop() {
        return super.canDrop() && this.rowSpan() === 1;
    }
    getAdornTemplate() {
        let result = super.getAdornTemplate();
        result = XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']() || (this._control.parentModel() && !this._control.parentModel()['visible']()));
        return result;
    }
}
XRTableCellSurface._unitProperties = {
    _height: (o) => {
        return o.height;
    },
    _width: (o) => {
        return o.width;
    },
    _x: (o) => {
        return o.left;
    }
};
