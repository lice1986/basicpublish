﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { formatDate, $dx, $unwrap } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets-native';
import { createDateRangeParemeterPopupViewModel, createParametersPopupBaseViewModel, createParametersPopupViewModel } from './_parametersPopup.viewModel';
export class ParametersPopupModelBase extends BaseRenderingModel {
    constructor(_formModel) {
        super();
        this._formModel = _formModel;
        this._submit = (params) => {
            const result = params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
            if (!result || result.isValid) {
                this._formModel.submit && this._formModel.submit();
                this.visible = false;
            }
        };
        this._reset = () => {
            this._formModel.reset && this._formModel.reset();
        };
        this._cancel = () => {
            this._formModel.cancel && this._formModel.cancel();
            this.visible = false;
        };
        this.className = '';
        this.visible = _formModel.visible;
    }
    createViewModel() {
        return createParametersPopupBaseViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.visible = this.visible;
        viewModel.showIcons = this.showIcons;
        viewModel.cancelDisabled = this.cancelDisabled;
        this._cancelButton.disabled = this.cancelDisabled;
        this._cancelAction.disabled = this.cancelDisabled;
    }
    onPropertyChanged() { }
    cacheElementContent(element) {
        this._parametersButtonContaner = $unwrap(element);
        setTimeout(() => this.initVisibilityIcons());
    }
    dispose() {
        super.dispose();
        this._parametersButtonContaner = null;
    }
    initVisibilityIcons() {
        if (!this._parametersButtonContaner)
            return;
        let result = this.showIcons;
        const nodeTop = $dx(this._parametersButtonContaner).offset().top;
        const actions = Array.from(this._parametersButtonContaner.querySelectorAll('.dxrdp-parameter-action'));
        actions.forEach(element => {
            result = nodeTop !== element.getBoundingClientRect().top;
        });
        this.showIcons = result;
    }
}
__decorate([
    mutable(false)
], ParametersPopupModelBase.prototype, "visible", void 0);
__decorate([
    mutable(false)
], ParametersPopupModelBase.prototype, "cancelDisabled", void 0);
__decorate([
    mutable(false)
], ParametersPopupModelBase.prototype, "showIcons", void 0);
export class ParametersPopupModel extends ParametersPopupModelBase {
    constructor(model, _reportPreview) {
        super({ visible: model.popupInfo.visible, submit: model.submit, reset: model.restore });
        this.model = model;
        this._reportPreview = _reportPreview;
        const updateCancelDisabled = () => this.cancelDisabled = !this._reportPreview.documentId || this._reportPreview.pages.length === 0;
        updateCancelDisabled();
        this.addDisposable(this._reportPreview.events.on('pagesChanged', (args) => {
            updateCancelDisabled();
        }), this._reportPreview.events.on('documentIdChanged', (args) => {
            updateCancelDisabled();
        }));
        this.addDisposable(model.events.on('_popupVisibleChanged', (args) => {
            this.visible = model.popupInfo.visible;
        }), model.events.on('_getInfoChanged', (args) => {
            this.objectProperties.updateEditorsInfo(model, model.getInfo());
        }));
        this.addDisposable(this.objectProperties = new ObjectProperties(model, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'native'));
        this.contentTemplate = 'dx-propertieseditor';
        this.title = getLocalization('Parameters', 'DevExpress.XtraReports.UI.XtraReport.Parameters');
    }
    createViewModel() {
        return createParametersPopupViewModel.call(this, super.createViewModel());
    }
}
export class DateRangeParemeterPopupModel extends ParametersPopupModelBase {
    constructor(model) {
        super({
            visible: model._popupVisible, cancel: () => {
                this.model.startDate = this._oldStart;
                this.model.endDate = this._oldEnd;
                this.model.applyValue();
            }
        });
        this.model = model;
        this.getStringDate = (value) => formatDate(value);
        this.model.calendarHeight = undefined;
        this.textRangeValue = this.model._displayText;
        this._oldStart = this.model.startDate;
        this._oldEnd = this.model.endDate;
        this.addDisposable(this.model.events.on('_displayTextChanged', (ev) => {
            this.textRangeValue = this.model._displayText;
        }), this.model.events.on('_popupVisibleChanged', (ev) => {
            this.visible = this.model._popupVisible;
        }));
        this.title = getLocalization('Date Range Parameter', 'AnalyticsCoreStringId.Mobile_DateRange_Title');
        this.contentTemplate = 'dxrv-preview-date-range-mobile';
        this.className = 'dxrv-preview-date-range-mobile-popup';
    }
    createViewModel() {
        return createDateRangeParemeterPopupViewModel.call(this, super.createViewModel());
    }
    setRangeValue(value) {
        this.model.applyDate(value.range(), true);
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        viewModel.textRangeValue = this.textRangeValue;
    }
}
__decorate([
    mutable('')
], DateRangeParemeterPopupModel.prototype, "textRangeValue", void 0);