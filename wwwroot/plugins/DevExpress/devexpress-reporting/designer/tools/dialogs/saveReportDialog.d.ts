﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveReportDialog.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { INavigateTab } from '../navigation/navigateTab';
import { IDialogModel, ReportDialogBase } from './reportDialogBase';
import { SaveAsReportDialog } from './saveAsReportDialog';
export declare class SaveReportDialogModelBase implements IDialogModel {
    onShow(tab: INavigateTab): void;
    getUrl(): string;
    setUrl(url: any): void;
    constructor(popup: SaveReportDialog);
    popupButtons: any[];
    reportUrl: ko.Observable<string>;
    saveText: ko.Observable<string>;
}
export declare class SaveReportDialog extends ReportDialogBase {
    constructor(saveReportDialog: SaveAsReportDialog, callbacks: IReportDesignerCustomizationHandler);
    save(url: any): void;
    notSave(): void;
    cancel(): void;
    saveReportDialog: SaveAsReportDialog;
    onSaving: (e: any) => void;
    onSaved: (e: any) => void;
    title: string;
}
