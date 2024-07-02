﻿/**
* DevExpress Analytics (core\utils\_fieldListProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IPathRequest } from '../../widgets/common/pathRequest';
import { IDataMemberInfo, IItemsProvider } from '../../widgets/utils';
export interface IDataSourceInfo {
    name: string;
    specifics?: string;
    id?: string;
    ref?: string;
    data: any;
    hasErrors?: boolean;
    dataSerializer?: string;
    isSqlDataSource?: boolean;
    isJsonDataSource?: boolean;
    isObjectDataSource?: boolean;
    isFederationDataSource?: boolean;
    isListType?: boolean;
    isSupportQueries?: boolean;
}
export interface IItemsExtender {
    beforeItemsFilled: (request: IPathRequest, items: IDataMemberInfo[]) => boolean;
    afterItemsFilled?: (request: IPathRequest, items: IDataMemberInfo[]) => void;
}
export declare class FieldListProvider implements IItemsProvider {
    private _extenders;
    private _patchRequest;
    private _beforeFieldListCallback;
    private _afterFieldListCallBack;
    constructor(fieldListCallback: (pathRequest: IPathRequest) => JQueryPromise<IDataMemberInfo[]>, rootItems: ko.ObservableArray<IDataSourceInfo>, extenders?: IItemsExtender[], rootItemsNoDragable?: boolean);
    deferreds: JQuery.Deferred<IDataMemberInfo[]>[];
    dispose: () => void;
    getItems: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
}