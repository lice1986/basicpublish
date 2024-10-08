﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\popupImageEditingField.js)
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
import { $dx, getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { ImageEditingFieldViewModel } from './imageEditingField';
export class PopupImageEditingFieldViewModel extends ImageEditingFieldViewModel {
    constructor() {
        super(...arguments);
        this._parentPopupClass = 'dxrp-editing-field-popup-container';
        this._popupInitializedClass = 'dxrp-editing-field-popup-container-initialized';
        this._getPopupContainer = (element) => $dx(element).closest('.' + this._parentPopupClass);
        this._resetPictureEditor = (pictureEditorModel) => {
            pictureEditorModel.reset(this.painterData.imageSource, this.painterData.alignment, this.painterData.sizeMode, this.painterData.imageType);
            this._resetPainter(pictureEditorModel.painter);
        };
        this._resetPainter = (painter) => {
            painter.imagePainter.format = painter.imageFormatByType(this.getImageType());
            painter.imageSizeMode = this.sizeMode;
            painter.imageAlignment = this.alignment;
            painter.image = this.getImage();
            painter.refresh();
        };
        this.canActivateEditor = true;
        this.template = 'dxrp-popup-editing-field-image';
    }
    _getPainterOptions() {
        if (this.painterData == null) {
            this.painterData = {
                imageSource: this.getImage(),
                imageType: this.getImageType(),
                alignment: this.alignment,
                sizeMode: this.sizeMode,
                editingFieldModel: this,
                setPainter: (painter) => this.painter = painter
            };
        }
        return this.painterData;
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('parentPopupClass', this._parentPopupClass)
            .generateProperty('getPainterOptions', () => this._getPainterOptions())
            .generateProperty('popupData', createViewModelGenerator()
            .generateProperty('contentTemplate', 'dxrp-editing-field-image-editor')
            .generateProperty('visible', this.active)
            .generateProperty('getPositionTarget', (element) => this._getPopupContainer(element).element)
            .generateProperty('shading', this.shadingEnabled)
            .generateProperty('showContent', this._showContent)
            .generateProperty('onShown', () => this._showContent = true)
            .generateProperty('onHiding', (event) => {
            this.pictureEditor.painter.signaturePainter.resetLastPosition();
            this._resetPainter(this.painter);
            document.activeElement['blur']();
            this.active = false;
            this._showContent = false;
        })
            .generateProperty('onContentReady', (event) => {
            this._resetPainter(this.painter);
            event.component && event.component.registerKeyHandler('tab', (_) => {
                viewModel.popupData.onHiding(event);
            });
        })
            .generateProperty('renderedHandler', () => this._renderedHandler())
            .generateProperty('getPopupContainer', getParentContainer)
            .getViewModel())
            .getViewModel();
        return viewModel;
    }
    _renderedHandler() {
        this._resetPictureEditor(this.pictureEditor);
    }
    _setPictureEditor(editor) {
        this.pictureEditor = editor;
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        if (args.propertyName === 'active')
            viewModel.popupData.visible = this.active;
        if (args.propertyName === '_showContent')
            viewModel.popupData.showContent = this._showContent;
    }
    activateEditor(viewModel, e) {
        if (!this.field.readOnly) {
            const _parentPopup = this._getPopupContainer(e.target);
            if (!_parentPopup.hasClass(this._popupInitializedClass))
                _parentPopup.addClass(this._popupInitializedClass);
            this.active = true;
        }
    }
    deferredUpdateViewModel() { return false; }
}
__decorate([
    mutable(false)
], PopupImageEditingFieldViewModel.prototype, "_showContent", void 0);
export const DefaultImageEditingFieldViewModel = PopupImageEditingFieldViewModel;
