﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateTab.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable, IDisposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { ReportDesignerContext } from '../generator/reportDesignerContext';
export interface INavigateTab extends IDisposable {
    displayName: ko.Computed<string>;
    isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
    close?: JQueryDeferred<any>;
    icon?: string;
    context: ko.Observable<ReportDesignerContext> | ko.Computed<ReportDesignerContext>;
    undoEngine: UndoEngine;
    report: ko.Computed<ReportViewModel>;
    url: ko.Computed<string>;
}
export interface INavigateTabCallbacks {
    createContext: (report: ReportViewModel, url: string | ko.Observable<string> | ko.Computed<string>) => ReportDesignerContext;
    afterInititalize: (tab: NavigateTab) => void;
}
export interface INavigateTabOptions {
    report: ReportViewModel;
    url: string | ko.Observable<string> | ko.Computed<string>;
    isReportLoading: ko.Observable<boolean> | ko.Computed<boolean>;
    callbacks: INavigateTabCallbacks;
}
export declare class NavigateTab extends Disposable implements INavigateTab {
    dispose(): void;
    private _generateDisplayName;
    private _createReport;
    private _createReportUrl;
    changeContext(report: ReportViewModel, reportUrl: string): void;
    resetIsModified(): void;
    refresh(resetState: boolean): void;
    constructor(options: INavigateTabOptions);
    private _callbacks;
    displayName: ko.Computed<string>;
    isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
    isModified: ko.Observable<boolean> | ko.Computed<boolean>;
    close: JQueryDeferred<any>;
    icon: string;
    undoEngine: UndoEngine;
    _isReportLoading: ko.Observable<boolean> | ko.Computed<boolean>;
    report: ko.Computed<ReportViewModel>;
    url: ko.Computed<string>;
    context: ko.Observable<ReportDesignerContext> | ko.Computed<ReportDesignerContext>;
}
