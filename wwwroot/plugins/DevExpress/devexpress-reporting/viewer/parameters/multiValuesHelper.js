﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\multiValuesHelper.js)
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
import { compareArrays } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseModel, mutableArray, nativeMultiPlatformEngine, subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
export class MultiValuesHelper extends BaseModel {
    constructor(parameter) {
        super();
        const items = parameter.lookUpValues;
        this.items = items;
        this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(this, 'value', {
            read: () => parameter._value,
            write: (newVal) => parameter._value = newVal
        }, [
            subscribableProperty(parameter, ['_value'])
        ]));
        this.dataSource = items;
        let allValues;
        this.maxDisplayedTags = Math.min(((items && items.length) || 1) - 1, MultiValuesHelper.maxDisplayedTags);
        this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(this, 'isSelectedAll', {
            read: () => { var _a; return ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) == items.length; },
            write: (selectAll) => {
                const newValue = selectAll ? (allValues || (allValues = items.map(x => x.value))) : [];
                if (!compareArrays(this.value, newValue))
                    this.value = newValue;
            }
        }, [
            subscribableProperty(this, ['value'])
        ]));
        if (parameter.selectAllValues)
            this.isSelectedAll = true;
    }
    onPropertyChanged(args) { }
}
MultiValuesHelper.maxDisplayedTags = 3;
__decorate([
    mutableArray(() => [])
], MultiValuesHelper.prototype, "selectedItems", void 0);
