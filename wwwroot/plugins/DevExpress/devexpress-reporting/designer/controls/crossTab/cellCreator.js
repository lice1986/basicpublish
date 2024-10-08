﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\cellCreator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { cellserializtionInfoBase } from '../metadata/crosstab/xrCrossTabCell';
import { CellKind, CornerHeaderDisplayMode, DataFieldLayout, TotalHeaderPosition, TotalsPosition } from './enums';
export class CrossTabCellInfo extends SerializableModel {
    constructor(model, serializer = new ModelSerializer()) {
        super(model, serializer, cellserializtionInfoBase);
        this.kind = ko.observable(CellKind.None);
    }
}
export class CellCreator extends Disposable {
    constructor(crossTab) {
        super();
        this.crossTab = crossTab;
    }
    get rowFieldCount() { return this.crossTab.rowFields().length; }
    get columnFieldCount() { return this.crossTab.columnFields().length; }
    get dataFieldCount() { return this.crossTab.dataFields().length; }
    get rowDataCount() { return 1; }
    get columnDataCount() { return 1; }
    nextRowIndex(cell) {
        return cell._rowIndex() + cell._rowSpan();
    }
    lastRowIndex(cell) {
        return this.nextRowIndex(cell) - 1;
    }
    nextColumnIndex(cell) {
        return cell._columnIndex() + cell._columnSpan();
    }
    lastColumnIndex(cell) {
        return this.nextColumnIndex(cell) - 1;
    }
    setCellKind(cell, kind) {
        cell.kind(kind);
    }
    setLevel(cell, dataLevel, columnLevel, rowLevel) {
        if (dataLevel >= 0)
            this.setDataLevel(cell, dataLevel);
        if (columnLevel >= 0)
            this.setColumnLevel(cell, columnLevel);
        if (rowLevel >= 0)
            this.setRowLevel(cell, rowLevel);
    }
    setDataLevel(cell, level) {
        cell.dataLevel = level;
    }
    setColumnLevel(cell, level) {
        cell.columnLevel = level;
    }
    setRowLevel(cell, level) {
        cell.rowLevel = level;
    }
    indexToLevel(index, count) {
        return count - 1 - index;
    }
    setLayout(cell, columnIndex, rowIndex, columnSpan, rowSpan) {
        cell._columnIndex(columnIndex);
        cell._rowIndex(rowIndex);
        cell._columnSpan(columnSpan);
        cell._rowSpan(rowSpan);
    }
    static createInstance(crossTab) {
        return crossTab.dataFields().length <= 1 ? new CellCreator(crossTab)
            : crossTab.layoutOptions.dataFieldLayout() === DataFieldLayout[DataFieldLayout.InRow] ? new HorizontalCreator(crossTab)
                : new VerticalCreator(crossTab);
    }
    create() {
        const cells = [];
        const corners = this.createCorners(Math.max(1, this.columnFieldCount), Math.max(1, this.rowFieldCount));
        cells.push(...corners);
        this.lastCorner = corners[corners.length - 1];
        const dataHeaders = this.createDataHeaders();
        cells.push(...dataHeaders);
        const dataCells = this.createData();
        cells.push(...dataCells);
        const columnHeaders = this.createColumnHeaders(this.nextColumnIndex(this.lastCorner), this.columnFieldCount * this.columnDataCount, this.columnDataCount);
        cells.push(...columnHeaders);
        const rowHeaders = this.createRowHeaders(this.nextRowIndex(this.lastCorner), this.rowFieldCount * this.rowDataCount, this.rowDataCount);
        cells.push(...rowHeaders);
        const rowTotalHeaders = this.createRowTotalHeaders(rowHeaders[rowHeaders.length - 1]._columnIndex(), 1, this.nextRowIndex(rowHeaders[rowHeaders.length - 1]), this.rowDataCount);
        cells.push(...rowTotalHeaders);
        cells.push(...this.createRowTotals(dataCells[0]._columnIndex(), this.nextRowIndex(dataCells[0]), this.rowDataCount));
        const columnTotalHeaders = this.createColumnTotalHeaders(this.nextColumnIndex(columnHeaders[columnHeaders.length - 1]), columnHeaders[columnHeaders.length - 1]._rowIndex(), 1, this.columnDataCount);
        cells.push(...columnTotalHeaders);
        cells.push(...this.createColumnTotals(this.nextColumnIndex(dataCells[0]), dataCells[0]._rowIndex(), this.columnDataCount));
        cells.push(...this.createGrandTotals(dataCells, this.nextRowIndex(dataCells[dataCells.length - 1]), this.nextColumnIndex(dataCells[dataCells.length - 1]), dataCells.length, 1));
        if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount > 1) {
            cells.push(...this.createEmptyHeaders(this.columnFieldCount + 1));
            cells.push(...this.createEmptyCells(1));
        }
        return cells;
    }
    creator(cellKind) {
        const cell = new CrossTabCellInfo({});
        this.setCellKind(cell, cellKind);
        return cell;
    }
    createCorners(columnCount, rowCount) {
        const mode = this.crossTab.layoutOptions.cornerHeaderDisplayMode();
        const corners = [];
        let cell;
        if (CornerHeaderDisplayMode[mode] === CornerHeaderDisplayMode.RowFieldNames) {
            for (let i = 0; i < rowCount; i++) {
                cell = this.creator(CellKind.Corner);
                this.setLayout(cell, i, 0, 1, columnCount);
                this.setRowLevel(cell, i);
                cell.field = ko.observable(this.crossTab.rowFields()[i]);
                corners.push(cell);
            }
        }
        else if (CornerHeaderDisplayMode[mode] === CornerHeaderDisplayMode.ColumnFieldNames) {
            for (let i = 0; i < columnCount; i++) {
                cell = this.creator(CellKind.Corner);
                this.setLayout(cell, 0, i, rowCount, 1);
                this.setColumnLevel(cell, i);
                cell.field = ko.observable(this.crossTab.columnFields()[i]);
                corners.push(cell);
            }
        }
        else {
            if (this.crossTab.layoutOptions)
                cell = this.creator(CellKind.Corner);
            this.setLayout(cell, 0, 0, rowCount, columnCount);
            corners.push(cell);
        }
        return corners;
    }
    createDataHeaders() {
        return [];
    }
    createDataHeader(columnIndex, rowIndex, dataLevel, columnLevel = -1, rowLevel = -1) {
        const cell = this.creator(CellKind.DataHeader);
        this.setLevel(cell, dataLevel, columnLevel, rowLevel);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        cell.field = ko.observable(this.crossTab.dataFields()[dataLevel]);
        return cell;
    }
    createData() {
        let startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        return [this.createDataCell(this.nextColumnIndex(this.lastCorner), startRowIndex, 0)];
    }
    createDataCell(colIndex, rowIndex, level) {
        const cell = this.creator(CellKind.Data);
        cell.field = ko.observable(this.crossTab.dataFields()[level]);
        this.setDataLevel(cell, level);
        this.setLayout(cell, colIndex, rowIndex, 1, 1);
        return cell;
    }
    createColumnTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.columnFieldCount == 0)
            return [];
        const cells = [];
        let columnIndex = startColumnIndex;
        for (let i = 0; i < this.columnFieldCount; i++) {
            const level = this.indexToLevel(i, this.columnFieldCount) - 1;
            for (let j = 0; j < Math.max(1, this.dataFieldCount); j++) {
                cells.push(this.createColumnTotal(columnIndex, startRowIndex, j, level));
            }
            columnIndex += dataCount;
        }
        return cells;
    }
    createColumnTotal(columnIndex, rowIndex, dataLevel, columnLevel) {
        const cell = this.creator(CellKind.ColumnTotal);
        this.setLevel(cell, dataLevel, columnLevel, -1);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        return cell;
    }
    createRowTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.rowFieldCount === 0)
            return [];
        const cells = [];
        let rowIndex = startRowIndex;
        for (let i = 0; i < this.rowFieldCount; i++) {
            const level = this.indexToLevel(i, this.rowFieldCount) - 1;
            for (let j = 0; j < Math.max(1, this.dataFieldCount); j++) {
                cells.push(this.createRowTotal(startColumnIndex, rowIndex, j, level));
            }
            rowIndex += dataCount;
        }
        return cells;
    }
    createRowTotal(columnIndex, rowIndex, dataLevel, rowLevel) {
        const cell = this.creator(CellKind.RowTotal);
        this.setLevel(cell, dataLevel, -1, rowLevel);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        return cell;
    }
    createGrandTotals(dataItems, startRowIndex, startColumnIndex, columnInc, rowInc) {
        let columnIndex = startColumnIndex;
        const totals = [];
        for (let i = 0; i < this.columnFieldCount; i++) {
            const columnLevel = this.indexToLevel(i, this.columnFieldCount) - 1;
            let rowIndex = startRowIndex;
            for (let j = 0; j < this.rowFieldCount; j++) {
                const rowLevel = this.indexToLevel(j, this.rowFieldCount) - 1;
                for (let k = 0; k < dataItems.length; k++) {
                    const cell = this.createGrandTotal(k, columnLevel, rowLevel);
                    this.setGrandTotalLayout(cell, k, columnIndex, rowIndex);
                    totals.push(cell);
                }
                rowIndex += rowInc;
            }
            columnIndex += columnInc;
        }
        return totals;
    }
    createGrandTotal(dataLevel, columnLevel, rowLevel) {
        const cell = this.creator(CellKind.GrandTotal);
        this.setLevel(cell, dataLevel, columnLevel, rowLevel);
        return cell;
    }
    setGrandTotalLayout(cells, inc, columnIndex, rowIndex) {
        this.setLayout(cells, columnIndex + inc, rowIndex, 1, 1);
    }
    createColumnHeaders(startColumnIndex, columnSpan, dataCount) {
        const cells = [];
        if (this.columnFieldCount === 0) {
            const columnHeader = this.creator(CellKind.ColumnHeader);
            this.setColumnLevel(columnHeader, 0);
            this.setLayout(columnHeader, startColumnIndex, 0, dataCount, 1);
            cells.push(columnHeader);
        }
        if (this.crossTab.layoutOptions.columnTotalHeaderPosition() === TotalHeaderPosition[TotalHeaderPosition.Outer])
            columnSpan = Math.max(dataCount, columnSpan - dataCount);
        let rowIndex = 0;
        const isReversed = this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData];
        isReversed && (startColumnIndex += dataCount * (this.columnFieldCount + 1));
        for (let i = 0; i < this.columnFieldCount; i++) {
            const columnHeader = this.creator(CellKind.ColumnHeader);
            columnHeader.field = ko.observable(this.crossTab.columnFields()[i]);
            this.setColumnLevel(columnHeader, i);
            this.setLayout(columnHeader, isReversed ? startColumnIndex - columnSpan : startColumnIndex, rowIndex, columnSpan, 1);
            cells.push(columnHeader);
            columnSpan = Math.max(dataCount, columnSpan - dataCount);
            rowIndex = this.nextRowIndex(columnHeader);
        }
        return cells;
    }
    createColumnTotalHeaders(startColumnIndex, startRowIndex, rowSpan, dataCount) {
        const cells = [];
        if (this.columnFieldCount === 0)
            return [];
        if (this.crossTab.layoutOptions.columnTotalHeaderPosition() === TotalHeaderPosition[TotalHeaderPosition.Outer] && startRowIndex > 0) {
            startRowIndex--;
            rowSpan++;
        }
        let rowIndex = startRowIndex;
        let columnIndex = startColumnIndex;
        let columnInc = dataCount;
        if (this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            columnIndex -= dataCount * 2;
            columnInc = -columnInc;
        }
        for (let i = 0; i < this.columnFieldCount; i++) {
            const level = this.indexToLevel(i, this.columnFieldCount);
            const columnTotalHeader = level === 0 ? this.createColumnGrandTotalHeader() : this.createColumnTotalHeader(level - 1);
            columnTotalHeader.field = ko.observable(this.crossTab.columnFields()[level - 1]);
            this.setLayout(columnTotalHeader, columnIndex, rowIndex, dataCount, rowSpan);
            cells.push(columnTotalHeader);
            if (rowIndex > 0) {
                rowIndex--;
                rowSpan++;
            }
            columnIndex += columnInc;
        }
        return cells;
    }
    createRowHeaders(startRowIndex, rowSpan, dataCount) {
        if (this.rowFieldCount === 0) {
            const rowHeader = this.creator(CellKind.RowHeader);
            this.setRowLevel(rowHeader, 0);
            this.setLayout(rowHeader, 0, startRowIndex, 1, dataCount);
            return [rowHeader];
        }
        const cells = [];
        let columnShift = 0;
        if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount > 1) {
            columnShift = 1;
            rowSpan = 1;
        }
        else if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === TotalHeaderPosition[TotalHeaderPosition.Outer]) {
            rowSpan = Math.max(dataCount, rowSpan - dataCount);
        }
        let columnIndex = 0;
        let rowIndex = startRowIndex;
        const isReversed = this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData];
        isReversed && (rowIndex += dataCount * (this.rowFieldCount + 1));
        let columnSpan = Math.max(1, this.rowFieldCount * columnShift);
        for (let i = 0; i < this.rowFieldCount; i++) {
            const rowHeader = this.creator(CellKind.RowHeader);
            rowHeader.field = ko.observable(this.crossTab.rowFields()[i]);
            this.setRowLevel(rowHeader, i);
            if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount - 1 > i
                && this.crossTab.layoutOptions.dataFieldLayout() === DataFieldLayout[DataFieldLayout.InColumn]) {
                columnSpan += 1;
            }
            this.setLayout(rowHeader, columnIndex, isReversed ? rowIndex - rowSpan : rowIndex, columnSpan, rowSpan);
            cells.push(rowHeader);
            if (!this.crossTab.layoutOptions.hierarchicalRowLayout() || this.rowFieldCount - 2 == i) {
                rowSpan = Math.max(dataCount, rowSpan - dataCount);
            }
            columnSpan = Math.max(1, (this.rowFieldCount - i - 1) * columnShift);
            columnIndex = rowHeader._columnIndex() + 1;
            !isReversed && (rowIndex = rowHeader._rowIndex() + columnShift);
        }
        return cells;
    }
    createRowTotalHeaders(startColumnIndex, columnSpan, startRowIndex, dataCount) {
        if (this.rowFieldCount === 0)
            return [];
        if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === TotalHeaderPosition[TotalHeaderPosition.Outer] && startColumnIndex > 0) {
            startColumnIndex--;
            columnSpan++;
        }
        let rowIndex = startRowIndex;
        let rowInc = dataCount;
        if (this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            rowIndex -= dataCount * 2;
            rowInc = -rowInc;
        }
        let columnIndex = startColumnIndex;
        const cells = [];
        for (let i = 0; i < this.rowFieldCount; i++) {
            const level = this.indexToLevel(i, this.rowFieldCount);
            const rowTotalHeader = level === 0 ? this.createRowGrandTotalHeader() : this.createRowTotalHeader(level - 1);
            rowTotalHeader.field = ko.observable(this.crossTab.rowFields()[level - 1]);
            this.setLayout(rowTotalHeader, columnIndex, rowIndex, columnSpan, dataCount);
            cells.push(rowTotalHeader);
            if (columnIndex > 0) {
                columnIndex--;
                columnSpan++;
            }
            rowIndex += rowInc;
        }
        return cells;
    }
    createEmptyHeaders(columnSpan) {
        let rowIndex = this.nextRowIndex(this.lastCorner);
        const columnIndex = this.nextColumnIndex(this.lastCorner);
        const cells = [];
        for (let i = 0; i < this.rowFieldCount - 1; i++) {
            const emptyHeader = this.createEmptyHeader(i);
            this.setLayout(emptyHeader, columnIndex, rowIndex, columnSpan, 1);
            cells.push(emptyHeader);
            rowIndex++;
        }
        return cells;
    }
    createEmptyCells(dataCount) {
        let rowIndex = this.nextRowIndex(this.lastCorner) + 1;
        let columnIndex = 0;
        let rowSpan = this.rowFieldCount * (dataCount + 1) - 2;
        if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === TotalHeaderPosition[TotalHeaderPosition.Outer]) {
            rowSpan -= dataCount;
        }
        const cells = [];
        for (let i = 0; i < this.rowFieldCount - 1; i++) {
            const emptyCell = this.createEmptyCell(i);
            this.setLayout(emptyCell, columnIndex, rowIndex, 1, rowSpan);
            cells.push(emptyCell);
            rowIndex++;
            columnIndex++;
            rowSpan -= dataCount + 1;
        }
        return cells;
    }
    createEmptyHeader(level) {
        const emptyHeader = this.creator(CellKind.EmptyHeader);
        this.setRowLevel(emptyHeader, level);
        return emptyHeader;
    }
    createEmptyCell(level) {
        const emptyCell = this.creator(CellKind.Empty);
        this.setRowLevel(emptyCell, level);
        return emptyCell;
    }
    createColumnTotalHeader(level) {
        const columnHeaderTotal = this.creator(CellKind.ColumnTotalHeader);
        this.setColumnLevel(columnHeaderTotal, level);
        return columnHeaderTotal;
    }
    createColumnGrandTotalHeader() {
        const cell = this.creator(CellKind.ColumnTotalHeader);
        return cell;
    }
    createRowTotalHeader(level) {
        const rowHeaderTotal = this.creator(CellKind.RowTotalHeader);
        this.setRowLevel(rowHeaderTotal, level);
        return rowHeaderTotal;
    }
    createRowGrandTotalHeader() {
        const cell = this.creator(CellKind.RowTotalHeader);
        return cell;
    }
}
export class HorizontalCreator extends CellCreator {
    get columnDataCount() { return this.dataFieldCount; }
    createCorners(columnCount, rowCount) {
        const corners = super.createCorners(columnCount, rowCount);
        if (this.crossTab.layoutOptions.cornerHeaderDisplayMode() == CornerHeaderDisplayMode[CornerHeaderDisplayMode.ColumnFieldNames]) {
            const lastCorner = corners[corners.length - 1];
            lastCorner._rowSpan(lastCorner._rowSpan() + 1);
        }
        else
            corners.forEach(corner => {
                corner._rowSpan(corner._rowSpan() + 1);
            });
        return corners;
    }
    createDataHeaders() {
        const rowIndex = this.lastRowIndex(this.lastCorner);
        const isReversed = this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData];
        let columnIndex = !isReversed ? this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount * this.dataFieldCount;
        const cells = [];
        for (let i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataHeader(columnIndex, rowIndex, i));
            columnIndex++;
        }
        const columnInc = Math.max(1, this.dataFieldCount);
        isReversed && (columnIndex -= 2 * columnInc);
        for (let i = 0; i < this.columnFieldCount; i++) {
            const columnLevel = this.indexToLevel(i, this.columnFieldCount);
            for (let j = 0; j < columnInc; j++) {
                const dataHeader = this.createDataHeader(columnIndex + j, rowIndex, j, columnLevel);
                this.setLevel(dataHeader, -1, columnLevel, -1);
                cells.push(dataHeader);
            }
            isReversed ? (columnIndex -= columnInc) : (columnIndex += columnInc);
        }
        return cells;
    }
    createData() {
        let startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        const rowIndex = this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.AfterData] ?
            startRowIndex : startRowIndex + this.rowFieldCount;
        const columnIndex = this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.AfterData] ?
            this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount * this.dataFieldCount;
        const cells = [];
        for (let i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataCell(columnIndex + i, rowIndex, i));
        }
        return cells;
    }
    createRowTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            return super.createRowTotals(startColumnIndex, startRowIndex - 2, -dataCount);
        }
        return super.createRowTotals(startColumnIndex, startRowIndex, dataCount);
    }
    createColumnTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            return super.createColumnTotals(startColumnIndex - dataCount - 1, startRowIndex, -dataCount);
        }
        return super.createColumnTotals(startColumnIndex + dataCount - 1, startRowIndex, dataCount);
    }
    createGrandTotals(dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            startColumnIndex -= dataItems.length * 2;
            columnIndex = -dataItems.length;
        }
        if (this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            startRowIndex -= 2;
            rowIndex = -1;
        }
        return super.createGrandTotals(dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex);
    }
    createColumnTotal(columnIndex, rowIndex, dataLevel, columnLevel) {
        return super.createColumnTotal(columnIndex + dataLevel, rowIndex, dataLevel, columnLevel);
    }
    createRowTotal(columnIndex, rowIndex, dataLevel, rowLevel) {
        return super.createRowTotal(columnIndex + dataLevel, rowIndex, dataLevel, rowLevel);
    }
    createEmptyHeaders(columnSpan) {
        return super.createEmptyHeaders(columnSpan * this.dataFieldCount);
    }
}
export class VerticalCreator extends CellCreator {
    get rowDataCount() { return this.dataFieldCount; }
    createCorners(columnCount, rowCount) {
        const corners = super.createCorners(columnCount, rowCount);
        if (this.crossTab.layoutOptions.cornerHeaderDisplayMode() == CornerHeaderDisplayMode[CornerHeaderDisplayMode.RowFieldNames]) {
            const lastCorner = corners[corners.length - 1];
            lastCorner._columnSpan(lastCorner._columnSpan() + 1);
        }
        else
            corners.forEach(corner => {
                corner._columnSpan(corner._columnSpan() + 1);
            });
        return corners;
    }
    createDataHeaders() {
        let startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        const isReversed = this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData];
        let rowIndex = !isReversed ? startRowIndex : startRowIndex + (this.rowFieldCount) * this.dataFieldCount;
        const columnIndex = this.lastColumnIndex(this.lastCorner);
        const cells = [];
        for (let i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataHeader(columnIndex, rowIndex, i));
            rowIndex++;
        }
        const rowInc = Math.max(1, this.dataFieldCount);
        isReversed && (rowIndex -= 2 * rowInc);
        for (let i = 0; i < this.rowFieldCount; i++) {
            const rowLevel = this.indexToLevel(i, this.rowFieldCount);
            for (let j = 0; j < rowInc; j++) {
                const dataHeader = this.createDataHeader(columnIndex, rowIndex + j, j, undefined, rowLevel);
                this.setLevel(dataHeader, -1, -1, rowLevel);
                cells.push(dataHeader);
            }
            isReversed ? (rowIndex -= rowInc) : (rowIndex += rowInc);
        }
        return cells;
    }
    createData() {
        let startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        const rowIndex = this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.AfterData] ?
            startRowIndex : startRowIndex + (this.rowFieldCount) * this.dataFieldCount;
        const columnIndex = this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.AfterData] ?
            this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount;
        const cells = [];
        for (let i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataCell(columnIndex, rowIndex + i, i));
        }
        return cells;
    }
    createRowTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            return super.createRowTotals(startColumnIndex, startRowIndex - 3, -dataCount);
        }
        return super.createRowTotals(startColumnIndex, startRowIndex + dataCount - 1, dataCount);
    }
    createColumnTotals(startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            return super.createColumnTotals(startColumnIndex - 2, startRowIndex, -dataCount);
        }
        return super.createColumnTotals(startColumnIndex, startRowIndex, dataCount);
    }
    createColumnTotal(columnIndex, rowIndex, dataLevel, columnLevel) {
        return super.createColumnTotal(columnIndex, rowIndex + dataLevel, dataLevel, columnLevel);
    }
    createRowTotal(columnIndex, rowIndex, dataLevel, rowLevel) {
        return super.createRowTotal(columnIndex, rowIndex + dataLevel, dataLevel, rowLevel);
    }
    createGrandTotals(dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex) {
        columnIndex = 1;
        rowIndex = dataItems.length;
        if (this.crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            startColumnIndex -= 2;
            columnIndex = -1;
        }
        if (this.crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
            startRowIndex -= this.dataFieldCount + 2;
            rowIndex = -dataItems.length;
        }
        return super.createGrandTotals(dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex);
    }
    setGrandTotalLayout(items, inc, columnIndex, rowIndex) {
        this.setLayout(items, columnIndex, rowIndex + inc, 1, 1);
    }
    createEmptyCells(dataCount) {
        return super.createEmptyCells(dataCount * this.dataFieldCount);
    }
}
