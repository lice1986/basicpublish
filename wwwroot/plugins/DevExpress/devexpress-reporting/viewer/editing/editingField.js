﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\editingField.js)
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
import { extend } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { fromEnum } from '@devexpress/analytics-core/analytics-utils-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { EditablePreviewEnabled } from '../settings';
import { CharacterCombEditingFieldViewModel } from './models/characterCombEditingField';
import { CheckEditingFieldViewModel } from './models/checkEditingField';
import { DefaultImageEditingFieldViewModel } from './models/popupImageEditingField';
import { TextEditingFieldViewModel } from './models/textEditingField';
export var ImageAlignment;
(function (ImageAlignment) {
    ImageAlignment[ImageAlignment["TopLeft"] = 1] = "TopLeft";
    ImageAlignment[ImageAlignment["TopCenter"] = 2] = "TopCenter";
    ImageAlignment[ImageAlignment["TopRight"] = 3] = "TopRight";
    ImageAlignment[ImageAlignment["MiddleLeft"] = 4] = "MiddleLeft";
    ImageAlignment[ImageAlignment["MiddleCenter"] = 5] = "MiddleCenter";
    ImageAlignment[ImageAlignment["MiddleRight"] = 6] = "MiddleRight";
    ImageAlignment[ImageAlignment["BottomLeft"] = 7] = "BottomLeft";
    ImageAlignment[ImageAlignment["BottomCenter"] = 8] = "BottomCenter";
    ImageAlignment[ImageAlignment["BottomRight"] = 9] = "BottomRight";
})(ImageAlignment || (ImageAlignment = {}));
export var ImageSizeMode;
(function (ImageSizeMode) {
    ImageSizeMode[ImageSizeMode["Normal"] = 0] = "Normal";
    ImageSizeMode[ImageSizeMode["StretchImage"] = 1] = "StretchImage";
    ImageSizeMode[ImageSizeMode["ZoomImage"] = 4] = "ZoomImage";
    ImageSizeMode[ImageSizeMode["Squeeze"] = 5] = "Squeeze";
    ImageSizeMode[ImageSizeMode["Cover"] = 7] = "Cover";
})(ImageSizeMode || (ImageSizeMode = {}));
export const sizing = {
    propertyName: 'sizing', modelName: '@Sizing', editor: editorTemplates.getEditor('combobox'), displayName: 'Sizing', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Sizing', defaultVal: 'Normal', from: fromEnum, valuesArray: [
        { value: 'Normal', displayValue: 'Normal', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Normal' },
        { value: 'StretchImage', displayValue: 'Stretch Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.StretchImage' },
        { value: 'AutoSize', displayValue: 'Auto-Size', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.AutoSize' },
        { value: 'CenterImage', displayValue: 'Center Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.CenterImage' },
        { value: 'ZoomImage', displayValue: 'Zoom Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.ZoomImage' },
        { value: 'Squeeze', displayValue: 'Squeeze', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Squeeze' },
        { value: 'Tile', displayValue: 'Tile', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Tile' },
        { value: 'Cover', displayValue: 'Cover', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Cover' }
    ]
};
export const imageAlignment = {
    propertyName: 'imageAlignment', modelName: '@ImageAlignment', editor: editorTemplates.getEditor('combobox'), displayName: 'Alignment', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Alignment', defaultVal: 'Default', from: fromEnum, valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.Default' },
        { value: 'TopLeft', displayValue: 'Top Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopLeft' },
        { value: 'TopCenter', displayValue: 'Top Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopCenter' },
        { value: 'TopRight', displayValue: 'Top Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopRight' },
        { value: 'MiddleLeft', displayValue: 'Middle Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleLeft' },
        { value: 'MiddleCenter', displayValue: 'Middle Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleCenter' },
        { value: 'MiddleRight', displayValue: 'Middle Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleRight' },
        { value: 'BottomLeft', displayValue: 'Bottom Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomLeft' },
        { value: 'BottomCenter', displayValue: 'Bottom Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomCenter' },
        { value: 'BottomRight', displayValue: 'Bottom Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomRight' }
    ]
};
export class EditingField extends BaseRenderingModel {
    constructor(model, index, htmlProvider) {
        super();
        this._needToUseHtml = false;
        this._index = -1;
        this._fieldModel = model;
        this._index = index;
        this.readOnly = model.readOnly || !EditablePreviewEnabled();
        this.addDisposable(EditablePreviewEnabled.subscribe(value => {
            if (!value)
                this.readOnly = false;
        }));
        this.editValue = model.editValue;
        this._editorValue = model.editValue;
        this.htmlValue = model.htmlValue;
        this._htmlProvider = htmlProvider;
    }
    _refreshHtmlValue(newValue) {
        this.htmlValue = null;
        if (this._needToUseHtml) {
            this._htmlProvider.getEditingFieldHtml(newValue, this._index).done((html) => {
                this.htmlValue = html;
            });
        }
    }
    setEditValue(newVal) {
        const oldVal = this.editValue;
        this.editValue = newVal;
        let val = this.editingFieldChanged(this, oldVal, newVal);
        val = val == null ? newVal : val;
        if (val !== oldVal) {
            this._refreshHtmlValue(val);
        }
        if (val !== newVal) {
            this.editValue = val;
            this._editorValue = val;
        }
    }
    getEditValue() {
        return this.editValue;
    }
    onPropertyChanged(args) { }
    editingFieldChanged(field, oldVal, newVal) {
        return newVal;
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('readOnly', this.readOnly)
            .generateProperty('editValue', this.editValue)
            .generateProperty('htmlValue', this.htmlValue)
            .generateProperty('editorValue', this._editorValue)
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'readOnly')
            viewModel.readOnly = this.readOnly;
        if (args.propertyName === 'editValue')
            viewModel.editValue = this.editValue;
        if (args.propertyName === 'htmlValue')
            viewModel.htmlValue = this.htmlValue;
        if (args.propertyName === '_editorValue')
            viewModel.editorValue = this._editorValue;
    }
    editorName() { return this._fieldModel.editorName; }
    id() { return this._fieldModel.id; }
    groupID() { return this._fieldModel.groupID; }
    pageIndex() { return this._fieldModel.pageIndex; }
    type() { return this._fieldModel.type; }
    model() {
        return extend({}, this._fieldModel, {
            readOnly: this.readOnly,
            editValue: this.editValue,
            htmlValue: this.htmlValue,
        });
    }
    createModel(page, pageWidth, pageHeight, editingFieldsProvider, bounds) {
        if (this._fieldModel.type === 'check') {
            return new CheckEditingFieldViewModel(this, pageWidth, pageHeight, page, editingFieldsProvider);
        }
        else if (this._fieldModel.type === 'text') {
            this._needToUseHtml = bounds.height !== this._fieldModel.bounds.height || !!this._fieldModel.brickOptions.formatString;
            if (!this._needToUseHtml) {
                this.htmlValue = null;
            }
            return new TextEditingFieldViewModel(this, pageWidth, pageHeight, page, bounds);
        }
        else if (this._fieldModel.type === 'charactercomb') {
            return new CharacterCombEditingFieldViewModel(this, pageWidth, pageHeight, page, bounds);
        }
        else if (this._fieldModel.type === 'image') {
            return new DefaultImageEditingFieldViewModel(this, pageWidth, pageHeight, page, bounds);
        }
    }
}
__decorate([
    mutable(false)
], EditingField.prototype, "readOnly", void 0);
__decorate([
    mutable(null)
], EditingField.prototype, "editValue", void 0);
__decorate([
    mutable(null)
], EditingField.prototype, "_editorValue", void 0);
__decorate([
    mutable(null)
], EditingField.prototype, "htmlValue", void 0);
