﻿/**
* DevExpress Analytics (query-builder\elements\tableModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { ColumnViewModel } from './columnModel';
import { AllColumnsViewModel } from './allColumnsModel';
import { Size } from '../../core/elements/size';
import { Point } from '../../core/elements/point';
import { tableSerializationInfo } from './tableModelMeta';
import { getFirstItemByPropertyValue } from '../../core/utils/_arrayutils';
export class TableViewModel extends QueryElementBaseViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.serializer = serializer;
        this._columnsConnectionPointLeftX = ko.pureComputed(() => { return this.location.x(); });
        this._columnsConnectionPointRightX = ko.pureComputed(() => { return this.location.x() + this.size.width(); });
        this._columns = ko.observableArray();
        this._initialized = ko.observable(false);
        this.tableOffset = ko.observable(0);
        this.size = new Size(199, 123);
        this.location = new Point(0, 0);
        this.isReady = ko.observable(false);
        this.allColumnsSelected = ko.computed({
            read: () => {
                const selectedColumns = this.columns().filter(item => item.selected());
                if (selectedColumns.length === 0) {
                    return false;
                }
                if (selectedColumns.length === this._columns.peek().length) {
                    return true;
                }
                return false;
            },
            deferEvaluation: true
        });
        this.isInitialized = ko.pureComputed(() => this._initialized());
        this.itemType = 'Table';
        this.controlType = 'Table';
        this._disposables.push(this.size.height = ko.pureComputed({
            read: () => {
                if (this._columns().length === 0) {
                    return TableViewModel.TABLE_DEFAULT_HEIGHT + this.tableOffset();
                }
                return TableViewModel.COLUMNS_OFFSET + (TableViewModel.COLUMN_HEIGHT + TableViewModel.COLUMN_MARGIN) * (this._columns().length + 1) + this.tableOffset();
            },
            write: () => {
            }
        }));
        this.asterisk = new AllColumnsViewModel(this, this.serializer);
        this._disposables.push(this.actualName = ko.pureComputed(() => this.alias() || this.name()));
    }
    columns() {
        return this._columns();
    }
    toggleSelectedColumns() {
        const value = !this.allColumnsSelected.peek();
        const query = (this.parentModel());
        this._columns.peek().forEach((column) => column.toggleSelected(value, true));
        query.columns.valueHasMutated();
    }
    getColumnConnectionPoints(column) {
        const y = ko.pureComputed({
            read: () => {
                const index = this._columns.indexOf(column) + 1;
                return this.location.y() + TableViewModel.COLUMNS_OFFSET + TableViewModel.COLUMN_MARGIN * index + TableViewModel.COLUMN_HEIGHT * (index + 0.5) + this.tableOffset();
            },
            deferEvaluation: true
        });
        this._disposables.push(y);
        return {
            left: { x: this._columnsConnectionPointLeftX, y: y },
            right: { x: this._columnsConnectionPointRightX, y: y }
        };
    }
    getInfo() {
        return tableSerializationInfo;
    }
    getInvalidColumns() {
        return this.columns().filter(x => x.isNotAvailable() && x.selected());
    }
    getColumn(name) {
        return getFirstItemByPropertyValue(this._columns(), 'name', name);
    }
    _initColumns(columns, update = false) {
        const result = [];
        columns.forEach((item) => {
            result.push(this.createChildColumn(item));
        });
        this._columns(update ? [].concat([], this.columns(), result) : result);
    }
    createChildColumn(item) {
        return new ColumnViewModel({ '@Name': item.name }, item, this, this.serializer);
    }
    createColumns(dbTable) {
        let notAvailableColumnsCount = 0;
        this.columns().forEach((column) => {
            const expectedColumn = dbTable.columns.filter(x => x.name === column.name())[0];
            if (expectedColumn) {
                column._type(expectedColumn.type);
                column._size(expectedColumn.size);
            }
            else {
                column.isNotAvailable(dbTable.columns.every(x => x.name !== column.name()));
                notAvailableColumnsCount++;
            }
        });
        if (this.columns().length - notAvailableColumnsCount < dbTable.columns.length) {
            this._initColumns(dbTable.columns.filter(x => this.columns().every(c => c.name() !== x.name)), true);
        }
        this._initialized(true);
    }
}
TableViewModel.COLUMNS_OFFSET = 37;
TableViewModel.COLUMN_HEIGHT = 32;
TableViewModel.COLUMN_MARGIN = 1;
TableViewModel.TABLE_MIN_WIDTH = 80;
TableViewModel.TABLE_DEFAULT_HEIGHT = 136;
