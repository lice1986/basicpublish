﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationSerializableModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
export class SerializableDataFederationDataSource extends Disposable {
    constructor(dataSource, serializer) {
        super();
        this.dataSources = ko.observableArray([]);
        this.serializer = serializer || new ModelSerializer();
        if (dataSource) {
            this.dataSource = dataSource;
            this.dataSources(this._currentDataSources);
        }
    }
    get _currentDataSources() {
        const dataSources = [];
        this.dataSource && this.dataSource.serializableSourceMap().reduce((result, x) => {
            if (result.indexOf(x.dataSource()) === -1)
                result.push(x.dataSource());
            return result;
        }, dataSources);
        return dataSources;
    }
    _collectDependentDataSources(item, resultArray) {
        if (item.serializableSourceMap) {
            item.serializableSourceMap().forEach(x => this._collectDependentDataSources(x.dataSource(), resultArray));
        }
        const itemName = ko.unwrap(item.name);
        if (!itemName || resultArray.every(x => ko.unwrap(x.name) !== itemName)) {
            resultArray.push(item);
        }
    }
    dispose() {
        this.dataSource = null;
        this.dataSources = null;
    }
    getInfo() {
        return [
            { propertyName: 'dataSources', modelName: 'dataSources', array: true },
            { propertyName: 'dataSource', modelName: 'dataSource' }
        ];
    }
    collectDependentDataSources() {
        const dependentDataSources = [];
        this._currentDataSources.forEach(item => this._collectDependentDataSources(item, dependentDataSources));
        return dependentDataSources;
    }
    serialize() {
        const clonedModel = new SerializableDataFederationDataSource(null);
        clonedModel.dataSource = this.dataSource;
        clonedModel.dataSources(this.collectDependentDataSources());
        const serializedModel = this.serializer.serialize(clonedModel);
        clonedModel.dispose();
        return serializedModel;
    }
    getSerializableFederationDataSourceInfo() {
        const serializedModel = this.serialize();
        return {
            dataSource: JSON.stringify(serializedModel.dataSource),
            dataSources: Object.keys(serializedModel.dataSources).map(key => JSON.stringify(serializedModel.dataSources[key]))
        };
    }
}