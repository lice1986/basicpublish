﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\openReportDialog.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { NavigateByReports } from '../navigation/navigateByReports';
import { INavigateTab } from '../navigation/navigateTab';
import { IDialogModel, ReportDialogBase } from './reportDialogBase';
export declare class OpenReportDialogModelBase implements IDialogModel {
    urls: any;
    constructor(popup: OpenReportDialog, urls: any);
    onShow(tab: INavigateTab): void;
    getUrl(): string;
    setUrl(url: any): void;
    onDblClick: (url: string) => void;
    searchValue: ko.Observable<string>;
    searchPlaceholder: () => any;
    popupButtons: any[];
    reportUrl: ko.Observable<string>;
    noDataText: any;
}
export declare class OpenReportDialog extends ReportDialogBase {
    title: string;
    open(url: string): void;
    constructor(subreports: any, navigateByReports: NavigateByReports, callbacks: IReportDesignerCustomizationHandler);
    navigateByReports: NavigateByReports;
    onOpening: (e: any) => void;
    onOpened: (e: any) => void;
}