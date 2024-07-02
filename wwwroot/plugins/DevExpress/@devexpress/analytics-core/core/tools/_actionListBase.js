﻿/**
* DevExpress Analytics (core\tools\_actionListBase.js)
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
import * as $ from 'jquery';
import { BaseModel, BaseRenderingModel, mutable } from '../../serializer/native/models/base.model';
import { koUtils } from '../utils/_koUtils';
import { createActionListBaseViewModel, createBaseActionViewModel } from './_actionListBase.viewModel';
export class ActionListsBase extends BaseRenderingModel {
    constructor(enabled) {
        super();
        this.toolbarItems = [];
        this.enabled = enabled || (() => true);
    }
    createViewModel() {
        return createActionListBaseViewModel.call(this, super.createViewModel());
    }
    subscribeOnChanges(action, viewModelAction, propertyNames) {
        propertyNames.forEach((propertyName) => {
            this.subscribe(action, propertyName, () => {
                viewModelAction[propertyName] = koUtils.unwrap(action[propertyName]);
            });
        });
    }
    subscribe(model, propertyName, callback) {
        const property = model[propertyName];
        if (koUtils.isSubscribable(property)) {
            this.addDisposable(property.subscribe((newValue) => {
                callback(newValue);
                this.events.call('propertyChanged');
            }));
        }
        else if (model instanceof BaseModel) {
            this.addDisposable(model.events.on(`${propertyName}Changed`, (args) => {
                callback(args.newValue);
                this.events.call('propertyChanged');
            }));
        }
    }
    createActionViewModel(action, index) {
        if (action.getViewModel)
            return action.getViewModel(this, index);
        return createBaseActionViewModel.call(this, action, index);
    }
    onPropertyChanged(args) {
    }
    updateViewModel(args) {
        if (args.propertyName === 'toolbarItems')
            this.getViewModel().toolbarItems = this.mapActionToViewModels(koUtils.unwrap(this.toolbarItems));
    }
    mapActionToViewModels(actions) {
        return actions.map((x, i) => this.createActionViewModel(x, i));
    }
    getActions() {
        return koUtils.unwrap(this.toolbarItems);
    }
    processShortcut(e) {
        const actions = this.getActions();
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            if (action.hotKey && action.hotKey.ctrlKey === e.ctrlKey && action.hotKey.keyCode === e.keyCode) {
                const enabled = !koUtils.unwrap(action.disabled);
                const visible = koUtils.unwrap(action.visible);
                if (enabled && visible) {
                    action.clickAction();
                    e.preventDefault();
                }
            }
        }
    }
    shouldIgnoreProcessing(e) {
        if (e.altKey || !this.enabled())
            return true;
        const activeElement = $.fn.constructor(document.activeElement);
        if (activeElement.is('textarea') || activeElement.is(':input') && (['password', 'text', 'number'].indexOf(activeElement.attr('type')) != -1)) {
            return true;
        }
        return false;
    }
}
__decorate([
    mutable(() => [])
], ActionListsBase.prototype, "toolbarItems", void 0);
export class BaseAction extends BaseRenderingModel {
    constructor(model) {
        super();
        if (model) {
            Object.keys(model).forEach(key => this[key] = model[key]);
        }
    }
    onPropertyChanged(args) { }
    createViewModel(parent, index) {
        return createBaseActionViewModel.call(parent, this, index);
    }
    getViewModel(parent, index) {
        if (!this.__viewModel)
            this.__viewModel = this.createViewModel(parent, index);
        return this.__viewModel;
    }
    isVisible() {
        return true;
    }
    isDisabled() {
        return false;
    }
}
__decorate([
    mutable(false)
], BaseAction.prototype, "imageClassName", void 0);
__decorate([
    mutable(false)
], BaseAction.prototype, "imageTemplateName", void 0);
__decorate([
    mutable(false)
], BaseAction.prototype, "disabled", void 0);
__decorate([
    mutable(true)
], BaseAction.prototype, "visible", void 0);
__decorate([
    mutable(undefined)
], BaseAction.prototype, "selected", void 0);
