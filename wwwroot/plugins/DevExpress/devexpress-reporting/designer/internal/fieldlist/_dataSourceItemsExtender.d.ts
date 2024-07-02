﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_dataSourceItemsExtender.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo, IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
export declare class DataSourceItemsExtender implements IItemsExtender {
    private _renameCallback;
    private _dataSources;
    constructor(dataSources: ko.ObservableArray<IDataSourceInfo>, _renameCallback: (nameCandidate: string, dataSourceInfo: IDataSourceInfo) => void);
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
    afterItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
}