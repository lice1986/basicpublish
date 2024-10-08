﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\defenitions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { crossTabColumnDefinitionInfo, crossTabRowDefinitionInfo } from '../metadata/crosstab/defenitions';
import { CellKind } from './enums';
export function findcells(cells, columnIndex, rowIndex) {
    return cells.filter(item => {
        if (columnIndex == null) {
            return item._rowIndex() === rowIndex;
        }
        if (rowIndex == null) {
            return item._columnIndex() === columnIndex;
        }
        return item._rowIndex() === rowIndex && item._columnIndex() === columnIndex;
    });
}
export class CrossTabDefinitionsModel extends SerializableModel {
    constructor(model, parent, serializer) {
        super(model, serializer);
    }
}
export class CrossTabRowDefinitionsModel extends CrossTabDefinitionsModel {
    getInfo() { return crossTabRowDefinitionInfo; }
}
export class CrossTabColumnDefinitionsModel extends CrossTabDefinitionsModel {
    getInfo() { return crossTabColumnDefinitionInfo; }
}
export class CellMatrixHelper {
    constructor(cells) {
        this.columnCount = 0;
        this.rowCount = 0;
        cells.forEach(cell => {
            if (cell._rowIndex() === 0)
                this.columnCount += cell._columnSpan();
            if (cell._columnIndex() === 0)
                this.rowCount += cell._rowSpan();
        });
        this.matrix = [];
        for (let i = 0; i < this.columnCount; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.rowCount; j++) {
                const cell = findcells(cells, i, j)[0] || this.findRowCell(i, j - 1) || this.findColumnCell(i - 1, j);
                this.matrix[i][j] = cell;
            }
        }
    }
    findRowCell(i, j, span = 2) {
        if (j < 0)
            return null;
        const newCell = this.matrix[i][j];
        if (newCell && newCell._rowSpan() >= span)
            return newCell;
        return this.findRowCell(i, j - 1, span + 1);
    }
    findColumnCell(i, j, span = 1) {
        if (i < 0)
            return null;
        const newCell = this.matrix[i][j];
        if (newCell && newCell._rowSpan() >= span)
            return newCell;
        return this.findColumnCell(i - 1, j, span + 1);
    }
}
export class DefenitionUpdater extends Disposable {
    constructor(crossTab) {
        super();
        this._columnDefinitions = [];
        this._rowDefinitions = [];
        this._serializer = new ModelSerializer();
        const matrixHelper = new CellMatrixHelper(crossTab.cells());
        for (let i = 0; i < matrixHelper.columnCount; i++) {
            for (let j = 0; j < matrixHelper.rowCount; j++) {
                const cell = matrixHelper.matrix[i][j];
                if (cell.kind() == CellKind.DataHeader || cell.kind() == CellKind.Corner)
                    continue;
                if (cell._columnSpan() === 1 && !this.findDefinition(this._columnDefinitions, cell)) {
                    this._columnDefinitions.push({ cell: cell, defenition: crossTab._columnDefinitions()[i] });
                }
                if (cell._rowSpan() === 1 && !this.findDefinition(this._rowDefinitions, cell)) {
                    this._rowDefinitions.push({ cell: cell, defenition: crossTab._rowDefinitions()[j] });
                }
            }
        }
    }
    findDefinition(array, cell) {
        return findFirstItemMatchesCondition(array, (item) => item.cell === cell);
    }
    update(cells, width, height) {
        const matrixHelper = new CellMatrixHelper(cells);
        const columnDefs = [];
        const rowDefs = [];
        for (let i = 0; i < matrixHelper.columnCount; i++) {
            for (let j = 0; j < matrixHelper.rowCount; j++) {
                const cell = matrixHelper.matrix[i][j];
                if (columnDefs[i] == null && cell._columnSpan() === 1) {
                    const element = this.findDefinition(this._columnDefinitions, cell);
                    if (element && element.defenition)
                        columnDefs[i] = new CrossTabColumnDefinitionsModel(this._serializer.serialize(element.defenition));
                }
                if (rowDefs[j] == null && cell._rowSpan() === 1) {
                    const element = this.findDefinition(this._rowDefinitions, cell);
                    if (element && element.defenition)
                        rowDefs[j] = new CrossTabRowDefinitionsModel(this._serializer.serialize(element.defenition));
                }
            }
        }
        for (let i = 0; i < matrixHelper.columnCount; i++) {
            if (columnDefs[i] == null)
                columnDefs[i] = new CrossTabColumnDefinitionsModel({ '@Width': i > 0 ? columnDefs[i - 1].width() : width });
        }
        for (let i = 0; i < matrixHelper.rowCount; i++) {
            if (rowDefs[i] == null)
                rowDefs[i] = new CrossTabRowDefinitionsModel({ '@Height': i > 0 ? rowDefs[i - 1].height() : height });
        }
        return { columnDefs: columnDefs, rowDefs: rowDefs };
    }
}
