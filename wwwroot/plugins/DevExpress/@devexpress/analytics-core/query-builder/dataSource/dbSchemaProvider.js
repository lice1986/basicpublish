﻿/**
* DevExpress Analytics (query-builder\dataSource\dbSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { DBSchema } from './dbSchema';
import { Disposable } from '../../serializer/disposable';
import { getDBSchemaCallback, getDBStoredProceduresCallback } from './_dbSchemaProvider';
import { RequestWrapper } from '../utils/requestwrapper';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { isCustomizedWithUpdateLocalizationMethod } from '../../property-grid/localization/_localization';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { formatUnicorn } from '../../property-grid/widgets/internal/_utils';
export class DBSchemaProvider extends Disposable {
    constructor(connection, _requestWrapper = new RequestWrapper()) {
        super();
        this._requestWrapper = _requestWrapper;
        this._tables = {};
        this._tableRequests = ko.observableArray([]).extend({ deferred: true });
        this.connection = connection;
        this._disposables.push(this.connection.name.subscribe(() => {
            this._tables = {};
            this._dbSchema = null;
            this._dbStoredProceduresSchema = null;
        }));
        this._disposables.push(ko.computed(() => {
            const tableRequests = this._tableRequests();
            if (!tableRequests.length)
                return;
            this._tableRequests([]);
            const tables = tableRequests.map(x => x.table);
            this._getDBSchema(tables).done(dbSchema => {
                tableRequests.forEach(tableRequest => {
                    const schemaTable = dbSchema.tables.filter(x => x.name === tableRequest.table.name)[0];
                    if (!schemaTable) {
                        tableRequest.deferred.reject();
                        return;
                    }
                    tableRequest.table.columns = schemaTable.columns;
                    tableRequest.deferred.resolve(tableRequest.table);
                });
            }).fail(() => tableRequests.forEach(request => request.deferred.reject()));
        }));
        this.getItems = (pathRequest) => {
            const deferred = $.Deferred();
            if (!pathRequest.fullPath) {
                this.getDbSchema().done((dbSchema) => {
                    deferred.resolve($.map(dbSchema.tables, (item) => {
                        const dataMemberInfo = {
                            name: item.name,
                            displayName: item.name,
                            isList: false,
                            specifics: item.isView ? 'view' : 'table',
                            dragData: { noDragable: false }
                        };
                        return dataMemberInfo;
                    }));
                });
            }
            else {
                deferred.resolve([]);
            }
            return deferred.promise();
        };
    }
    _getDBSchema(tables, getViews, getTables) {
        return getDBSchemaCallback({
            requestWrapper: this._requestWrapper,
            connection: this.connection,
            tables,
            getTables,
            getViews
        });
    }
    _getDBStoredProcedures(connection) {
        return getDBStoredProceduresCallback(this._requestWrapper, connection);
    }
    getDbViews() {
        if (!this._dbViewsSchema || this._dbViewsSchema.state() === 'rejected')
            this._dbViewsSchema = this._getDBSchema(undefined, true, false);
        return this._dbViewsSchema;
    }
    getDbTables() {
        if (!this._dbTablesSchema || this._dbTablesSchema.state() === 'rejected')
            this._dbTablesSchema = this._getDBSchema(undefined, false, true);
        return this._dbTablesSchema;
    }
    getDbSchema() {
        if (!this._dbSchema || this._dbSchema.state() === 'rejected') {
            const _dbSchemaDef = $.Deferred();
            this._dbSchema = _dbSchemaDef;
            $.when(this.getDbTables(), this.getDbViews()).done((res1, res2) => {
                const dbSchema = new DBSchema({});
                dbSchema.assignTablesAndViews(res1.tables, res2.tables);
                _dbSchemaDef.resolve(dbSchema);
            }).fail(() => _dbSchemaDef.reject());
        }
        return this._dbSchema;
    }
    getDbStoredProcedures() {
        if (!this._dbStoredProceduresSchema || this._dbStoredProceduresSchema.state() === 'rejected')
            this._dbStoredProceduresSchema = this._getDBStoredProcedures(this.connection);
        return this._dbStoredProceduresSchema;
    }
    getDbTable(tableName, fullPath = '') {
        let schemaRequest = this.getDbSchema;
        if (fullPath.indexOf('tables') !== -1)
            schemaRequest = this.getDbTables;
        else if (fullPath.indexOf('views') !== -1)
            schemaRequest = this.getDbViews;
        if (!this._tables[tableName]) {
            const deferred = $.Deferred();
            this._tables[tableName] = deferred.promise();
            schemaRequest.call(this).done((dbSchema) => {
                const table = findFirstItemMatchesCondition(dbSchema.tables, table => table.name === tableName);
                if (!table) {
                    deferred.reject();
                    isCustomizedWithUpdateLocalizationMethod('The schema does not contain the specified table: ') ?
                        getLocalization('The schema does not contain the specified table: ') + "'" + tableName + "'." :
                        formatUnicorn(getLocalization('The schema does not contain the specified table: "{0}".', 'DataAccessStringId.TableNotInSchemaValidationException'), tableName);
                }
                else if (table.columns.length > 0) {
                    deferred.resolve(table);
                }
                else {
                    this._tableRequests.push({ table: table, deferred: deferred });
                }
            }).fail(() => deferred.reject());
        }
        return this._tables[tableName];
    }
}
