﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListDataSourcesHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc, extend, findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ComponentsModel } from '../../controls/properties/components';
import { DataFederationDataSource } from '../../dataObjects/dataFederation';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { RenameDataSourceStrategy } from './_renameDataSourceStrategy';
export const maxNestingLevelUpdate = createGlobalModuleVariableFunc(5);
export function patchRequest(request, dataSources, state) {
    request.state = state;
    const dataSource = findFirstItemMatchesCondition(dataSources, (ds) => (request.id && ds.id === request.id) || (request.ref && ds.ref === request.ref));
    if (dataSource && dataSource.data) {
        if (dataSource.data instanceof DataFederationDataSource) {
            const serializer = new ModelSerializer();
            dataSource.data.getSerializableModel().serializer = serializer;
            const serializableFederationDataSourceInfo = dataSource.data.getSerializableModel().getSerializableFederationDataSourceInfo();
            extend(request, serializableFederationDataSourceInfo);
        }
        else
            request.dataSource = JSON.stringify(new ModelSerializer().serialize(dataSource.data));
    }
}
export class FieldListDataSourcesHelper {
    constructor() {
        this._fieldListCache = {};
        this._dataSourceSubscriptions = [];
        this._innerCache = {};
        this._usedDataSourceSubscription = null;
        this._cacheIsClearNotificicator = ko.observable();
        this.dataSourceHelper = ko.observable();
        this.fieldListDataSources = ko.observableArray([]);
        this._renameDataSourceStrategy = new RenameDataSourceStrategy(this.dataSourceHelper, () => this.fieldListDataSources.valueHasMutated());
    }
    dispose() {
        this._usedDataSourceSubscription && this._usedDataSourceSubscription.dispose();
        this._usedDataSourceSubscription = null;
        this._clearDataSourceCache();
        this.fieldListDataSources([]);
        this.dataSourceHelper(null);
    }
    _clearDataSourceCache(dataSourceRef) {
        Object.keys(this._fieldListCache).forEach((prop) => {
            if (dataSourceRef === undefined || prop.split('.')[0] === dataSourceRef) {
                delete this._fieldListCache[prop];
                delete this._innerCache[prop];
            }
        });
        dataSourceRef !== undefined && this._cacheIsClearNotificicator.notifySubscribers();
    }
    _subscribeDataSource(dataSource) {
        if (dataSource.data && dataSource.data.base64) {
            this._dataSourceSubscriptions.push(dataSource.data.base64.subscribe((newVal) => {
                this._clearDataSourceCache(dataSource.ref || dataSource.id);
                this.fieldListDataSources.notifySubscribers(this.fieldListDataSources());
                this.dataSourceHelper().usedDataSources.notifySubscribers(this.dataSourceHelper().usedDataSources());
            }));
        }
    }
    _updateFieldListDataSources(usedDataSources, parameters) {
        if (!usedDataSources) {
            this.fieldListDataSources(null);
            return;
        }
        this._dataSourceSubscriptions.forEach(x => x.dispose());
        this._dataSourceSubscriptions = [];
        this._fieldListCache = {};
        this._innerCache = {};
        const dataSourcesArray = [].concat(usedDataSources);
        if (parameters) {
            dataSourcesArray.splice(-1, 0, { ref: Parameter.ParametersRefString, name: 'Parameters', specifics: 'parameters', data: parameters, dataSerializer: null });
        }
        dataSourcesArray.forEach((item) => this._subscribeDataSource(item));
        this.fieldListDataSources(dataSourcesArray);
    }
    _wrapRequest(request) {
        const pathParts = request.pathParts.length > 0 ? request.pathParts.map(x => x) : request.fullPath.split('.');
        const currentPathLength = Math.floor((pathParts.length - 1) / maxNestingLevelUpdate());
        const currentRequestPath = pathParts.splice(0, 1 + currentPathLength * maxNestingLevelUpdate());
        return new PathRequest(currentRequestPath.join('.'), currentRequestPath);
    }
    _findItems(items, pathParts) {
        if (pathParts.length === 0 || !items)
            return items;
        const itemName = pathParts.splice(0, 1)[0];
        const item = items.filter(x => x.name === itemName)[0];
        if (!item)
            return;
        if (pathParts.length > 0 && item['items']) {
            return this._findItems(item['items'], pathParts);
        }
        else if (pathParts.length === 0) {
            return item['items'];
        }
    }
    _createRelativePath(fullPath, currentPath) {
        if (!currentPath)
            return fullPath;
        if (fullPath != currentPath) {
            return fullPath.replace(currentPath + '.', '');
        }
        return '';
    }
    _updateInnerCache(currentRequest, currentPath, result) {
        result.forEach((item) => {
            const itemPath = [currentPath, item.name].join('.');
            if (item.relationPath) {
                Object.defineProperty(item, 'items', {
                    get: () => this._findItems(this._innerCache[currentRequest.fullPath], this._createRelativePath(item.relationPath, currentRequest.path).split('.'))
                });
            }
            else if (item.items) {
                this._updateInnerCache(currentRequest, itemPath, item.items);
            }
        });
    }
    _getPathPartsFromRequest(request) {
        return request.pathParts.length > 0 ? request.pathParts.map(x => x) : request.fullPath.split('.');
    }
    _getItemsFromCache(currentRequest) {
        let items = this._innerCache[currentRequest.fullPath];
        const closestCachedPath = this._getPathPartsFromRequest(currentRequest);
        while (!items && closestCachedPath.length > 1) {
            closestCachedPath.pop();
            items = this._innerCache[closestCachedPath.join('.')];
        }
        let currentPath = this._getPathPartsFromRequest(currentRequest);
        currentPath = currentPath.splice(closestCachedPath.length, currentPath.length);
        return this._findItems(items, currentPath);
    }
    wrapFieldsCallback(fieldsCallback, state, dataSources = this.fieldListDataSources, useCache = true) {
        const cache = this._fieldListCache;
        return (request) => {
            if (cache && useCache) {
                const items = this._getItemsFromCache(request);
                if (items)
                    return $.Deferred().resolve(items).promise();
                const newRequest = this._wrapRequest(request);
                this._cacheIsClearNotificicator();
                if (cache[newRequest.fullPath]) {
                    const $deferred = $.Deferred();
                    cache[newRequest.fullPath].done(result => {
                        if (!Array.isArray(result))
                            $deferred.resolve(result);
                        else
                            $deferred.resolve(this._getItemsFromCache(request));
                    });
                    return $deferred.promise();
                }
                patchRequest(newRequest, dataSources.peek(), state());
                if (newRequest['dataSource']) {
                    const $deferred = $.Deferred();
                    cache[newRequest.fullPath] = fieldsCallback(newRequest).done((result) => {
                        if (Array.isArray(result)) {
                            this._innerCache[newRequest.fullPath] = result;
                            this._updateInnerCache(newRequest, newRequest.fullPath, result);
                            $deferred.resolve(this._getItemsFromCache(request));
                        }
                        else {
                            $deferred.resolve(result);
                        }
                    });
                    return $deferred.promise();
                }
                cache[newRequest.fullPath] = undefined;
                return $.Deferred().reject().promise();
            }
            else {
                patchRequest(request, dataSources.peek(), state());
                return request.dataSource ? fieldsCallback(request) : $.Deferred().reject().promise();
            }
        };
    }
    _subscribeDataSources(usedDataSources, model) {
        this._usedDataSourceSubscription = usedDataSources.subscribe((args) => {
            const changeSet = args[0];
            const dataSource = changeSet.value;
            if (changeSet.status === 'added') {
                this._subscribeDataSource(dataSource);
                model.components.push(new ComponentsModel(dataSource, this._renameDataSourceStrategy));
                this.fieldListDataSources.splice(changeSet.index, 0, dataSource);
            }
            else {
                if (dataSource.data && dataSource.data.base64) {
                    this._dataSourceSubscriptions[changeSet.index].dispose();
                    this._dataSourceSubscriptions.splice(changeSet.index, 1);
                }
                model.components.splice(changeSet.index, 1);
                this.fieldListDataSources.splice(changeSet.index, 1);
                this._clearDataSourceCache(dataSource.ref || dataSource.id);
            }
        }, null, 'arrayChange');
    }
    updateDataSources(dsHelper, model, parameters) {
        this._subscribeDataSources(dsHelper.usedDataSources, model);
        this._updateFieldListDataSources(dsHelper.usedDataSources(), parameters);
        this.dataSourceHelper(dsHelper);
        model.components([]);
        model.components(dsHelper.usedDataSources()
            .filter(item => item.specifics !== 'none')
            .map(item => new ComponentsModel(item, this._renameDataSourceStrategy)));
    }
}
