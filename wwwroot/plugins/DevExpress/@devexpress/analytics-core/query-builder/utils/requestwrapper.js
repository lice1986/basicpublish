﻿/**
* DevExpress Analytics (query-builder\utils\requestwrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '../../core/utils/_utils.ajax';
import { HandlerUri } from '../initializer';
import { ModelSerializer } from '../../serializer/serializer';
import { serializeDataConnection } from './_dataConnection';
export class RequestWrapper {
    sendRequest(action, arg) {
        return sendRequest(HandlerUri(), action, arg);
    }
    _sendRequest(settings) {
        return sendRequest(settings);
    }
    getDbSchema({ connection, tables, getViews, getTables }) {
        const requestModel = {
            connectionJSON: serializeDataConnection(connection),
            tables: null,
            views: null,
            getTables,
            getViews
        };
        if (tables && tables.length > 0) {
            requestModel.tables = (tables || []).filter(x => !x.isView).map(x => x.name);
            requestModel.views = (tables || []).filter(x => x.isView).map(x => x.name);
        }
        return this.sendRequest('getDBSchema', JSON.stringify(requestModel));
    }
    getDbStoredProcedures(connection) {
        const requestJson = JSON.stringify({
            connectionJSON: serializeDataConnection(connection)
        });
        return this.sendRequest('getDBStoredProcedures', requestJson);
    }
    getSelectStatement(connection, queryJSON) {
        const requestJson = JSON.stringify({
            connectionJSON: serializeDataConnection(connection),
            sqlQueryJSON: queryJSON
        });
        return this.sendRequest('getSelectStatement', requestJson);
    }
    getDataPreview(connection, queryJSON) {
        const requestJson = JSON.stringify({
            connectionJSON: serializeDataConnection(connection),
            sqlQueryJSON: queryJSON
        });
        return this.sendRequest('getDataPreview', requestJson);
    }
    rebuildResultSchema(dataSource, queryName, relationsEditing = false, parameters) {
        const requestJson = JSON.stringify({
            sqlDataSourceJSON: JSON.stringify({ 'SqlDataSource': new ModelSerializer().serialize(dataSource) }),
            queryName: queryName,
            relationsEditing: relationsEditing,
            parameters: parameters
        });
        return this.sendRequest('rebuildResultSchema', requestJson);
    }
    getFederationResultSchema(dataSource) {
        const serializedModel = dataSource.getSerializableModel().getSerializableFederationDataSourceInfo();
        const requestJson = JSON.stringify({
            federationDataSourceJSON: JSON.stringify({ 'FederationDataSource': new ModelSerializer().serialize(dataSource) }),
            dataSources: serializedModel.dataSources
        });
        return this.sendRequest('getFederationResultSchema', requestJson);
    }
    validateJsonUri(jsonDataSource) {
        const uriJsonSourceJSON = JSON.stringify(jsonDataSource.source.serialize(true));
        const requestJson = JSON.stringify({
            uriJsonSourceJSON: uriJsonSourceJSON
        });
        const ajaxSettings = {
            uri: HandlerUri(),
            action: 'validateJsonEndPoint',
            arg: requestJson,
            ignoreError: () => true
        };
        return this._sendRequest(ajaxSettings);
    }
    saveJsonSource(connectionName, jsonDataSource) {
        const jsonSource = jsonDataSource.source;
        const jsonSourceJSON = JSON.stringify(jsonSource.serialize(true));
        const requestString = JSON.stringify({
            connectionName: connectionName,
            customJson: jsonSource.json(),
            uriJsonSourceJSON: jsonSourceJSON
        });
        return this.sendRequest('saveJsonSource', requestString);
    }
    getJsonSchema(jsonDataSource, parameters) {
        const jsonSource = jsonDataSource.source;
        const jsonSourceJSON = JSON.stringify(jsonSource.serialize(true));
        const requestString = JSON.stringify({
            connectionName: jsonDataSource.connectionName(),
            customJson: jsonSource.json(),
            uriJsonSourceJSON: jsonSourceJSON,
            parameters: parameters
        });
        return this.sendRequest('getJsonSchema', requestString);
    }
    getObjectTypeDescriptions(context) {
        return this.sendRequest('getObjectSchema', context);
    }
}