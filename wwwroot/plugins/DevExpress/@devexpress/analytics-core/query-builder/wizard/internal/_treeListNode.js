﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_treeListNode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { Disposable } from '../../../serializer/disposable';
export const defaultObjectDataSourceItemSpecifics = 'Default';
export class TreeNodeBase extends Disposable {
    constructor(name, displayName, specifics, isChecked = false, afterCheckToggled) {
        super();
        this.name = name;
        this.displayName = displayName;
        this.specifics = specifics;
        this.checked = ko.pureComputed(() => this._checked());
        this.isList = false;
        this._checked = ko.observable(isChecked);
        this._afterCheckToggled = afterCheckToggled || $.noop;
    }
    unChecked() {
        return this.checked() === false;
    }
    toggleChecked() {
        this.setChecked(!this.checked.peek());
        this._afterCheckToggled(this);
    }
    setChecked(value) {
        this._checked(value);
    }
}
export class TreeLeafNode extends TreeNodeBase {
    constructor(name, displayName, specifics, isChecked = false, nodeArguments = null, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.name = name;
        this.displayName = displayName;
        this.specifics = specifics;
        this.hasQuery = false;
        this.arguments = nodeArguments;
    }
}
export class TreeNode extends TreeNodeBase {
    constructor(name, displayName, specifics, isChecked, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.countChecked = ko.pureComputed(() => {
            let count = 0;
            for (let i = 0; i < this.children().length; i++) {
                if (!this.children()[i].unChecked()) {
                    if (count > 1)
                        break;
                    count++;
                }
            }
            return count;
        });
        this.isList = true;
        this.children = ko.observableArray([]);
        this.checked = ko.pureComputed({
            read: () => {
                if (!this.initialized()) {
                    return this._checked();
                }
                else {
                    let selectedItems = 0;
                    let partiallySelectedItems = 0;
                    this.children().forEach(item => {
                        if (item.checked() === true) {
                            selectedItems++;
                        }
                        else if (item.checked() !== false) {
                            partiallySelectedItems++;
                        }
                    });
                    if (selectedItems === 0 && partiallySelectedItems === 0) {
                        return false;
                    }
                    if (selectedItems === this.children.peek().length) {
                        return true;
                    }
                    return undefined;
                }
            }
        });
    }
    initialized() {
        return this.children().length > 0;
    }
    setChecked(value) {
        this._checked(value);
        this.children.peek().forEach(item => {
            item.setChecked(value);
        });
    }
    initializeChildren(children) {
        this.children(children || []);
    }
}
export class ParameterTreeNode extends TreeNode {
    constructor(name, displayName, specifics, isChecked, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.countChecked = ko.pureComputed(() => {
            let count = 0;
            this.hasParamsToEdit(false);
            for (let i = 0; i < this.children().length; i++) {
                const child = this.children()[i];
                if (!child.unChecked()) {
                    if (count > 1)
                        break;
                    count++;
                    if (child.arguments && child.arguments.length > 0)
                        this.hasParamsToEdit(true);
                    if (child.specifics === 'query')
                        this.hasParamsToEdit(true);
                }
            }
            return count;
        });
        this.hasParamsToEdit = ko.observable(false);
    }
}
export class QueriesTreeNode extends ParameterTreeNode {
    constructor(name, displayName, specifics, isChecked, callbacks, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.addAction = {
            clickAction: (item) => {
                if (this.disableCustomSql()) {
                    return this.addQuery();
                }
                else {
                    return this.showPopover();
                }
            },
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            templateName: 'dx-treelist-action-with-popover',
            text: getLocalization('Add query', 'AnalyticsCoreStringId.SqlDSWizard_AddQuery')
        };
        this.itemClickAction = (e) => {
            this.popoverVisible(false);
            e.itemData.addAction();
        };
        this.className = 'dx-addqueries-popover';
        this.popoverVisible = ko.observable(false);
        this.path = name;
        this.addQuery = () => {
            callbacks().showQbCallBack();
        };
        this.addCustomQuery = () => {
            callbacks().showQbCallBack(null, true);
        };
        this.disableCustomSql = () => callbacks && callbacks().disableCustomSql;
        this.target = '.' + this.addAction.templateName;
        this.selectionDisabled = ko.pureComputed(() => {
            return !this.children().length;
        });
    }
    getActions(context) {
        const result = [];
        if (context.path.indexOf('queries') === 0) {
            result.push(this.addAction);
        }
        return result;
    }
    popoverListItems() {
        return [
            {
                name: getLocalization('Run Query Builder', 'DataAccessUIStringId.Button_QueryBuilder'),
                addAction: () => this.addQuery()
            },
            {
                name: getLocalization('Write Custom SQL', 'AnalyticsCoreStringId.SqlDSWizard_WriteCustomSQL'),
                addAction: () => this.addCustomQuery()
            }
        ];
    }
    showPopover() {
        this.popoverVisible(true);
    }
}
export class TreeQueryNode extends TreeLeafNode {
    constructor(name, displayName, specifics, isChecked, parameters, callbacks, afterCheckToggled, query) {
        super(name, displayName, specifics, isChecked, null, afterCheckToggled);
        this.query = query;
        this.editAction = {
            clickAction: (item) => {
                return this.editQuery();
            },
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit query', 'AnalyticsCoreStringId.SqlDSWizard_EditQuery')
        };
        this.removeAction = {
            clickAction: (item) => {
                this.removeQuery({ model: item.data });
            },
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: getLocalization('Remove query', 'AnalyticsCoreStringId.SqlDSWizard_RemoveQuery')
        };
        this.parameters = parameters;
        this.removeQuery = (e) => {
            if (!e.model.unChecked()) {
                e.model.toggleChecked();
            }
            callbacks().deleteAction(e.model.name);
        };
        this.editQuery = (e) => {
            callbacks().showQbCallBack(this.name);
        };
        this.hasQuery = true;
    }
    setObservableName(getter, setter) {
        ['name', 'displayName'].forEach((propertyName) => Object.defineProperty(this, propertyName, {
            get() {
                return getter();
            },
            set(newVal) {
                setter(newVal);
            },
            configurable: true
        }));
    }
    getActions(context) {
        const result = [];
        result.push(this.removeAction);
        result.push(this.editAction);
        return result;
    }
}
export class FieldTreeNode extends TreeNodeBase {
    constructor(name, displayName, specifics, isChecked, path, afterCheckToggled, isDraggable = false) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.visible = ko.observable(true);
        this.disabled = ko.observable(false);
        this.path = path;
        this.isComplex = specifics === defaultObjectDataSourceItemSpecifics;
        if (isDraggable)
            this.dragData = { noDragable: false };
    }
}
export class DataMemberTreeNode extends TreeNode {
    constructor(name, displayName, specifics, isChecked, path, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, afterCheckToggled);
        this.visible = ko.observable(true);
        this.path = path;
        this.isComplex = this.isList && specifics === defaultObjectDataSourceItemSpecifics;
        this.checked = ko.pureComputed({
            read: () => {
                if (!this.initialized()) {
                    return this._checked();
                }
                else {
                    let selectedItems = 0;
                    let partiallySelectedItems = 0;
                    const visibleChildren = this.children().filter(item => item.visible());
                    visibleChildren.forEach(item => {
                        if (item.checked() === true) {
                            selectedItems++;
                        }
                        else if (item.checked() !== false) {
                            partiallySelectedItems++;
                        }
                    });
                    if (selectedItems === 0 && partiallySelectedItems === 0) {
                        return false;
                    }
                    if (selectedItems === visibleChildren.length) {
                        return true;
                    }
                    return undefined;
                }
            }
        });
    }
    setChecked(value) {
        super.setChecked(this.visible() ? value : false);
    }
}
export class SingleCheckedDataMemberTreeNode extends DataMemberTreeNode {
    constructor(name, displayName, specifics, isChecked, path, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, path, afterCheckToggled);
        this.checked = ko.pureComputed({
            read: () => {
                return this._checked();
            }
        });
    }
}
