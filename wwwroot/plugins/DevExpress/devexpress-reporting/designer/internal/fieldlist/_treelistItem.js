﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_treelistItem.js)
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
import { CodeResolver, nameValidationRules } from '@devexpress/analytics-core/analytics-internal';
import { createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
export class ReportDesignerTreelistItem extends TreeListItemViewModel {
    constructor(options, path = [], onItemsVisibilityChanged = $.noop, rtl = false, resolver = new CodeResolver(), _fieldListItemFactory) {
        super(options, path, onItemsVisibilityChanged, rtl, resolver);
        this.resolver = resolver;
        this._fieldListItemFactory = _fieldListItemFactory;
        this._createValidatorOptions = () => ({
            validationRules: nameValidationRules,
        });
        this._onRenameDisposeFunc = null;
        this._createRenameEditorOptions = () => ({
            onFocusOut: (event) => {
                if (event.component.option('isValid') === true)
                    this._rename(event.component.option('value'));
                else
                    setTimeout(() => {
                        event.component.focus();
                    });
            },
            onInitialized: (event) => {
                setTimeout(() => {
                    event.component.focus();
                    $.fn.constructor(event.component.element()).find('input')[0].select();
                });
            },
            onKeyUp: (event) => {
                if (event.event.key.toLowerCase() === 'escape') {
                    this.renameMode = false;
                }
            },
            onEnterKey: (event) => {
                if (event.component.option('isValid') === true)
                    this._rename(event.component.option('value'));
                else
                    setTimeout(() => {
                        event.component.focus();
                    });
            },
            text: this.text
        });
        this.templates.actionsContainer = 'dx-treelist-action-container-with-rename';
        this.templates.itemTextContent = 'dx-treelist-item-text-content-with-rename';
        this._onRenameDisposeFunc = this._fieldListItemFactory.events.on('renameInProgressChanged', (args) => {
            this.disabled = this._isDisabled();
        });
    }
    _isDisabled() {
        return this._fieldListItemFactory.renameInProgress && !this.isSelected;
    }
    _rename(val) {
        this.data['rename'](val);
        this.renameMode = false;
    }
    _getCssRules() {
        return Object.assign({ 'dx-treelist-item-disabled': this.disabled }, super._getCssRules());
    }
    onPropertyChanged(args) {
        super.onPropertyChanged(args);
        if (args.propertyName === 'renameMode') {
            this.toggleSelected(null, null);
            this._fieldListItemFactory.renameInProgress = this.renameMode;
        }
        else if (args.propertyName === 'isSelected') {
            this.disabled = this._isDisabled();
        }
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        viewModel.inRenameMode = this.renameMode;
        viewModel.disabled = this._isDisabled();
        if (args.propertyName === 'disabled') {
            viewModel.cssRules = this._getCssRules();
        }
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('setRenameMode', (value) => this.renameMode = value)
            .generateProperty('disabled', this.disabled)
            .generateProperty('inRenameMode', this.renameMode)
            .generateProperty('createValidatorOptions', () => this._createValidatorOptions())
            .generateProperty('createRenameEditorOptions', () => this._createRenameEditorOptions())
            .getViewModel();
    }
    dispose() {
        super.dispose();
        this._onRenameDisposeFunc();
    }
}
__decorate([
    mutable(false)
], ReportDesignerTreelistItem.prototype, "renameMode", void 0);
__decorate([
    mutable(false)
], ReportDesignerTreelistItem.prototype, "disabled", void 0);
