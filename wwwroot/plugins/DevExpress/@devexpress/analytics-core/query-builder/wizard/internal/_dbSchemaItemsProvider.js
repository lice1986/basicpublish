﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_dbSchemaItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { findFirstItemMatchesCondition } from '../../../core/utils/_arrayutils';
import { TreeNode, ParameterTreeNode, QueriesTreeNode, TreeLeafNode, TreeQueryNode } from './_treeListNode';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { StoredProceduresQueryControl } from './_storedProceduresQueryControl';
import { Disposable } from '../../../serializer/disposable';
export class DBSchemaItemsProvider extends Disposable {
    constructor(dbSchemaProvider, customQueries, showQbCallBack, disableCustomSql, afterCheckToggled) {
        super();
        this._callBack = ko.observable({
            deleteAction: (name) => {
                this._customQueries
                    .remove(findFirstItemMatchesCondition(this._customQueries(), item => (item.name() || item.generateName()) === name));
            },
            showQbCallBack: null,
            disableCustomSql: false,
        });
        this._checkedRootNodesCount = ko.pureComputed(() => {
            let count = 0;
            for (let i = 0; i < this._rootItems.length && count < 2; i++) {
                count += this._rootItems[i].countChecked();
            }
            return count;
        });
        this.hasCheckedItems = ko.pureComputed(() => {
            return !(this._checkedRootNodesCount() === 0);
        });
        this.nextButtonDisabled = ko.pureComputed(() => {
            if (this._checkedRootNodesCount() > 1) {
                return false;
            }
            return !this.hasParametersToEdit();
        });
        this.hasParametersToEdit = ko.pureComputed(() => {
            for (let i = 0; i < this._rootItems.length; i++) {
                if (this._rootItems[i]['hasParamsToEdit'] && this._rootItems[i]['hasParamsToEdit']())
                    return true;
            }
            return false;
        });
        this.tables = () => this._tables;
        this.views = () => this._views;
        this.procedures = () => this._procedures;
        this.queries = () => this._queries;
        this.customQueries = () => this._customQueries;
        this._callBack().showQbCallBack = showQbCallBack;
        this._callBack().disableCustomSql = disableCustomSql;
        this._tables = new TreeNode('tables', getLocalization('Tables', 'DataAccessStringId.ConfigureMultiQueryPage_TableCategory'), 'list', false, afterCheckToggled);
        this._views = new TreeNode('views', getLocalization('Views', 'DataAccessStringId.ConfigureMultiQueryPage_ViewCategory'), 'list', false, afterCheckToggled);
        this._procedures = new ParameterTreeNode('procedures', getLocalization('Stored Procedures', 'DataAccessStringId.ConfigureMultiQueryPage_SpCategory'), 'list', false, afterCheckToggled);
        this._queries = new QueriesTreeNode('queries', getLocalization('Queries', 'DataAccessStringId.ConfigureMultiQueryPage_QueryCategory'), 'list', false, this._callBack, afterCheckToggled);
        this._disposables.push(...[this._tables, this._views, this._procedures, this._queries]);
        this._rootItems = [
            this._tables,
            this._views,
            this._procedures,
            this._queries
        ];
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (!pathRequest.fullPath) {
                result.resolve(this._rootItems);
            }
            else if (pathRequest.fullPath === 'tables') {
                dbSchemaProvider.getDbTables().done((dbSchema) => {
                    if (this._tables.children().length === 0) {
                        const tables = [];
                        dbSchema.tables.forEach(table => {
                            if (!table.isView) {
                                tables.push(new TreeNode(table.name, table.name, 'table', this._tables.checked.peek(), afterCheckToggled));
                            }
                        });
                        this._tables.initializeChildren(tables);
                        result.resolve(tables);
                    }
                    else {
                        result.resolve(this._tables.children());
                    }
                }).fail(result.reject);
            }
            else if (pathRequest.fullPath === 'views') {
                dbSchemaProvider.getDbViews().done((dbSchema) => {
                    if (this._views.children().length === 0) {
                        const views = [];
                        dbSchema.tables.forEach(table => {
                            if (table.isView) {
                                views.push(new TreeNode(table.name, table.name, 'view', this._views.checked.peek(), afterCheckToggled));
                            }
                        });
                        this._views.initializeChildren(views);
                        result.resolve(views);
                    }
                    else {
                        result.resolve(this._views.children());
                    }
                }).fail(result.reject);
            }
            else if (pathRequest.fullPath === 'procedures') {
                dbSchemaProvider.getDbStoredProcedures().done((storedProcedures) => {
                    if (this._procedures.children().length === 0) {
                        const procedures = storedProcedures.map(proc => {
                            const node = new TreeLeafNode(proc.name, StoredProceduresQueryControl.generateStoredProcedureDisplayName(proc), 'procedure', this._procedures.checked.peek(), proc.arguments, afterCheckToggled);
                            this._disposables.push(node);
                            return node;
                        });
                        this._procedures.initializeChildren(procedures);
                        result.resolve(procedures);
                    }
                    else {
                        result.resolve(this._procedures.children());
                    }
                }).fail(result.reject);
            }
            else if (pathRequest.fullPath === 'queries') {
                const queries = customQueries().map(query => {
                    const name = query.name() || query.generateName();
                    const currentQuery = this._queries.children().filter(q => q['query'] === query)[0];
                    if (currentQuery)
                        return currentQuery;
                    const queryNode = new TreeQueryNode(name, name, 'query', !!currentQuery && currentQuery.checked(), query.parameters, this._callBack, afterCheckToggled, query);
                    this._disposables.push(queryNode);
                    queryNode.setObservableName(() => query.name() || query.generateName(), (newVal) => query.name(newVal));
                    return queryNode;
                });
                this._queries.initializeChildren(queries);
                result.resolve(queries);
            }
            else {
                dbSchemaProvider.getDbTable(pathRequest.path, pathRequest.fullPath).done((table) => {
                    let tableTreeNode;
                    if (table.isView) {
                        tableTreeNode = findFirstItemMatchesCondition(this._views.children(), item => item.name === table.name);
                    }
                    else {
                        tableTreeNode = findFirstItemMatchesCondition(this._tables.children(), item => item.name === table.name);
                    }
                    if (tableTreeNode.children().length === 0) {
                        const columns = table.columns.map(column => {
                            const node = new TreeLeafNode(column.name, column.name, 'column', tableTreeNode.checked.peek(), null, afterCheckToggled);
                            this._disposables.push(node);
                            return node;
                        });
                        tableTreeNode.initializeChildren(columns);
                        result.resolve(columns);
                    }
                    else {
                        result.resolve(tableTreeNode.children());
                    }
                }).fail(result.reject);
            }
            return result.promise();
        };
        this._customQueries = customQueries;
    }
}
