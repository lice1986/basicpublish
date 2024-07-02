﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_treelistFactory.js)
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
import { mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { KoTreeListItemFactory, wrapTreeListOptionsWithKo } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ReportDesignerTreelistItem } from './_treelistItem';
export class FieldListItemFactory extends KoTreeListItemFactory {
    createItem(options, path, onItemsVisibilityChanged, rtl, resolver) {
        return new ReportDesignerTreelistItem(wrapTreeListOptionsWithKo(options), path, onItemsVisibilityChanged, rtl, resolver, this);
    }
}
__decorate([
    mutable(false)
], FieldListItemFactory.prototype, "renameInProgress", void 0);