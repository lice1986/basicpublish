﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pdfContentActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { XRPdfContentViewModel } from '../controls/xrPdfContent';
export declare class PdfContentActions extends BaseActionsProvider {
    private _selection;
    get _focusedPdfContent(): XRPdfContentViewModel;
    constructor(_selection: ISelectionProvider, isDisabled?: () => boolean);
    condition(context: any): boolean;
}
