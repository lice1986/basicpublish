﻿/**
* DevExpress Analytics (core\elements\paddingModel.js)
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
import { paddingSerializationsInfo } from './paddingModelMetaData';
import { BaseRenderingMultiplatformModel, mutable } from '../../serializer/native/models/base.model';
import { currentMultiPlatformEngine, subscribableProperty } from '../../serializer/native/multiplatformEngine';
export class PaddingModel extends BaseRenderingMultiplatformModel {
    constructor(left = currentMultiPlatformEngine.wrap(null), right = currentMultiPlatformEngine.wrap(null), top = currentMultiPlatformEngine.wrap(null), bottom = currentMultiPlatformEngine.wrap(null), dpi = currentMultiPlatformEngine.wrap(100)) {
        super();
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.dpi = dpi;
        ['left', 'right', 'top', 'bottom'].forEach((_propertyName) => {
            const propertyName = _propertyName;
            const newPropertyname = ('_' + propertyName);
            this.assignProperty(newPropertyname, this._get(propertyName));
            this.addDisposable(this.createComputedProperty(propertyName, {
                read: () => {
                    return this._get(newPropertyname) || 0;
                },
                write: (newVal) => {
                    this._set(newPropertyname, newVal);
                }
            }, [
                subscribableProperty(this, [newPropertyname])
            ]));
        });
        let oldValue = null;
        this.addDisposable(this.createComputedProperty('all', {
            read: () => {
                if (this._get('_isUpdating'))
                    return oldValue;
                if (['right', 'top', 'bottom'].every(propertyName => this._get(propertyName) === this._get('left')))
                    oldValue = this._get('left');
                else
                    oldValue = null;
                return oldValue;
            },
            write: (newVal) => {
                this._set('_isUpdating', true);
                ['left', 'right', 'top', 'bottom'].forEach((propertyName) => this[propertyName](newVal));
                this._set('_isUpdating', false);
            }
        }, [
            subscribableProperty(this, ['_isUpdating', 'right', 'left', 'top', 'bottom'])
        ]));
    }
    getInfo() {
        return paddingSerializationsInfo;
    }
    resetValue() {
        ['left', 'right', 'top', 'bottom'].forEach(name => this._set('_' + name, null));
    }
    isEmpty() {
        return ['left', 'right', 'top', 'bottom'].map(x => this._get('_' + x)).every(x => x === null);
    }
    applyFromString(value) {
        if (value) {
            const components = (value || '').split(',');
            this._set('left', parseInt(components[0]) || 0);
            this._set('right', parseInt(components[1]) || 0);
            this._set('top', parseInt(components[2]) || 0);
            this._set('bottom', parseInt(components[3]) || 0);
        }
        return this;
    }
    static from(val) {
        return new PaddingModel().applyFromString(val);
    }
    toString() {
        if (this.isEmpty())
            return;
        return this._toString();
    }
    _toString(inner = false) {
        return ['left', 'right', 'top', 'bottom'].map(x => parseInt(this._get(x))).concat(this._get('dpi')).join(', ');
    }
}
PaddingModel.defaultVal = '0, 0, 0, 0, 100';
PaddingModel.unitProperties = ['left', 'right', 'top', 'bottom'];
__decorate([
    mutable(false)
], PaddingModel.prototype, "_isUpdating", void 0);
