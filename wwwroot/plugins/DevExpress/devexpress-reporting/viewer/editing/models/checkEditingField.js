﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\checkEditingField.js)
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
import { ImageSource } from '../../../common/imageSource';
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import { KeyboardEnum } from '@devexpress/analytics-core/analytics-internal-native';
import { EditingFieldBase } from './editingFieldBase';
import { createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
export var GlyphStyle;
(function (GlyphStyle) {
    GlyphStyle[GlyphStyle["StandardBox1"] = 0] = "StandardBox1";
    GlyphStyle[GlyphStyle["StandardBox2"] = 1] = "StandardBox2";
    GlyphStyle[GlyphStyle["YesNoBox"] = 2] = "YesNoBox";
    GlyphStyle[GlyphStyle["YesNoSolidBox"] = 3] = "YesNoSolidBox";
    GlyphStyle[GlyphStyle["YesNo"] = 4] = "YesNo";
    GlyphStyle[GlyphStyle["RadioButton"] = 5] = "RadioButton";
    GlyphStyle[GlyphStyle["Smiley"] = 6] = "Smiley";
    GlyphStyle[GlyphStyle["Thumb"] = 7] = "Thumb";
    GlyphStyle[GlyphStyle["Toggle"] = 8] = "Toggle";
    GlyphStyle[GlyphStyle["Star"] = 9] = "Star";
    GlyphStyle[GlyphStyle["Heart"] = 10] = "Heart";
})(GlyphStyle || (GlyphStyle = {}));
export var CheckState;
(function (CheckState) {
    CheckState[CheckState["Unchecked"] = 0] = "Unchecked";
    CheckState[CheckState["Checked"] = 1] = "Checked";
    CheckState[CheckState["Indeterminate"] = 2] = "Indeterminate";
})(CheckState || (CheckState = {}));
export function createCustomGlyphStyleCss(imageSource) {
    let backgroundResult = {};
    if (imageSource) {
        const urlContent = imageSource.getDataUrl();
        if (urlContent) {
            backgroundResult = { background: 'url(' + urlContent + ') no-repeat' };
            backgroundResult['backgroundPosition'] = 'center center';
            backgroundResult['backgroundSize'] = 'cover';
        }
    }
    return backgroundResult;
}
export function getCheckBoxTemplate(style, state, customGlyph) {
    if (customGlyph && Object.keys(customGlyph).length > 0) {
        return 'dxrd-checkboxcustomglyph';
    }
    else {
        return SvgTemplatesEngine.getExistingTemplate('dxrd-svg-checkboxglyphs-' + style + '_' + state);
    }
}
export class CheckEditingFieldViewModel extends EditingFieldBase {
    constructor(field, pageWidth, pageHeight, page, editingFieldsProvider) {
        super(page);
        this._editingFieldsProvider = editingFieldsProvider;
        this.template = 'dxrp-editing-field-checkbox';
        this.field = field;
        const bounds = this.field.model().bounds;
        const checkBounds = this.field.model().brickOptions.checkBoxBounds;
        const rtl = this.field.model().brickOptions.rtlLayout;
        this._updateContainerStyle = () => {
            if (!bounds)
                return;
            this.containerStyle = {
                height: bounds.height + 'px',
                width: bounds.width + 'px',
                top: bounds.top * 100 / pageHeight + '%',
                left: bounds.left * 100 / pageWidth + '%',
                cursor: this.field.readOnly ? 'auto' : 'pointer'
            };
        };
        this._updateCheckStyle = () => {
            if (!checkBounds)
                return;
            this.checkStyle = {
                height: checkBounds.height + 'px',
                width: checkBounds.width + 'px',
                top: checkBounds.top + 'px',
                left: (rtl ? (bounds.width - checkBounds.left - checkBounds.width) : checkBounds.left) + 'px'
            };
        };
        this._updateCustomGlyphStyleCss = () => {
            const checkBoxGlyphOptions = field.model().brickOptions.checkBoxGlyphOptions;
            if (!checkBoxGlyphOptions)
                return;
            const imageSourceData = checkBoxGlyphOptions.customGlyphs.filter(item => item.key === this.field.getEditValue())[0];
            if (!imageSourceData.value) {
                this.customGlyphStyleCss = {};
                return;
            }
            const imageSource = new ImageSource(imageSourceData.value.imageType, imageSourceData.value.image);
            this.customGlyphStyleCss = createCustomGlyphStyleCss(imageSource);
        };
        this._updateCheckStateStyleIcon = () => {
            const checkBoxGlyphOptions = field.model().brickOptions.checkBoxGlyphOptions;
            if (!checkBoxGlyphOptions)
                return;
            this.checkStateStyleIcon = getCheckBoxTemplate(GlyphStyle[checkBoxGlyphOptions.glyphStyle], CheckState[this.field.getEditValue()], this.customGlyphStyleCss);
        };
        this.addDisposable(this.field.events.on('editValueChanged', (args) => {
            this._updateCustomGlyphStyleCss();
            this._updateCheckStateStyleIcon();
            this._updateCheckedState();
        }), this.field.events.on('readOnlyChanged', (args) => {
            this._updateContainerStyle();
        }));
        this._updateCheckStyle();
        this._updateContainerStyle();
        this._updateCheckedState();
        this._updateCustomGlyphStyleCss();
    }
    _toggleCheckState() {
        if (this.field.getEditValue() === CheckState.Checked) {
            this.field.setEditValue(CheckState.Unchecked);
        }
        else {
            this.field.setEditValue(CheckState.Checked);
        }
    }
    onPropertyChanged(args) {
        super.onPropertyChanged(args);
        if (args.propertyName === 'customGlyphStyleCss')
            this._updateCheckStateStyleIcon();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        if (args.propertyName === 'customGlyphStyleCss')
            viewModel.customGlyphStyleCss = this.customGlyphStyleCss;
        if (args.propertyName === 'checkStateStyleIcon')
            viewModel.checkStateStyleIcon = this.checkStateStyleIcon;
        if (args.propertyName === 'checked')
            viewModel.checked = this.checked;
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('checkStateStyleIcon', this.checkStateStyleIcon)
            .generateProperty('customGlyphStyleCss', this.customGlyphStyleCss)
            .generateProperty('checked', this.checked)
            .generateProperty('checkStyle', this.checkStyle)
            .generateProperty('onKeyDown', (event) => this.onKeyDown(event))
            .generateProperty('onFocus', () => this.onFocus())
            .generateProperty('onBlur', () => this.onBlur())
            .getViewModel();
    }
    onKeyDown(event) {
        if (event.key == KeyboardEnum.Space) {
            this.toggleCheckState();
        }
        else {
        }
    }
    onBlur() {
        this.focused = false;
    }
    onFocus() {
        this.focused = true;
    }
    onClick(model, event) {
        event.target.focus();
        this.toggleCheckState();
        event.stopPropagation();
    }
    _updateCheckedState() {
        if (this.field.getEditValue() === CheckState.Checked) {
            this.checked = true;
        }
        if (this.field.getEditValue() === CheckState.Unchecked) {
            this.checked = false;
        }
    }
    toggleCheckState() {
        if (this.field.readOnly)
            return;
        if (!this.field.groupID()) {
            this._toggleCheckState();
        }
        else if (this.checked === false) {
            this._editingFieldsProvider().forEach(value => {
                if (value.groupID() === this.field.groupID()) {
                    value.setEditValue(CheckState.Unchecked);
                }
            });
            this._toggleCheckState();
        }
    }
}
__decorate([
    mutable(null)
], CheckEditingFieldViewModel.prototype, "checkStateStyleIcon", void 0);
__decorate([
    mutable(null)
], CheckEditingFieldViewModel.prototype, "customGlyphStyleCss", void 0);
__decorate([
    mutable(false)
], CheckEditingFieldViewModel.prototype, "focused", void 0);
__decorate([
    mutable(false)
], CheckEditingFieldViewModel.prototype, "checked", void 0);
