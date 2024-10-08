﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableCalculationProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
export class TableCalculationProvider {
    constructor(_table) {
        this._table = _table;
        this._tableOffset = {
            width: null,
            left: null
        };
        this._calculationStarted = false;
        this._calculationTimeout = null;
        this._calculationNodes = [];
    }
    _resetState() {
        this._calculationNodes = [];
        this._tableOffset.width = null;
        this._tableOffset.left = null;
        this._calculationStarted = false;
    }
    _startCalculation(calculationNodes = this._calculationNodes) {
        this._calculationStarted = true;
        const rows = this._table.rows().map((row, rowIndex) => {
            return row.cells().map((cell, cellIndex) => {
                const modifiedCell = calculationNodes.filter(x => x.column === cellIndex && x.row === rowIndex)[0];
                const weight = cell.weight();
                return modifiedCell ? modifiedCell.calc : () => cell.weight(weight);
            });
        });
        this._tableOffset.left && this._table.location.x(this._table.location.x() + this._tableOffset.left);
        this._tableOffset.width && this._table.size.width(this._table.size.width() + this._tableOffset.width);
        rows.forEach(r => r.forEach(c => c()));
        this._calculationStarted = false;
    }
    addTableOffset(width, left) {
        this._tableOffset.width = width;
        this._tableOffset.left = left;
    }
    addCalculationNode(node) {
        if (this._calculationStarted)
            return;
        this._calculationNodes.push(node);
        this._calculationTimeout && clearTimeout(this._calculationTimeout);
        this._calculationTimeout = setTimeout(() => {
            const undo = UndoEngine.tryGetUndoEngine(this._table);
            undo && undo.start();
            this._startCalculation();
            this._resetState();
            undo && undo.end();
        }, 1);
    }
    hasCalculationNode(rowIndex, cellIndex) {
        return this._calculationNodes.some(x => x.column === cellIndex && x.row === rowIndex);
    }
}
