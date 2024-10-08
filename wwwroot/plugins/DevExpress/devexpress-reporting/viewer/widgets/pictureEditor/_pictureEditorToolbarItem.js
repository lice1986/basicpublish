﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorToolbarItem.js)
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
import { $dx } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseModel, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { PopupComponentBase } from '@devexpress/analytics-core/analytics-widgets-internal-native';
export class PictureEditorToolbarItem extends BaseModel {
    constructor(options) {
        super();
        this.id = options.id;
        this.icon = options.icon;
        this.action = options.action;
        this.title = options.title;
    }
    onPropertyChanged(args) { }
    dispose() {
        this.action = null;
    }
}
__decorate([
    mutable(false)
], PictureEditorToolbarItem.prototype, "active", void 0);
export class PictureEditorToolbarItemWithPopup extends PictureEditorToolbarItem {
    constructor(options) {
        super(options);
        this.template = options.template;
        if (options.templateOptions) {
            this.templateOptions = options.templateOptions;
            this._popup = new PopupComponentBase();
            this.templateOptions.onContentReady = this._popup.onContentReady;
            this.templateOptions.hideOnOutsideClick = this._popup.hideOnOutsideClick;
            this.templateOptions.onShown = (e) => {
                const $element = $dx(e.element);
                const topElement = $element.position().top;
                const getPositionTarget = options.templateOptions.getPositionTarget;
                const popupsOffset = $dx(getPositionTarget()).offset().top - $dx(e.component.content()).offset().top;
                const $arrow = $element.find('.dx-popover-arrow');
                $arrow.css('top', popupsOffset + topElement - 24 - 11 + 'px');
            };
            this.templateOptions.onHidden = () => {
                this.active = false;
            };
        }
    }
    onPropertyChanged(args) {
        super.onPropertyChanged(args);
        if (args.propertyName === 'active' && this.templateOptions)
            this.templateOptions.visible = this.active;
    }
    dispose() {
        super.dispose();
        this._popup.dispose();
        this.templateOptions = null;
    }
}
