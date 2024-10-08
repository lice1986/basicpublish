﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorActionProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { calculateWithZoomFactor } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { addToBindingsCache } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import { ImagePickerAction } from './_imagePicker';
import { PictureEditorToolbarItem, PictureEditorToolbarItemWithPopup } from './_pictureEditorToolbarItem';
import { PictureEditorActionId } from './_pictureEditorTypes';
export class PictureEditorActionProvider extends Disposable {
    constructor(_editorModel, _popupOptions) {
        super();
        this._editorModel = _editorModel;
        this._popupOptions = _popupOptions;
    }
    _initPopupOptions(options) {
        return createViewModelGenerator(options)
            .generateProperty('boundary', this._popupOptions.boundary)
            .generateProperty('getPositionTarget', () => this._popupOptions.getPositionTarget())
            .generateProperty('target', this._popupOptions.target)
            .generateProperty('container', this._popupOptions.container)
            .generateProperty('visible', options.visible)
            .getViewModel();
    }
    createOpenFileAction(action) {
        const openFileActionOptions = {
            id: PictureEditorActionId.OpenFile,
            icon: 'dxrd-svg-pictureeditor-toolbar_open',
            title: getLocalization('Load Image', 'PreviewStringId.ImageEditingFieldEditor_LoadImage'),
            action: (e) => action(e)
        };
        return new PictureEditorToolbarItem(openFileActionOptions);
    }
    createImagePickerAction(images, filterEnabled, action) {
        const imagePickerAction = new ImagePickerAction(images, filterEnabled, action, this._editorModel.painter.initialSize);
        const popupOptions = this._initPopupOptions({
            width: 'auto',
            height: calculateWithZoomFactor(300) + 'px',
            contentTemplate: imagePickerAction.contentTemplate,
            contentData: imagePickerAction.getViewModel()
        });
        return new PictureEditorToolbarItemWithPopup({
            id: PictureEditorActionId.PickImage,
            icon: 'dxrd-svg-pictureeditor-image_gallery',
            title: getLocalization('Choose Image', 'PreviewStringId.ImageEditingFieldEditor_ChooseImage'),
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions
        });
    }
    createSizingAction() {
        const popupOptions = this._initPopupOptions({
            width: calculateWithZoomFactor(174) + 'px',
            height: calculateWithZoomFactor(300) + 'px',
            contentTemplate: 'dx-picture-editing-sizemode-alignment',
            contentData: this._editorModel.painter.getViewModel().sizingOptions
        });
        return new PictureEditorToolbarItemWithPopup({
            id: PictureEditorActionId.Alignment,
            icon: 'dxrd-svg-pictureeditor-toolbar_size_mode_and_alignment',
            title: getLocalization('Size Mode and Alignment', 'PreviewStringId.ImageEditingFieldEditor_SizeModeAndAlignment'),
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions
        });
    }
    createBrushAction() {
        const popupOptions = this._initPopupOptions({
            width: calculateWithZoomFactor(226) + 'px',
            height: calculateWithZoomFactor(295) + 'px',
            contentTemplate: 'dx-picture-editing-brush-options',
            contentData: this._editorModel.painter.getViewModel().brushOptions
        });
        return new PictureEditorToolbarItemWithPopup({
            id: PictureEditorActionId.Brush,
            icon: 'dxrd-svg-pictureeditor-toolbar_brush_options',
            title: getLocalization('Brush Options', 'PreviewStringId.ImageEditingFieldEditor_BrushOptions'),
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions
        });
    }
    createResetItem(action) {
        const clearItemOptions = {
            id: PictureEditorActionId.Reset,
            icon: 'dxrd-svg-pictureeditor-toolbar_reset',
            title: getLocalization('Reset', 'PreviewStringId.ImageEditingFieldEditor_Reset'),
            action: (e) => action()
        };
        return new PictureEditorToolbarItem(clearItemOptions);
    }
    createClearItem(action) {
        const clearItemOptions = {
            id: PictureEditorActionId.Clear,
            icon: 'dxrd-svg-pictureeditor-toolbar_clear',
            title: getLocalization('Clear', 'PreviewStringId.ImageEditingFieldEditor_Clear'),
            action: (e) => action()
        };
        return new PictureEditorToolbarItem(clearItemOptions);
    }
}
PictureEditorActionProvider.colors = ['#FFFFFF', '#FFC0C0', '#FFE0C0', '#FFFFC0', '#C0FFC0', '#C0FFFF', '#C0C0FF', '#FFC0FF', '#E0E0E0', '#FF8080', '#FFC080', '#FFFF80', '#80FF80', '#80FFFF', '#8080FF', '#FF80FF', '#C0C0C0', '#FF0000', '#FF8000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#808080', '#C00000', '#C04000', '#C0C000', '#00C000', '#00C0C0', '#0000C0', '#C000C0', '#404040', '#800000', '#804000', '#808000', '#008000', '#008080', '#000080', '#800080', '#000000', '#400000', '#804040', '#404000', '#004000', '#004040', '#000040', '#400040'];
addToBindingsCache('style: { fill: $data.templateOptions.contentData.lineColor }', function ($context, $element) {
    return {
        'style': function () {
            return {
                'fill': $context.$data.templateOptions.contentData.lineColor
            };
        }
    };
});
