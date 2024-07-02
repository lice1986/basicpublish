﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectDataMemberPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { DataMemberTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from '../../internal/utils';
import { IReportWizardState } from '../../reportWizardState';
export declare class LegacyChooseDataMemberPage extends WizardPageBase {
    private _rootItems;
    private _selectedPath;
    private _fieldListCallBack;
    private _createSqlDataSourceInfo;
    private _dataSource;
    private _hideDataMemberSubItems;
    private _wrapFieldListCallback;
    private get dataSourcePath();
    private _beginInternal;
    constructor(reportWizardOptions: _ReportWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    initialize(state: IReportWizardState): JQueryPromise<any>;
    commit(): JQuery.Promise<{
        dataMemberPath?: string;
        dataMemberInfo?: IDataMemberInfo;
    }, any, any>;
    scrollViewHeight: string;
    fieldListModel: {
        itemsProvider: FieldListProvider;
        selectedPath: any;
        treeListController: DataMemberTreeListController;
    };
}
export declare function _registerLegacyChooseDataMemberPage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
