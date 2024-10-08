﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_displayNameProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition, getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class DisplayNameProvider {
    constructor(_fieldsProvider, _dataSourceHelper, _rootDS) {
        this._fieldsProvider = _fieldsProvider;
        this._dataSourceHelper = _dataSourceHelper;
        this._rootDS = _rootDS;
        this._requests = {};
        this._fieldsProvider = _fieldsProvider;
        this._dataSourceHelper = _dataSourceHelper;
        this._rootDS = _rootDS;
    }
    _getRequest(path) {
        if (!this._requests[path]) {
            const pathRequest = new PathRequest(path);
            this._requests[path] = ko.pureComputed(() => this._fieldsProvider.getItems(pathRequest));
        }
        return this._requests[path];
    }
    _ignoreDisplayNameRequest(propertyName) {
        if (propertyName.indexOf('ReportItems') === 0)
            return true;
        return false;
    }
    _getDisplayNameRequest(path, fieldName) {
        const def = $.Deferred();
        this._getRequest(path)().done((data) => {
            const displayName = this._getFieldDisplayName(data, fieldName);
            if (!displayName)
                def.reject();
            else
                def.resolve(displayName);
        }).fail(() => {
            def.reject();
        });
        return def.promise();
    }
    _createRequestInfo(dataSource, path, dataMember, dataMemberOffset, includeDataSourceName) {
        if (!dataMember)
            return null;
        let dataSourceName = null;
        if (!path) {
            const ds = (dataSource || this._rootDS());
            const dsInfo = ds && this._dataSourceHelper.findDataSourceInfo(ds);
            if (!dsInfo)
                return null;
            path = (dsInfo.ref || dsInfo.id);
            if (includeDataSourceName)
                dataSourceName = dsInfo.name;
        }
        const offset = getFullPath(path, dataMemberOffset);
        return {
            fullPath: offset + '.' + dataMember,
            offset: offset,
            dataMember: dataMember,
            dataMemberParts: dataMember.split('.'),
            dataSourceName: dataSourceName
        };
    }
    _getFieldDisplayName(fields, fieldName) {
        if (!fields)
            return null;
        const field = findFirstItemMatchesCondition(fields, field => field.name === fieldName);
        return field ? field.displayName : null;
    }
    _getDisplayName(request) {
        const def = $.Deferred();
        if (!request) {
            def.reject();
            return def.promise();
        }
        const fieldsRequests = [];
        for (let i = -1, path = request.offset; i < request.dataMemberParts.length - 1;) {
            fieldsRequests.push(this._getDisplayNameRequest(path, request.dataMemberParts[i + 1]));
            path += '.' + request.dataMemberParts[++i];
        }
        $.when.apply($, fieldsRequests).done(function () {
            let result = request.dataSourceName ? (request.dataSourceName + ' - ') : '';
            for (let i = 0; i < arguments.length; i++) {
                result += arguments[i];
                if (i < arguments.length - 1)
                    result += '.';
            }
            def.resolve(result);
        }).fail(() => def.reject());
        return def.promise();
    }
    _getRealName(request) {
        if (!request)
            return $.Deferred().reject().promise();
        return this._getRealNameRequest(request.offset, request.dataMember);
    }
    _getRealNameRequest(path, dataMember) {
        const def = $.Deferred();
        this._getRequest(path)()
            .done((items) => {
            let targetItem = items.filter(item => dataMember === item.displayName)[0];
            if (!targetItem)
                targetItem = items.filter(item => dataMember.indexOf(item.displayName + '.') === 0 && item.isList)[0];
            if (targetItem) {
                dataMember === targetItem.displayName ? def.resolve(targetItem.name) :
                    this._getRealNameRequest(path + '.' + targetItem.name, dataMember.substring(targetItem.displayName.length + 1))
                        .done(data => {
                        def.resolve(targetItem.name + '.' + data);
                    })
                        .fail(() => {
                        def.reject();
                    });
            }
            else {
                def.reject();
            }
        })
            .fail(() => {
            def.reject();
        });
        return def.promise();
    }
    getDisplayName(dataSource, dataMember, dataMemberOffset = '', includeDataSourceName = true) {
        const request = this._createRequestInfo(dataSource, null, dataMember, dataMemberOffset, includeDataSourceName);
        return this._getDisplayName(request);
    }
    getDisplayNameByPath(path, dataMember) {
        if (this._ignoreDisplayNameRequest(dataMember))
            return $.Deferred().resolve(dataMember).promise();
        return this._getByPath(path, dataMember, x => this._getDisplayName(x));
    }
    getRealName(path, dataMember) {
        return this._getByPath(path, dataMember, x => this._getRealName(x));
    }
    _getByPath(path, dataMember, getNameFunc) {
        path = path || '';
        let request = this._createRequestInfo(null, path, dataMember, '', false);
        const pathParts = path.split('.');
        if (pathParts.length === 1) {
            return getNameFunc(request);
        }
        else {
            const result = $.Deferred();
            getNameFunc(request).done(x => {
                result.resolve(x);
            }).fail(x => {
                request = this._createRequestInfo(null, pathParts[0], dataMember, '', false);
                getNameFunc(request).done(x => {
                    result.resolve(x);
                }).fail(x => result.reject());
            });
            return result.promise();
        }
    }
    dispose() {
        Object.keys(this._requests).forEach((key) => {
            this._requests[key].dispose();
            delete this._requests[key];
        });
    }
}
