﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseReportTypePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ChooseDataSourceTypePage as AnalyticChooseDataSourceTypePage, FullscreenWizardPageFactory, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IReportWizardTypeItem, SearchBoxVisibilityMode } from '../../utils/inititalizer';
import { _ReportWizardOptions } from '../internal/utils';
import { IReportWizardState } from '../reportWizardState';
interface ISelectReportTypePageOptions {
    canCreateDatabound: boolean | (() => boolean);
    showVertical?: boolean;
    reportTemplates?: IReportWizardTypeItem[];
    searchBoxVisibilityMode?: SearchBoxVisibilityMode;
}
export declare class SelectReportTypePage extends AnalyticChooseDataSourceTypePage {
    private _options;
    static defaultImageID: string;
    constructor(_options: ISelectReportTypePageOptions);
    getListOptions(): object;
    itemsFilter(item: IReportWizardTypeItem): boolean;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<any>;
    initialize(state: IReportWizardState): JQuery.Promise<any>;
    _IsSelected: (item: IReportWizardTypeItem) => boolean;
    typeItems: IReportWizardTypeItem[];
    selectedItem: ko.Observable<IReportWizardTypeItem>;
    _extendCssClass: (rightPath: string) => string;
    _textToSearch: ko.Observable<string>;
}
export declare class ChooseDataSourceTypePage extends AnalyticChooseDataSourceTypePage {
    constructor(dataSourceWizardOptions: _ReportWizardOptions);
}
export declare function _registerSelectReportTypePage(factory: FullscreenWizardPageFactory, options: ISelectReportTypePageOptions): void;
export declare function _registerChooseDataSourceTypePage(factory: PageFactory, dataSourceWizardOptions: _ReportWizardOptions): void;
export {};