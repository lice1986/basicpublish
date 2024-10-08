﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataFederation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableDataFederationDataSource as AnalyticsSerializableFederationDataSource } from '@devexpress/analytics-core/analytics-data';
import * as ko from 'knockout';
import { ObjectStorageItem } from './objectStorageItem';
export class DataFederationDataSource extends ObjectStorageItem {
    constructor(model, _dsHelperProvider, _serializer) {
        super(model, _dsHelperProvider, _serializer);
        this._dsHelperProvider = _dsHelperProvider;
        this._serializer = _serializer;
    }
    static getDependentDataSources(item, resultArray) {
        const dataSource = item.dataSource();
        if (dataSource instanceof DataFederationDataSource) {
            dataSource.serializableSourceMap().forEach(x => this.getDependentDataSources(x, resultArray));
        }
        resultArray.push(item);
    }
    preInitProperties(model) {
        const info = this._getInfo();
        this.getInfo = () => {
            let result = [];
            if (model && model['@Base64'])
                result = result.concat({ propertyName: 'base64', modelName: '@Base64' });
            return result.concat([], info, [
                {
                    modelName: 'SerializableSourceMap',
                    propertyName: 'serializableSourceMap',
                    array: true,
                    info: [
                        { modelName: '@DataSource', propertyName: 'dataSource', link: true },
                        { modelName: '@Name', propertyName: 'name' }
                    ]
                }
            ]);
        };
    }
    getSerializableModel() {
        if (!this._serializableModel)
            this._serializableModel = new SerializableDataFederationDataSource(this, null, this._dsHelperProvider, this._serializer);
        return this._serializableModel;
    }
    get dependentDataSources() {
        const serializableModel = this.getSerializableModel();
        return serializableModel.getSerializableFederationDataSourceInfo().dataSources;
    }
}
export class SerializableDataFederationDataSource extends AnalyticsSerializableFederationDataSource {
    constructor(dataSource, model, dsHelperProvider, serializer) {
        super(dataSource, serializer);
        if (!dataSource && model) {
            this.dataSources = ko.observableArray(Object.keys(model.dataSources || {}).map(item => new ObjectStorageItem(model.dataSources[item], dsHelperProvider, this.serializer)));
            this.dataSource = new DataFederationDataSource(model.dataSource, dsHelperProvider, this.serializer);
        }
    }
    dispose() {
        super.dispose();
        this.dataSources = null;
        this.dataSource = null;
    }
}
