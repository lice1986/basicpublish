﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federatedQueriesTreeNode.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAddQueriesTreeListCallbacks } from '../_dbSchemaItemsProvider';
import { QueriesTreeNode, TreeNodeBase } from '../_treeListNode';
export interface IFederationQueryBuilderCallbacks {
    joinCallBack?: (name?: string) => any;
    unionCallBack?: (name?: string) => any;
    transformCallBack?: (name?: string) => any;
}
export interface IFederationAddQueriesTreeListCallbacks extends IAddQueriesTreeListCallbacks {
    showQbCallBacks: IFederationQueryBuilderCallbacks;
}
export declare class FederatedQueriesTreeNode extends QueriesTreeNode {
    callbacks?: ko.Observable<IFederationAddQueriesTreeListCallbacks>;
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, callbacks?: ko.Observable<IFederationAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: TreeNodeBase) => void);
    addAction: {
        clickAction: () => void;
        imageClassName: string;
        imageTemplateName: string;
        templateName: string;
        text: any;
    };
    getActions(context: {
        path: string;
    }): Array<any>;
    popoverListItems(): Array<any>;
    className: string;
}