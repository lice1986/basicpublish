﻿/**
* DevExpress Analytics (query-builder\utils\_queryBuilderTreeListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListController } from '../../widgets/treelist/_treelistController';
export class QueryBuilderTreeListController extends TreeListController {
    constructor(undoEngine, query, dragDropHandler) {
        super();
        this.undoEngine = undoEngine;
        this.query = query;
        this._dragDropHandler = dragDropHandler.getDropCallback(undoEngine, true);
    }
    dblClickHandler(item) {
        this.undoEngine().start();
        this._dragDropHandler(item, this.query());
        this.undoEngine().end();
    }
}
