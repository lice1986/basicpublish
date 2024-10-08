﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveAsReportDialog.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IKeyValuePair } from '../../../common/types';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { INavigateTab } from '../navigation/navigateTab';
import { IDialogModel, ReportDialogBase } from './reportDialogBase';
export declare class SaveAsReportDialogModelBase implements IDialogModel {
    onShow(tab: INavigateTab): void;
    constructor(popup: SaveAsReportDialog, urls: ko.ObservableArray<IKeyValuePair<string>>);
    getUrl(): string;
    setUrl(url: any): void;
    onDblClick: (url: string) => void;
    popupButtons: any[];
    reportUrl: ko.Observable<string> | ko.Computed<string>;
    noDataText: any;
    reportNamePlaceholder: () => any;
    urls: ko.ObservableArray<IKeyValuePair<string>>;
    reportName: ko.Observable<string> | ko.Computed<string>;
}
export declare class SaveAsReportDialog extends ReportDialogBase {
    show(tab: INavigateTab): void;
    constructor(subreports: ko.ObservableArray<IKeyValuePair<string>>, callbacks: IReportDesignerCustomizationHandler);
    save(url: any): void;
    onSaving: (e: any) => void;
    onSaved: (e: any) => void;
    closeAfterSave: ko.Observable<boolean>;
    title: string;
}
