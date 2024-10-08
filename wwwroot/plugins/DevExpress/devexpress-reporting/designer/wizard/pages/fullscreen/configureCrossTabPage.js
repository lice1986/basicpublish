﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\configureCrossTabPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler, DragHelperContent, FieldListProvider, findFirstItemMatchesCondition, getFullPath, HoverInfo } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { FieldTreeNode, SingleCheckedDataMemberTreeNode, TreeNodeItemsProvider } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { CrossTabWizardDragDropHandler, CrossTabWizardFieldListController } from '../../internal/_crossTabDragUtils';
import { FieldInfo } from '../../internal/_utils';
import { SelectDataMembersPage } from '../selectDataMembersPage';
export class SelectCrossTabDataMember extends SelectDataMembersPage {
    constructor(_fieldListCallBack, _hideDataMemberSubItems = false) {
        super(_fieldListCallBack, _hideDataMemberSubItems);
        this._pageRendered = false;
        this._createCrossTabLeafTreeNode = (item, isChecked, path) => {
            const field = new FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
            this._disposables.push(field);
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                if (!this._pageRendered && this._firstRenderNode.initialized()) {
                    this._afteCheck(this._firstRenderNode);
                    this._pageRendered = true;
                }
            }, 1);
            field.disabled(!field.checked());
            this._disposables.push(field.checked.subscribe(val => {
                field.disabled(!val);
            }));
            return field;
        };
        this._createCrossTabTreeNode = (item, isChecked, path) => {
            const node = new SingleCheckedDataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path, this._afteCheck);
            this._disposables.push(node);
            if (!this._firstRenderNode) {
                this._firstRenderNode = node;
            }
            return node;
        };
        this._afteCheck = (node) => {
            const rootItems = this._signleFieldMemberFieldListModel.itemsProvider.getRootItems();
            rootItems.forEach(item => {
                item.setChecked(false);
            });
            node._checked(true);
            node.children().forEach(item => {
                item.setChecked(item.isList ? false : true);
            });
            this._onChange();
        };
        this._title = getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields');
        this._icon = 'dxrd-svg-wizard-crosstab-fields';
        const fieldListProvider = new FieldListProvider(this._wrapFieldListCallback(_fieldListCallBack), ko.observableArray([]));
        this._disposables.push(this._itemsProvider = new TreeNodeItemsProvider(fieldListProvider, this._rootItems, this._createCrossTabTreeNode, this._createCrossTabLeafTreeNode));
        this._disposables.push(this._controller = new CrossTabWizardFieldListController());
        this._dragHelperContent = new DragHelperContent(null);
        this._disposables.push(this._controller.dragDropHandler = new CrossTabWizardDragDropHandler({
            dragHelperContent: this._dragHelperContent,
            parent: '.dx-designer-viewport .dx-fullscreen-wizard',
            containment: '.dxrd-report-wizard',
            target: '.dxrd-wizard-page',
            addHandler: (dropTarget, name) => {
                if (dropTarget && dropTarget instanceof ConfigureCrossTabPage)
                    dropTarget.addInfo(name);
            }
        }));
        this._signleFieldMemberFieldListModel = {
            itemsProvider: this._itemsProvider,
            selectedPath: ko.observable(null),
            treeListController: this._controller,
            templateName: 'dxrd-treelist-with-checkbox'
        };
    }
    _findFirstCheckedField(dataMembers) {
        let result = null;
        for (let i = 0; i < dataMembers.length; i++) {
            const element = dataMembers[i];
            if (element.checked()) {
                result = element;
                break;
            }
            if (element.children && element.children().length) {
                result = this._findFirstCheckedField(element.children().filter(x => x.isList));
                if (result)
                    break;
            }
        }
        return result;
    }
    commit() {
        const dataMember = this._findFirstCheckedField(this._itemsProvider.getRootItems());
        const result = {};
        if (dataMember) {
            result.crossTabFields = dataMember.children().filter(x => !x.isList) || [];
            if (dataMember.path !== this.dataSourcePath) {
                result.dataMemberPath = getFullPath(this.dataSourcePath, dataMember.path);
                result.dataMemberInfo = dataMember;
            }
        }
        return $.Deferred().resolve(result).promise();
    }
}
export class ConfigureCrossTabPage extends WizardPageBase {
    constructor(stateName, itemInfo, title, localizationId) {
        super();
        this.stateName = stateName;
        this.itemInfo = itemInfo;
        this.changeAlways = true;
        this.underCursor = ko.observable(new HoverInfo());
        this._crossTabFields = ko.observableArray([]);
        this._template = 'dxrd-page-crosstab-setlayout';
        this.fieldInfos = ko.observableArray([]);
        this._title = getLocalization(title, localizationId);
        this._icon = 'dxrd-svg-wizard-crosstab-' + title.toLowerCase();
        this._fieldName = getLocalization('Field Name', 'ASPxReportsStringId.ReportDesigner_Wizard_PageCrossTab_FieldName_Caption');
        this._valueName = getLocalization(itemInfo.displayName, itemInfo.localizationId);
        this._disposables.push(this.isDroppable = ko.computed(() => {
            if (DragDropHandler.started())
                return this.underCursor().isOver;
            else
                return false;
        }));
    }
    _removeInfo(item) {
        this.fieldInfos.splice(this.fieldInfos.indexOf(item), 1);
        this.addInfo();
    }
    addInfo(fieldName) {
        let newField = findFirstItemMatchesCondition(this.fieldInfos(), (item) => item.field() === null);
        if (!newField) {
            newField = new FieldInfo(this.itemInfo.valuesArray);
            this.fieldInfos.push(newField);
            this._disposables.push(newField.field.subscribe(newValue => {
                if (!newField.functionValue())
                    this.setFieldDefaultValue(this.itemInfo.defaultVal, newField);
                this.addInfo();
                this._onChange();
            }));
        }
        if (fieldName) {
            const field = findFirstItemMatchesCondition(this._crossTabFields(), (item) => item.name === fieldName);
            newField.field(field);
        }
    }
    setFieldDefaultValue(defaultVal, fieldInfo) {
        fieldInfo.functionValue(findFirstItemMatchesCondition(fieldInfo.value.dataSource, (item) => item.value === defaultVal));
    }
    initialize(state, stateChanged = false) {
        if (stateChanged) {
            state[this.stateName] = [];
            this.fieldInfos([]);
        }
        this._crossTabFields(state.crossTabFields);
        this.addInfo();
        return $.Deferred().resolve().promise();
    }
    canFinish() {
        return true;
    }
}
export function _registerConfigureCrossTabPage(factory, pageId, title, localizationId, info) {
    const stateName = 'crossTab' + title + 'FieldInfo';
    factory.registerMetadata(pageId, {
        setState: (data, state) => { },
        getState: (state) => state,
        resetState: (state, defaultState) => { },
        create: () => {
            return new ConfigureCrossTabPage(stateName, info, title, localizationId);
        },
        template: 'dxrd-page-crosstab-setlayout',
    });
}
