﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_jsonDataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { getLocalization, ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, DataSourceWizardPageIterator, JsonDataSourceWizardPageId, _createDefaultDataSourceWizardState, _restoreJsonDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { addDataSourceToReport } from '../internal/_dataUtils';
import { ReportDataSourceService } from '../services/_reportDataSourceService';
import { QBRequestWrapper } from '../tools/generator/_qBRequestWrapper';
import { DataSourceEditorBase } from './_sqlDataSourceEditor';
export class JsonEditSchemaIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId) {
        if (!pageId)
            return JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        return super.getNextPageId(pageId);
    }
}
export class JsonDataSourceEditor extends DataSourceEditorBase {
    constructor() {
        super(...arguments);
        this.editSchemaAction = {
            clickAction: (item) => {
                this.editSchema(new PathRequest(item.path).id);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit Schema...', 'DataAccessUIStringId.JsonDataSourceDesignerVerbEditSchema')
        };
    }
    _applyDataSourceChange(source, dest) {
        return JsonDataSourceEditor.createJsonDataSourceInfo(source)
            .done((result) => {
            if (dest) {
                dest.data['base64'](result.base64());
            }
            else {
                addDataSourceToReport(this._dsHelper(), this._reportViewModel(), this._undoEngine(), this._itemsProvider(), result);
            }
        });
    }
    editSchema(dataSourceID) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        ReportDataSourceService.jsonDataSourceFromBase64(dataSourceInfo.data['base64']())
            .done((result) => {
            const jsonDataSource = new JsonDataSource(JSON.parse(result.jsonDataSourceJSON), undefined, QBRequestWrapper());
            jsonDataSource.name(dataSourceInfo.name);
            const jsonSerialized = new ModelSerializer().serialize(jsonDataSource);
            const beforeInitEvent = (e) => {
                e.state.dataSourceType = DataSourceType.Json;
            };
            this._wizard.events.addHandler('beforeInitialize', beforeInitEvent);
            this._wizard.initialize(_createDefaultDataSourceWizardState(undefined, {
                connectionName: jsonDataSource.connectionName(),
                dataSourceName: jsonSerialized['@Name'],
                jsonScheme: JSON.stringify(jsonSerialized['Schema']),
                jsonSource: JSON.stringify(jsonSerialized['Source']),
                rootElement: jsonSerialized['@RootElement']
            }), (factory, stateManager) => new JsonEditSchemaIterator(factory, stateManager, this._wizard['_wizardOptions']));
            this._wizard.events.removeHandler('beforeInitialize', beforeInitEvent);
            this._wizard.start();
            this._wizard.isVisible(true);
        });
    }
    applyDataSourceWizardChanges(dataSourceWizardModel) {
        const jsonDataSource = _restoreJsonDataSourceFromState(dataSourceWizardModel.jsonDataSourceWizard, undefined, dataSourceWizardModel.dataSourceId);
        const dataSource = jsonDataSource && this._dsHelper().findDataSourceInfoByName(jsonDataSource.name());
        return this._applyDataSourceChange(jsonDataSource, dataSource);
    }
    saveJsonSource(state, connections) {
        const jsonDataSourceState = state.jsonDataSourceWizard;
        const jsonDataSource = _restoreJsonDataSourceFromState(jsonDataSourceState);
        const deferred = $.Deferred();
        QBRequestWrapper().saveJsonSource(state.jsonDataSourceWizard.newConnectionName, jsonDataSource)
            .done((connectionName) => {
            if (connections.json().every(x => x.name !== jsonDataSourceState.newConnectionName)) {
                connections.json.push({
                    name: jsonDataSourceState.newConnectionName,
                    description: jsonDataSourceState.newConnectionName
                });
            }
            jsonDataSourceState.connectionName = connectionName;
            jsonDataSourceState.jsonSource = null;
            this.applyDataSourceWizardChanges(state)
                .done((result) => { deferred.resolve(result); })
                .fail(() => deferred.reject());
        })
            .fail(result => { JsonDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    }
    static createJsonDataSourceInfo(source) {
        const deferred = $.Deferred();
        ReportDataSourceService.getJsonDataSourceBase64(source)
            .done((result) => {
            deferred.resolve({
                name: 'jsonDataSource',
                id: source.id,
                data: {
                    '@ObjectType': 'DevExpress.DataAccess.Json.JsonDataSource',
                    '@Base64': result.base64
                },
                isJsonDataSource: true,
                isSupportQueries: result.isSupportQueries,
                isListType: result.isListType,
                base64: () => result.base64
            });
        })
            .fail(result => { JsonDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    }
    getActions(context) {
        const result = [];
        if (!context.data)
            return result;
        if (context.data['isJsonDataSource'] === true) {
            result.push(this.editSchemaAction);
        }
        return result;
    }
}