﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonTreeNodeItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeNodeItemsProvider } from './_treeNodeItemsProvider';
export class JsonTreeNodeItemsProvider extends TreeNodeItemsProvider {
    constructor(fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode) {
        super(fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode);
    }
    _getDefaultTreeNodeCheckState(item) {
        return item.isSelected;
    }
    getNodeByPath(pathRequest) {
        let listNode = this._rootItems().filter(item => item.path === (pathRequest.pathParts || [])[0])[0];
        if (!listNode)
            return;
        let childPath = listNode.path;
        for (let index = 1; index < pathRequest.pathParts.length; index++) {
            if (!listNode)
                return;
            childPath += '.' + pathRequest.pathParts[index];
            listNode = listNode.children().filter(item => item.path == childPath)[0];
        }
        return listNode;
    }
}
