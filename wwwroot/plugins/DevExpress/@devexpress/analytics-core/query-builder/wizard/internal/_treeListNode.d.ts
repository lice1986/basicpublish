﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_treeListNode.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IAction, IDataMemberInfo } from '../../../widgets/utils';
import { DataSourceParameter } from '../../dataSource/dataSourceParameter';
import { DBStoredProcedureArgument } from '../../dataSource/dbStoredProcedure';
import { IAddQueriesTreeListCallbacks } from './_dbSchemaItemsProvider';
import { IPopoverListOptions } from './_utils';
export declare const defaultObjectDataSourceItemSpecifics: string;
export declare class TreeNodeBase extends Disposable implements IDataMemberInfo {
    name: string;
    displayName: string;
    specifics: string;
    private _afterCheckToggled;
    constructor(name: string, displayName: string, specifics: string, isChecked?: boolean, afterCheckToggled?: (node: TreeNodeBase) => void);
    checked: ko.PureComputed<boolean>;
    unChecked(): boolean;
    toggleChecked(): void;
    setChecked(value: boolean): void;
    isList: boolean;
    path: string;
    _checked: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class TreeLeafNode extends TreeNodeBase {
    name: string;
    displayName: string;
    specifics: string;
    constructor(name: string, displayName: string, specifics: string, isChecked?: boolean, nodeArguments?: any, afterCheckToggled?: (node: TreeNodeBase) => void);
    arguments: DBStoredProcedureArgument[];
    hasQuery: boolean;
}
export declare class TreeNode extends TreeNodeBase {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, afterCheckToggled?: (node: TreeNodeBase) => void);
    initialized(): boolean;
    setChecked(value: boolean): void;
    initializeChildren(children: TreeNodeBase[]): void;
    countChecked: ko.PureComputed<number>;
    isList: boolean;
    children: ko.ObservableArray<TreeNodeBase>;
}
export declare class ParameterTreeNode extends TreeNode {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, afterCheckToggled?: (node: TreeNodeBase) => void);
    countChecked: ko.PureComputed<number>;
    hasParamsToEdit: ko.Observable<boolean>;
}
export declare class QueriesTreeNode extends ParameterTreeNode implements IPopoverListOptions {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, callbacks?: ko.Observable<IAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: TreeNodeBase) => void);
    addAction: {
        clickAction: (item: any) => any;
        imageClassName: string;
        imageTemplateName: string;
        templateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
    popoverListItems(): any;
    showPopover(): void;
    itemClickAction: (e: {
        itemData: {
            addAction: any;
        };
    }) => void;
    addQuery: any;
    addCustomQuery: any;
    target: any;
    className: string;
    popoverVisible: ko.Observable<boolean>;
    disableCustomSql: () => boolean;
    selectionDisabled: ko.PureComputed<boolean>;
}
export declare class TreeQueryNode extends TreeLeafNode {
    private query?;
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, parameters: ko.Observable<DataSourceParameter[]>, callbacks: ko.Observable<IAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: TreeLeafNode) => void, query?: any);
    setObservableName(getter: () => string, setter: (value: string) => void): void;
    editAction: {
        clickAction: (item: any) => any;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    removeAction: {
        clickAction: (item: any) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
    editQuery: any;
    removeQuery: any;
    parameters: ko.Observable<DataSourceParameter[]>;
}
export declare class FieldTreeNode extends TreeNodeBase {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: TreeNodeBase) => void, isDraggable?: boolean);
    visible: ko.Observable<boolean>;
    isComplex: boolean;
    dragData: any;
    disabled: ko.Observable<boolean>;
}
export declare class DataMemberTreeNode extends TreeNode {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DataMemberTreeNode) => void);
    setChecked(value: boolean): void;
    visible: ko.Observable<boolean>;
    children: ko.ObservableArray<DataMemberTreeNode | FieldTreeNode>;
    isComplex: boolean;
}
export declare class SingleCheckedDataMemberTreeNode extends DataMemberTreeNode {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DataMemberTreeNode) => void);
    _checked: ko.Observable<boolean>;
    children: ko.ObservableArray<FieldTreeNode>;
}
