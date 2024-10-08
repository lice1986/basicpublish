﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\editParametersDialog.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { GroupLayoutItem, SeparatorLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { ParametersLayoutItemsProvider } from '../../internal/parameterLayout/_parametersLayoutItemsProvider';
import { ParametersLayoutTreeListController } from '../../internal/parameterLayout/_parametersLayoutTreeListController';
import { ParametersDialogBase } from './parametersDialogs';
export class EditParametersDialog extends ParametersDialogBase {
    constructor(report) {
        super(report);
        this.buttonMap = {
            'addGroup': { text: 'Add Group', localizationId: 'ReportStringId.ParameterCollectionEditorForm_AddGroup' },
            'addParameter': { text: 'Add Parameter', localizationId: 'ReportStringId.ParameterCollectionEditorForm_AddParameter' },
            'addSeparator': { text: 'Add Separator', localizationId: 'ReportStringId.ParameterCollectionEditorForm_AddSeparator' },
            'down': { text: 'Move Down', localizationId: 'AnalyticsCoreStringId.Cmd_MoveDown' },
            'up': { text: 'Move Up', localizationId: 'AnalyticsCoreStringId.Cmd_MoveUp' }
        };
        this.width = 'auto';
        this.height = 726;
        this.popupCss = 'dxrd-parameters-edit-dialog';
        this.title = getLocalization('Edit Parameters', 'ASPxReportsStringId.ReportDesigner_ParametersDialog_EditParameters');
        this.contentEmptyAreaPlaceHolder = getLocalization('Add items to configure report parameters and parameter panel layout', 'ReportStringId.ParameterCollectionEditorForm_EmptyViewPlaceHolder');
        this.contentNoPropertiesPlaceHolder = getLocalization('This item has no configurable properties', 'ReportStringId.ParameterCollectionEditorForm_SeparatorViewPlaceHolder');
        this.contentTemplate = 'dxrd-parameters-content';
        this.selectedPath = ko.observable('');
        this._disposables.push(this.contentVisible = ko.computed(() => {
            return this._currentReport.parameterPanelLayoutItems().length > 0 && !!this._selectedItem();
        }), this.hasNoEditableProperties = ko.pureComputed(() => {
            return this._selectedItem() && this._selectedItem() instanceof SeparatorLayoutItem;
        }));
        this._disposables.push(this.itemsProvider = new ParametersLayoutItemsProvider(this._currentReport, this._selectedItem));
        this._disposables.push(this.treeListController = new ParametersLayoutTreeListController(this._currentReport, this._selectedItem));
        this.fieldListModel = {
            itemsProvider: this.itemsProvider,
            treeListController: this.treeListController,
            selectedPath: this.itemsProvider.selectedPath,
            expandRootItems: true,
            onItemsChanged: (items) => {
                items.forEach(item => {
                    item.parent.collapsed = false;
                });
            }
        };
    }
    dispose() {
        super.dispose();
        this.fieldListModel = null;
    }
    getDisplayTextButton(key) {
        return getLocalization(this.buttonMap[key].text, this.buttonMap[key].localizationId);
    }
    up() {
        this.treeListController.move(true);
    }
    down() {
        this.treeListController.move(false);
    }
    addGroup() {
        this.treeListController.addItem(new GroupLayoutItem({}, this._currentReport, null));
    }
    addSeparator() {
        this.treeListController.addItem(new SeparatorLayoutItem({}, this._currentReport, null));
    }
    addParameter() {
        const parameterItem = this._createParameter();
        this.treeListController.addItem(parameterItem);
        this._currentReport.parameters.push(parameterItem.parameter());
    }
    isDisabledButton(buttonName) {
        if (buttonName === 'up' || buttonName === 'down')
            return !this.contentVisible();
        return false;
    }
    onSubmit() { }
}
