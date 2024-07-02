﻿/**
* DevExpress Analytics (widgets\treelist\_treelistItem.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Observable, Computed, MaybeSubscribable } from 'knockout';
import { CodeResolver } from '../../property-grid/internal/_codeResolver';
import { ISearchOptions } from '../../property-grid/widgets/internal/_utils';
import { IAction, IDataMemberInfo, IItemsProvider } from '../utils';
import { ITreeListController } from './_treelistController';
import { BaseModel, BaseRenderingModel } from '../../serializer/native/models/base.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
import { ITreeListItemViewModel } from './_treelistItem.viewModel';
export declare const maxSearchLevel: import("../../serializer/_internal").IGlobalSubscribableValue<number>;
export interface ITreeListSearchOptions extends ISearchOptions {
    searchTimeout?: number;
    searchExpr?: string;
    searchBoxTemplate?: string;
}
export declare class TreeListItemStore {
    private _itemStore;
    storeItem(item: TreeListItemViewModel): string;
    getItem(id: string): TreeListItemViewModel;
    removeItem(id: string): void;
}
export declare class TreeListItemFactory extends BaseModel implements ITreeListItemFactory {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createRootItem(options: ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => void, rtl?: boolean): TreeListRootItemViewModel;
    createItem(options: ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: CodeResolver): TreeListItemViewModel;
}
export declare let DefaultTreeListItemFactory: typeof TreeListItemFactory;
export declare function setDefaultTreeListItemFactory(type: typeof DefaultTreeListItemFactory): void;
export interface ITreeListItemFactory {
    createRootItem: (options: ITreeListOptions, path?: MaybeSubscribable<string[] | string>, onItemsVisibilityChanged?: any, rtl?: any) => TreeListRootItemViewModel;
    createItem: (options: ITreeListOptions, path?: string[], onItemsVisibilityChanged?: any, rtl?: any, resolver?: any) => TreeListItemViewModel;
}
export interface ITreeListOptions {
    itemsProvider: IItemsProvider;
    selectedPath: Observable<string> | Computed<string> | string;
    subscribeOnDataPropertyChanged?: (item: TreeListItemViewModel, propertyName: keyof IDataMemberInfo, callback: () => void) => () => void;
    setTreeListChangedEvent?: (callback: (options: ITreeListOptions) => void) => () => void;
    setSelectedPathChangedEvent?: (callback: (newPath: string) => void) => () => void;
    setSelectedPath?: (newPath: string) => void;
    getSelectedPath?: () => string;
    treeListController: ITreeListController;
    templateName?: string;
    loadChildItemsForCollapsedNodes?: boolean;
    rtl?: boolean;
    path?: Observable<string> | Observable<string[]>;
    onItemsVisibilityChanged?: () => void;
    expandRootItems?: boolean;
    pageSize?: number;
    templateHtml?: string;
    factory?: ITreeListItemFactory;
    store?: TreeListItemStore;
    onItemsChanged?: (items: TreeListItemViewModel[]) => void;
}
export declare class TreeListEllipsisButton extends BaseRenderingModel<ITreeListItemViewModel> {
    private setMaxItemsCount;
    private getMaxItemsCount;
    padding: {
        [key: string]: number;
    };
    private pageSize;
    constructor(setMaxItemsCount: (value: number) => void, getMaxItemsCount: () => number, padding: {
        [key: string]: number;
    }, pageSize: number);
    createViewModel(): ITreeListItemViewModel;
    renderNext(): void;
}
export declare class TreeListItemViewModel extends BaseRenderingModel<ITreeListItemViewModel> {
    protected resolver: CodeResolver;
    private _rtl;
    protected _factory: ITreeListItemFactory;
    private _pageSize;
    private _walkCallback;
    private _actionsSubscriptionDispose;
    private _itemsSubscriptionDispose;
    private _filtrationSubscriptionDispose;
    private _pathSubscriptionDispose;
    private _dataSubscriptionsDispose;
    private _subscriptions;
    private _templateName;
    private _loadChildItemsForCollapsedNodes;
    private _subscribeOnDataProperty;
    _collapsedChangedEvent: (newValue: boolean) => void;
    private _equal;
    private _treeListController;
    private _setSelectedPath;
    private _getIconName;
    _getImageClassName(): string;
    _getImageTemplateName(): string;
    _getNodeImageClassName(): string;
    _hasItems(): boolean;
    _getAttributes(): {
        [key: string]: string | number;
    };
    _getCssRules(): {
        [key: string]: boolean;
    };
    _isDraggable(): boolean;
    _isVisible(): boolean;
    private _createItemsObj;
    private _loadItems;
    private _nodeIsLocked;
    private _onItemsChangedCallback;
    protected _onItemsChanged(): void;
    protected _getTemplateName(): string;
    _selectItem(itemPath: string): void;
    private _find;
    _getItemsWithLock(): JQueryPromise<TreeListItemViewModel[]>;
    _getPadding(level: number): {
        [key: string]: number;
    };
    private _getLoadChildItemsForCollapsedNodes;
    _getSelectedItems(): TreeListItemViewModel[];
    private _getVisibleItems;
    private _updataParentItemsVisibilityCount;
    private _updateVisualProperties;
    private _updatePath;
    _getChildViewModels(): ITreeListItemViewModel[];
    _reverseCollapsed(): void;
    constructor(options: ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => any, rtl?: boolean, resolver?: CodeResolver);
    itemsCollectionHasMutated(): void;
    onPropertyChanged(args: PropertyChangedEventArgs<TreeListItemViewModel> | ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
    updateViewModel(args: PropertyChangedEventArgs<TreeListItemViewModel> | ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
    createViewModel(): ITreeListItemViewModel;
    dragDropHandler: any;
    _path: string[];
    _onItemsVisibilityChanged: () => void;
    _showIcon: boolean;
    parent: TreeListItemViewModel;
    parentViewModel: ITreeListItemViewModel;
    visibleItems: TreeListItemViewModel[];
    imageClassName: string;
    showIcon: boolean;
    imageTemplateName: string;
    items: Array<TreeListItemViewModel>;
    actions: IAction[];
    maxItemsCount: number;
    visibleItemsCount: number;
    collapsed: boolean;
    isLoaded: boolean;
    hasItems: boolean;
    isSelected: boolean;
    isMultiSelected: boolean;
    isHovered: boolean;
    data: IDataMemberInfo;
    visible: boolean;
    isFiltred: boolean;
    path: string;
    level: number;
    text: string;
    id: string;
    store: TreeListItemStore;
    get name(): string;
    pathParts: string[];
    templateName: string;
    actionsTemplate: string;
    hasContent: boolean;
    get treeListController(): ITreeListController;
    itemsProvider: IItemsProvider;
    toggleCollapsed: () => void;
    toggleSelected: (_?: any, event?: JQueryEventObject) => void;
    getItems: () => JQueryPromise<TreeListItemViewModel[]>;
    dispose(): void;
    templates: {
        accordionItem: string;
        headerItem: string;
        headerItemContent: string;
        itemTextContent: string;
        actionsContainer: string;
    };
}
export declare class TreeListRootItemViewModel extends TreeListItemViewModel {
    private _options;
    private _resolver;
    dispose(): void;
    walkOnTree(walkCallBack: (item: TreeListItemViewModel) => void): {
        stop: () => void;
    };
    private _visitNextNode;
    private _selectedPathSubscription;
    constructor(_options: ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => any, rtl?: boolean);
    _onItemsChanged(): void;
}
