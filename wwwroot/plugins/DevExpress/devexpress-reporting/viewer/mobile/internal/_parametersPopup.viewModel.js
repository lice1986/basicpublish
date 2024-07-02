﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { StringId } from '@devexpress/analytics-core/analytics-internal-native';
export function createParametersPopupBaseViewModel(base) {
    this._cancelButton = createViewModelGenerator({ className: 'dxrdp-parameters-cancel', text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), action: this._cancel, visible: true, id: 'dxrv-mobile-cancel' })
        .generateProperty('disabled', this.cancelDisabled)
        .getViewModel();
    this._cancelAction = createViewModelGenerator({ className: 'dxrdp-parameters-cancel dxrdp-image-parameters-cancel', action: this._cancel, visible: true })
        .generateProperty('disabled', this.cancelDisabled)
        .getViewModel();
    this._submitButton = { className: 'dxrdp-parameters-submit', text: getLocalization('Submit', 'ASPxReportsStringId.ParametersPanel_Submit'), action: this._submit, disabled: false, visible: true, id: 'dxrv-mobile-submit' };
    return createViewModelGenerator(base)
        .generateProperty('className', this.className)
        .generateProperty('title', this.title)
        .generateProperty('contentTemplate', this.contentTemplate)
        .generateProperty('visible', this.visible)
        .generateProperty('showIcons', this.showIcons)
        .generateProperty('cancelDisabled', this.cancelDisabled)
        .generateProperty('cacheElementContent', (element) => this.cacheElementContent(element))
        .generateProperty('actionButtons', [
        { className: 'dxrdp-parameters-reset', text: getLocalization('Reset', 'ASPxReportsStringId.ParametersPanel_Reset'), action: this._reset, disabled: false, visible: !!this._formModel.reset, id: 'dxrv-mobile-reset' },
        this._cancelButton,
        this._submitButton
    ])
        .generateProperty('actionIcons', [
        { className: 'dxrdp-parameters-reset dxrdp-image-parameters-reset', action: this._reset, disabled: false, visible: !!this._formModel.reset },
        { className: 'dxrdp-parameters-cancel dxrdp-image-parameters-cancel', action: this._cancel, disabled: this.cancelDisabled, visible: true },
        { className: 'dxrdp-parameters-submit dxrdp-image-parameters-submit', action: this._submit, disabled: false, visible: true }
    ])
        .generateProperty('onHidden', (event) => {
        this.model._popupVisible = false;
    })
        .getViewModel();
}
export function createParametersPopupViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('model', this.objectProperties)
        .getViewModel();
}
export function createDateRangeParemeterPopupViewModel(base) {
    const defaultButtonSettings = {
        stylingMode: 'contained',
        focusStateEnabled: false,
        activeStateEnabled: false
    };
    const startButtonTextPlaceholder = getLocalization('Start Date', 'AnalyticsCoreStringId.Mobile_DateRange_StartDate');
    const endButtonTextPlaceholder = getLocalization('End Date', 'AnalyticsCoreStringId.Mobile_DateRange_EndDate');
    const getButtonText = (val, placeholder) => val && this.getStringDate(val) || placeholder;
    this.startButton = createViewModelGenerator(Object.assign({}, defaultButtonSettings))
        .generateProperty('text', getButtonText(this.model.startDate, startButtonTextPlaceholder))
        .generateProperty('focused', false)
        .generateProperty('onClick', () => {
        this.startButton.focused = true,
            this.endButton.focused = false;
    })
        .getViewModel();
    this.endButton = createViewModelGenerator(Object.assign({}, defaultButtonSettings))
        .generateProperty('text', getButtonText(this.model.endDate, endButtonTextPlaceholder))
        .generateProperty('focused', true)
        .generateProperty('onClick', () => {
        this.startButton.focused = false,
            this.endButton.focused = true;
    })
        .getViewModel();
    this.addDisposable(this.model.events.on('startDateChanged', (ev) => {
        this.startButton.text = getButtonText(this.model.startDate, startButtonTextPlaceholder);
    }), this.model.events.on('endDateChanged', (ev) => {
        this.endButton.text = getButtonText(this.model.endDate, endButtonTextPlaceholder);
    }));
    if (this._submitButton)
        this._submitButton.text = getLocalization('OK', StringId.DataAccessBtnOK);
    return createViewModelGenerator(base)
        .generateProperty('startButton', this.startButton)
        .generateProperty('endButton', this.endButton)
        .generateProperty('textRangeValue', this.textRangeValue)
        .generateProperty('onTextChanged', (event) => {
        this.setRangeValue(event.value);
    })
        .generateProperty('selectPeriodPlaceholder', getLocalization('Select Period', 'AnalyticsCoreStringId.Mobile_DateRange_SelectPeriod'))
        .generateProperty('fromText', getLocalization('From', 'AnalyticsCoreStringId.Mobile_DateRange_From'))
        .generateProperty('untilText', getLocalization('Until', 'AnalyticsCoreStringId.Mobile_DateRange_Until'))
        .generateProperty('onHidden', (event) => {
        this.model._popupVisible = false;
    })
        .generateProperty('model', this.model)
        .getViewModel();
}
