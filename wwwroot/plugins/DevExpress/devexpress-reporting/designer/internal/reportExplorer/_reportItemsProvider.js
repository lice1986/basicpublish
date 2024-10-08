﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { ReportViewModel } from '../../controls/xrReport';
import { CalculatedField } from '../../dataObjects/calculatedField';
import { createIDataMemberInfoByName } from '../_createIDataMemberInfoByName';
export class ReportItemsProvider extends Disposable {
    constructor(controlsHelper, fieldListProvider) {
        super();
        this._rootItems = {
            'ReportItems': (path, controlsHelper) => this.getReportElementsByPath(controlsHelper, path.split('.'))
        };
        this.getItems = (path, rootItems) => {
            rootItems = $.extend({}, this._rootItems, rootItems);
            let getItemsFunc = undefined;
            Object.keys(rootItems).some((currentName) => {
                const rootItem = { propertyName: currentName, getItems: rootItems[currentName] };
                getItemsFunc = this._tryGenerateGetItemsFunc(rootItem, path.path) || this._tryGenerateGetItemsFunc(rootItem, path.fullPath);
                return !!getItemsFunc;
            });
            if (getItemsFunc) {
                const $deferred = $.Deferred();
                const items = getItemsFunc(controlsHelper);
                items && $deferred.resolve(items) || $deferred.reject();
                return $deferred.promise();
            }
            else if (path.fullPath === 'Root') {
                const $deferred = $.Deferred();
                const result = Object.keys(rootItems).map(name => createIDataMemberInfoByName(name));
                $deferred.resolve(result);
                return $deferred.promise();
            }
            else {
                return fieldListProvider.getItems(path);
            }
        };
        this.getItemByPath = (pathRequest, rootItems) => {
            const parts = pathRequest.fullPath.split('.');
            const propertyName = parts.pop();
            return this._getItemByPath(parts, rootItems, propertyName);
        };
    }
    _getControlByName(controlsHelper, name) {
        if (name === 'Report') {
            return controlsHelper.allControls().filter(x => x instanceof ReportViewModel)[0];
        }
        return controlsHelper.allControls().filter(x => controlsHelper.getNameProperty(x)() === name)[0];
    }
    _getProperties(targetInfo, propertyName) {
        return targetInfo.filter(x => x.modelName === '@' + propertyName || x.modelName === propertyName)[0];
    }
    _tryGenerateGetItemsFunc(rootItem, path) {
        if (path.indexOf(rootItem.propertyName) === 0) {
            return (controlsHelper) => rootItem.getItems(path, controlsHelper);
        }
    }
    getReportElementsByPath(controlsHelper, path) {
        if (path.length === 1) {
            return controlsHelper.allControls().map(x => {
                const name = x instanceof ReportViewModel ? 'Report' : controlsHelper.getNameProperty(x)();
                return createIDataMemberInfoByName(name);
            });
        }
        path = path.slice(1);
        const control = this._getControlByName(controlsHelper, path[0]);
        if (!control) {
            return null;
        }
        let info = control.getInfo();
        const controlsPath = path.slice(1);
        for (let i = 0; i < controlsPath.length; i++) {
            info = this._getProperties(info, controlsPath[i]);
            info = info && info.info;
        }
        if (info) {
            return info.filter(x => !!x.modelName && !x.array).map(x => {
                const name = x.modelName.indexOf('@') === 0 ? x.modelName.slice(1) : x.modelName;
                return createIDataMemberInfoByName(name, x.info ? 'list' : 'string');
            });
        }
        else {
            return null;
        }
    }
    _getItemByPath(pathParts, rootItems, propertyName) {
        const $deferred = $.Deferred();
        let currentPropertyName = propertyName;
        if (pathParts.length === 0)
            return $deferred.reject().promise();
        const parentPathRequest = new PathRequest(pathParts.join('.'));
        this.getItems(parentPathRequest, rootItems).done((items) => {
            const isParameter = pathParts.length === 1 && pathParts[0] === 'Parameters';
            if (!isParameter && items.length === 0) {
                currentPropertyName = [pathParts.pop(), currentPropertyName].join('.');
                return this._getItemByPath(pathParts, rootItems, currentPropertyName)
                    .done((item) => $deferred.resolve(item))
                    .fail(() => $deferred.reject());
            }
            const item = items.filter(x => x.name === currentPropertyName)[0];
            if (item) {
                if (item instanceof CalculatedField && pathParts.length > 1) {
                    currentPropertyName = pathParts.pop();
                    this._getItemByPath(pathParts, rootItems, currentPropertyName)
                        .done(() => $deferred.resolve(item))
                        .fail(() => $deferred.reject());
                }
                else if (isParameter && item.isList) {
                    $deferred.reject();
                }
                else {
                    $deferred.resolve(item);
                }
            }
            else if (isParameter) {
                items.forEach(parameter => {
                    if (!parameter.isList)
                        return;
                    this._getItemByPath(['Parameters', parameter.name], rootItems, currentPropertyName)
                        .done((innerParameter) => $deferred.resolve(innerParameter));
                });
                $deferred.state() !== 'resolved' && $deferred.reject();
            }
            else {
                $deferred.reject();
            }
        }).fail(() => $deferred.reject());
        return $deferred.promise();
    }
}
