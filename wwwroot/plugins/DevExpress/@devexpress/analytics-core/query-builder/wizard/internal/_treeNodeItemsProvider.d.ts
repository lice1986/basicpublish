﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_treeNodeItemsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IItemsProvider, IDataMemberInfo } from '../../../widgets/utils';
import { DataMemberTreeNode, FieldTreeNode } from './_treeListNode';
import { IPathRequest } from '../../../widgets/common/pathRequest';
import { FieldListProvider } from '../../../core/utils/_fieldListProvider';
export declare class TreeNodeItemsProvider extends Disposable implements IItemsProvider {
    private _fullTreeLoaded;
    protected _rootItems: ko.ObservableArray<DataMemberTreeNode>;
    private _checkedRootNodesCount;
    private _createTree;
    private _createTreePart;
    private _setChecked;
    selectAllItems(onlyRoot?: boolean): JQuery.Promise<any, any, any>;
    selectItemsByPath(path: string): JQuery.Promise<any, any, any>;
    selectItemByPath(path: string): JQuery.Promise<any, any, any>;
    protected _getParentNode(pathRequest: IPathRequest): DataMemberTreeNode;
    protected _getDefaultTreeNodeCheckState(item: IDataMemberInfo): boolean;
    constructor(fieldListProvider: FieldListProvider, rootItems: ko.ObservableArray<IDataMemberInfo>, generateTreeNode: (item: IDataMemberInfo, isChecked: boolean, path: string) => DataMemberTreeNode, generateTreeLeafNode: (item: IDataMemberInfo, isChecked: boolean, path: string) => FieldTreeNode);
    hasCheckedItems: ko.Computed<boolean>;
    getItems: (path: IPathRequest, collectChilds?: boolean) => JQueryPromise<IDataMemberInfo[]>;
    getRootItems: () => DataMemberTreeNode[];
    isList(dataMember: IDataMemberInfo, parentNode: DataMemberTreeNode): boolean;
}
