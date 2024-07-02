﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTreeNodeProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { DataMemberTreeNode, FieldTreeNode, TreeQueryNode } from '../_treeListNode';
import { TreeNodeItemsProvider } from '../_treeNodeItemsProvider';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { FederatedQueriesTreeNode } from './_federatedQueriesTreeNode';
import { UnionQuery } from '../../../dataSource/federation/federatedQueries/unionQuery';
import { extend } from '../../../../serializer/_utils';
import { TransformQuery } from '../../../dataSource/federation/federatedQueries/transformQuery';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
export class FederationTreeNodeProvider extends TreeNodeItemsProvider {
    constructor(fieldListProvider, rootItems, callBacks, customQueries, afterCheckToggled) {
        super(fieldListProvider, rootItems, (item, isChecked, path) => new FederationDataMemberTreeNode(item.name, item.displayName, item.specifics, item.isListType, isChecked, path, afterCheckToggled), (item, isChecked, path) => new FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path, afterCheckToggled));
        this._callBack = ko.observable({
            deleteAction: (name) => {
                this._customQueries
                    .remove(findFirstItemMatchesCondition(this._customQueries(), item => (item.alias() || item.generateName()) === name));
            },
            disableCustomSql: false,
            showQbCallBack: null,
            showQbCallBacks: null
        });
        const getCurrentItems = this.getItems;
        this._customQueries = customQueries;
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (pathRequest.fullPath && pathRequest.fullPath.split('.').length > 2) {
                result.resolve([]);
            }
            if (pathRequest.fullPath === 'queries') {
                const queries = customQueries().map(query => {
                    const name = query.alias() || query.generateName();
                    const currentQuery = this._queries.children().filter(q => q['query'] === query)[0];
                    let callback;
                    if (currentQuery)
                        return currentQuery;
                    if (query instanceof UnionQuery) {
                        callback = ko.observable(extend(this._callBack(), { showQbCallBack: callBacks.unionCallBack }));
                    }
                    else if (query instanceof TransformQuery) {
                        callback = ko.observable(extend(this._callBack(), { showQbCallBack: callBacks.transformCallBack }));
                    }
                    else {
                        callback = ko.observable(extend(this._callBack(), { showQbCallBack: callBacks.joinCallBack }));
                    }
                    const queryNode = new TreeQueryNode(name, name, 'query', !!currentQuery && currentQuery.checked(), ko.observableArray([]), callback, afterCheckToggled, query);
                    queryNode.path = 'queries.' + queryNode.name;
                    this._disposables.push(queryNode);
                    return queryNode;
                });
                this._queries.initializeChildren(queries);
                result.resolve(queries);
            }
            else {
                getCurrentItems(pathRequest, true).done(value => result.resolve(value));
            }
            return result.promise();
        };
        this._callBack().showQbCallBacks = callBacks;
        this._disposables.push(this._queries = new FederatedQueriesTreeNode('queries', getLocalization('Federated Queries', 'DataAccessUIStringId.FederatedQueryCollectionList_Title'), 'list', false, this._callBack, afterCheckToggled));
        rootItems.valueHasMutated();
        this._rootItems.push(this._queries);
        this.dispose = () => {
            super.dispose();
            this.removeProperties();
        };
    }
    isList(dataMember, parentNode) {
        return !parentNode.isListType && super.isList(dataMember, parentNode);
    }
}
class FederationDataMemberTreeNode extends DataMemberTreeNode {
    constructor(name, displayName, specifics, isListType, isChecked, path, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, path, afterCheckToggled);
        this.isListType = isListType;
    }
}
