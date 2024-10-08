﻿/**
* DevExpress Analytics (core\tools\_tabInfoWithPropertyGrid.js)
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
import { ObjectProperties } from '../../property-grid/propertygrid';
import { TabInfo } from '../widgets/tabInfo';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { mutable } from '../../serializer/native/models/base.model';
import { guid } from '../../undo-engine/_utils';
import { subscribableProperty } from '../../serializer/native/multiplatformEngine';
import { Popover } from '../widgets/popover';
export class TabInfoWithPropertyGrid extends TabInfo {
    constructor(options) {
        super(options);
        this.propertyGridModel = options.propertyGridModel;
        this.propertyGrid = new ObjectProperties(this.propertyGridModel, undefined, undefined, undefined, true, undefined, undefined, new Popover(), options.engineType);
        this.addDisposable(this.propertyGrid.createComputedProperty(`___${guid()}`, () => {
            const someRendered = this.propertyGrid.getEditors().some(editor => editor.visible && editor._get('isRendered'));
            if (someRendered) {
                this.keyboardHelper && this.keyboardHelper.initialize();
                this.focus();
            }
        }, [
            subscribableProperty(this.propertyGrid, [{
                    propertyName: '_editors',
                    subscribables: ['visible', 'isRendered']
                }])
        ]));
        this._disposables.push(this.propertyGrid);
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('propertyGrid', this.propertyGrid.getViewModel())
            .generateProperty('propertyGridModel', this.propertyGridModel)
            .getViewModel();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        if (args.propertyName === 'propertyGridModel') {
            this.propertyGrid.updateEditorsInfo(this.propertyGridModel, this.propertyGridModel.getInfo());
            const viewModel = this.getViewModel();
            viewModel.propertyGridModel = this.propertyGridModel;
        }
    }
}
__decorate([
    mutable(undefined)
], TabInfoWithPropertyGrid.prototype, "propertyGridModel", void 0);
