﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportItemsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
export declare type IReportItemsProviderRootItems = {
    [key: string]: (path: string, controlsHelper: DesignControlsHelper) => IDataMemberInfo[];
};
export declare class ReportItemsProvider extends Disposable implements IItemsProvider {
    private _rootItems;
    private _getControlByName;
    private _getProperties;
    private _tryGenerateGetItemsFunc;
    getReportElementsByPath(controlsHelper: any, path: string[]): IDataMemberInfo[];
    getItems: (path: IPathRequest, rootItems?: IReportItemsProviderRootItems) => JQueryPromise<IDataMemberInfo[]>;
    getItemByPath: (path: IPathRequest, rootItems?: IReportItemsProviderRootItems) => JQueryPromise<IDataMemberInfo>;
    constructor(controlsHelper: DesignControlsHelper, fieldListProvider: IItemsProvider);
    _getItemByPath(pathParts: string[], rootItems: IReportItemsProviderRootItems, propertyName: string): JQueryPromise<IDataMemberInfo>;
}
