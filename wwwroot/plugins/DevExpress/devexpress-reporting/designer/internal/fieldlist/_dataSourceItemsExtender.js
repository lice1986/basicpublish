﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_dataSourceItemsExtender.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFirstItemByPropertyValue } from '@devexpress/analytics-core/analytics-internal';
export class DataSourceItemsExtender {
    constructor(dataSources, _renameCallback) {
        this._renameCallback = _renameCallback;
        this._dataSources = dataSources;
    }
    beforeItemsFilled(request, items) {
        return false;
    }
    afterItemsFilled(request, items) {
        if (!(this._dataSources && this._dataSources.peek()))
            return;
        if (!request.fullPath) {
            this._dataSources.peek().forEach((dataSourceItem) => {
                const dataMember = getFirstItemByPropertyValue(items, 'displayName', dataSourceItem.name);
                if (!(dataMember && dataSourceItem.data))
                    return;
                if (dataSourceItem.data.tableInfoCollection) {
                    dataMember['contenttemplate'] = 'dxrd-datasource-item';
                    dataMember['tableInfoItems'] = dataSourceItem.data.tableInfoCollection;
                }
                else if (dataSourceItem.isSqlDataSource) {
                    dataMember['canAddSqlQuery'] = true;
                    dataMember['isSqlDataSource'] = true;
                }
                else if (dataSourceItem.isFederationDataSource) {
                    dataMember['canAddFederatedQuery'] = true;
                    dataMember['isFederationDataSource'] = true;
                }
                else if (dataSourceItem.isJsonDataSource) {
                    dataMember['isJsonDataSource'] = true;
                }
                else if (dataSourceItem.isObjectDataSource) {
                    dataMember['isObjectDataSource'] = true;
                    dataMember['hasParams'] = dataSourceItem['hasParams'];
                }
                dataMember['canRemove'] = true;
                dataMember['rename'] = (newName) => this._renameCallback(newName, dataSourceItem);
            });
        }
        else if (request.fullPath === request.id || request.fullPath === request.ref) {
            const dataSourcesInfo = this._dataSources.peek().filter((dataSourceItem) => {
                return !!dataSourceItem.id && dataSourceItem.id === request.id || !!dataSourceItem.ref && dataSourceItem.ref === request.ref;
            })[0];
            if (!dataSourcesInfo || (!dataSourcesInfo.isSqlDataSource && !dataSourcesInfo.isFederationDataSource))
                return;
            items.forEach((dataMemberItem) => {
                dataMemberItem['canEditQuery'] = dataSourcesInfo.isSqlDataSource && dataMemberItem.isList;
                dataMemberItem['canEditFederatedQuery'] = dataSourcesInfo.isFederationDataSource && dataMemberItem.isList;
            });
        }
    }
}