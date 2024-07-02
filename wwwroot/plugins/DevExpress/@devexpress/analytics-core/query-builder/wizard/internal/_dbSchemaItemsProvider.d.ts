﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_dbSchemaItemsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IItemsProvider, IDataMemberInfo } from '../../../widgets/utils';
import { TreeNode, ParameterTreeNode, QueriesTreeNode, TreeNodeBase } from './_treeListNode';
import { ISqlQueryViewModel } from '../../dataSource/utils';
import { IDBSchemaProvider } from '../../dataSource/dbSchemaProvider';
import { TableQuery } from '../../dataSource/sql/tableQuery';
import { IPathRequest } from '../../../widgets/common/pathRequest';
import { Disposable } from '../../../serializer/disposable';
export interface IAddQueriesTreeListCallbacks {
    deleteAction?: (name: string) => any;
    showQbCallBack?: (name?: string, isCustomQuery?: boolean) => any;
    disableCustomSql?: boolean;
}
export declare class DBSchemaItemsProvider extends Disposable implements IItemsProvider {
    private _callBack;
    private _tables;
    private _views;
    private _procedures;
    private _queries;
    private _customQueries;
    private _rootItems;
    constructor(dbSchemaProvider: IDBSchemaProvider, customQueries: ko.ObservableArray<TableQuery>, showQbCallBack: any, disableCustomSql: any, afterCheckToggled: (node: TreeNodeBase) => void);
    private _checkedRootNodesCount;
    getItems: (path: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    hasCheckedItems: ko.PureComputed<boolean>;
    nextButtonDisabled: ko.PureComputed<boolean>;
    hasParametersToEdit: ko.PureComputed<boolean>;
    tables: () => TreeNode;
    views: () => TreeNode;
    procedures: () => ParameterTreeNode;
    queries: () => QueriesTreeNode;
    customQueries: () => ko.ObservableArray<ISqlQueryViewModel>;
}
