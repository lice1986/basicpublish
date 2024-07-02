﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_queryBuilderObjectsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { AggregationType } from '../../elements/columnModelMeta';
import { findFirstItemMatchesCondition, find } from '../../../core/utils/_arrayutils';
export function isAggregatedExpression(object) {
    return object.aggregate() !== AggregationType.None;
}
export class QueryBuilderObjectsProvider {
    constructor(query, objectFilter) {
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            let items = [];
            if (pathRequest.fullPath === '') {
                items = objectFilter.filterTables(query().tables())
                    .map(QueryBuilderObjectsProvider._createTableInfo);
            }
            else {
                const table = findFirstItemMatchesCondition(query().tables(), table => table.actualName() === pathRequest.fullPath);
                items = objectFilter.filterColumns(table && table.columns() || [])
                    .map(column => QueryBuilderObjectsProvider._createColumnInfo(column, objectFilter));
            }
            result.resolve(items);
            return result.promise();
        };
        this.hasParameter = (name) => {
            return query().parameters().filter((parameter) => { return parameter.name() === name; }).length > 0;
        };
        this.getColumnInfo = (propertyName) => {
            if (propertyName) {
                const table = find(query().tables(), t => propertyName.indexOf(t.actualName() + '.') === 0);
                if (table) {
                    const column = find(objectFilter.filterColumns(table.columns() || []), c => propertyName === (table.actualName() + '.' + objectFilter.getColumnName(c)));
                    return column ? QueryBuilderObjectsProvider._createColumnInfo(column, objectFilter) : null;
                }
            }
            return null;
        };
    }
    static _createTableInfo(table) {
        return {
            displayName: table.actualName(),
            name: table.actualName(),
            isList: true,
            specifics: 'Default',
            collapsed: ko.observable(true)
        };
    }
    static _createColumnInfo(column, objectFilter) {
        return {
            displayName: objectFilter.getColumnName(column),
            isList: false,
            specifics: objectFilter.getSpecifics(column),
            dataType: objectFilter.getDataType(column),
            name: objectFilter.getColumnName(column)
        };
    }
}
QueryBuilderObjectsProvider.whereClauseObjectsFilter = {
    filterColumns: columns => columns,
    filterTables: tables => tables,
    getColumnName: column => column.name.peek(),
    getSpecifics: column => column.specifics,
    getDataType: column => column.dataType.peek()
};
QueryBuilderObjectsProvider.groupByObjectsFilter = {
    filterColumns: columns => columns.filter(isAggregatedExpression),
    filterTables: tables => tables.filter(table => table.columns().some(isAggregatedExpression)),
    getColumnName: column => column.actualName.peek(),
    getSpecifics: (column) => {
        switch (column.aggregate()) {
            case AggregationType.Avg:
            case AggregationType.AvgDistinct:
                return 'Float';
            case AggregationType.Count:
            case AggregationType.CountDistinct:
                return 'Integer';
            default:
                return column.specifics;
        }
    },
    getDataType: column => null
};
