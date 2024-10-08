﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPicturebox.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BordersModel, extend, pixelToUnits, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ImageSource } from '../../common/imageSource';
import { Base64ImageParser } from '../utils/base64ImageParser';
import { imageUrl } from './metadata/xrPicturebox';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class XRPictureBoxViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.imageRatio = { x: 1, y: 1 };
        this.originalImageWidth = ko.observable();
        this.originalImageHeight = ko.observable();
        const imageHeight = ko.observable(this.size.height()), imageWidth = ko.observable(this.size.width());
        this._sizing = ko.observable(this.sizing());
        this.size['_width'] = this.size.width;
        this.size['_height'] = this.size.height;
        this.size.isPropertyDisabled = (propertyName) => {
            return this._sizing() === 'AutoSize';
        };
        if (!this.imageSource() && model['@Image']) {
            this.imageSource(new ImageSource('img', model['@Image']));
            delete this['_model']['@Image'];
        }
        let oldSizingValue = this._sizing();
        this._disposables.push(this.sizing = ko.computed({
            read: () => {
                return this._sizing();
            },
            write: (value) => {
                const undo = UndoEngine.tryGetUndoEngine(this);
                undo && undo.start();
                if (oldSizingValue === 'AutoSize') {
                    this.size['_width'](imageWidth());
                    this.size['_height'](imageHeight());
                }
                oldSizingValue = value;
                this._sizing(value);
                if (value === 'CenterImage')
                    this.imageAlignment('MiddleCenter');
                undo && undo.end();
            }
        }));
        this._disposables.push(this.size.width = ko.pureComputed({
            read: () => {
                return this.isAutoSize ? imageWidth() : this.size['_width']();
            },
            write: (value) => {
                if (!this.isAutoSize) {
                    this.size['_width'](value);
                }
            }
        }));
        this._disposables.push(this.size.height = ko.pureComputed({
            read: () => {
                return this.isAutoSize ? imageHeight() : this.size['_height']();
            },
            write: (value) => {
                if (!this.isAutoSize) {
                    this.size['_height'](value);
                }
            }
        }));
        this._disposables.push(ko.computed(() => {
            const img = new Image();
            img.onload = () => {
                const report = this.root;
                this._disposables.push(ko.computed(() => {
                    this.originalImageWidth(pixelToUnits(img.width * this.imageRatio.x, report.measureUnit(), 1));
                    this.originalImageHeight(pixelToUnits(img.height * this.imageRatio.y, report.measureUnit(), 1));
                }));
            };
            const imageSource = this.imageSource();
            if (imageSource) {
                img.src = imageSource.getDataUrl();
                this.imageRatio = Base64ImageParser.getImageRatio(imageSource.data, imageSource.sourceType);
            }
            else
                this.imageRatio = { x: 1, y: 1 };
        }));
        const toPixel = (value) => {
            return unitsToPixel(value, this.root['measureUnit']());
        };
        this._disposables.push(ko.computed(() => {
            if (this.isAutoSize && this.imageSource.peek()) {
                const borders = new BordersModel({ value: this['borders'] }), borderWidth = this['borderWidth']() || 0, paddings = (this['paddingObj']);
                const top = borders.top() ? borderWidth : 0;
                const bottom = borders.bottom() ? borderWidth : 0;
                const left = borders.left() ? borderWidth : 0;
                const right = borders.right() ? borderWidth : 0;
                imageWidth(this.originalImageWidth() + right + left + toPixel(paddings._get('left')) + toPixel(paddings._get('right')));
                imageHeight(this.originalImageHeight() + top + bottom + toPixel(paddings._get('top')) + toPixel(paddings._get('bottom')));
            }
        }));
        this._disposables.push(this.isSmallerImage = ko.pureComputed(() => {
            return this.originalImageWidth() <= this.size.width() && this.originalImageHeight() <= this.size.height();
        }));
        this._disposables.push(this.imageUrl.subscribe((newVal) => {
            if (newVal) {
                this.imageSource(null);
                this.imageRatio = { x: 1, y: 1 };
            }
        }));
        this._disposables.push(this.imageSource.subscribe((newVal) => {
            if (newVal) {
                this.imageUrl(imageUrl.defaultVal);
            }
        }));
    }
    isAlignmentDisabled() {
        return ['Tile', 'StretchImage', 'AutoSize', 'Cover'].indexOf(this._sizing()) !== -1;
    }
    isPropertyDisabled(propertyName) {
        if (propertyName === 'imageAlignment')
            return this.isAlignmentDisabled();
        return super.isPropertyDisabled(propertyName);
    }
    get isAutoSize() {
        return this._sizing() === 'AutoSize';
    }
}
const backgroundSizeCss = ['-o-background-size', 'mozBackgroundSize', 'backgroundSize'];
const backgroundOriginCss = ['background-origin', '-webkit-background-origin', ' -o-background-origin', 'mozBackgroundOrigin', 'backgroundOrigin'];
export class XRPictureBoxSurface extends XRControlSurface {
    constructor(model, context) {
        super(model, context);
        this.selectiontemplate = 'dxrd-picturebox-selection';
        const control = this.getControlModel();
        this.contentHeightWithoutZoom.dispose();
        this.contentWidthWithoutZoom.dispose();
        this.contentSizes.dispose();
        this._disposables.push(this.contentSizes = ko.pureComputed(() => this.cssCalculator.contentSizeCss(this.rect().width, this.rect().height, this._context.zoom(), this._control['borders'](), this._control.paddingObj)));
        this._disposables.push(this.contentHeightWithoutZoom = ko.pureComputed(() => this.contentSizes().height / this._context.zoom()));
        this._disposables.push(this.contentWidthWithoutZoom = ko.pureComputed(() => this.contentSizes().width / this._context.zoom()));
        this._disposables.push(this.css = ko.pureComputed(() => { return {}; }));
        this._disposables.push(this.contentCss = ko.pureComputed(() => {
            const imageSource = control.imageSource();
            const urlContent = imageSource
                ? imageSource.getDataUrl()
                : control.imageUrl();
            return extend({}, this._createBackimage(control['backColor'](), urlContent, control.sizing(), control.isSmallerImage()), this._createBackgroundOrigin(), control.isAlignmentDisabled() ? {} : this._createBackgroundPosition(control.imageAlignment(), control.sizing()), this.cssCalculator.createVerticalAlignment('Top'));
        }));
    }
    _createBackgroundPosition(alignment, sizing) {
        if (alignment === 'Default' && (sizing === 'Squeeze' || sizing === 'ZoomImage')) {
            alignment = 'MiddleCenter';
        }
        let x = '0%';
        let y = '0%';
        if (alignment.indexOf('Middle') !== -1)
            y = '50%';
        if (alignment.indexOf('Bottom') !== -1)
            y = '100%';
        if (alignment.indexOf('Center') !== -1)
            x = '50%';
        if (alignment.indexOf('Right') !== -1)
            x = '100%';
        return {
            backgroundPosition: [x, y].join(' ')
        };
    }
    _createBackimage(background, urlContent, sizing, isSmallerImage) {
        let backgroundResult = {};
        if (urlContent) {
            backgroundResult = { background: background + ' url(' + urlContent + ') no-repeat' };
            if (this._control.imageSource()) {
                const imageFormat = this._control.imageSource().sourceType;
                if (imageFormat == 'png' || imageFormat == 'jpg' || imageFormat == 'jpeg') {
                    const size = this._control.originalImageWidth() + 'px ' + this._control.originalImageHeight() + 'px';
                    backgroundSizeCss.forEach(propName => { backgroundResult[propName] = size; });
                }
            }
            if (sizing) {
                if (sizing === 'Squeeze') {
                    sizing = isSmallerImage ? 'CenterImage' : 'ZoomImage';
                }
                switch (sizing) {
                    case 'StretchImage':
                        for (let i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = '100% 100%';
                        }
                        break;
                    case 'ZoomImage':
                    case 'Cover':
                        for (let i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = sizing === 'ZoomImage' ? 'contain' : 'cover';
                        }
                        backgroundResult['backgroundPosition'] = 'center center';
                        break;
                    case 'AutoSize':
                        for (let i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = '100% 100%';
                        }
                        break;
                    case 'Tile':
                        backgroundResult['backgroundRepeat'] = 'repeat';
                }
            }
            return backgroundResult;
        }
        backgroundResult = { background: background };
        return backgroundResult;
    }
    _createBackgroundOrigin() {
        const result = {};
        for (let i = 0; i < backgroundOriginCss.length; i++) {
            result[backgroundOriginCss[i]] = 'content-box';
        }
        result['width'] = this.contentWidthWithoutZoom() + 'px';
        result['height'] = this.contentHeightWithoutZoom() + 'px';
        return result;
    }
    getResizeOptions(resizeHandler) {
        if (!this.resizeOptions && resizeHandler) {
            const resizeDisabled = ko.computed(() => {
                return resizeHandler.disabled && resizeHandler.disabled() || this._control.sizing() === 'AutoSize';
            });
            this.resizeOptions = {
                disabled: resizeDisabled,
                snapHelper: resizeHandler.snapHelper,
                starting: resizeHandler.starting,
                stopped: resizeHandler.stopped
            };
            this._disposables.push(resizeDisabled);
        }
        return this.resizeOptions;
    }
    getAdornTemplate() {
        const superAdornTemplate = super.getAdornTemplate(), placeholder = this.hasBindings || !this.getControlModel().imageSource() ? 'dxrd-image-surface-picturebox_placeholder' : '';
        return superAdornTemplate + (superAdornTemplate && placeholder ? ' ' : '') + placeholder;
    }
}
