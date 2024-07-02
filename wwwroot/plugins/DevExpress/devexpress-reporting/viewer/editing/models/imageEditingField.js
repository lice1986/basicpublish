﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\imageEditingField.js)
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
import { CssCalculator, extend, KeyboardEnum } from '@devexpress/analytics-core/analytics-internal-native';
import { mutable, currentModelSerializer } from '@devexpress/analytics-core/analytics-serializer-native';
import { brickStyleSerializationsInfo } from '../../../common/metadata';
import { EditingFieldExtensions } from '../../../common/utils/editingFieldExtensions';
import { PreviewSelection } from '../../internal/_previewSelection';
import { EditingFieldBase } from './editingFieldBase';
export class ImageEditingFieldViewModel extends EditingFieldBase {
    constructor(field, pageWidth, pageHeight, page, bounds) {
        var _a;
        super(page);
        this.field = field;
        this.bounds = bounds;
        this.popupTarget = '.dx-designer';
        this.popupOptions = {
            target: this.popupTarget,
            boundary: this.popupTarget,
            container: this.popupTarget
        };
        this.template = 'dxrp-editing-field-image';
        this.shadingEnabled = true;
        const brickStyle = field.model().brickOptions;
        const style = { rtl: () => brickStyle.rtl };
        currentModelSerializer().deserialize(style, JSON.parse(brickStyle.style), brickStyleSerializationsInfo);
        const cssCalculator = new CssCalculator(style, !!brickStyle.rtlLayout);
        this.addDisposable(this.field.events.on('editValueChanged', (args) => {
            this.alignment = this.field.getEditValue().alignment;
            this.sizeMode = this.field.getEditValue().sizeMode;
        }));
        this.alignment = this.field.getEditValue().alignment;
        this.sizeMode = this.field.getEditValue().sizeMode;
        const editor = EditingFieldExtensions.instance().editor(field.editorName()) || EditingFieldExtensions.instance().editor('ImageAndSignature');
        const options = editor.options;
        this.shadingEnabled = !!((_a = options.registrationOptions) === null || _a === void 0 ? void 0 : _a.shadingEnabled);
        this.editMode = options.editMode;
        this._updateContainerStyle = () => {
            if (!this.bounds)
                return;
            this.containerStyle = extend({
                height: this.bounds.height * this.zoom + 'px',
                width: this.bounds.width * this.zoom + 'px',
                zIndex: this.active ? 10 : 0,
                top: this.bounds.top * 100 / pageHeight + '%',
                left: this.bounds.left * 100 / pageWidth + '%'
            }, cssCalculator.borderCss(), cssCalculator.paddingsCss());
        };
        this._updateContainerStyle();
        this.callbacks = extend({
            onDraw: (s) => this.onDraw(s),
            onFocusIn: (s) => this.onFocusIn(s),
            onFocusOut: (s) => this.onBlur(s)
        }, options.callbacks);
    }
    onPropertyChanged(args) {
        super.onPropertyChanged(args);
        if (args.propertyName === 'zoom' || args.propertyName === 'active')
            this._updateContainerStyle && this._updateContainerStyle();
    }
    getImage() {
        return this.field.getEditValue().image;
    }
    getImageType() {
        return this.field.getEditValue().imageType;
    }
    onKeyDown(event) {
        if (event.key == KeyboardEnum.Space) {
        }
        else {
        }
    }
    onFocusIn(s) {
        PreviewSelection.disabled = true;
    }
    onDraw(s) {
        PreviewSelection.disabled = true;
    }
    onBlur(s) {
        const options = s.getCurrentOptions();
        const result = extend({}, this.field.getEditValue(), options);
        if (!!result.imageType) {
            result.imageType = result.imageType === 'svg' ? 'svg' : ImageEditingFieldViewModel.__DefaultImageType;
        }
        const currentVal = this.field.getEditValue();
        const isNotEqual = Object.keys(currentVal).some(x => {
            if (!result[x] && !currentVal[x])
                return false;
            return result[x] !== currentVal[x];
        });
        if (isNotEqual)
            this.field.setEditValue(result);
        PreviewSelection.disabled = false;
    }
}
ImageEditingFieldViewModel.__DefaultImageType = 'img';
__decorate([
    mutable(null)
], ImageEditingFieldViewModel.prototype, "alignment", void 0);
__decorate([
    mutable(null)
], ImageEditingFieldViewModel.prototype, "sizeMode", void 0);
