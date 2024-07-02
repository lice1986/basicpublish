﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportDataSourceService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { HandlerUri } from '../utils/settings';
export class ReportDataSourceService {
    static fieldListCallback(request) {
        const requestJson = JSON.stringify(request);
        return sendRequest(HandlerUri(), 'fieldList', requestJson);
    }
    static getCustomQueriesPreset(dataSource) {
        return $.Deferred().resolve([]).promise();
    }
    static getWizardSqlDataConnections() {
        return sendRequest(HandlerUri(), 'getWizardSqlDataConnections', '');
    }
    static getWizardJsonDataConnections() {
        return sendRequest(HandlerUri(), 'getWizardJsonDataConnections', '');
    }
    static sqlDataSourceFromBase64(base64) {
        return sendRequest(HandlerUri(), 'dataSourceFromBase64', base64);
    }
    static sqlRebuildResultSchema(base64) {
        return sendRequest(HandlerUri(), 'sqlRebuildResultSchema', base64);
    }
    static getSqlDataSourceBase64(dataSource) {
        return sendRequest(HandlerUri(), 'getDataSourceBase64', JSON.stringify({ sqlDataSourceJSON: JSON.stringify({ SqlDataSource: new ModelSerializer().serialize(dataSource) }) }));
    }
    static federationDataSourceFromBase64(base64, dependentDataSources) {
        return sendRequest(HandlerUri(), 'federationDataSourceFromBase64', JSON.stringify({ base64: base64, dataSources: dependentDataSources }));
    }
    static federationRebuildResultSchema(base64, dependentDataSources) {
        return sendRequest(HandlerUri(), 'federationRebuildResultSchema', JSON.stringify({ base64: base64, dataSources: dependentDataSources }));
    }
    static getFederationDataSourceBase64(dataSource, dependentDataSources) {
        return sendRequest(HandlerUri(), 'getFederationDataSourceBase64', JSON.stringify({ federationDataSourceJSON: JSON.stringify({ FederationDataSource: new ModelSerializer().serialize(dataSource) }), dataSources: dependentDataSources }));
    }
    static getJsonDataSourceBase64(dataSource) {
        return sendRequest(HandlerUri(), 'getJsonDataSourceBase64', JSON.stringify({ jsonDataSourceJSON: JSON.stringify({ JsonDataSource: new ModelSerializer().serialize(dataSource) }) }));
    }
    static getObjectDataSourceBase64(json) {
        return sendRequest(HandlerUri(), 'getObjectDataSourceBase64', JSON.stringify(json));
    }
    static editObjectDataSourceParameters(json, base64) {
        return sendRequest(HandlerUri(), 'editObjectDataSourceParameters', JSON.stringify({ objectDataSourceModel: json, base64: base64 }));
    }
    static objectDataSourceFromBase64(base64) {
        return sendRequest(HandlerUri(), 'objectDataSourceFromBase64', base64);
    }
    static jsonDataSourceFromBase64(base64) {
        return sendRequest(HandlerUri(), 'jsonDataSourceFromBase64', JSON.stringify({ base64: base64 }));
    }
}
