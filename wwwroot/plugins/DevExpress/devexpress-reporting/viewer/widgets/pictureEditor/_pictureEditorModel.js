﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorModel.js)
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
import { $dx, extend, getParentContainer, uploadFile } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import * as events from 'devextreme/events';
import dxPopup from 'devextreme/ui/popup';
import { ImageEditingFieldViewModel } from '../../editing/models/imageEditingField';
import { PictureEditMode } from './pictureEditMode';
import { Painter } from './_painter';
import { PictureEditorActionProvider } from './_pictureEditorActionProvider';
export class PictureEditorModel extends BaseRenderingModel {
    constructor(editingFieldModel, element, onResize) {
        super();
        this.editingFieldModel = editingFieldModel;
        this.GESTURE_COVER_CLASS = 'dx-gesture-cover';
        this.ACTIVE_POPUP_CLASS = '.dx-picture-editing-active';
        this._getPopupContent = () => {
            const popupInstance = dxPopup['getInstance'](this.$element.find(this.ACTIVE_POPUP_CLASS).element);
            return popupInstance && $dx(popupInstance.content());
        };
        this.actions = [];
        this._initialImageType = editingFieldModel.getImageType() || 'png';
        this.editMode = editingFieldModel.editMode || PictureEditMode.Image;
        this._initialImage = editingFieldModel.getImage();
        this._initialAlignment = editingFieldModel.alignment;
        this._initialSizeMode = editingFieldModel.sizeMode;
        this._callbacks = editingFieldModel.callbacks;
        this.$element = $dx(element);
        this.shadingEnabled = editingFieldModel.shadingEnabled;
        this.active = editingFieldModel.active;
        const painterOptions = {
            alignment: this._initialAlignment,
            imageSource: this._initialImage,
            imageType: this._initialImageType,
            sizeMode: this._initialSizeMode,
            pictureEditorModel: this,
            editingFieldModel: editingFieldModel
        };
        this.painter = new Painter(this.$element.element, painterOptions, onResize);
        this._disposables.push(this.painter);
        this.actionsProvider = new PictureEditorActionProvider(this, extend(true, {
            getPositionTarget: () => {
                return this._getPopupContent().find('.dx-picture-editing-toolbar').element;
            }
        }, (editingFieldModel.popupOptions || {})));
        this._disposables.push(this.actionsProvider);
        this._initActions(editingFieldModel.callbacks && editingFieldModel.callbacks.customizeActions);
        this._addEvents();
    }
    _takeFocus() {
        if (!this.editingFieldModel.active) {
            this._callbacks && this._callbacks.onFocusIn && this._callbacks.onFocusIn(this);
            this.editingFieldModel.active = true;
        }
        else if (this.editMode !== PictureEditMode.Image) {
            this.canDraw = true;
            this._callbacks && this._callbacks.onDraw && this._callbacks.onDraw(this);
        }
    }
    _releaseFocus() {
        if (this.editingFieldModel.active) {
            this._callbacks && this._callbacks.onFocusOut && this._callbacks.onFocusOut(this);
            this.editingFieldModel.active = false;
            this.canDraw = false;
        }
    }
    _wrapButtonAction(item, model) {
        const oldAction = item.action;
        item.action = (sender, event) => {
            model.changeActiveButton(sender);
            if (oldAction)
                oldAction(event, model);
        };
    }
    _initActions(customizeActionsCallback) {
        if (this.editMode == PictureEditMode.Image || this.editMode == PictureEditMode.ImageAndSignature) {
            this.actions.push(this.actionsProvider.createOpenFileAction((e) => this._loadImage(e)));
            this.actions.push(this.actionsProvider.createSizingAction());
        }
        if (this.editMode == PictureEditMode.Signature || this.editMode == PictureEditMode.ImageAndSignature) {
            this.actions.push(this.actionsProvider.createBrushAction());
        }
        if (!!this._initialImage) {
            this.actions.push(this.actionsProvider.createResetItem(() => {
                this.painter.reset(this._initialImage, this._initialAlignment, this._initialSizeMode, this._initialImageType);
            }));
        }
        this.actions.push(this.actionsProvider.createClearItem(() => {
            this.painter.clear();
        }));
        customizeActionsCallback && customizeActionsCallback(this, this.actions);
        this.actions.forEach((item) => this._wrapButtonAction(item, this));
    }
    _loadImage(event) {
        event.stopPropagation();
        event.preventDefault();
        uploadFile({
            accept: 'image/*'
        }).done(result => {
            this.painter.format(result.format);
            this.painter.image = result.content;
            this.painter.refresh();
        });
    }
    _addEvents() {
        this._pointerDownHandler = (e) => {
            this._takeFocus();
        };
        this._pointerCancelHandler = (e) => {
            this._releaseFocus();
        };
        this._pointerUpHandler = (e) => {
            if (!this.editingFieldModel.active)
                return;
            const isUnderCursor = (componentContent) => {
                return componentContent && (componentContent.is(e.target) || componentContent.has(e.target));
            };
            const isEditorContainer = this.$element.is(e.target) || this.$element.has(e.target)
                || isUnderCursor(this._getPopupContent())
                || this.actions.some(action => {
                    if (!action.active)
                        return false;
                    const component = action.component;
                    const componentUnwrapped = typeof component === 'function' ? component() : component;
                    return isUnderCursor(componentUnwrapped && $dx(componentUnwrapped.content()));
                })
                || (e.target && e.target.className && e.target.className.indexOf && e.target.className.indexOf(this.GESTURE_COVER_CLASS) !== -1);
            if (!isEditorContainer) {
                this._releaseFocus();
            }
        };
        const element = this.$element.element;
        events.on(element, 'dxpointerdown', this._pointerDownHandler);
        events.on(element, 'dxpointercancel', this._pointerCancelHandler);
        events.on(document, 'dxpointerup', this._pointerUpHandler);
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('shadingEnabled', this.shadingEnabled)
            .generateProperty('getPopupContainer', getParentContainer)
            .generateProperty('onContentReady', (event) => {
            event.component && event.component.registerKeyHandler('tab', () => {
                this.editingFieldModel.active = false;
            });
        })
            .generateProperty('painter', this.painter.getViewModel())
            .generateProperty('actions', this.actions)
            .generateProperty('element', this.$element.element)
            .getViewModel();
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'canDraw') {
            this._canDrawChanged && this._canDrawChanged(args.newValue);
        }
    }
    changeActiveButton(selectedItem) {
        this.actions.forEach(action => {
            action.active = action === selectedItem && !action.active;
        });
    }
    dispose() {
        super.dispose();
        const element = this.$element.element;
        events.off(element, 'dxpointerdown', this._pointerDownHandler);
        events.off(element, 'dxpointercancel', this._pointerCancelHandler);
        events.off(document, 'dxpointerup', this._pointerUpHandler);
        this.actions.forEach(action => action.dispose && action.dispose());
        this.$element = null;
        this.editingFieldModel = null;
    }
    getImage() {
        return this.painter.getImage();
    }
    reset(image, alignment, sizeMode, imageType) {
        this._initialImage = image;
        this._initialAlignment = alignment;
        this._initialSizeMode = sizeMode;
        this._initialImageType = imageType;
        this.painter.reset(this._initialImage, this._initialAlignment, this._initialSizeMode, this._initialImageType);
    }
    getCurrentOptions() {
        const imageBase64 = (this.painter.hasSignature() ? this.painter.getImage() : this.painter.image) || '';
        const imageParts = imageBase64.split(',');
        return {
            sizeMode: this.painter.imageSizeMode,
            alignment: this.painter.imageAlignment,
            imageType: this.painter.hasSignature() ? ImageEditingFieldViewModel.__DefaultImageType : this.painter.format(),
            image: imageParts[imageParts.length - 1]
        };
    }
}
__decorate([
    mutable(false)
], PictureEditorModel.prototype, "active", void 0);
__decorate([
    mutable(false)
], PictureEditorModel.prototype, "canDraw", void 0);