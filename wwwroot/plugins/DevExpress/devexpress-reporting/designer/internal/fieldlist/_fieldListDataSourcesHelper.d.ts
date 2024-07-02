﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListDataSourcesHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IDisposable, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
export declare const maxNestingLevelUpdate: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<number>;
export declare function patchRequest(request: IPathRequest, dataSources: IDataSourceInfo[], state: any): void;
export declare class FieldListDataSourcesHelper implements IDisposable {
    private _fieldListCache;
    private _dataSourceSubscriptions;
    private _innerCache;
    private _usedDataSourceSubscription;
    private _renameDataSourceStrategy;
    private _cacheIsClearNotificicator;
    dataSourceHelper: ko.Observable<DataSourceHelper>;
    fieldListDataSources: ko.ObservableArray<IDataSourceInfo>;
    dispose(): void;
    private _clearDataSourceCache;
    private _subscribeDataSource;
    private _updateFieldListDataSources;
    constructor();
    private _wrapRequest;
    private _findItems;
    private _createRelativePath;
    private _updateInnerCache;
    private _getPathPartsFromRequest;
    private _getItemsFromCache;
    wrapFieldsCallback(fieldsCallback: (request: IPathRequest) => JQueryPromise<IDataMemberInfo[]>, state: () => {}, dataSources?: ko.ObservableArray<IDataSourceInfo>, useCache?: boolean): (request: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    _subscribeDataSources(usedDataSources: ko.ObservableArray<IDataSourceInfo>, model: any): void;
    updateDataSources(dsHelper: DataSourceHelper, model: any, parameters?: any): void;
}
