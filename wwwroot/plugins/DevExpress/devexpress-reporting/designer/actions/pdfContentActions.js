﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pdfContentActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRPdfContentViewModel } from '../controls/xrPdfContent';
export class PdfContentActions extends BaseActionsProvider {
    constructor(_selection, isDisabled = () => false) {
        super();
        this._selection = _selection;
        const actionDisabled = ko.pureComputed(() => isDisabled() || this._focusedPdfContent && (this._focusedPdfContent.generateOwnPages() || !this._focusedPdfContent.canFit()
            || !this._focusedPdfContent.imageSource()));
        super.initActions([
            {
                text: 'Fit Size to Content',
                group: () => getLocalization('Pdf Content', 'ReportStringId.RibbonXRDesign_PageGroup_PdfContent'),
                displayText: () => getLocalization('Fit Size to Content', 'ReportStringId.Verb_FitControlSize'),
                imageClassName: 'dxrd-image-actions-fit_to_container',
                imageTemplateName: 'dxrd-svg-actions-fit_to_container',
                disabled: actionDisabled,
                clickAction: (model) => {
                    model.fitToContent();
                }
            }
        ]);
        this._disposables.push(actionDisabled);
    }
    get _focusedPdfContent() {
        const focusedModel = this._selection.focused().getControlModel();
        if (focusedModel instanceof XRPdfContentViewModel)
            return focusedModel;
        return null;
    }
    condition(context) {
        return context instanceof XRPdfContentViewModel;
    }
}