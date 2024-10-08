﻿/**
* DevExpress Analytics (widgets\treelist\_treelistItem.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { CodeResolver } from '../../property-grid/internal/_codeResolver';
import { IAction, IDataMemberInfo } from '../utils';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { TreeListSearchOptions } from './_treeListSearchOptions';
import { TreeListEllipsisButton, TreeListItemViewModel } from './_treelistItem';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
export declare const treeListEditAction: IAction;
export interface ITreeListItemViewModel extends IViewModel<TreeListItemViewModel> {
    events: {
        dblclick?: () => void;
        click?: () => void;
        mouseenter?: () => void;
        mouseleave?: () => void;
    };
    toggleCollapsed: () => void;
    reverseCollapsed: () => void;
    setCollapsedChangedEvent: (callback: (newValue: boolean) => void) => () => void;
    toggleSelected: (_?: any, event?: JQueryEventObject) => void;
    getSelectedItems: () => TreeListItemViewModel[];
    cssRules: {
        [key: string]: boolean;
    };
    padding: {
        [key: string]: number;
    };
    attr: {
        [key: string]: string | number;
    };
    hasItems: boolean;
    nodeImageClass: string;
    isDraggable: boolean;
    templates: {
        [key: string]: string;
    };
    parent: ITreeListItemViewModel;
    items: ITreeListItemViewModel[];
    data: IDataMemberInfo;
    visible: boolean;
    imageClassName: string;
    imageTemplateName: string;
    searchModel: {
        textToSearch: ko.Observable<string> | ko.Computed<string>;
        searchEnabled: boolean;
        searchOptions: TreeListSearchOptions;
    };
    name: string;
    path: string;
    text: string;
    templateName: string;
    actions: IAction[];
    actionsTemplate: string;
    treeListEditAction: IAction;
    hasContent: boolean;
    collapsed: boolean;
    showIcon: boolean;
    isHovered: boolean;
    isSelected: boolean;
    isMultiSelected: boolean;
    resolver: CodeResolver;
    dragDropHandler: DragDropHandler;
}
export declare function updateTreeListItemViewModel(this: TreeListItemViewModel, args: PropertyChangedEventArgs<TreeListItemViewModel> | ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
export declare function createTreeListItemViewModel(this: TreeListItemViewModel, base: ITreeListItemViewModel): ITreeListItemViewModel;
export declare function createTreeListEllipsisButtonViewModel(this: TreeListEllipsisButton, base: ITreeListItemViewModel): ITreeListItemViewModel;
