﻿/**
* DevExpress Analytics (widgets\treelist\_treelistItem.js)
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
import * as $ from 'jquery';
import { CodeResolver } from '../../property-grid/internal/_codeResolver';
import { SvgTemplatesEngine } from '../../property-grid/widgets/internal/_svgTemplateEngine';
import { createGlobalModuleVariableFunc } from '../../serializer/_internal';
import { PathRequest } from '../common/pathRequest';
import { LoadChildItemsForCollapsedNodes } from './options';
import { BaseModel, BaseRenderingModel, mutable, mutableArray } from '../../serializer/native/models/base.model';
import { createTreeListEllipsisButtonViewModel, createTreeListItemViewModel, updateTreeListItemViewModel } from './_treelistItem.viewModel';
import { koUtils } from '../../core/utils/_koUtils';
import { guid } from '../../undo-engine/_utils';
import { notifyPropertyChanged } from '../../serializer/native/deserializationEngine';
export const maxSearchLevel = createGlobalModuleVariableFunc(5);
export class TreeListItemStore {
    constructor() {
        this._itemStore = {};
    }
    storeItem(item) {
        const uniqueId = guid();
        this._itemStore[uniqueId] = item;
        return uniqueId;
    }
    getItem(id) {
        return this._itemStore[id];
    }
    removeItem(id) {
        delete this._itemStore[id];
    }
}
export class TreeListItemFactory extends BaseModel {
    onPropertyChanged(args) { }
    createRootItem(options, path, onItemsVisibilityChanged, rtl) {
        return new TreeListRootItemViewModel(options, path, onItemsVisibilityChanged, rtl);
    }
    createItem(options, path, onItemsVisibilityChanged, rtl, resolver) {
        return new TreeListItemViewModel(options, path, onItemsVisibilityChanged, rtl, resolver);
    }
}
export let DefaultTreeListItemFactory = TreeListItemFactory;
export function setDefaultTreeListItemFactory(type) {
    DefaultTreeListItemFactory = type;
}
export class TreeListEllipsisButton extends BaseRenderingModel {
    constructor(setMaxItemsCount, getMaxItemsCount, padding, pageSize) {
        super();
        this.setMaxItemsCount = setMaxItemsCount;
        this.getMaxItemsCount = getMaxItemsCount;
        this.padding = padding;
        this.pageSize = pageSize;
    }
    createViewModel() {
        return createTreeListEllipsisButtonViewModel.call(this, super.createViewModel());
    }
    renderNext() {
        this.setMaxItemsCount(this.getMaxItemsCount() + this.pageSize);
    }
}
export class TreeListItemViewModel extends BaseRenderingModel {
    constructor(options, path = [], onItemsVisibilityChanged = () => void (0), rtl = false, resolver = new CodeResolver()) {
        var _a;
        super();
        this.resolver = resolver;
        this._rtl = false;
        this._pageSize = -1;
        this._walkCallback = null;
        this._dataSubscriptionsDispose = [];
        this._subscriptions = [];
        this._collapsedChangedEvent = null;
        this._getIconName = () => (koUtils.unwrap((this.data && this.data.icon) || (this.data && this.data.specifics)) || 'default').split('.').join('_').toLowerCase();
        this._nodeIsLocked = false;
        this.templates = {
            accordionItem: 'dx-treelist-accordion-item',
            headerItem: 'dx-treelist-header-item',
            headerItemContent: 'dx-treelist-header-item-caption-content',
            itemTextContent: 'dx-treelist-item-text-content',
            actionsContainer: 'dx-treelist-item-actions-container',
        };
        this.itemsProvider = options.itemsProvider;
        this.maxItemsCount = options.pageSize || -1;
        this._pageSize = this.maxItemsCount;
        this.store = options.store;
        this.id = (_a = this.store) === null || _a === void 0 ? void 0 : _a.storeItem(this);
        if (koUtils.isSubscribable(path)) {
            const pathSubscription = path.subscribe((newPath) => {
                this._path = newPath;
                this._updatePath();
            });
            this._pathSubscriptionDispose = () => {
                pathSubscription.dispose();
                if (koUtils.isComputed(path))
                    path.dispose();
            };
        }
        this._path = koUtils.unwrap(path);
        this._updatePath();
        this._rtl = rtl;
        if ('loadChildItemsForCollapsedNodes' in options)
            this._loadChildItemsForCollapsedNodes = options.loadChildItemsForCollapsedNodes;
        this._factory = options.factory || new DefaultTreeListItemFactory();
        this._treeListController = options.treeListController;
        this._templateName = options.templateName;
        this._onItemsVisibilityChanged = onItemsVisibilityChanged;
        this.dragDropHandler = options.treeListController.dragDropHandler;
        this._onItemsChangedCallback = options.onItemsChanged;
        this.getItems = () => {
            if (this.items.length > 0)
                return $.Deferred().resolve(this.items).promise();
            return this._loadItems(options);
        };
        this._setSelectedPath = (newPath) => {
            if (options.setSelectedPath) {
                options.setSelectedPath(newPath);
            }
            else if (koUtils.isSubscribable(options.selectedPath)) {
                options.selectedPath(newPath);
            }
        };
        this._subscribeOnDataProperty = options.subscribeOnDataPropertyChanged || ((data, propertyName, callback) => {
            callback();
            return () => void (0);
        });
        this.toggleCollapsed = () => {
            if (this.hasItems) {
                this._reverseCollapsed();
                if (!this.collapsed && this.items.length === 0) {
                    this._loadItems(options, this._getLoadChildItemsForCollapsedNodes()).always(() => { onItemsVisibilityChanged(); });
                }
                else if (this._getLoadChildItemsForCollapsedNodes()) {
                    this.items.forEach((item) => {
                        item._treeListController.hasItems(item.data) && item.items.length === 0 && item._loadItems(options);
                    });
                    onItemsVisibilityChanged();
                }
            }
        };
        this.toggleSelected = (_, event) => {
            if (event && (event.shiftKey || event.ctrlKey || event.metaKey) && this._getSelectedItems().length > 0 && this.treeListController.canMultiSelect && this.treeListController.canMultiSelect(this)) {
                this._setSelectedPath('');
                this.treeListController.multiSelect(this, event.shiftKey, event.ctrlKey || event.metaKey);
            }
            else if (this.treeListController.canSelect(this)) {
                this.treeListController.clickHandler && this.treeListController.clickHandler(this);
                this._setSelectedPath(this.path);
            }
        };
        this._updateVisualProperties();
    }
    _equal(obj1, obj2) {
        const ignore = ['innerActions', 'noDragable', 'dragData'];
        if (obj2 === obj1)
            return true;
        return Object.keys(obj2).filter(key => ignore.indexOf(key) === -1).every((key) => {
            return obj2[key] === obj1[key];
        });
    }
    _getImageClassName() {
        return 'dx-image-fieldlist-'
            + this._getIconName()
            + (!this._showIcon ? ' dx-treelist-image-empty' : '');
    }
    _getImageTemplateName() {
        const _templateName = 'dxrd-svg-fieldlist-' + this._getIconName();
        return SvgTemplatesEngine.getExistingTemplate(_templateName);
    }
    _getNodeImageClassName() {
        let result = 'dx-collapsing-image';
        if (!this.hasItems) {
            return 'dx-image-leaf-node';
        }
        if (!this.collapsed)
            result += ' dx-image-expanded';
        return result;
    }
    _hasItems() {
        if (!this.data) {
            return true;
        }
        const hasItems = this._treeListController.hasItems(this.data);
        if (this._loadChildItemsForCollapsedNodes != undefined) {
            return this.isLoaded ? hasItems && this.visibleItemsCount > 0 : hasItems;
        }
        return LoadChildItemsForCollapsedNodes() ? hasItems && this.visibleItemsCount > 0 : hasItems;
    }
    _getAttributes() {
        return {
            'aria-expanded': (this.hasItems && (!this.collapsed ? 'true' : 'false')),
            'aria-selected': (this.isSelected || this.isMultiSelected) ? 'true' : 'false',
            'aria-level': this.level + 1,
            'aria-label': this.text,
            'aria-setsize': this.parent ? this.parent.items.length : 0,
            'aria-posinset': this.parent ? this.parent.items.indexOf(this) + 1 : 0,
            'id': this.id
        };
    }
    _getCssRules() {
        var _a;
        let cssRule = { 'dx-treelist-item-selected dxd-state-selected dxrd-fieldslist-context-menu-container': this.isSelected || this.isMultiSelected };
        if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.cssRule)
            cssRule = Object.assign(Object.assign({}, cssRule), this.data.cssRule);
        return cssRule;
    }
    _isDraggable() {
        if (this.data && this.data['dragData']) {
            return !this.data['dragData'].noDragable;
        }
        if (this._treeListController.isDraggable) {
            return this._treeListController.isDraggable(this);
        }
        return false;
    }
    _isVisible() {
        return !this.isFiltred && this.visible;
    }
    _createItemsObj(items) {
        const obj = {};
        for (let i = 0; i < items.length; i++) {
            obj[items[i].name] = { item: items[i], index: i };
        }
        return obj;
    }
    _loadItems(options, loadInnerItems = false) {
        const deferred = $.Deferred();
        this._itemsSubscriptionDispose && this._itemsSubscriptionDispose();
        this._disposables.reverse().forEach(x => x.dispose && x.dispose());
        this._disposables.splice(0);
        const processItemsResult = (value) => {
            if (!value)
                return;
            value.done((data) => {
                if (this.isDisposing) {
                    deferred.reject();
                    return;
                }
                this.isLoaded = true;
                const _data = data || [];
                const items = this.items;
                let dataObj = this._createItemsObj(_data);
                let isMutated = false;
                let splicedItems = 0;
                const tempItems = [].concat.apply([], items);
                for (let i = 0; i < tempItems.length; i++) {
                    if (!dataObj[tempItems[i].data.name]) {
                        tempItems[i].dispose();
                        items.splice(i - splicedItems, 1);
                        splicedItems++;
                        isMutated = true;
                    }
                }
                this.visibleItemsCount = this.visibleItemsCount - splicedItems;
                let itemsObj = this._createItemsObj(items);
                let resorted = false;
                const showIconsForChildItems = !this._treeListController.showIconsForChildItems || this._treeListController.showIconsForChildItems(this);
                const showIconTemplate = this._treeListController.showIconsForChildItems && this._treeListController.showIconsForChildItems(this);
                let _visibleItemsCount = this.visibleItemsCount;
                _data.forEach((d, index) => {
                    const currentItem = itemsObj[d.name];
                    if (!currentItem) {
                        isMutated = true;
                        const newItem = this._factory.createItem(options, this.pathParts, this._onItemsVisibilityChanged, this._rtl, this.resolver);
                        newItem._showIcon = showIconsForChildItems;
                        newItem.data = d;
                        newItem.level = this.level + 1;
                        newItem.parent = this;
                        newItem.parentViewModel = this.getViewModel();
                        newItem.visible && (_visibleItemsCount += 1);
                        newItem.imageTemplateName = newItem._getImageTemplateName();
                        newItem.imageClassName = newItem._getImageClassName();
                        newItem.showIcon = showIconTemplate;
                        items.splice(index, 0, newItem);
                        itemsObj[d.name] = { item: newItem, index: index };
                        this._walkCallback && this._walkCallback(newItem);
                    }
                    else {
                        if (!this._equal(d, currentItem.item.data)) {
                            currentItem.item.data = d;
                        }
                        else {
                            currentItem.item._updateVisualProperties();
                        }
                        if (!resorted)
                            resorted = currentItem.index !== index;
                    }
                });
                this.visibleItemsCount = _visibleItemsCount;
                this._walkCallback = null;
                if (resorted) {
                    const index = items.reduce((acc, x, index) => {
                        const max = Math.abs(index - (dataObj[x.data.name] ? dataObj[x.data.name].index : -1));
                        if (!acc || acc.max < max) {
                            return { max, index };
                        }
                        return acc;
                    }, null).index;
                    const curItem = items[index];
                    const targetIndex = dataObj[curItem.data.name] ? dataObj[curItem.data.name].index : -1;
                    if (index !== targetIndex) {
                        items.splice(index, 1);
                        items.splice(dataObj[curItem.data.name] ? dataObj[curItem.data.name].index : -1, 0, curItem);
                        isMutated = true;
                    }
                }
                dataObj = null;
                itemsObj = null;
                if (isMutated) {
                    this._onItemsChanged();
                }
                if (!this.collapsed || loadInnerItems) {
                    let condition = (item) => item._treeListController.hasItems(item.data);
                    if (this._loadChildItemsForCollapsedNodes !== undefined)
                        condition = (item) => (!item.collapsed || loadInnerItems) && item._treeListController.hasItems(item.data);
                    this.items.forEach(item => {
                        if (condition(item)) {
                            item._loadItems(options);
                        }
                    });
                }
                deferred.resolve(this.items);
                const selectedPath = options.getSelectedPath ? options.getSelectedPath() : (koUtils.isSubscribable(options.selectedPath) && options.selectedPath.peek());
                if (selectedPath) {
                    const item2Select = this.items.filter(item => { return selectedPath.indexOf(item.path) === 0; })[0];
                    if (item2Select) {
                        this._selectItem(item2Select.name + selectedPath.substring(item2Select.path.length));
                    }
                }
            });
        };
        const getPath = () => new PathRequest(this.path, this.pathParts);
        if (this.itemsProvider.subscribeOnItemsChanged) {
            this._itemsSubscriptionDispose = this.itemsProvider.subscribeOnItemsChanged(this, processItemsResult);
        }
        else {
            const promise = this.itemsProvider.getItems(getPath());
            processItemsResult(promise);
        }
        return deferred.promise();
    }
    _onItemsChanged() {
        if (this._onItemsChangedCallback)
            this._onItemsChangedCallback(this.items);
    }
    _getTemplateName() {
        return this._templateName || this.data && this.data.templateName || 'dx-treelist-item';
    }
    _selectItem(itemPath) {
        if (!this.hasItems) {
            return;
        }
        const selectItemDelegate = () => {
            this._find(itemPath);
            if (this.collapsed) {
                this.toggleCollapsed();
            }
        };
        if (this.items.length === 0) {
            this.getItems().done((items) => {
                selectItemDelegate();
            });
        }
        else {
            selectItemDelegate();
        }
    }
    _find(itemPath) {
        const item = itemPath && this.items.filter(childItem => itemPath === childItem.name
            || itemPath.indexOf(childItem.name) === 0 && itemPath[childItem.name.length] === '.')[0];
        if (item) {
            if (itemPath.length > item.name.length) {
                item._selectItem(itemPath.substr(item.name.length + 1));
            }
            else {
                this._treeListController.select(item);
            }
        }
    }
    _getItemsWithLock() {
        const deffered = $.Deferred();
        if (this._nodeIsLocked)
            return deffered.reject().promise();
        this._nodeIsLocked = true;
        this.getItems().done(result => {
            this._nodeIsLocked = false;
            deffered.resolve(result);
        }).fail(() => {
            this._nodeIsLocked = false;
            deffered.reject();
        });
        return deffered.promise();
    }
    _getPadding(level) {
        const position = this._rtl ? 'right' : 'left';
        const value = 20 * level + 12;
        const padding = {};
        padding['padding-' + position] = value;
        return padding;
    }
    _getLoadChildItemsForCollapsedNodes() {
        return this._loadChildItemsForCollapsedNodes !== undefined ?
            this._loadChildItemsForCollapsedNodes : LoadChildItemsForCollapsedNodes();
    }
    _getSelectedItems() {
        return this._treeListController.selectedItems && this._treeListController.selectedItems() || [];
    }
    _getVisibleItems() {
        if (this._pageSize === -1)
            return;
        if (this.items.length === 0)
            return [];
        let result = this.items.filter(x => x.visible);
        if (result.length > this.maxItemsCount) {
            result = result.slice(0, this.maxItemsCount);
            result.push(new TreeListEllipsisButton((value) => this.maxItemsCount = value, () => this.maxItemsCount, this._getPadding(result[0].level), this._pageSize));
        }
        return result;
    }
    _updataParentItemsVisibilityCount(visible) {
        if (!this.parent)
            return;
        if (visible) {
            this.parent.visibleItemsCount += 1;
        }
        else {
            this.parent.visibleItemsCount = Math.max(this.parent.visibleItemsCount - 1, 0);
        }
    }
    _updateVisualProperties() {
        var _a, _b;
        this._dataSubscriptionsDispose.forEach(func => func && func());
        this._dataSubscriptionsDispose = [
            this._subscribeOnDataProperty(this, 'name', () => this._updatePath()),
            this._subscribeOnDataProperty(this, 'displayName', () => { var _a; return this.text = koUtils.unwrap((_a = this.data) === null || _a === void 0 ? void 0 : _a.displayName); }),
            this._subscribeOnDataProperty(this, 'specifics', () => {
                this.imageClassName = this._getImageClassName();
                this.imageTemplateName = this._getImageTemplateName();
            })
        ].filter(x => !!x);
        this.templateName = this._getTemplateName();
        this.actionsTemplate = ((_a = this.data) === null || _a === void 0 ? void 0 : _a.actionsTemplate) || 'dx-treelist-item-actions-with-edit';
        this.hasContent = !!((_b = this.data) === null || _b === void 0 ? void 0 : _b.contenttemplate);
    }
    _updatePath() {
        this.pathParts = this.name ? (this._path || []).concat([this.name]) : this._path;
        this.path = this.pathParts.join('.');
    }
    _getChildViewModels() {
        const items = this.visibleItems || this.items;
        return items === null || items === void 0 ? void 0 : items.map(x => x.getViewModel());
    }
    _reverseCollapsed() {
        this.collapsed = !this.collapsed;
    }
    itemsCollectionHasMutated() {
        const args = { propertyName: 'items' };
        notifyPropertyChanged(this, args);
    }
    onPropertyChanged(args) {
        var _a, _b, _c;
        if (args.propertyName === 'visibleItemsCount' || args.propertyName === 'isLoaded' || args.propertyName === 'data') {
            this.hasItems = this._hasItems();
        }
        if (args.propertyName === 'visibleItemsCount' || args.propertyName === 'data') {
            this._updateVisualProperties();
            if ((_a = this.treeListController) === null || _a === void 0 ? void 0 : _a.subscribeOnActionsChanged) {
                this._actionsSubscriptionDispose && this._actionsSubscriptionDispose();
                this._actionsSubscriptionDispose = this.treeListController.subscribeOnActionsChanged(this, (actions) => this.actions = actions);
            }
            else {
                this.actions = ((_b = this.treeListController) === null || _b === void 0 ? void 0 : _b.getActions) ? this.treeListController.getActions(this) : [];
            }
        }
        if (args.propertyName === 'visible' || args.propertyName === 'data') {
            if (this.visible && this.parent && !this.parent.visible)
                this.parent.visible = true;
            this._filtrationSubscriptionDispose && this._filtrationSubscriptionDispose();
            if (this.treeListController.subscribeOnVisibleChanged) {
                this._filtrationSubscriptionDispose = this.treeListController.subscribeOnVisibleChanged(this, (isFiltred) => this.isFiltred = isFiltred);
            }
            else {
                this.isFiltred = this.data && ((_c = this.treeListController) === null || _c === void 0 ? void 0 : _c.itemsFilter) && !this.treeListController.itemsFilter(this.data, this.path, this);
            }
            this._updataParentItemsVisibilityCount(this._isVisible());
        }
        if (args.propertyName === 'maxItemsCount' || args.propertyName === 'items') {
            this.visibleItems = this._getVisibleItems();
        }
        if (args.propertyName === 'collapsed') {
            this._collapsedChangedEvent && this._collapsedChangedEvent(this.collapsed);
        }
    }
    updateViewModel(args) {
        updateTreeListItemViewModel.call(this, args);
    }
    createViewModel() {
        return createTreeListItemViewModel.call(this, super.createViewModel());
    }
    get name() {
        var _a;
        return koUtils.unwrap((_a = this.data) === null || _a === void 0 ? void 0 : _a.name);
    }
    get treeListController() {
        return this._treeListController;
    }
    dispose() {
        var _a;
        super.dispose();
        this._actionsSubscriptionDispose && this._actionsSubscriptionDispose();
        this._itemsSubscriptionDispose && this._itemsSubscriptionDispose();
        this._pathSubscriptionDispose && this._pathSubscriptionDispose();
        this.disposeArray(this.items);
        this.disposeArray(this.visibleItems);
        this.visibleItemsCount = 0;
        this.parent = null;
        this._subscriptions.forEach(x => x.dispose());
        this._dataSubscriptionsDispose.forEach(func => func && func());
        this._walkCallback = null;
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.removeItem(this.id);
    }
}
__decorate([
    mutable('')
], TreeListItemViewModel.prototype, "imageTemplateName", void 0);
__decorate([
    mutableArray(() => [])
], TreeListItemViewModel.prototype, "items", void 0);
__decorate([
    mutableArray(() => [])
], TreeListItemViewModel.prototype, "actions", void 0);
__decorate([
    mutable(-1)
], TreeListItemViewModel.prototype, "maxItemsCount", void 0);
__decorate([
    mutable(0)
], TreeListItemViewModel.prototype, "visibleItemsCount", void 0);
__decorate([
    mutable(true)
], TreeListItemViewModel.prototype, "collapsed", void 0);
__decorate([
    mutable(false)
], TreeListItemViewModel.prototype, "isLoaded", void 0);
__decorate([
    mutable(true)
], TreeListItemViewModel.prototype, "hasItems", void 0);
__decorate([
    mutable(false)
], TreeListItemViewModel.prototype, "isSelected", void 0);
__decorate([
    mutable(false)
], TreeListItemViewModel.prototype, "isMultiSelected", void 0);
__decorate([
    mutable(false)
], TreeListItemViewModel.prototype, "isHovered", void 0);
__decorate([
    mutable(null)
], TreeListItemViewModel.prototype, "data", void 0);
__decorate([
    mutable(true)
], TreeListItemViewModel.prototype, "visible", void 0);
__decorate([
    mutable(false)
], TreeListItemViewModel.prototype, "isFiltred", void 0);
__decorate([
    mutable('')
], TreeListItemViewModel.prototype, "path", void 0);
__decorate([
    mutable(-1)
], TreeListItemViewModel.prototype, "level", void 0);
__decorate([
    mutable('')
], TreeListItemViewModel.prototype, "text", void 0);
export class TreeListRootItemViewModel extends TreeListItemViewModel {
    constructor(_options, path = [], onItemsVisibilityChanged = () => void (0), rtl = false) {
        super(_options, path, onItemsVisibilityChanged, rtl);
        this._options = _options;
        this._resolver = new CodeResolver();
        this._selectedPathSubscription = null;
        this.resolver.done(() => {
            onItemsVisibilityChanged();
        });
        const onSelectedPathChanged = (newPath) => {
            this._selectItem(!!this.path ? newPath.substr(this.path.length + 1) : newPath);
        };
        if (koUtils.isSubscribable(_options.selectedPath)) {
            this._selectedPathSubscription = _options.selectedPath.subscribe((newPath) => onSelectedPathChanged(newPath));
        }
        else if (_options.setSelectedPathChangedEvent) {
            this._selectedPathSubscription = {
                dispose: _options.setSelectedPathChangedEvent((newPath) => onSelectedPathChanged(newPath))
            };
        }
        this._selectItem(!!this.path ? this.path + '.' + koUtils.unwrap(_options.selectedPath) : koUtils.unwrap(_options.selectedPath));
    }
    dispose() {
        super.dispose();
        this._resolver.clear();
        if (this._selectedPathSubscription) {
            this._selectedPathSubscription.dispose();
            this._selectedPathSubscription = null;
        }
    }
    walkOnTree(walkCallBack) {
        this._resolver.clear();
        this._visitNextNode(this, walkCallBack);
        if (this['_pageSize'] != -1)
            this._resolver.doneOnce(() => this.itemsCollectionHasMutated());
        return { stop: () => this._resolver.clear() };
    }
    _visitNextNode(item, walkCallback = (_item) => { }) {
        var _a;
        if (item.data && !item.data.specifics)
            throw new Error('Specific should be set');
        if (item.level >= maxSearchLevel())
            return;
        let processItemsFunc = null;
        if (item.items.length > 0) {
            processItemsFunc = () => item.items.forEach(node => {
                walkCallback(node);
                this._visitNextNode(node, walkCallback);
            });
        }
        else if (!item.data || item.treeListController.hasItems(item.data)) {
            if ((_a = item.treeListController.searchOptions) === null || _a === void 0 ? void 0 : _a.autoLoadItems) {
                processItemsFunc = () => item._getItemsWithLock().done(result => {
                    result.forEach((node) => {
                        walkCallback(node);
                        this._visitNextNode(node, walkCallback);
                    });
                });
            }
            else {
                item['_walkCallback'] = (node) => {
                    walkCallback(node);
                    this._visitNextNode(node, walkCallback);
                };
            }
        }
        if (processItemsFunc)
            this._resolver.execute(processItemsFunc, 1);
    }
    _onItemsChanged() {
        if (this._options.expandRootItems)
            this.items.forEach(item => {
                item.collapsed = false;
            });
        super._onItemsChanged();
    }
}
