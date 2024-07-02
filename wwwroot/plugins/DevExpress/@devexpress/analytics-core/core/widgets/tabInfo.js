﻿/**
* DevExpress Analytics (core\widgets\tabInfo.js)
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
import { getLocalization } from '../../property-grid/localization/_localization';
import { SvgTemplatesEngine } from '../../property-grid/widgets/internal/_svgTemplateEngine';
import { BaseRenderingModel, mutable } from '../../serializer/native/models/base.model';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
export class TabInfo extends BaseRenderingModel {
    constructor(options) {
        super();
        this.visible = 'visible' in options ? options.visible : true;
        this.disabled = 'disabled' in options ? options.disabled : false;
        const imageBaseName = options.imageClassName || options.text.toLowerCase();
        this._text = options.text;
        this.name = options.text;
        this._localizationId = options.localizationId;
        this.imageClassName = 'dxrd-image-' + imageBaseName;
        this.imageTemplateName = options.imageTemplateName || SvgTemplatesEngine.getExistingTemplate('dxrd-svg-tabs-' + options.text.toLowerCase());
        this.template = options.template;
        this._disposables.push(options.model, options.keyboardHelper);
        this.model = options.model;
        this.keyboardHelper = options.keyboardHelper;
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'visible') {
            viewModel.visible = this.visible;
        }
        if (args.propertyName === 'imageClassName') {
            viewModel.image.class = this.imageClassName;
        }
        if (args.propertyName === 'imageTemplateName') {
            viewModel.image.templateName = this.imageTemplateName;
        }
        if (args.propertyName === 'active' || args.propertyName === 'disabled') {
            viewModel.css.class = `${this.active ? 'dxd-state-active dxd-state-no-hover' : ''} ${this.disabled ? 'dxrd-tab-item-disabled' : ''}`;
        }
        if (args.propertyName === 'disabled') {
            viewModel.disabled = this.disabled;
        }
        if (args.propertyName === 'active') {
            viewModel.active = this.active;
        }
        if (args.propertyName === 'model') {
            viewModel.model = this.model;
        }
        if (this.keyboardHelper && (args.propertyName === 'active' || args.propertyName === 'collapsed')) {
            if (this.active && !this.collapsed && args.oldValue !== undefined)
                setTimeout(() => this.focus());
        }
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'visible' && !args['newValue']) {
            this.active = false;
        }
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('text', this.text)
            .generateProperty('image', createViewModelGenerator()
            .generateProperty('class', this.imageClassName)
            .generateProperty('templateName', this.imageTemplateName)
            .getViewModel())
            .generateProperty('click', () => void 0)
            .generateProperty('css', createViewModelGenerator()
            .generateProperty('class', `${this.active ? 'dxd-state-active dxd-state-no-hover' : ''} ${this.disabled ? 'dxrd-tab-item-disabled' : ''}`)
            .getViewModel())
            .generateProperty('disabled', this.disabled)
            .generateProperty('visible', this.visible)
            .generateProperty('active', this.active)
            .generateProperty('template', this.template)
            .generateProperty('model', this.model)
            .generateProperty('keyboardHelper', this.keyboardHelper)
            .getViewModel();
    }
    focus() {
        this.keyboardHelper && this.keyboardHelper.focus(document.getElementsByClassName('dxrd-tab-item dxd-state-active')[0]);
    }
    get text() {
        return getLocalization(this._text, this._localizationId);
    }
}
__decorate([
    mutable(false)
], TabInfo.prototype, "active", void 0);
__decorate([
    mutable(true)
], TabInfo.prototype, "visible", void 0);
__decorate([
    mutable(false)
], TabInfo.prototype, "disabled", void 0);
__decorate([
    mutable(null)
], TabInfo.prototype, "model", void 0);
__decorate([
    mutable(undefined)
], TabInfo.prototype, "collapsed", void 0);
