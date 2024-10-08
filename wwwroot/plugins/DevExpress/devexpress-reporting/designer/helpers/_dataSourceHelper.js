﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_dataSourceHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition, getUniqueNameForNamedObjectsArray, localizeNoneString, replaceInvalidSymbols } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { DataFederationDataSource, SerializableDataFederationDataSource } from '../dataObjects/dataFederation';
import { createNewObjectItem } from '../dataObjects/objectItemCreation';
import { ObjectItem } from '../dataObjects/objectStorageItem';
export class DataSourceHelper extends Disposable {
    constructor(objects, dataSourceRefs, availableDataSources) {
        super();
        this.usedDataSources = ko.observableArray();
        this.allDataSources = ko.observableArray();
        this.usedDataSources.push({ ref: 'none', name: 'none', specifics: 'none', data: null, dataSerializer: null });
        this._objects = objects;
        for (let i = 0; i < objects().length; i++) {
            const currentObject = objects()[i];
            const ref = currentObject['_model']['@Ref'];
            const dataSourceRef = dataSourceRefs.filter((ds) => { return ds.ref === ref; })[0];
            if (dataSourceRef) {
                const currentDataSourceInfo = {
                    ref: ref,
                    data: currentObject,
                    name: dataSourceRef.name,
                    isFederationDataSource: dataSourceRef.isFederationDataSource,
                    isSqlDataSource: dataSourceRef.isSqlDataSource,
                    isJsonDataSource: dataSourceRef.isJsonDataSource,
                    isObjectDataSource: dataSourceRef.isObjectDataSource,
                    isListType: dataSourceRef.isListType,
                    isSupportQueries: dataSourceRef.isSupportQueries,
                    dataSerializer: dataSourceRef.dataSerializer,
                    hasParams: dataSourceRef.hasParams,
                    hasErrors: dataSourceRef.hasErrors
                };
                currentObject['dataSourceInfo'] = currentDataSourceInfo;
                this._addUsedDataSource(currentDataSourceInfo);
            }
        }
        const self = this;
        this._disposables.push(objects.subscribe((changes) => {
            for (let index = 0; index < changes.length; index++) {
                if (!changes[index].value['dataSourceInfo'])
                    return;
                if (changes[index].status === 'added') {
                    self._addUsedDataSource(changes[index].value['dataSourceInfo']);
                }
                else if (changes[index].status === 'deleted') {
                    const dataSourceInfo = self.findDataSourceInfo(changes[index].value);
                    if (dataSourceInfo) {
                        this.usedDataSources.remove(dataSourceInfo);
                        this.allDataSources.remove(dataSourceInfo);
                    }
                }
            }
        }, null, 'arrayChange'));
        const serializer = new ModelSerializer();
        this.availableDataSources = (availableDataSources || []).map((object) => {
            return $.extend({}, object, { data: createNewObjectItem(object.data, () => { return this; }, serializer) });
        });
        this.allDataSources.push.apply(this.allDataSources, this.availableDataSources);
    }
    dispose() {
        super.dispose();
        this._objects = null;
        this.availableDataSources.splice(0);
        this.usedDataSources([]);
        this.allDataSources([]);
    }
    getDataSourcePath(dataSource) {
        const dataSourceInfo = dataSource && this.findDataSourceInfo(dataSource);
        if (dataSourceInfo) {
            return dataSourceInfo.id || dataSourceInfo.ref;
        }
        else {
            return '';
        }
    }
    _findDataSourceInfo(name, collection) {
        return collection().filter((info) => { return info.name === name; })[0];
    }
    _getDataSourceInfo(name) {
        let result = this._findDataSourceInfo(name, this.usedDataSources);
        if (!result) {
            const resultSource = this._findDataSourceInfo(name, this.allDataSources);
            if (resultSource) {
                result = this._addDataSource(resultSource, resultSource.data);
            }
        }
        return result;
    }
    _getDataSourceName(dataSource) {
        const dataSourceInfo = this.findDataSourceInfo(dataSource);
        return dataSourceInfo && dataSourceInfo.name;
    }
    _addUsedDataSource(result) {
        this.usedDataSources.splice(this.usedDataSources().length - 1, 0, result);
        this.allDataSources.push(result);
    }
    _addDataSource(dataSource, data, uniqueName) {
        if (!dataSource.name) {
            throw new Error('dataSource name is undefined or null (ref=' + dataSource.ref + ', id=' + dataSource.id + ')');
        }
        const dataSourceName = uniqueName || this.getUniqueDataSourceName(dataSource.name);
        let newData = data;
        if (this._objects().indexOf(data) === -1) {
            newData = this._cloneObjectItem(data);
            newData['dataSourceInfo'] = $.extend({}, dataSource, { name: dataSourceName, data: newData });
            newData['name'] = ko.observable(dataSourceName);
            this._objects.push(newData);
        }
        return this.findDataSourceInfo(newData);
    }
    _cloneObjectItem(data) {
        const serializer = new ModelSerializer();
        let serializedObj;
        if (data instanceof DataFederationDataSource) {
            serializedObj = data.getSerializableModel().serialize();
            const newModel = new SerializableDataFederationDataSource(null, serializedObj, data.dsHelperProvider, serializer);
            const cloneSerializableSourceMap = [];
            data.serializableSourceMap().forEach(source => {
                const info = this.allDataSources().filter((item) => { return item.data === source.dataSource(); })[0];
                if (info) {
                    const existedDataSource = this.findDataSourceInfoByName(info.name);
                    const usedDataSource = existedDataSource || this._addDataSource(info, info.data, info.name);
                    cloneSerializableSourceMap.push(usedDataSource.data);
                }
            });
            const newSerializableModel = newModel.dataSource.getSerializableModel();
            newSerializableModel.dataSources(cloneSerializableSourceMap);
            cloneSerializableSourceMap.forEach((item, index) => {
                newSerializableModel.dataSource.serializableSourceMap()[index].dataSource(item);
            });
            newModel.dispose();
            return newSerializableModel.dataSource;
        }
        else {
            serializedObj = serializer.serialize(data);
            return createNewObjectItem(serializedObj, data.dsHelperProvider, serializer);
        }
    }
    getUniqueDataSourceName(name) {
        return getUniqueNameForNamedObjectsArray(this.allDataSources(), replaceInvalidSymbols(name));
    }
    addDataSource(dataSourceInfo) {
        const data = (dataSourceInfo.data instanceof ObjectItem) ? dataSourceInfo.data : createNewObjectItem(dataSourceInfo.data, () => this);
        return this._addDataSource(dataSourceInfo, data).data;
    }
    removeDataSource(dataSourceInfo) {
        this._objects.remove(dataSourceInfo.data);
    }
    restoreDataSource(dataSourceInfo) {
        this._objects.push(dataSourceInfo.data);
    }
    dataSourceValue(value, undoEngine) {
        const dataSourceValue = ko.pureComputed({
            read: () => {
                return this._getDataSourceName(value());
            },
            write: (val) => {
                const _undoEngine = undoEngine && undoEngine();
                _undoEngine && _undoEngine.start();
                const newDataSource = this._getDataSourceInfo(val);
                if (DataSourceHelper._assignValueInTimeout) {
                    setTimeout(() => {
                        value(newDataSource && newDataSource.data);
                        _undoEngine && _undoEngine.end();
                    }, 1);
                }
                else {
                    value(newDataSource && newDataSource.data);
                    _undoEngine && _undoEngine.end();
                }
            }
        });
        this._disposables.push(dataSourceValue);
        return dataSourceValue;
    }
    dataSourceDisplayExpr(dataSource) {
        return (!dataSource || !dataSource.data) ? localizeNoneString('none') : dataSource.name;
    }
    mergedDataSources() {
        const dataSources = this.usedDataSources().slice(0, -1);
        for (let i = this.availableDataSources.length - 1; i >= 0; i--) {
            if (!findFirstItemMatchesCondition(dataSources, (item) => item.name === this.availableDataSources[i].name)) {
                dataSources.unshift(this.availableDataSources[i]);
            }
        }
        return dataSources;
    }
    findDataSourceInfo(dataSource) {
        return this.usedDataSources().filter((info) => { return info.data === dataSource; })[0];
    }
    findDataSourceInfoByID(id) {
        return this.usedDataSources().filter((info) => { return info.id === id; })[0];
    }
    findDataSourceInfoByRef(ref) {
        return this.usedDataSources().filter((info) => { return info.ref === ref; })[0];
    }
    findDataSourceInfoByName(name) {
        return this.usedDataSources().filter((item) => { return item.name === name; })[0];
    }
}
DataSourceHelper.defaultReportExtensionKey = 'DataSerializationExtension';
DataSourceHelper._assignValueInTimeout = true;
