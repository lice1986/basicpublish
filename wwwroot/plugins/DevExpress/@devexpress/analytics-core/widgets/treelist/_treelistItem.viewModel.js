﻿/**
* DevExpress Analytics (widgets\treelist\_treelistItem.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { getLocalization } from '../../property-grid/localization/_localization';
export const treeListEditAction = {
    templateName: 'dx-treelist-edit-action',
    imageClassName: '',
    text: 'Edit',
    clickAction: () => void (0),
    displayText: () => getLocalization('Edit', 'AnalyticsCoreStringId.Group_Edit')
};
export function updateTreeListItemViewModel(args) {
    var _a, _b;
    const viewModel = this.getViewModel();
    viewModel.nodeImageClass = this._getNodeImageClassName();
    viewModel.hasItems = this.hasItems;
    viewModel.visible = this._isVisible();
    viewModel.imageClassName = this.imageClassName;
    viewModel.imageTemplateName = this.imageTemplateName;
    viewModel.name = this.name;
    viewModel.path = this.path;
    viewModel.text = this.text;
    viewModel.templateName = this.templateName;
    viewModel.actionsTemplate = this.actionsTemplate;
    viewModel.hasContent = this.hasContent;
    viewModel.collapsed = this.collapsed;
    viewModel.showIcon = this.showIcon;
    viewModel.isHovered = this.isHovered;
    viewModel.isSelected = this.isSelected;
    viewModel.isMultiSelected = this.isMultiSelected;
    if (args.propertyName === 'isSelected' || args.propertyName === 'isMultiSelected') {
        viewModel.cssRules = this._getCssRules();
    }
    if (args.propertyName === 'actions') {
        viewModel.actions = this.actions;
    }
    if (args.propertyName === 'items' || args.propertyName === 'maxItemsCount') {
        if ('added' in args && !this.visibleItems) {
            (_a = args.added) === null || _a === void 0 ? void 0 : _a.forEach(added => viewModel.items.splice(added.index, 0, added.item.getViewModel()));
            (_b = args.removed) === null || _b === void 0 ? void 0 : _b.forEach(added => viewModel.items.splice(added.index, 1));
        }
        else {
            viewModel.items = this._getChildViewModels();
        }
    }
    if (args.propertyName === 'isSelected' || args.propertyName === 'isMultiSelected' || args.propertyName === 'collapsed'
        || args.propertyName === 'hasItems' || args.propertyName === 'level' || args.propertyName === 'data') {
        viewModel.attr = this._getAttributes();
    }
    if (args.propertyName === 'data') {
        viewModel.data = this.data;
        viewModel.isDraggable = this._isDraggable();
    }
}
export function createTreeListItemViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('events', {
        mouseenter: () => this.isHovered = true,
        mouseleave: () => this.isHovered = false,
        dblclick: () => this.treeListController.dblClickHandler ? this.treeListController.dblClickHandler(this) : this.toggleCollapsed()
    })
        .generateProperty('toggleCollapsed', () => this.toggleCollapsed())
        .generateProperty('reverseCollapsed', () => this._reverseCollapsed())
        .generateProperty('setCollapsedChangedEvent', (callback) => {
        this._collapsedChangedEvent = callback;
        return () => this._collapsedChangedEvent = undefined;
    })
        .generateProperty('toggleSelected', (_, event) => this.toggleSelected(_, event))
        .generateProperty('getSelectedItems', () => this._getSelectedItems())
        .generateProperty('padding', this._getPadding(this.level))
        .generateProperty('hasItems', this.hasItems)
        .generateProperty('cssRules', this._getCssRules())
        .generateProperty('nodeImageClass', this._getNodeImageClassName())
        .generateProperty('attr', this._getAttributes())
        .generateProperty('templates', this.templates)
        .generateProperty('isDraggable', this._isDraggable())
        .generateProperty('dragDropHandler', this.dragDropHandler)
        .generateProperty('parent', this.parentViewModel, true)
        .generateProperty('items', this._getChildViewModels())
        .generateProperty('data', this.data)
        .generateProperty('visible', this._isVisible())
        .generateProperty('collapsed', this.collapsed)
        .generateProperty('searchModel', createViewModelGenerator()
        .generateProperty('searchEnabled', this.treeListController.searchEnabled)
        .generateProperty('textToSearch', this.treeListController.textToSearch)
        .generateProperty('searchOptions', this.treeListController.searchOptions)
        .getViewModel())
        .generateProperty('name', this.name)
        .generateProperty('path', this.path)
        .generateProperty('text', this.text)
        .generateProperty('templateName', this.templateName)
        .generateProperty('imageClassName', this.imageClassName)
        .generateProperty('imageTemplateName', this.imageTemplateName)
        .generateProperty('actions', this.actions)
        .generateProperty('actionsTemplate', this.actionsTemplate)
        .generateProperty('hasContent', this.hasContent)
        .generateProperty('showIcon', this.showIcon)
        .generateProperty('isHovered', this.isHovered)
        .generateProperty('isSelected', this.isSelected)
        .generateProperty('isMultiSelected', this.isMultiSelected)
        .generateProperty('treeListEditAction', treeListEditAction)
        .generateProperty('resolver', this.resolver)
        .getViewModel();
}
export function createTreeListEllipsisButtonViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('templateName', 'dx-treelist-item-ellipsis')
        .generateProperty('collapsed', true)
        .generateProperty('items', [])
        .generateProperty('padding', this.padding)
        .generateProperty('text', getLocalization('Show more...', 'AnalyticsCoreStringId.QueryBuilder_Tables_ShowMore'))
        .generateProperty('events', {
        click: () => this.renderNext()
    })
        .getViewModel();
}
