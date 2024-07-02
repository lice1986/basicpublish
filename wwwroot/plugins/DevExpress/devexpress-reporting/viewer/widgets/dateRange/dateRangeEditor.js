﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.js)
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
import { Locker } from '../../../common/utils/_locker';
import { DateRangeParemeterPopupModel } from '../../mobile/internal/_parametersPopup';
import { formatDate, koUtils } from '@devexpress/analytics-core/analytics-internal-native';
import { DateRangeDialogElementsKeyboardHelper } from '../../accessibility/_dateRangeKeyboardHelper';
import { BaseRenderingModel, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { createDateRangeEditorViewModel } from './dateRangeEditor.viewmodel';
import { predefinedDateRanges } from './dateRangeEditor.ranges';
import { Editor } from '@devexpress/analytics-core/analytics-widgets-native';
export function createDateRangeEditor(_options, element, model) {
    const editor = model instanceof Editor ? model : model === null || model === void 0 ? void 0 : model.getModel();
    const rangeEditorOptions = Object.assign(Object.assign({}, _options), { displayName: koUtils.unwrap(model === null || model === void 0 ? void 0 : model.displayName), value: koUtils.unwrap(_options.value), onValueChanged: (e) => {
            if (koUtils.isSubscribable(_options.value))
                _options.value(e.value);
            else
                editor._set('value', e.value);
        } });
    const rangeEditor = new DateRangeEditor(rangeEditorOptions, model === null || model === void 0 ? void 0 : model.editorInputId);
    if (koUtils.isSubscribable(_options.value))
        rangeEditor.addDisposable(_options.value.subscribe((newVal) => rangeEditor.applyDate(newVal)));
    else if (editor) {
        rangeEditor.addDisposable(editor.events.on('valueChanged', (args) => rangeEditor.applyDate(args.newValue)));
    }
    return rangeEditor;
}
export class DateRangeEditor extends BaseRenderingModel {
    constructor(_options, editorInputId) {
        super();
        this._options = _options;
        this._locker = new Locker();
        this._showPopup = () => {
            this._popupVisible = true;
        };
        this._hidePopup = () => {
            this._popupVisible = false;
            this._$element.get(0).querySelector('input').focus();
        };
        this.popupTemplate = 'dxrv-daterange-editor-popup';
        this.items = [];
        this.calendarHeight = '100%';
        this._displayText = this._getStringValue([this.startDate, this.endDate]);
        this.applyDate(this._options.value);
        if (_options.isMobile) {
            this.popupTemplate = 'dxrd-menu-parameters-content';
            this.popupModel = new DateRangeParemeterPopupModel(this);
        }
        else {
            this.popupModel = this;
        }
        this.items = [...predefinedDateRanges];
        this.dialogKeyboardHelper = new DateRangeDialogElementsKeyboardHelper(this);
        this._disposables.push(this.dialogKeyboardHelper);
        this._editorInputId = editorInputId;
        this._displayName = _options.displayName;
    }
    createViewModel() {
        return createDateRangeEditorViewModel.call(this, super.createViewModel());
    }
    _getStringValue(range) {
        return range.map(x => formatDate(x)).join(' - ');
    }
    getElement() {
        if (this._$element)
            return this._$element[0];
        else
            undefined;
    }
    _isSelected(item) {
        return this._displayText === this._getStringValue(item.range());
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'startDate' || args.propertyName === 'endDate') {
            this._displayText = this._getStringValue([this.startDate, this.endDate]);
        }
        if (args.propertyName === 'startDate') {
            this.applyValue(this.startDate > this.endDate);
        }
        if (args.propertyName === 'endDate') {
            this.applyValue();
        }
    }
    deferredUpdateViewModel() {
        return false;
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === '_popupVisible') {
            viewModel.getPopupSettings().visible = this._popupVisible;
        }
        viewModel.predefinedRanges.items.forEach(x => {
            x.selected = this._isSelected(x);
        });
        viewModel.startRange.value = this.startDate;
        viewModel.endRange.value = this.endDate;
        viewModel.endRange.min = this.startDate;
        viewModel.displayValue = this._displayText;
    }
    _toParameterValue() {
        return [this.startDate, this.endDate];
    }
    applyDate(range, force = false) {
        this._locker.lock(() => {
            this.startDate = range[0];
            this.endDate = range[1];
        });
        if (force)
            this.applyValue();
    }
    inRange(date) {
        const _end = new Date(this.endDate.getTime());
        const _start = new Date(this.startDate.getTime());
        return date <= new Date(_end.setHours(0, 0, 0, 0)) &&
            date >= new Date(_start.setHours(0, 0, 0, 0));
    }
    applyValue(updateEndDate = false) {
        this._locker.lock(() => {
            updateEndDate && (this.endDate = this.startDate);
            this._options.onValueChanged({ value: this._toParameterValue() });
        });
    }
}
__decorate([
    mutable(() => new Date(new Date().setHours(0, 0, 0, 0)))
], DateRangeEditor.prototype, "startDate", void 0);
__decorate([
    mutable(() => new Date(new Date().setHours(0, 0, 0, 0)))
], DateRangeEditor.prototype, "endDate", void 0);
__decorate([
    mutable(() => false)
], DateRangeEditor.prototype, "_popupVisible", void 0);
__decorate([
    mutable(() => '')
], DateRangeEditor.prototype, "_displayText", void 0);