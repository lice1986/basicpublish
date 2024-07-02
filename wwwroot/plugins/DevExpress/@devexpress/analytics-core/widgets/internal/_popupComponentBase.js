﻿/**
* DevExpress Analytics (widgets\internal\_popupComponentBase.js)
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
import { $dx } from '../../core/utils/_jqueryUtils';
import { BaseModel, mutable } from '../../serializer/native/models/base.model';
export class PopupComponentBase extends BaseModel {
    constructor() {
        super(...arguments);
        this.onContentReady = (e) => {
            this._component = e.component;
        };
        this.hideOnOutsideClick = (e) => {
            const component = this.getComponent();
            const $content = component && $dx(component.content());
            return !$content || !($content.has(e.target) || $content.is(e.target));
        };
    }
    onPropertyChanged(args) { }
    getComponent() {
        return this._component;
    }
    dispose() {
        super.dispose();
        const component = this._component;
        component && component.dispose();
        this._component = null;
    }
}
__decorate([
    mutable(undefined)
], PopupComponentBase.prototype, "_component", void 0);