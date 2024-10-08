﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federatedQueriesTreeNode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { QueriesTreeNode } from '../_treeListNode';
export class FederatedQueriesTreeNode extends QueriesTreeNode {
    constructor(name, displayName, specifics, isChecked, callbacks, afterCheckToggled) {
        super(name, displayName, specifics, isChecked, callbacks, afterCheckToggled);
        this.callbacks = callbacks;
        this.addAction = {
            clickAction: () => {
                return this.showPopover();
            },
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            templateName: 'dx-treelist-federation-action-with-popover',
            text: getLocalization('Add query', 'AnalyticsCoreStringId.SqlDSWizard_AddQuery')
        };
        this.className = 'dxrd-federation-addqueries-popover';
    }
    getActions(context) {
        const result = [];
        if (context.path.indexOf('queries') === 0) {
            result.push(this.addAction);
        }
        return result;
    }
    popoverListItems() {
        return [
            {
                name: getLocalization('Join', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_NodeType_Select'),
                addAction: () => this.callbacks().showQbCallBacks.joinCallBack(),
                className: this.className
            },
            {
                name: getLocalization('Union', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_NodeType_Union'),
                addAction: () => this.callbacks().showQbCallBacks.unionCallBack(),
                className: this.className
            },
            {
                name: getLocalization('Transform', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_NodeType_Transform'),
                addAction: () => this.callbacks().showQbCallBacks.transformCallBack(),
                className: this.className
            }
        ];
    }
}
