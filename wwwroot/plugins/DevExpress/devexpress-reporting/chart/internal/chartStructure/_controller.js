﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_controller.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ChartTreeListDragDropHelper } from './_chartTreeListDragDropHelper';
export class ChartStructureTreeListController extends ObjectStructureTreeListController {
    constructor(propertyNames, listPropertyNames, selectCallback, surface, undoEngine, dragHelperContent) {
        super(propertyNames, listPropertyNames);
        this.surface = surface;
        this.undoEngine = undoEngine;
        this.dragHelperContent = dragHelperContent;
        const filter = this.itemsFilter;
        this.itemsFilter = (item, path) => {
            if (path === 'Chart.seriesTemplate.label')
                return false;
            return filter(item, path);
        };
        this.hasItems = (item) => {
            return !!listPropertyNames && listPropertyNames.indexOf(item.specifics) !== -1;
        };
        this.select = (value) => {
            this.selectedItem && (this.selectedItem.isSelected = false);
            this.selectedItem = value;
            value.isSelected = true;
            selectCallback && selectCallback(value);
        };
        this.showIconsForChildItems = (parent = null) => parent === null || parent.level < 1;
        this.dragDropHandler = new ChartDragDropHandler(this.selectedItem, surface, undoEngine, dragHelperContent);
    }
}
export class ChartDragDropHandler extends DragDropHandler {
    constructor(surface, selection, undoEngine, dragHelperContent) {
        super(surface, selection, undoEngine, null, dragHelperContent);
        this.undoEngine = undoEngine;
        this.cursor = 'arrow';
        this.alwaysAlt = true;
        this.containment = '.dx-chart-left-panel';
        this.parent = () => $.fn.constructor('.dxcd-designer');
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
        this.dragDropHelper = new ChartTreeListDragDropHelper(dragHelperContent);
        this.helper = this.dragDropHelper.helper;
    }
    dispose() {
        super.dispose();
        this.dragDropHelper.dispose();
    }
    startDrag(draggable) {
        this.dragDropHelper.start(draggable);
        super.startDrag(draggable);
    }
    drag(event, ui) {
        if (this.dragDropHelper) {
            const target = this.getTarget(event);
            if (target) {
                this.dragDropHelper.drag(ko.dataFor(target), target);
                this.dragDropHelper.addDroppableClass();
            }
        }
    }
    doStopDrag(ui, draggable, event) {
        this.dragDropHelper.stop();
    }
}
