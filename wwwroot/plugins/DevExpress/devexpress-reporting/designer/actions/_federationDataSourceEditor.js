﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_federationDataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FederationDataSource, FederationMasterDetailRelation, ResultSet } from '@devexpress/analytics-core/analytics-data';
import { FieldListProvider, getLocalization, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { _restoreFederationDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { FederationDataSourceItemsExtender } from '@devexpress/analytics-core/analytics-wizard-internal';
import { FederationQueryType } from '@devexpress/analytics-core/queryBuilder-utils';
import { FederatedQueriesHelper, ManageFederatedQueriesEditor, MasterDetailEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { DataFederationDataSource } from '../dataObjects/dataFederation';
import { addDataSourceToReport } from '../internal/_dataUtils';
import { ReportDataSourceService } from '../services/_reportDataSourceService';
import { QBRequestWrapper } from '../tools/generator/_qBRequestWrapper';
import { DataSourceEditorBase } from './_sqlDataSourceEditor';
export class FederationDataSourceEditor extends DataSourceEditorBase {
    constructor() {
        super(...arguments);
        this.addAction = {
            clickAction: (item) => {
                this.openManageQueriesEditor(item.data.name);
            },
            imageClassName: 'dxrd-image-add-query',
            imageTemplateName: 'dxrd-svg-operations-add_query',
            text: getLocalization('Manage Queries...', 'DataAccessUIStringId.FederationDataSourceDesignerVerbManageQueries')
        };
        this.editAction = {
            clickAction: (item) => {
                const dataSourceInfo = this._findDataSource(item.path.split('.')[0]);
                this.getFederationDataSourceByInfo(dataSourceInfo).done(federationDataSource => {
                    const query = federationDataSource.queries().filter(x => x.alias() === item.name)[0];
                    this.queriesPopupHelper(new FederatedQueriesHelper(federationDataSource, federationDataSource.queries, {
                        onSave: () => this.saveDataSourceInfo(federationDataSource, dataSourceInfo),
                        onClose: () => this.queriesPopupHelper().dispose()
                    }, this._rtl));
                    this.queriesPopupHelper().editQuery(FederationQueryType[query.queryType()], query.alias());
                });
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit query', 'AnalyticsCoreStringId.SqlDSWizard_EditQuery')
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
        this.removeAction = {
            clickAction: (item) => {
                const dataSourceInfo = this._findDataSource(item.path.split('.')[0]);
                this.getFederationDataSourceByInfo(dataSourceInfo).done(federationDataSource => {
                    const query = federationDataSource.queries().filter(x => x.alias() === item.name)[0];
                    federationDataSource.queries.remove(query);
                    this.saveDataSourceInfo(federationDataSource, dataSourceInfo);
                });
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: getLocalization('Remove query', 'AnalyticsCoreStringId.SqlDSWizard_RemoveQuery')
        };
        this.relationsEditor = ko.observable();
        this.manageQueriesEditor = ko.observable();
        this.queriesPopupHelper = ko.observable();
    }
    _applyFederationDataSourceWizardChanges(federationDataSource, dataSourceInfo) {
        return FederationDataSourceEditor.createFederationDataSourceInfo(federationDataSource)
            .done((result) => {
            if (dataSourceInfo) {
                dataSourceInfo.data['base64'](result.base64());
            }
            else {
                result.data = new DataFederationDataSource(result.data, this._dsHelper(), new ModelSerializer());
                result.data.serializableSourceMap(federationDataSource.serializableSourceMap());
                addDataSourceToReport(this._dsHelper(), this._reportViewModel(), this._undoEngine(), this._itemsProvider(), result);
            }
        });
    }
    applyFederationDataSourceWizardChanges(dataSourceWizardModel) {
        const federationDataSource = _restoreFederationDataSourceFromState(dataSourceWizardModel.federationDataSourceWizard, this._dsHelper().usedDataSources, dataSourceWizardModel.dataSourceId);
        return this._applyFederationDataSourceWizardChanges(federationDataSource);
    }
    static createFederationDataSourceInfo(dataSource) {
        const deferred = $.Deferred();
        ReportDataSourceService.getFederationDataSourceBase64(dataSource, dataSource.dependentDataSources)
            .done((result) => {
            deferred.resolve({
                name: 'federationDataSource',
                id: dataSource.id,
                data: {
                    '@ObjectType': 'DevExpress.DataAccess.DataFederation.FederationDataSource',
                    '@Base64': result
                },
                isFederationDataSource: true,
                isListType: false,
                isSupportQueries: true,
                base64: () => result
            });
        })
            .fail(result => { DataSourceEditorBase._onFail(result, deferred); });
        return deferred.promise();
    }
    _wrapFieldListCallback(itemsCallback) {
        return (pathRequest, dataSource) => {
            return itemsCallback(pathRequest, dataSource, false);
        };
    }
    getFederationDataSourceByInfo(dataSourceInfo) {
        const deferred = $.Deferred();
        const rootManageQueriesDataSources = ko.observableArray(this._dsHelper().usedDataSources().filter(x => x !== dataSourceInfo));
        ReportDataSourceService.federationDataSourceFromBase64(dataSourceInfo.data['base64'](), dataSourceInfo.data.dependentDataSources).done((result) => {
            const fieldListProvider = new FieldListProvider(this._wrapFieldListCallback(this._callbacks.fieldListsCallback), rootManageQueriesDataSources, [new FederationDataSourceItemsExtender(rootManageQueriesDataSources)], true);
            const federationDataSource = new FederationDataSource(JSON.parse(result.federationDataSourceJSON), rootManageQueriesDataSources, fieldListProvider);
            federationDataSource.name(dataSourceInfo.name);
            deferred.resolve(federationDataSource);
        });
        return deferred;
    }
    editMasterDetailRelations(dataSourceID) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        this.getFederationDataSourceByInfo(dataSourceInfo).done(federationDataSource => {
            if (federationDataSource.queries().length < 2) {
                ShowMessage(getLocalization('At least two queries are required to create a master-detail relation.', 'DataAccessUIStringId.MessageLessThanTwoQueries'), 'warning', 10000);
                return;
            }
            QBRequestWrapper().getFederationResultSchema(federationDataSource).done((schemaResult) => {
                this.relationsEditor(new MasterDetailEditor(federationDataSource.relations, new ResultSet(JSON.parse(schemaResult.resultSchemaJSON)), () => {
                    federationDataSource.relations(federationDataSource.relations().map(x => FederationMasterDetailRelation.create(x)));
                    return this._applyFederationDataSourceWizardChanges(federationDataSource, dataSourceInfo);
                }));
                this.relationsEditor().popupVisible(true);
            });
        });
    }
    saveDataSourceInfo(federationDataSource, dataSourceInfo) {
        this._undoEngine().start();
        federationDataSource.updateSerializableModel();
        dataSourceInfo.data.serializableSourceMap(federationDataSource.serializableSourceMap());
        this._applyFederationDataSourceWizardChanges(federationDataSource, dataSourceInfo).always(() => {
            this._undoEngine().end();
        });
    }
    openManageQueriesEditor(dataSourceID) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        this.getFederationDataSourceByInfo(dataSourceInfo).done(federationDataSource => {
            this.manageQueriesEditor() && this.manageQueriesEditor().dispose();
            this.manageQueriesEditor(new ManageFederatedQueriesEditor(federationDataSource, () => this.saveDataSourceInfo(federationDataSource, dataSourceInfo), this._rtl));
            this.manageQueriesEditor().popupVisible(true);
        });
    }
    getActions(context) {
        const result = [];
        if (!context.data)
            return result;
        if (context.data['canAddFederatedQuery']) {
            result.push(this.addAction);
            result.push(this.editRelationsAction);
        }
        if (context.data['canEditFederatedQuery']) {
            result.push(this.editAction);
            result.push(this.removeAction);
        }
        return result;
    }
}
