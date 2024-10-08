﻿/**
* DevExpress Analytics (query-builder\utils\_columnExpressionCollectionHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ColumnExpression } from '../elements/columnExpression';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { getUniqueName } from '../../core/internal/_getNameHelpers';
import { ColumnType } from '../elements/columnExpressionMeta';
import { FederatedQueryExpressionType } from '../dataSource/federation/federatedQueryExpression';
export class ColumnExpressionCollectionHelper {
    static addToColumnCache(collection) {
        collection.forEach(column => {
            var _a;
            (_a = this.columnCache[column.table()]) !== null && _a !== void 0 ? _a : (this.columnCache[column.table()] = {});
            this.columnCache[column.table()][column.column()] = column;
        });
    }
    static clearCache() {
        this.columnCache = {};
    }
    static find(collection, tableName, columnName) {
        return findFirstItemMatchesCondition(collection(), item => item.column() === columnName && item.table() === tableName);
    }
    static findByName(collection, actualName) {
        return findFirstItemMatchesCondition(collection(), (item) => item.actualName() === actualName);
    }
    static removeDependend(collection, tableName) {
        collection.remove((item) => item.isDepended(tableName));
    }
    static toExpresson(column, columns, value) {
        column.table = ko.observable(null);
        column.column = ko.observable(null);
        column.expression = column['__expression'];
        column.itemType(ColumnType[ColumnType.Expression]);
        if (!column.alias())
            column.alias(ColumnExpressionCollectionHelper.setUniqueAlias(columns, 'Expr'));
        column.expression(value);
    }
    static setUniqueAlias(collection, alias) {
        if (ColumnExpressionCollectionHelper.findByName(collection, alias)) {
            return getUniqueName(collection().map((item) => item.actualName()), alias + '_');
        }
        return alias;
    }
    static createNew(query, collection, tableName, columnName) {
        let column = this.columnCache[tableName] && this.columnCache[tableName][columnName];
        const model = { '@Table': tableName, '@Name': columnName, '@ItemType': 'Column' };
        if (column) {
            model['@Alias'] = column.alias();
            column.initialize(model, query);
        }
        else {
            column = new ColumnExpression(model, query);
        }
        if (query.columns === collection && !column.alias() && ColumnExpressionCollectionHelper.findByName(collection, column.actualName())) {
            column.alias(this.setUniqueAlias(collection, column.table() + '_' + column.column()));
        }
        return column;
    }
    static addNew(query, collection, table, column, lazy = false) {
        const newItem = this.createNew(query, collection, table, column);
        (lazy ? collection() : collection).push(newItem);
        return newItem;
    }
    static remove(collection, tableName, columnName, lazy = false) {
        if (!lazy) {
            this.addToColumnCache(collection.remove(item => item.column() === columnName && item.table() === tableName));
        }
        else
            for (let i = 0; i < collection().length; i++) {
                if (collection()[i].column() === columnName && collection()[i].table() === tableName) {
                    this.addToColumnCache(collection().splice(i, 1));
                    return;
                }
            }
    }
    static columnTypeToFederated(type) {
        switch (type) {
            case ColumnType[ColumnType.Expression]:
                return FederatedQueryExpressionType[FederatedQueryExpressionType.SelectExpression];
            case ColumnType[ColumnType.AllColumns]:
                return FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllNodeColumnsExpression];
            case ColumnType[ColumnType.AllColumnsQuery]:
                return FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllColumnsExpression];
            default:
                return FederatedQueryExpressionType[FederatedQueryExpressionType.SelectColumnExpression];
        }
    }
    static federatedTypeToColumn(type) {
        switch (type) {
            case FederatedQueryExpressionType[FederatedQueryExpressionType.SelectExpression]:
                return ColumnType[ColumnType.Expression];
            case FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllNodeColumnsExpression]:
                return ColumnType[ColumnType.AllColumns];
            case FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllColumnsExpression]:
                return ColumnType[ColumnType.AllColumnsQuery];
            default:
                return ColumnType[ColumnType.Column];
        }
    }
}
ColumnExpressionCollectionHelper.columnCache = {};
