﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_settings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, _createDataSourceFullscreenWizard, _createDataSourceWizard, _createMultiQueryDataSourceWizard, _DataSourceWizardOptions, _MultiQueryDataSourceWizardOptions, _registerMultiQueryDataSourcePages } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { DataSourceActions } from '../../actions/_dataSourceActions';
import { FederationDataSourceEditor } from '../../actions/_federationDataSourceEditor';
import { JsonDataSourceEditor } from '../../actions/_jsonDataSourceEditor';
import { ObjectDataSourceEditor } from '../../actions/_objectDataSourceEditor';
import { SqlDataSourceEditor } from '../../actions/_sqlDataSourceEditor';
import { DataFederationDataSource } from '../../dataObjects/dataFederation';
import { collectAvailableParameters } from '../../dataObjects/metadata/_parameterUtils';
import { ObjectStorageItem } from '../../dataObjects/objectStorageItem';
import { FieldListDataSourcesHelper } from '../../internal/fieldlist/_fieldListDataSourcesHelper';
import { createReportViewModel } from '../../internal/_utils';
import { ReportDataSourceService } from '../../services/_reportDataSourceService';
import { ReportWizardService } from '../../services/_reportWizardService';
import { _ReportWizardOptions } from '../../wizard/internal/utils';
import { MasterDetailRequestModel } from '../../wizard/internal/_masterDetailRequestModel';
import { _registerReportWizardPages } from '../../wizard/reportWizard';
import { _createReportWizard } from '../../wizard/_reportWizardCreating';
import { OpenReportDialog } from '../dialogs/openReportDialog';
import { SaveAsReportDialog } from '../dialogs/saveAsReportDialog';
import { SaveReportDialog } from '../dialogs/saveReportDialog';
import { QBRequestWrapper } from './_qBRequestWrapper';
export class WizardsInitializerSettings {
    constructor(connectionStrings, wizardSettings, callbacks, rtl, dataSources, predefinedDataSources) {
        this.callbacks = callbacks;
        this.reportWizardOptions = new _ReportWizardOptions();
        this.multiQueryWizardOptions = new _MultiQueryDataSourceWizardOptions();
        this.dataSourceWizardOptions = new _DataSourceWizardOptions();
        [this.reportWizardOptions, this.multiQueryWizardOptions, this.dataSourceWizardOptions].forEach((wizardOptions) => {
            wizardOptions.connectionStrings = connectionStrings;
            wizardOptions.wizardSettings = wizardSettings;
            wizardOptions.requestWrapper = QBRequestWrapper();
            wizardOptions.rtl = rtl;
            wizardOptions.dataSources = dataSources;
            wizardOptions.predefinedDataSources = predefinedDataSources;
        });
    }
    _doFinishCallback(data, connections) {
        if (data.predefinedDataSourceName) {
            this.dataSourceActionProvider.addPredifinedDataSource(data.predefinedDataSourceName);
        }
        else if (data.dataSourceType === DataSourceType.Sql) {
            return this.sqlDataSourceEditor.applySqlDataSourceWizardChanges(data);
        }
        else if (data.dataSourceType === DataSourceType.Federation) {
            return this.federationDataSourceEditor.applyFederationDataSourceWizardChanges(data);
        }
        else if (data.dataSourceType === DataSourceType.Json) {
            const deferred = $.Deferred();
            if (data.jsonDataSourceWizard.jsonSource && data.jsonDataSourceWizard.newConnectionName) {
                this.jsonDataSourceEditor.saveJsonSource(data, connections).
                    done((result) => { deferred.resolve(result); })
                    .fail(() => deferred.reject());
            }
            else {
                this.jsonDataSourceEditor.applyDataSourceWizardChanges(data)
                    .done((result) => { deferred.resolve(result); })
                    .fail(() => deferred.reject());
            }
            return deferred.promise();
        }
        else if (data.dataSourceType === DataSourceType.Object) {
            const deferred = $.Deferred();
            this.objectDataSourceEditor.applyDataSourceWizardChanges(data)
                .done((result) => { deferred.resolve(result); })
                .fail(() => deferred.reject());
        }
        return $.Deferred().resolve(null).promise();
    }
    _getParameters(model) {
        if (model && model()) {
            return collectAvailableParameters(model().parameters()).map((x) => {
                const obj = new ModelSerializer().serialize(x);
                return { name: obj['@Name'], value: obj['@ValueInfo'], type: x.type() };
            });
        }
        return [];
    }
    _getItemsProviderCallBack(itemsProvider) {
        if (itemsProvider)
            return itemsProvider;
        return null;
    }
    createSqlDataSourceWizard(disableCustomSql, itemsProvider, model) {
        this.dataSourceWizardOptions.callbacks = {
            selectStatement: (connection, queryJSON) => QBRequestWrapper().getSelectStatement(connection, queryJSON),
            finishCallback: data => this._doFinishCallback(data, this.dataSourceWizardOptions.connectionStrings),
            customizeQBInitData: (data) => {
                data.parametersItemsProvider = itemsProvider;
                data.requestWrapper = QBRequestWrapper();
                return data;
            },
            getParameters: () => this._getParameters(model),
            getItemsProviderCallback: () => this._getItemsProviderCallBack(itemsProvider())
        };
        this.dataSourceWizardOptions.disableCustomSql = disableCustomSql;
        this.dataSourceWizard = _createDataSourceWizard(undefined, this.dataSourceWizardOptions);
        return this.dataSourceWizard;
    }
    createSqlDataSourceEditor(settings) {
        this.federationDataSourceEditor = new FederationDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider, this.multipleQueriesWizardCallbacks, settings.rtl);
        this.sqlDataSourceEditor = new SqlDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider, this.multipleQueriesWizardCallbacks);
        this.jsonDataSourceEditor = new JsonDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider);
        this.objectDataSourceEditor = new ObjectDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider);
        this.dataSourceActionProvider = new DataSourceActions(settings.dataSourceHelper, settings.model, settings.undoEngine, settings.allowEditDataSource, settings.allowRemoveDataSource, settings.fieldListProvider);
    }
    createMultipleQueriesWizardCallbacks(itemsProvider, model, state) {
        const helper = new FieldListDataSourcesHelper();
        const fieldsCallback = (request, dataSource, useCache) => {
            return helper.wrapFieldsCallback(this.callbacks.fieldLists, state, ko.observableArray(dataSource ? [dataSource] : this.multiQueryWizardOptions.dataSources()), useCache !== null && useCache !== void 0 ? useCache : true)(request);
        };
        this.multipleQueriesWizardCallbacks = {
            selectStatement: (connection, queryJSON) => QBRequestWrapper().getSelectStatement(connection, queryJSON),
            sqlDataSourceResultSchema: (dataSource) => QBRequestWrapper().rebuildResultSchema(dataSource),
            federationDataSourceResultSchema: (dataSource) => QBRequestWrapper().getFederationResultSchema(dataSource),
            finishCallback: data => this._doFinishCallback(data, this.multiQueryWizardOptions.connectionStrings),
            customQueriesPreset: ReportDataSourceService.getCustomQueriesPreset,
            customizeQBInitData: (data) => {
                data.parametersItemsProvider = itemsProvider;
                data.requestWrapper = QBRequestWrapper();
                return data;
            },
            getParameters: () => this._getParameters(model),
            getItemsProviderCallback: () => this._getItemsProviderCallBack(itemsProvider()),
            fieldListsCallback: fieldsCallback
        };
    }
    createMultiQueryDataSourceWizard(disableCustomSql, multipleQueriesWizardCallbacks = this.multipleQueriesWizardCallbacks, allowCreateNewJsonConnection = false) {
        this.multiQueryWizardOptions.callbacks = multipleQueriesWizardCallbacks;
        this.multiQueryWizardOptions.allowCreateNewJsonConnection = allowCreateNewJsonConnection;
        this.multiQueryWizardOptions.disableCustomSql = disableCustomSql;
        this.multiQueryWizardOptions.getSqlConnectionStrings = () => ReportDataSourceService.getWizardSqlDataConnections();
        this.multiQueryWizardOptions.getJsonConnectionStrings = () => ReportDataSourceService.getWizardJsonDataConnections();
        this.registerMultiQueryDataSourceWizardPages = (factory) => {
            _registerMultiQueryDataSourcePages(factory, this.multiQueryWizardOptions);
        };
        if (this.reportWizardOptions.wizardSettings.useFullscreenWizard) {
            this.multiQueryDataSourceWizard = _createDataSourceFullscreenWizard(this.multiQueryWizardOptions);
        }
        else
            this.multiQueryDataSourceWizard = _createMultiQueryDataSourceWizard(undefined, this.multiQueryWizardOptions);
    }
    createReportWizard(settings) {
        this.reportWizardOptions.searchBoxVisibilityMode = settings.data.wizardSettings.reportWizardTemplatesSearchBoxVisibility;
        this.reportWizardOptions.reportTemplates = settings.data.reportWizardTemplates;
        this.reportWizardOptions.allowCreateNewJsonConnection = settings.data.allowCreateNewJsonConnection;
        this.reportWizardOptions.hideDataMemberSubItems = settings.data.isReportServer;
        this.reportWizardOptions.disableCustomSql = settings.data.disableCustomSql;
        this.reportWizardOptions.dataSources = ko.pureComputed(() => {
            let result;
            if (!settings.dataSourceHelper()) {
                result = (settings.data.availableDataSources || []).map(object => {
                    return $.extend({}, object, { data: new ObjectStorageItem(object.data) });
                });
            }
            if (!result) {
                result = settings.data.isReportServer ? settings.dataSourceHelper().availableDataSources : settings.dataSourceHelper().mergedDataSources();
            }
            return result.filter(object => !(object.data instanceof DataFederationDataSource) && !object.hasErrors);
        });
        this.reportWizardOptions.callbacks = $.extend({}, this.multipleQueriesWizardCallbacks, {
            createSqlDataSourceInfo: SqlDataSourceEditor.createSqlDataSourceInfo,
            createJsonDataSourceInfo: JsonDataSourceEditor.createJsonDataSourceInfo,
            getItemsProviderCallback: () => this._getItemsProviderCallBack(this.reportWizard.itemsProvider()),
            finishCallback: (reportWizardModel) => {
                settings.isLoading(true);
                const deferred = $.Deferred();
                ReportWizardService.generateReportFromWizardState(reportWizardModel, MasterDetailRequestModel, settings.state(), (wizardModel) => {
                    this.reportWizard.events.call('beforeFinish', { state: settings.state(), wizardModel: wizardModel });
                })
                    .done((result) => {
                    settings.navigation.currentTab().undoEngine.start();
                    settings.isDirty(true);
                    const newReport = createReportViewModel(result, settings.navigation.currentTab().context().report);
                    settings.navigation.currentTab().changeContext(newReport, '');
                    settings.navigation.currentTab.notifySubscribers();
                    settings.navigation.currentTab().undoEngine.end();
                    settings.isLoading(false);
                    deferred.resolve(newReport);
                })
                    .fail(() => { deferred.reject(); });
                return deferred.promise();
            }
        });
        this.registerReportWizardPages = (factory) => {
            _registerReportWizardPages(factory, this.reportWizardOptions);
        };
        this.reportWizard = _createReportWizard(this.reportWizardOptions);
    }
}
export class ReportDialogSettings {
    constructor(_designerCallbacks) {
        this._designerCallbacks = _designerCallbacks;
    }
    createSaveReportDialog(reportUrls) {
        this.saveReportDialog = new SaveAsReportDialog(reportUrls, this._designerCallbacks);
        this._designerCallbacks.customizeSaveAsDialog && this._designerCallbacks.customizeSaveAsDialog(this.saveReportDialog);
    }
    createSaveReportDialogLight(saveReportDialog = this.saveReportDialog) {
        this.saveReportDialogLight = new SaveReportDialog(saveReportDialog, this._designerCallbacks);
        this._designerCallbacks.customizeSaveDialog && this._designerCallbacks.customizeSaveDialog(this.saveReportDialogLight);
    }
    createOpenReportDialog(reportUrls, navigation) {
        this.openReportDialog = new OpenReportDialog(reportUrls, navigation, this._designerCallbacks);
        this._designerCallbacks.customizeOpenDialog && this._designerCallbacks.customizeOpenDialog(this.openReportDialog);
    }
}
