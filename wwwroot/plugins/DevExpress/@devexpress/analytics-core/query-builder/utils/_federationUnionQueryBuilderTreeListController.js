﻿/**
* DevExpress Analytics (query-builder\utils\_federationUnionQueryBuilderTreeListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListController } from '../../widgets/treelist/_treelistController';
export class FederatedUnionQueryBuilderTreeListController extends TreeListController {
    constructor(dragDropHandler, dblClickHandler) {
        super();
        this.dragDropHandler = dragDropHandler;
        this.dblClickHandler = dblClickHandler;
    }
    itemsFilter(item, path, model) {
        if (item.specifics === 'none')
            return false;
        return true;
    }
    isDraggable(item) {
        if (!item.data)
            return false;
        if (item.data.isListType || item.data.isSupportQueries === false) {
            let parent = item.parent;
            while (parent && parent.data) {
                if (parent.data.isListType)
                    return false;
                parent = parent.parent;
            }
            return true;
        }
        return false;
    }
}
export class FederatedTransformQueryBuilderTreeListController extends FederatedUnionQueryBuilderTreeListController {
    itemsFilter(item, path, model) {
        return super.itemsFilter(item, path, model) && item.isList;
    }
    hasItems(item) {
        return super.hasItems(item) && (!item.isListType || item.isSupportQueries === false);
    }
}
