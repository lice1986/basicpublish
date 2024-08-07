﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTreeNodeProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FieldListProvider } from '../../../../core/utils/_fieldListProvider';
import { IDataMemberInfo } from '../../../../widgets/utils';
import { DataMemberTreeNode, TreeNodeBase } from '../_treeListNode';
import { TreeNodeItemsProvider } from '../_treeNodeItemsProvider';
import { IFederationQueryBuilderCallbacks } from './_federatedQueriesTreeNode';
import { IFederationQuery } from '../../../dataSource/utils';
export declare class FederationTreeNodeProvider extends TreeNodeItemsProvider {
    constructor(fieldListProvider: FieldListProvider, rootItems: ko.ObservableArray<IDataMemberInfo>, callBacks: IFederationQueryBuilderCallbacks, customQueries: ko.ObservableArray<IFederationQuery>, afterCheckToggled: (node: TreeNodeBase) => void);
    private _queries;
    private _customQueries;
    private _callBack;
    isList(dataMember: IDataMemberInfo, parentNode: FederationDataMemberTreeNode): boolean;
}
declare class FederationDataMemberTreeNode extends DataMemberTreeNode {
    constructor(name: string, displayName: string, specifics: string, isListType: boolean, isChecked: boolean, path: string, afterCheckToggled?: (node: DataMemberTreeNode) => void);
    isListType: boolean;
}
export {};
