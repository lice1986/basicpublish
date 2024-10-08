﻿/**
* DevExpress Analytics (core\elements\elementViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { ModelSerializer } from '../../serializer/serializer';
import { Disposable } from '../../serializer/disposable';
import { compareObjects, copyObservables } from '../utils/_utils';
export class ElementViewModel extends Disposable {
    constructor(model, parent, serializer) {
        super();
        this.actions = [];
        this.actionProviders = [];
        this.update = ko.observable(false);
        this.controlType = this.controlType || this.getControlFactory().getControlType(model);
        this.preInitProperties(model, parent, serializer);
        this.parentModel = ko.observable(parent);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this._disposables.push(this['displayName'] = ko.pureComputed(() => {
            let result = this.name && this.name();
            if (!result) {
                result = 'unnamed ' + this.controlType;
            }
            return result;
        }));
        this.resetValue = (propertyName) => {
            this._resetProperty(propertyName);
        };
        this.actions.push({
            action: this.resetValue,
            id: 'dxd-reset',
            title: getLocalization('Reset', 'AnalyticsCoreStringId.PropertyGrid_PopupMenu_Reset'), visible: this.isResettableProperty,
            weight: 1000
        });
    }
    _resetProperty(propertyName) {
        if (this[propertyName].resetValue) {
            this[propertyName].resetValue();
        }
        else {
            const defaultValue = this.getPropertyDefaultValue(propertyName);
            if (ko.isObservable(this[propertyName])) {
                this[propertyName](defaultValue);
            }
            else {
                copyObservables(defaultValue, this[propertyName]);
            }
        }
    }
    getPropertyDefaultValue(propertyName) {
        const info = this.getPropertyInfo(propertyName);
        return ko.unwrap(info && new ModelSerializer().deserializeDefaultValue(info));
    }
    getPropertyInfo(propertyName) {
        return this.getInfo().filter((info) => { return info.propertyName === propertyName; })[0];
    }
    getInfo() {
        return this.getControlFactory().controlsMap[this.controlType].info;
    }
    createControl(model, serializer) {
        return this.getControlFactory().createControl(model, this, serializer);
    }
    dispose() {
        super.dispose();
        this.surface && this.surface.dispose();
    }
    preInitProperties(model, parent, serializer) { }
    getNearestParent(target) {
        return target.getMetaData().isContainer ? target : target.getNearestParent(target.parentModel());
    }
    getControlInfo() {
        return this.getControlFactory().controlsMap[this.controlType || 'Unknown'];
    }
    getMetaData() {
        const controlType = this.controlType ? this.controlType : 'Unknown', data = this.getControlFactory().controlsMap[controlType];
        return {
            isContainer: data.isContainer || false,
            isCopyDeny: data.isCopyDeny || false,
            isDeleteDeny: data.isDeleteDeny || false,
            canDrop: data.canDrop || (() => true),
            isPasteDeny: data.isPasteDeny || !data.isContainer
        };
    }
    _hasModifiedValue(name) {
        return this['_' + name] && this['_' + name]() && this.isPropertyModified(name);
    }
    createChild(info) {
        const newControl = this.getControlFactory().createControl(info, this);
        this.addChild(newControl);
        return newControl;
    }
    removeChilds(controls) {
        if (this['controls']) {
            const childs = this['controls']();
            for (let i = 0; i < controls.length; i++) {
                childs.splice(childs.indexOf(controls[i]), 1);
            }
            this['controls'].valueHasMutated();
        }
    }
    addChilds(controls) {
        if (this['controls']) {
            const childs = this['controls']();
            for (let i = 0; i < controls.length; i++) {
                childs.splice(0, 0, controls[i]);
            }
            this['controls'].valueHasMutated();
        }
    }
    removeChild(control) {
        if (this['controls']) {
            this['controls'].splice(this['controls']().indexOf(control), 1);
            control.onDelete();
        }
    }
    addChild(control) {
        if (this['controls'] && this['controls']().indexOf(control) === -1) {
            control.parentModel(this);
            this['controls'].splice(0, 0, control);
        }
    }
    isPropertyVisible(name) {
        return true;
    }
    isPropertyDisabled(name) {
        return false;
    }
    isPropertyModified(name) {
        const needName = this['_' + name] ? '_' + name : name;
        if (this[needName].isPropertyModified) {
            return this[needName].isPropertyModified();
        }
        else if (this[needName].isEmpty) {
            return !this[needName].isEmpty();
        }
        else {
            const defaultValue = this.getPropertyDefaultValue(name), propertyValue = ko.unwrap(this[needName]);
            if (defaultValue instanceof Object) {
                return !compareObjects(defaultValue, propertyValue);
            }
            else {
                return defaultValue !== propertyValue;
            }
        }
    }
    getControlFactory() {
        throw Error('Virtual method getControlFactory');
    }
    isResettableProperty(propertyName) {
        return ['name', 'size', 'location'].indexOf(propertyName) === -1;
    }
    _getRoot() {
        let root = this;
        while (root && root.parentModel()) {
            root = root.parentModel();
        }
        return root;
    }
    get root() {
        return this._getRoot();
    }
    rtl() {
        return false;
    }
    onDelete() { }
}
