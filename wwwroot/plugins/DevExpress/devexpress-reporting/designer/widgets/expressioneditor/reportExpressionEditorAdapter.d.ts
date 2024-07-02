﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorAdapter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
export declare class ReportExpressionEditorAdapter extends Disposable {
    private values;
    value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>;
    private _relatedControlClassName;
    private _onHidingPopup;
    private _onShowingPopup;
    constructor(values: ko.Observable<any[]> | ko.Computed<any[]>, value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>);
    patchOptions(reportExplorerProvider: IItemsProvider, editableObject: XRReportElementViewModel): boolean;
    private _createReportItems;
    private _createValuesTab;
    popupVisible: ko.Observable<boolean>;
}
