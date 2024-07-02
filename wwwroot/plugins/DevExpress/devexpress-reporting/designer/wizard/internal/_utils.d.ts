﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { JsonDataSource, SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { IDataSourceInfo as IAnalyticDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IDataMemberInfo, IDisplayedValue, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { IMultiQueryDataSourceWizardCallbacks } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../actions/_sqlDataSourceEditor';
export interface IReportWizardCallbacks extends IMultiQueryDataSourceWizardCallbacks {
    createSqlDataSourceInfo?: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>;
    createJsonDataSourceInfo?: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>;
}
export interface IReportWizardFieldsCallback {
    (request: IPathRequest, dataSource: IAnalyticDataSourceInfo): JQueryPromise<IDataMemberInfo[]>;
}
export declare const _masterDetailWizardHeight = "600";
export declare const _masterDetailWizardWidth = "840";
export declare const _masterDetailScrollViewHeight = "100%";
export declare function overrideFullscreenDataSourceWizardPageMetadata(factory: PageFactory, pageId: string, create: () => WizardPageBase): void;
export declare class FieldInfo extends Disposable {
    constructor(data: Array<IDisplayedValue>);
    getOptions(options: any): any;
    field: ko.Observable<IDataMemberInfo>;
    selectedItems: ko.ObservableArray<any>;
    functionValue: ko.Observable<any>;
    visible: ko.Observable<boolean>;
    value: any;
}