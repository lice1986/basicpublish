﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePicker.js)
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
import { findMatchesInString, searchPlaceholder, ShowMessage } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { getImageBase64 } from '../../internal/_utils';
export class ImagePickerAction extends BaseRenderingModel {
    constructor(images, filterEnabled, action, initialSize) {
        super();
        this.filterEnabled = filterEnabled && images.every((image) => image.text !== undefined);
        this.contentTemplate = this.filterEnabled ? 'dx-picture-editing-imagepickerwithfilter' : 'dx-picture-editing-imagespicker';
        this.contentWidth = initialSize.width * 2 + 35;
        this.width = Math.min(initialSize.width, 150);
        this.height = Math.min(initialSize.height, 150);
        this.images = images.map(image => createViewModelGenerator().createDefaultModel(this)
            .generateProperty('url', image.url)
            .generateProperty('text', image.text)
            .generateProperty('data', image.data)
            .generateProperty('visible', true)
            .generateProperty('width', this.width)
            .generateProperty('height', this.height)
            .generateProperty('filterEnabled', this.filterEnabled)
            .generateProperty('filter', this.filterString)
            .generateProperty('action', () => {
            if (image.url) {
                getImageBase64(image.url).done((result) => {
                    action(result);
                }).fail((e) => {
                    ShowMessage(e.name + ' :' + e.message.split(':').pop(), 'error');
                });
            }
            else {
                action(image.data);
            }
        })
            .getViewModel());
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'filterString') {
            this.images.forEach(image => {
                image.visible = !!findMatchesInString(image.text, args.newValue);
                image.filter = args.newValue;
            });
        }
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('filterEnabled', this.filterEnabled)
            .generateProperty('filter', this.filterString)
            .generateProperty('searchPlaceholder', searchPlaceholder())
            .generateProperty('contentWidth', this.contentWidth)
            .generateProperty('width', this.width)
            .generateProperty('height', this.height)
            .generateProperty('onFilterChanged', (event) => this.filterString = event.value)
            .generateProperty('images', this.images)
            .getViewModel();
    }
}
__decorate([
    mutable('')
], ImagePickerAction.prototype, "filterString", void 0);
