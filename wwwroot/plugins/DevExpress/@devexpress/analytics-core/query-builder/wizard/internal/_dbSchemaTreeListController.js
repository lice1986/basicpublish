﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_dbSchemaTreeListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListController } from '../../../widgets/treelist/_treelistController';
import { QueriesTreeNode, TreeQueryNode } from './_treeListNode';
import { TreeListSearchOptions } from '../../../widgets/treelist/_treeListSearchOptions';
export class DBSchemaTreeListController extends TreeListController {
    constructor(_customizeDBSchemaTreeListActions, searchOptions = new TreeListSearchOptions()) {
        super();
        this._customizeDBSchemaTreeListActions = _customizeDBSchemaTreeListActions;
        this.searchOptions = searchOptions;
    }
    getActions(value) {
        if (!value.data)
            return [];
        if (!(value.data instanceof QueriesTreeNode || value.data instanceof TreeQueryNode))
            return [];
        const result = value.data.getActions(value);
        this._customizeDBSchemaTreeListActions && this._customizeDBSchemaTreeListActions(value.data, result);
        return result;
    }
    canSelect(value) {
        return true;
    }
}
