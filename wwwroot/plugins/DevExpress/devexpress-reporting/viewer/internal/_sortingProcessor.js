﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sortingProcessor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColumnSortOrder } from './_previewRequestWrapper';
export class SortingProcessor {
    constructor(_getSortingStage) {
        this._getSortingStage = _getSortingStage;
    }
    doSorting(sortData, shiftKey, ctrlKey) {
        if (!sortData)
            return;
        if (ctrlKey) {
            if (this._detachSorting(sortData))
                return;
        }
        else if (shiftKey)
            this._appendSorting(sortData);
        else
            this._applySorting(sortData);
        return true;
    }
    _applySorting(sortData) {
        const sortingStage = this._getSortingStage();
        for (let i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                const value = sortingStage[i].Value || [];
                for (let index = 0; index < value.length; index++) {
                    if (value[index] && (value[index].fieldName === sortData.field)) {
                        if (index != 0) {
                            const x = value.splice(index, 1)[0];
                            this._changeSortOrder(x);
                            value.unshift(x);
                        }
                        else
                            this._changeSortOrder(value[index]);
                    }
                    else
                        value[index].sortOrder = ColumnSortOrder.None;
                }
                return;
            }
        }
    }
    _appendSorting(sortData) {
        const sortingStage = this._getSortingStage();
        for (let i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                const value = sortingStage[i].Value || [];
                for (let index = 0; index < value.length; index++) {
                    if (value[index] && (value[index].fieldName === sortData.field)) {
                        if (index != value.length - 1) {
                            const x = value.splice(index, 1)[0];
                            this._changeSortOrder(x);
                            value.push(x);
                            return;
                        }
                        this._changeSortOrder(value[index]);
                        return;
                    }
                }
            }
        }
    }
    _detachSorting(sortData) {
        let skipProcessing = false;
        const sortingStage = this._getSortingStage();
        for (let i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                (sortingStage[i].Value || []).forEach(f => {
                    if (f.sortOrder === ColumnSortOrder.None)
                        skipProcessing = true;
                    else
                        f.sortOrder = ColumnSortOrder.None;
                });
                return;
            }
        }
        return skipProcessing;
    }
    _changeSortOrder(fieldInfo) {
        fieldInfo.sortOrder = fieldInfo.sortOrder === ColumnSortOrder.Ascending ? ColumnSortOrder.Descending : ColumnSortOrder.Ascending;
    }
}