﻿/**
* DevExpress HTML/JS Reporting (designer\actions\textElementAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class TextElementAction extends BaseActionsProvider {
    constructor(_selectionProvider) {
        super();
        this._selectionProvider = _selectionProvider;
        const actionsDisabled = ko.computed(() => { return this._inaccessibleAction(); });
        super.initActions([
            {
                text: 'Fit Bounds To Text',
                displayText: () => getLocalization('Fit Bounds To Text', 'ReportStringId.Cmd_FitBoundsToText'),
                imageClassName: 'dxrd-image-actions-fit_bounds_to_text',
                imageTemplateName: 'dxrd-svg-actions-fit_bounds_to_text',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                disabled: actionsDisabled,
                visible: ko.pureComputed(() => {
                    return this._selectionProvider.selectedItems.every(item => item.getControlModel().controlType === 'XRLabel' || item.getControlModel().controlType === 'XRCharacterComb');
                }),
                clickAction: () => { this._textControls.forEach(item => item.fitBoundsToText()); }
            }, {
                text: 'Fit Text To Bounds',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Fit Text To Bounds', 'ReportStringId.Cmd_FitTextToBounds'),
                imageClassName: 'dxrd-image-actions-fit_text_to_bounds',
                imageTemplateName: 'dxrd-svg-actions-fit_text_to_bounds',
                disabled: actionsDisabled,
                visible: ko.pureComputed(() => {
                    return this._selectionProvider.selectedItems.every(item => item.getControlModel().controlType === 'XRLabel' || item.getControlModel().controlType === 'XRTableCell');
                }),
                clickAction: () => { this._textControls.forEach(item => item.fitTextToBounds()); }
            },
        ]);
        this._disposables.push(actionsDisabled);
    }
    get _textControls() {
        return this._selectionProvider.selectedItems;
    }
    _inaccessibleAction() {
        if (this._textControls && this._textControls.some(item => item.getText && item.getText() === ''))
            return true;
        return !!(this._textControls && this._textControls.every(item => item.hasDataBindingByName && item.hasDataBindingByName('Text')));
    }
    condition(context) {
        return context && (context.controlType === 'XRLabel' || context.controlType === 'XRTableCell' || context.controlType === 'XRCharacterComb' || context.controlType === 'multiselect');
    }
}
