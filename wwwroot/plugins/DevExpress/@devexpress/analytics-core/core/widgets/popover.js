﻿/**
* DevExpress Analytics (core\widgets\popover.js)
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
import { BaseRenderingModel, mutable } from '../../serializer/native/models/base.model';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { getParentContainer } from '../../widgets/_utils';
export class Popover extends BaseRenderingModel {
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('data', this.data)
            .generateProperty('target', this.target)
            .generateProperty('visible', this.visible)
            .generateProperty('onHiding', () => { this.onHiding(); })
            .generateProperty('getPopupContainer', getParentContainer)
            .getViewModel();
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'visible')
            viewModel.visible = this.visible;
        if (args.propertyName === 'target')
            viewModel.target = this.target;
        if (args.propertyName === 'data')
            viewModel.data = this.data;
    }
    onPropertyChanged(args) {
    }
    onHiding() {
        this.visible = false;
    }
}
__decorate([
    mutable(false)
], Popover.prototype, "visible", void 0);
__decorate([
    mutable(undefined)
], Popover.prototype, "target", void 0);
__decorate([
    mutable('')
], Popover.prototype, "data", void 0);