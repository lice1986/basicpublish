﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_dataUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IItemsProvider, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../controls/xrReport';
import { ObjectItem } from '../dataObjects/objectStorageItem';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
export declare function addDataSourceToReport(dataSourceHelper: DataSourceHelper, report: ReportViewModel, undoEngine: UndoEngine, itemsProvider: IItemsProvider, dataSource: IDataSourceInfo, forceAssigning?: boolean): void;
export declare function includeNonListItem(dataMembers: IDataMemberInfo[]): boolean;
export declare function removeDataSourceFromReport(dataSourceHelper: DataSourceHelper, reportDataSource: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dataSource: IDataSourceInfo): void;
