﻿/**
* DevExpress Analytics (query-builder\utils\_queryBuilderTreeListController.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeListController } from '../../widgets/treelist/_treelistController';
import { UndoEngine } from '../../undo-engine/undoengine';
import { QueryViewModel } from '../elements/queryModel';
import { DbObjectDragDropHandler } from '../dragDrop/_dbObjectDragDropHandler';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
export declare class QueryBuilderTreeListController extends TreeListController {
    private undoEngine;
    private query;
    private _dragDropHandler;
    constructor(undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, query: ko.Subscribable<QueryViewModel>, dragDropHandler: DbObjectDragDropHandler);
    dblClickHandler(item: TreeListItemViewModel): void;
}