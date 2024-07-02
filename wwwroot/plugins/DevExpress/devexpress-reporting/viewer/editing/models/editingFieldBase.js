﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\editingFieldBase.js)
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
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
export class EditingFieldBase extends BaseRenderingModel {
    constructor(page) {
        super();
        this.canActivateEditor = false;
        this.zoom = page.zoom;
        this.addDisposable(page.events.on('zoomChanged', (args) => {
            this.zoom = page.zoom;
        }));
    }
    deferredUpdateViewModel() { return false; }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('zoom', this.zoom)
            .generateProperty('template', this.template)
            .generateProperty('field', this.field.getViewModel())
            .generateProperty('canActivateEditor', this.canActivateEditor)
            .generateProperty('activateEditor', (viewModel, event) => this.activateEditor(viewModel.getModel(), event))
            .generateProperty('onClick', (viewModel, event) => this.onClick(viewModel.getModel(), event))
            .generateProperty('containerStyle', this.containerStyle)
            .generateProperty('active', this.active)
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'zoom')
            viewModel.zoom = this.zoom;
        if (args.propertyName === 'active')
            viewModel.active = this.active;
        if (args.propertyName === 'containerStyle')
            viewModel.containerStyle = this.containerStyle;
    }
    onPropertyChanged(args) { }
    activateEditor(model, event) { }
    onClick(model, event) { }
}
__decorate([
    mutable(null)
], EditingFieldBase.prototype, "containerStyle", void 0);
__decorate([
    mutable(1)
], EditingFieldBase.prototype, "zoom", void 0);
__decorate([
    mutable(false)
], EditingFieldBase.prototype, "active", void 0);