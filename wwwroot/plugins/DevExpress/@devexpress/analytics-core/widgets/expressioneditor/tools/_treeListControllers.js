﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_treeListControllers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { TreeListController } from '../../treelist/_treelistController';
export class ExpressionEditorTreeListController extends TreeListController {
    constructor(fieldName, putSelectionHandler, selectionHandler, customFilter) {
        super();
        this.fieldName = fieldName;
        this.putSelectionHandler = putSelectionHandler;
        this.selectionHandler = selectionHandler;
        this.customFilter = customFilter;
    }
    itemsFilter(item, path) {
        return item.specifics !== 'none' && item.name !== 'ReportItems' && (!this.customFilter || this.customFilter(path));
    }
    select(value) {
        if (this.selectionHandler)
            this.selectionHandler(value);
        else
            super.select(value);
    }
    getActions(item) {
        return [{ clickAction: (element) => this.putSelectionHandler(item, $.fn.constructor(element)) }];
    }
    canSelect(value) {
        return true;
    }
}
export class ExpressionEditorParametersTreeListController extends TreeListController {
    constructor(customFilter, putSelectionHandler, selectionHandler) {
        super();
        this.customFilter = customFilter;
        this.putSelectionHandler = putSelectionHandler;
        this.selectionHandler = selectionHandler;
    }
    itemsFilter(item) {
        return item.specifics !== 'none' && (!this.customFilter || this.customFilter(item));
    }
    select(value) {
        this.selectionHandler(value);
    }
    getActions(item) {
        return [{
                clickAction: (element) => {
                    if (item && !item.hasItems)
                        this.putSelectionHandler(item.path, $.fn.constructor(element));
                }
            }];
    }
    canSelect(value) {
        return true;
    }
}