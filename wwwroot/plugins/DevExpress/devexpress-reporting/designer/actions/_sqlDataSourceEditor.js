﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_sqlDataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ResultSet, SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { sendRequest, getErrorMessage, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, DataSourceWizardPageIterator, SqlDataSourceWizardPageId, _restoreSqlDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { MasterDetailEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { addDataSourceToReport } from '../internal/_dataUtils';
import { ReportDataSourceService } from '../services/_reportDataSourceService';
import { QBRequestWrapper } from '../tools/generator/_qBRequestWrapper';
import { HandlerUri } from '../utils/settings';
export class DataSourceEditorBase {
    constructor(_dsHelper, _wizard, _reportViewModel, _undoEngine, _itemsProvider, _callbacks, _rtl) {
        this._dsHelper = _dsHelper;
        this._wizard = _wizard;
        this._reportViewModel = _reportViewModel;
        this._undoEngine = _undoEngine;
        this._itemsProvider = _itemsProvider;
        this._callbacks = _callbacks;
        this._rtl = _rtl;
    }
    _findDataSource(dataSourceID) {
        return this._dsHelper().usedDataSources().filter((item) => {
            return item.id === dataSourceID || item.ref === dataSourceID;
        })[0];
    }
    static _onFail(result, deferred) {
        if (getErrorMessage(result))
            ShowMessage(getErrorMessage(result));
        deferred.reject(result);
    }
}
export class CreateQueryIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId) {
        if (!pageId) {
            return SqlDataSourceWizardPageId.ConfigureQueryPage;
        }
        return super.getNextPageId(pageId);
    }
}
export class SqlDataSourceEditor extends DataSourceEditorBase {
    constructor() {
        super(...arguments);
        this.relationsEditor = ko.observable();
        this.addAction = {
            clickAction: (item) => {
                this.addSqlQuery(item.data.name);
            },
            imageClassName: 'dxrd-image-add-query',
            imageTemplateName: 'dxrd-svg-operations-add_query',
            text: getLocalization('Add query', 'AnalyticsCoreStringId.SqlDSWizard_AddQuery')
        };
        this.editAction = {
            clickAction: (item) => {
                this.editSqlQuery(new PathRequest(item.path).id, item.name);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit query', 'AnalyticsCoreStringId.SqlDSWizard_EditQuery')
        };
        this.removeAction = {
            clickAction: (item) => {
                this.removeSqlQuery(new PathRequest(item.path).id, item.name);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: getLocalization('Remove query', 'AnalyticsCoreStringId.SqlDSWizard_RemoveQuery')
        };
        this.editRelationsAction = {
            clickAction: (item) => {
                this.editMasterDetailRelations(item.data.name);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit Master-Detail Relations', 'ASPxReportsStringId.ReportDesigner_FieldListActions_EditMasterDetailRelations')
        };
    }
    _applyWizardChanges(dataSource, sqlDataSource, queryName, relationsEditing) {
        return this._applyDataSourceChange(sqlDataSource, dataSource, queryName, relationsEditing);
    }
    _createOrEditSqlDataSource(requestJson, dataSource, requestName) {
        return sendRequest(HandlerUri(), requestName, requestJson)
            .done((result) => {
            result.dataSource.data = JSON.parse(result.dataSource.data);
            result.dataSource.isSqlDataSource = true;
            if (dataSource) {
                dataSource.data['base64'](result.dataSource.data['@Base64']);
            }
            else {
                addDataSourceToReport(this._dsHelper(), this._reportViewModel(), this._undoEngine(), this._itemsProvider(), result.dataSource);
            }
        })
            .fail((result) => {
            if (getErrorMessage(result))
                ShowMessage(getErrorMessage(result));
        });
    }
    _applyDataSourceChange(source, dest, queryName, relationsEditing) {
        var _a, _b;
        return SqlDataSourceEditor.createSqlDataSourceInfo(source, queryName, relationsEditing, ((_a = this._callbacks) === null || _a === void 0 ? void 0 : _a.getParameters) && ((_b = this._callbacks) === null || _b === void 0 ? void 0 : _b.getParameters()))
            .done((result) => {
            if (dest) {
                dest.data['base64'](result.base64());
            }
            else {
                addDataSourceToReport(this._dsHelper(), this._reportViewModel(), this._undoEngine(), this._itemsProvider(), result);
            }
        });
    }
    editSqlQuery(dataSourceID, queryName) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done((result) => {
            const sqlDataSource = new SqlDataSource(JSON.parse(result.sqlDataSourceJSON), undefined, QBRequestWrapper());
            sqlDataSource.name(dataSourceInfo.name);
            this._wizard.initialize({
                dataSourceType: DataSourceType.Sql,
                sqlDataSourceWizard: {
                    name: sqlDataSource.connection.name(),
                    queryName: queryName,
                    sqlDataSourceJSON: JSON.stringify(new ModelSerializer().serialize(sqlDataSource))
                }
            }, (factory, stateManager) => new CreateQueryIterator(factory, stateManager, this._wizard['_wizardOptions']));
            this._wizard.start();
            this._wizard.isVisible(true);
        });
    }
    addSqlQuery(dataSourceID) {
        this.editSqlQuery(dataSourceID, null);
    }
    removeSqlQuery(dataSourceID, queryName) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done((result) => {
            const sqlDataSource = new SqlDataSource(JSON.parse(result.sqlDataSourceJSON));
            sqlDataSource.queries.remove(x => { return x.name() === queryName; });
            this._applyWizardChanges(dataSourceInfo, sqlDataSource, queryName);
        });
    }
    editMasterDetailRelations(dataSourceID) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done((result) => {
            const sqlDataSource = new SqlDataSource(JSON.parse(result.sqlDataSourceJSON));
            if (sqlDataSource.queries().length < 2) {
                ShowMessage(getLocalization('At least two queries are required to create a master-detail relation.', 'DataAccessUIStringId.MessageLessThanTwoQueries'), 'warning', 10000);
                return;
            }
            this.relationsEditor(new MasterDetailEditor(sqlDataSource.relations, sqlDataSource.resultSet, () => {
                return this._applyWizardChanges(dataSourceInfo, sqlDataSource, '', true);
            }));
            this.relationsEditor().popupVisible(true);
        });
    }
    applySqlDataSourceWizardChanges(dataSourceWizardModel) {
        const dataSourceWrapped = _restoreSqlDataSourceFromState(dataSourceWizardModel.sqlDataSourceWizard, QBRequestWrapper(), dataSourceWizardModel.dataSourceId);
        const dataSource = this._dsHelper().findDataSourceInfoByName(dataSourceWrapped.sqlDataSource.name());
        return this._applyDataSourceChange(dataSourceWrapped.sqlDataSource, dataSource, dataSourceWrapped.sqlQuery && dataSourceWrapped.sqlQuery.name());
    }
    static rebuildResultSchema(source, queryName, relationsEditing, parameters) {
        return QBRequestWrapper().rebuildResultSchema(source, queryName, relationsEditing, parameters)
            .done((result) => {
            const model = JSON.parse(result.resultSchemaJSON);
            source.resultSet = !!model ? new ResultSet(model) : null;
            if (!!result.connectionParameters) {
                source.connection.parameteres((x => { try {
                    return JSON.parse(x)['Parameters'] || x;
                }
                catch (_) {
                    return x;
                } })(result.connectionParameters));
                source.connection.fromAppConfig(false);
            }
        });
    }
    static createSqlDataSourceInfo(source, queryName, relationsEditing, parameters) {
        const deferred = $.Deferred();
        SqlDataSourceEditor.rebuildResultSchema(source, queryName, relationsEditing, parameters).done((_) => {
            ReportDataSourceService.getSqlDataSourceBase64(source)
                .done((result) => {
                deferred.resolve({
                    name: 'sqlDataSource',
                    id: source.id,
                    data: {
                        '@ObjectType': 'DevExpress.DataAccess.Sql.SqlDataSource',
                        '@Base64': result
                    },
                    isListType: false,
                    isSupportQueries: true,
                    isSqlDataSource: true,
                    base64: () => result
                });
            })
                .fail(result => { SqlDataSourceEditor._onFail(result, deferred); });
        }).fail(result => { SqlDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    }
    getActions(context) {
        const result = [];
        if (!context.data)
            return result;
        if (context.data['canAddSqlQuery'] === true) {
            result.push(this.addAction);
            result.push(this.editRelationsAction);
        }
        if (context.data['canEditQuery'] === true) {
            result.push(this.editAction);
            result.push(this.removeAction);
        }
        return result;
    }
}
