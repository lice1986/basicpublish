﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonTreeNodeItemsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeNodeItemsProvider } from './_treeNodeItemsProvider';
import { IItemsProvider, IDataMemberInfo } from '../../../widgets/utils';
import { FieldListProvider } from '../../../core/utils/_fieldListProvider';
import { DataMemberTreeNode, FieldTreeNode } from './_treeListNode';
import { IPathRequest } from '../../../widgets/common/pathRequest';
export declare class JsonTreeNodeItemsProvider extends TreeNodeItemsProvider implements IItemsProvider {
    constructor(fieldListProvider: FieldListProvider, rootItems: ko.ObservableArray<IDataMemberInfo>, generateTreeNode: (item: IDataMemberInfo, isChecked: boolean, path: string) => DataMemberTreeNode, generateTreeLeafNode: (item: IDataMemberInfo, isChecked: boolean, path: string) => FieldTreeNode);
    protected _getDefaultTreeNodeCheckState(item: IDataMemberInfo): boolean;
    getNodeByPath(pathRequest: IPathRequest): DataMemberTreeNode;
}