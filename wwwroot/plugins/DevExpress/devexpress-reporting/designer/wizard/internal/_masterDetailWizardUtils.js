﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailWizardUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { assignObj, extend } from '@devexpress/analytics-core/analytics-internal';
import { DataMemberTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { DataMemberTreeNode, FieldTreeNode } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { getSummaryFunctionValues } from '../../controls/metadata/properties/metadata';
import { isList } from '../../internal/dragdrop/_utils';
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
import { FieldInfo } from './_utils';
export class MasterDetailInfoBase {
    constructor(name, specifics, displayName) {
        this.name = name;
        this.specifics = specifics;
        this.displayName = displayName;
        if (!this.displayName)
            this.displayName = this.name;
    }
}
export class MasterDetailFieldInfo extends MasterDetailInfoBase {
    constructor(field) {
        super(field.name, field.specifics, field.displayName);
        this.checked = !field.unChecked();
    }
}
export class MasterDetailQueryInfo extends MasterDetailInfoBase {
    constructor(dataMember) {
        super(dataMember.name, dataMember.specifics, dataMember.displayName);
        this._complexFields = [];
        this._complexRelations = [];
        this.fields = [];
        this.relations = [];
        this.path = dataMember.path;
        this.checked = dataMember.checked();
        dataMember.children().forEach(item => {
            if (!item.isList || item.isComplex) {
                if (item.isComplex && item instanceof DataMemberTreeNode) {
                    this._expandComplexFieds(item);
                }
                else {
                    this.fields.push(new MasterDetailFieldInfo(item));
                }
            }
            else {
                this.relations.push(new MasterDetailQueryInfo(item));
            }
        });
        this.fields = this.fields.concat(this._complexFields);
        this.relations = this.relations.concat(this._complexRelations);
    }
    _expandComplexFieds(complexField) {
        complexField.children().forEach(child => {
            const newChild = assignObj(child, extend({}, child, { name: complexField.name + '.' + child.name }));
            if (child instanceof FieldTreeNode) {
                this._complexFields.push(new MasterDetailFieldInfo(newChild));
            }
            if (!child.isComplex && child instanceof DataMemberTreeNode) {
                this._complexRelations.push(new MasterDetailQueryInfo(newChild));
            }
            if (child.isComplex && child instanceof DataMemberTreeNode) {
                this._expandComplexFieds(newChild);
            }
        });
    }
}
export class DataMemberCustomCheckedTreeNode extends DataMemberTreeNode {
    constructor(name, displayName, specifics, isChecked, path, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, path, afterCheckToggled);
        this.checked = ko.pureComputed({
            read: () => {
                const lists = this.children().filter(item => isList(item));
                if (lists.length === 0) {
                    return this._checked();
                }
                else {
                    let checkedChildren = 0;
                    let partiallySelectedItems = 0;
                    lists.forEach(item => {
                        if (item.checked() === true) {
                            checkedChildren++;
                        }
                        else if (item.checked() !== false) {
                            partiallySelectedItems++;
                        }
                    });
                    if (checkedChildren > 0)
                        this._checked(true);
                    if (checkedChildren === lists.length) {
                        return true;
                    }
                    else {
                        return this._checked() || partiallySelectedItems > 0 ? undefined : false;
                    }
                }
            }
        });
        this.checked.subscribe(item => {
            afterCheckToggled && afterCheckToggled(this);
        });
        if (isChecked)
            afterCheckToggled && afterCheckToggled(this);
    }
    setChecked(value) {
        if (!value || (!this.unChecked() && value)) {
            this.children().forEach(item => isList(item) && item.setChecked(false));
            this._checked(false);
        }
        else
            this._checked(value);
    }
}
export class MasterDetailTreeListController extends DataMemberTreeListController {
    constructor(hideDataMemberSubItems) {
        super();
        this.hideDataMemberSubItems = hideDataMemberSubItems || ko.observable(false);
    }
    canSelect(value) {
        return (value.hasItems && !!value.path) || value.data.specifics === 'none';
    }
    hasItems(item) {
        if (this.hideDataMemberSubItems()) {
            return false;
        }
        return super.hasItems(item);
    }
}
export class AvailableFieldsTreeListController extends FieldListController {
    constructor(rootItems) {
        super(null);
        this.rootItems = rootItems;
    }
    itemsFilter(item) {
        let visible = false;
        if (!!item.path && isList(item)) {
            visible = this.rootItems().map(item => item['path']).indexOf(item.path) > -1;
        }
        else if (item.path) {
            const stringEndIndex = item.path.lastIndexOf(item.name);
            const pathParts = item.path.substring(0, stringEndIndex != -1 ? stringEndIndex : undefined).split('.');
            if (pathParts.length > 0 && !pathParts[pathParts.length - 1])
                pathParts.splice(pathParts.length - 1, 1);
            visible = this.rootItems().map(item => item['path']).indexOf(pathParts.join('.')) > -1;
        }
        if (!visible && !item.unChecked()) {
            item.setChecked(false);
        }
        item.visible(visible);
        return visible;
    }
    isDraggable(item) {
        return false;
    }
}
export class SummaryInfo extends FieldInfo {
    constructor(data) {
        super(data);
        this.functionValue([]);
    }
}
export class SummaryInfoFieldlist extends SummaryInfo {
    constructor() {
        super(getSummaryFunctionValues());
        this.selectedPath = ko.observable('');
        this._disposables.push(this.displayName = ko.computed(() => {
            if (!this.field())
                return null;
            return [this.field().parent.displayName, this.field().displayName].join(' - ');
        }).extend({ rateLimit: 0 }));
    }
}