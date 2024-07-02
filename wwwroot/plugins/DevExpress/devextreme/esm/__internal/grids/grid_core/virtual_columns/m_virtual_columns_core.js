/**
 * DevExtreme (esm/__internal/grids/grid_core/virtual_columns/m_virtual_columns_core.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    extend
} from "../../../../core/utils/extend";
export function foreachColumnInfo(info, callback, rowIndex, offsets, columnCount, lastProcessedIndexes) {
    rowIndex = rowIndex || 0;
    offsets = offsets || [];
    lastProcessedIndexes = lastProcessedIndexes || [];
    offsets[rowIndex] = offsets[rowIndex] || 0;
    var row = info[rowIndex];
    var startIndex = lastProcessedIndexes[rowIndex] + 1 || 0;
    var processedColumnCount = 0;
    var colIndex;
    if (!row) {
        return
    }
    for (colIndex = startIndex; colIndex < row.length; colIndex++) {
        var cell = row[colIndex];
        var visibleIndex = colIndex + offsets[rowIndex];
        var colspan = cell.colspan || 1;
        foreachColumnInfo(info, callback, rowIndex + (cell.rowspan || 1), offsets, colspan, lastProcessedIndexes);
        offsets[rowIndex] += colspan - 1;
        processedColumnCount += colspan;
        if (cell.rowspan) {
            for (var i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                offsets[i] = offsets[i] || 0;
                offsets[i] += cell.colspan || 1
            }
        }
        if (false === callback(cell, visibleIndex, rowIndex, colIndex)) {
            break
        }
        if (void 0 !== columnCount && processedColumnCount >= columnCount) {
            break
        }
    }
    lastProcessedIndexes[rowIndex] = colIndex
}
export function createColumnsInfo(info, startIndex, endIndex) {
    var newInfo = [];
    foreachColumnInfo(info, (columnInfo, visibleIndex, rowIndex) => {
        var cell = columnInfo;
        var colspan;
        var cellColspan = cell.colspan || 1;
        var isVisible = visibleIndex + cellColspan - 1 >= startIndex && visibleIndex < endIndex;
        newInfo[rowIndex] = newInfo[rowIndex] || [];
        if (isVisible) {
            if (visibleIndex < startIndex) {
                colspan = cellColspan - (startIndex - visibleIndex);
                visibleIndex = startIndex
            } else {
                colspan = cellColspan
            }
            if (visibleIndex + colspan > endIndex) {
                colspan = endIndex - visibleIndex
            }
            if (colspan !== cellColspan) {
                cell = extend({}, cell, {
                    colspan: colspan
                })
            }
            newInfo[rowIndex].push(cell)
        } else if (visibleIndex > endIndex) {
            return false
        }
        return
    });
    for (var i = 0; i < newInfo.length; i++) {
        newInfo[i] = newInfo[i] || []
    }
    return newInfo
}
