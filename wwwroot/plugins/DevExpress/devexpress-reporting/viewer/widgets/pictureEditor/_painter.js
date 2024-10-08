﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_painter.js)
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
import { ImageSizeMode, ImageAlignment, sizing, imageAlignment } from '../../editing/editingField';
import { ImagePainter } from './_imagePainter';
import { SignaturePainter } from './_signaturePainter';
import { $dx, getLocalization } from '@devexpress/analytics-core/analytics-internal-native';
import * as events from 'devextreme/events';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { PictureEditorActionProvider } from './_pictureEditorActionProvider';
import { getEnumValues } from '../../internal/_utils';
import { ImageEditingFieldViewModel } from '../../editing/models/imageEditingField';
export class Painter extends BaseRenderingModel {
    constructor(element, options, onResize) {
        super();
        this._pointerDownHandler = (e) => {
            const point = this._getContextPoint(e);
            point && this.signaturePainter.drawCircle(this._context, point.x, point.y, this.lineColor, this.lineWidth);
        };
        this._pointerMoveHandler = (e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen' || (e.pointerType === 'mouse' && e.originalEvent['buttons'] == 1)) {
                const point = this._getContextPoint(e);
                point && this.signaturePainter.drawPath(this._context, point.x, point.y, this.lineColor, this.lineWidth);
            }
        };
        this._pointerLeaveHandler = (e) => {
            this.signaturePainter.resetLastPosition();
        };
        this.format = (newVal) => {
            if (newVal)
                this.imagePainter.format = newVal;
            return this.imagePainter.format;
        };
        this.image = options.imageSource;
        this.imageSizeMode = options.sizeMode;
        this.imageAlignment = options.alignment;
        this.imagePainter = new ImagePainter({
            alignment: () => this.imageAlignment,
            imageSource: () => this.image,
            sizeMode: () => this.imageSizeMode
        });
        this.getZoom = () => options.editingFieldModel.zoom;
        this.format(options.imageType);
        this._disposables.push(this.signaturePainter = new SignaturePainter());
        this.addDisposable(this.signaturePainter.events.on('hasPointsChanged', (args) => {
            if (args.newValue)
                this._setCanvasSize(this.initialSize.width, this.initialSize.height);
            else
                this._setCanvasSize(this.initialSize.width * this.getZoom(), this.initialSize.height * this.getZoom());
            this.refresh();
            this._updateScale();
        }));
        this._updateScale = () => {
            this.scale = this.hasSignature() ? this.getZoom() : 1;
            onResize && onResize();
        };
        this._updateScale();
        if (options.pictureEditorModel) {
            this.addDisposable(options.pictureEditorModel.events.on('canDrawChanged', (args) => {
                if (args.newValue) {
                    this._addEvents();
                }
                else {
                    this._removeEvents();
                }
            }));
        }
        this.addDisposable(options.editingFieldModel.events.on('zoomChanged', (args) => {
            const newVal = args.newValue;
            if (!this.signaturePainter.hasPoints) {
                this._setCanvasSize(this.initialSize.width * newVal, this.initialSize.height * newVal);
                this.refresh();
            }
            this._updateScale();
        }));
        this.initSize(element, options.editingFieldModel.zoom);
        this.initCanvas(options.editingFieldModel.zoom);
    }
    _getContextPoint(e) {
        if (e.target.nodeName !== 'CANVAS')
            return;
        let zoom = this.getZoom();
        let x, y;
        if (e.offsetX && e.offsetY) {
            zoom = this.hasSignature() ? 1 : zoom;
            x = e.offsetX / zoom;
            y = e.offsetY / zoom;
        }
        else {
            const rect = this._context.canvas.getBoundingClientRect();
            x = (e.clientX - rect.left) / zoom;
            y = (e.clientY - rect.top) / zoom;
        }
        return { x, y };
    }
    _addEvents() {
        const element = this.$element.get(0);
        events.on(element, 'dxpointerdown', this._pointerDownHandler);
        events.on(element, 'dxpointermove', this._pointerMoveHandler);
        events.on(element, 'dxpointerleave', this._pointerLeaveHandler);
    }
    _removeEvents() {
        const element = this.$element.get(0);
        events.off(element, 'dxpointerdown', this._pointerDownHandler);
        events.off(element, 'dxpointermove', this._pointerMoveHandler);
        events.off(element, 'dxpointerleave', this._pointerLeaveHandler);
    }
    _setCanvasSize(width, height) {
        this._context.canvas.setAttribute('width', width);
        this._context.canvas.setAttribute('height', height);
    }
    _cleanCanvas() {
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }
    _getColorValues() {
        const array = [];
        PictureEditorActionProvider.colors.forEach((item) => {
            array.push(createViewModelGenerator()
                .generateProperty('action', () => {
                this.lineColor = item;
                array.forEach(x => x.isSelected = this.lineColor === x.value);
            })
                .generateProperty('isSelected', this.lineColor === item)
                .generateProperty('value', item)
                .getViewModel());
        });
        return array;
    }
    _getEnumValues(enumType, prefix, propertyName, info) {
        const array = [];
        getEnumValues(enumType).forEach((item) => {
            let attrTitle = undefined;
            if (info && info.valuesArray.length > 0) {
                const displayValue = info.valuesArray.filter((value) => value.value === item)[0];
                attrTitle = getLocalization(displayValue.displayValue || displayValue.value, displayValue.localizationId);
            }
            array.push(createViewModelGenerator()
                .generateProperty('action', () => {
                this[propertyName] = enumType[item];
                array.forEach(x => x.isSelected = this[propertyName] === enumType[x.value]);
                this.refresh();
            })
                .generateProperty('attrTitle', attrTitle)
                .generateProperty('iconTemplate', 'dxrd-svg-pictureeditor-' + prefix + '_' + item.toLowerCase())
                .generateProperty('isSelected', this[propertyName] === enumType[item])
                .generateProperty('value', item)
                .getViewModel());
        });
        return array;
    }
    onPropertyChanged(args) { }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('scale', this.scale)
            .generateProperty('brushOptions', createViewModelGenerator()
            .generateProperty('lineWidth', this.lineWidth)
            .generateProperty('lineColor', this.lineColor)
            .generateProperty('colors', this._getColorValues())
            .generateProperty('onLineWidthChanged', (event) => this.lineWidth = event.value)
            .generateProperty('brushWidthText', getLocalization('Brush size', 'PreviewStringId.ImageEditingFieldEditor_BrushSize'))
            .generateProperty('brushColorText', getLocalization('Brush color', 'PreviewStringId.ImageEditingFieldEditor_BrushColor'))
            .getViewModel())
            .generateProperty('sizingOptions', createViewModelGenerator()
            .generateProperty('alignment', this.imageAlignment)
            .generateProperty('alignmentText', getLocalization('Alignment', 'PreviewStringId.ImageEditingFieldEditor_Alignment'))
            .generateProperty('alignmentValues', this._getEnumValues(ImageAlignment, 'alignment', 'imageAlignment', imageAlignment))
            .generateProperty('sizeMode', this.imageSizeMode)
            .generateProperty('sizeModeText', getLocalization('Size Mode', 'PreviewStringId.ImageEditingFieldEditor_SizeMode'))
            .generateProperty('sizeModeValues', this._getEnumValues(ImageSizeMode, 'size_mode', 'imageSizeMode', sizing))
            .getViewModel())
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'lineWidth')
            viewModel.brushOptions.lineWidth = this.lineWidth;
        if (args.propertyName === 'lineColor')
            viewModel.brushOptions.lineColor = this.lineColor;
        if (args.propertyName === 'scale')
            viewModel.scale = this.scale;
        if (args.propertyName === 'imageAlignment')
            viewModel.sizingOptions.alignment = this.imageAlignment;
        if (args.propertyName === 'imageSizeMode')
            viewModel.sizingOptions.sizeMode = this.imageSizeMode;
    }
    clear() {
        this.image = null;
        this.signaturePainter.reset();
        this._cleanCanvas();
    }
    refresh() {
        this._cleanCanvas();
        const zoom = this.signaturePainter.hasPoints ? 1 : this.getZoom();
        const size = this.signaturePainter.hasPoints ? this.initialSize : undefined;
        this.imagePainter.refresh(this._context, zoom, size)
            .then(() => this.signaturePainter.refresh(this._context));
    }
    initSize(element, zoom) {
        this.$element = $dx(element);
        this.initialSize = {
            width: this.$element.outerWidth() / zoom,
            height: this.$element.outerHeight() / zoom
        };
    }
    initCanvas(zoom) {
        const canvas = this.$element.find('canvas')[0];
        this._context = canvas.getContext('2d');
        this._setCanvasSize(this.initialSize.width * zoom, this.initialSize.height * zoom);
        this.imagePainter.refresh(this._context, zoom, {
            width: this._context.canvas.offsetWidth,
            height: this._context.canvas.offsetHeight
        });
    }
    imageFormatByType(imageType) {
        return imageType === ImageEditingFieldViewModel.__DefaultImageType ? 'png' : imageType;
    }
    getImage() {
        return this._context.canvas.toDataURL('image/png');
    }
    hasSignature() {
        return this.signaturePainter.hasPoints;
    }
    dispose() {
        super.dispose();
        this._removeEvents();
        this.$element = null;
        this._context = null;
        this.getZoom = null;
    }
    reset(initialImage, initialAlignment, initialSizeMode, initialImageType) {
        this.image = initialImage;
        this.imageAlignment = initialAlignment;
        this.imageSizeMode = initialSizeMode;
        this.format(this.imageFormatByType(initialImageType));
        this.signaturePainter.reset();
        this.refresh();
    }
}
__decorate([
    mutable()
], Painter.prototype, "image", void 0);
__decorate([
    mutable(ImageSizeMode.Normal)
], Painter.prototype, "imageSizeMode", void 0);
__decorate([
    mutable(ImageAlignment.TopLeft)
], Painter.prototype, "imageAlignment", void 0);
__decorate([
    mutable()
], Painter.prototype, "scale", void 0);
__decorate([
    mutable(1)
], Painter.prototype, "lineWidth", void 0);
__decorate([
    mutable('#000000')
], Painter.prototype, "lineColor", void 0);
