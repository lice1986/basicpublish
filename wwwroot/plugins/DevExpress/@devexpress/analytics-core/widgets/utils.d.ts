﻿/**
* DevExpress Analytics (widgets\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Observable, Computed, Subscribable } from 'knockout';
import { IPathRequest } from './common/pathRequest';
import { TreeListItemViewModel } from './treelist/_treelistItem';
import { CustomItemCreatingInfo } from 'devextreme/ui/select_box';
import { SimplifiedSearchMode } from 'devextreme/common';
import { IViewModel } from '../serializer/native/models/interfaces.model';
import { ActionListsBase } from '../core/tools/_actionListBase';
export interface IDataMemberInfo {
    name: string;
    displayName: string;
    actionsTemplate?: string;
    contenttemplate?: string;
    data?: any;
    isList?: boolean;
    specifics?: string;
    isSelected?: boolean;
    dataType?: string;
    templateName?: string;
    innerActions?: any;
    relationPath?: string;
    noDragable?: any;
    dragData?: any;
    icon?: string;
    items?: IDataMemberInfo[];
    isListType?: boolean;
    isSupportQueries?: boolean;
    cssRule?: {
        [key: string]: boolean;
    };
}
export interface IItemsProvider {
    getItems: (path: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    subscribeOnItemsChanged?: (item: TreeListItemViewModel, callback: (promise: JQueryPromise<IDataMemberInfo[]>) => void) => () => void;
    getItemByPath?: (path: IPathRequest) => JQueryPromise<IDataMemberInfo>;
    getValues?: (path: IPathRequest) => JQueryPromise<any[]>;
}
export interface IHotKey {
    ctrlKey: boolean;
    keyCode: number;
}
export interface IActionViewModel extends IViewModel {
    ref?: string;
    displayText?: string;
    disabled?: boolean;
    hasSeparator?: boolean;
    visible?: boolean;
    selected?: boolean;
    templateName?: string;
    click: (e: any) => void;
    actionClass: string;
    block: {
        attr: {
            'aria-label': string;
            'aria-disabled': 'true' | 'false';
            'aria-pressed'?: 'true' | 'false';
        };
    };
    image: {
        templateName: string;
        class: string;
    };
}
export interface ISelectBoxActionViewModel extends IActionViewModel {
    getPopupContainer: (element: HTMLElement) => HTMLElement;
    widget: {
        value: any;
        onValueChanged: (newVal: any) => void;
        dataSource: any;
        opened?: boolean;
        displayExpr?: (val: number) => string;
        onCustomItemCreating?: (e: CustomItemCreatingInfo) => void;
        onFocusOut?: (val: any) => void;
        onKeyUp?: (val: any) => void;
        itemTemplate?: any;
        placeholder?: string;
        searchMode?: SimplifiedSearchMode;
        width?: string;
        searchEnabled?: boolean;
        searchTimeout?: number;
        inputAttr: {
            'aria-label': string;
        };
        dropDownOptions?: {
            wrapperAttr?: {
                class?: string;
                'aria-label': string;
            };
        };
    };
}
export interface IContentActionViewModel extends IActionViewModel {
    contentData: any;
}
export interface IAction {
    id?: string;
    text?: string;
    textId?: string;
    container?: string;
    clickAction?: (model?: any) => void;
    hotKey?: IHotKey;
    hasSeparator?: boolean;
    isContextMenuAction?: boolean;
    templateName?: string;
    contentData?: any;
    position?: number;
    displayExpr?: (val: any) => string;
    onCustomItemCreating?: (e: CustomItemCreatingInfo) => void;
    group?: () => string;
    displayText?: () => string;
    imageTemplateName?: Observable<string> | Computed<string> | string;
    imageClassName?: Observable<string> | Computed<string> | string;
    disabled?: Observable<boolean> | Computed<boolean> | boolean;
    visible?: Observable<boolean> | Computed<boolean> | boolean;
    selected?: Observable<boolean> | Computed<boolean> | boolean;
    zoom?: Subscribable<number> | number;
    zoomStep?: Subscribable<number>;
    zoomLevels?: Subscribable<number[]> | number[];
    getViewModel?: (parent: ActionListsBase, index: number) => IActionViewModel;
}
export interface IActionKO extends IAction {
    disabled?: Observable<boolean> | Computed<boolean>;
}
export interface IActionGroup {
    groupName: string;
    actions: IAction;
}
