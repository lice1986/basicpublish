﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\_dataSourceWizardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IWizardPage, IWizardPageMetadata, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
export declare function overrideJsonDataSourceWizardPage(factory: PageFactory, pageId: string, meta: IWizardPageMetadata<IWizardPage>): void;
export declare function overrideSqlDataSourceWizardPage(factory: PageFactory, pageId: string, meta: IWizardPageMetadata<IWizardPage>): void;
export declare class DataSourceWizardHelper {
    private _page;
    private _callback;
    constructor(_page: IWizardPage, _callback: (dataSource: any) => JQueryPromise<IDataSourceInfo>);
    commit(superCommit: () => JQueryPromise<any>, createDataSource: (state: any) => any): JQuery.Promise<any, any, any>;
}