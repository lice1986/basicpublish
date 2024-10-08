﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandPropertySurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { PathRequest } from '../../common/pathRequest';
export class OperandPropertySurface extends OperandSurfaceBase {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this._displayName = ko.observable('');
        this.propertyName = ko.observable('');
        this.specifics = ko.observable('integer');
        this.dataType = ko.observable('');
        this.valueType = ko.observable('');
        this.changeProperty = (item) => {
            this.fieldsOptions().selected(item);
        };
        this.templateName = 'dx-filtereditor-property';
        this.operatorClass = 'criteria-operator-item-field dxd-filter-editor-field-back-color dxd-filter-editor-field-back-color dxd-filter-editor-text-color';
        this.propertyName(operator.propertyName);
        const options = this.helper.generateTreelistOptions(fieldListProvider, path);
        if (options.options && options.subscription) {
            this.fieldsOptions = options.options;
            this._disposables.push(options.subscription);
        }
        else {
            this.fieldsOptions = options;
        }
        this._disposables.push(this.fieldsOptions().selectedPath.subscribe((newVal) => {
            const realName = this.fieldsOptions().selectedPath().substr(this.path && this.path().length > 0 ? this.path().length + 1 : 0);
            this.propertyName(realName);
            this.model.propertyName = realName;
            this.popupService.visible(false);
        }));
        this._disposables.push(this.fieldsOptions().selected.subscribe((newVal) => {
            this._updateDisplayName(path, this.propertyName(), newVal.displayName);
            let specifics = newVal.specifics.toLowerCase();
            if (specifics.indexOf('calc') === 0) {
                specifics = specifics.split('calc')[1];
            }
            if (this.specifics() !== specifics || this.dataType() !== newVal.dataType) {
                this.specifics(specifics);
                this.dataType(newVal.dataType);
                this.parent.change();
            }
            this.helper.onChange();
        }));
        this.fieldsOptions().selectedPath(this.path && !!ko.unwrap(this.path) ? [ko.unwrap(this.path), this.propertyName()].join('.') : this.propertyName());
        this._updateSpecifics();
        this._disposables.push(this.displayName = ko.computed(() => {
            return this._displayName() || this.propertyName();
        }));
    }
    _updateDisplayName(path, propertyName, displayName) {
        if (!!this.helper.getDisplayPropertyName) {
            this.helper.getDisplayPropertyName(ko.unwrap(path), propertyName).done((newVal) => {
                this._displayName(newVal);
            });
        }
        else {
            this._displayName(displayName);
        }
    }
    _updateSpecifics() {
        const self = this;
        const propertyPath = this.propertyName().split('.');
        let realPropertyName = propertyPath.pop();
        if (ko.unwrap(this.fieldsOptions).itemsProvider) {
            this.isUpdated(true);
            ko.unwrap(this.fieldsOptions).itemsProvider.getItems(new PathRequest([this.path()].concat(propertyPath).join('.'))).done((result) => {
                const notListProperties = result.filter((item) => { return item.specifics !== 'List' && !item.isList; });
                if (!this.propertyName() && notListProperties.length > 0) {
                    this.model.propertyName = notListProperties[0].name;
                    this.propertyName(notListProperties[0].name);
                    realPropertyName = notListProperties[0].name;
                }
                const item = result.filter((item) => { return item.name === realPropertyName; })[0];
                if (item) {
                    let specifics = item.specifics.toLowerCase();
                    if (specifics.indexOf('calc') === 0) {
                        specifics = specifics.split('calc')[1];
                    }
                    this.specifics(specifics);
                    this.dataType(item.dataType);
                    this._updateDisplayName(this.path, this.propertyName(), item.displayName);
                }
            }).always(() => {
                this.isUpdated(false);
            });
        }
    }
    get items() {
        return this.fieldsOptions;
    }
    get displayType() {
        return null;
    }
}
