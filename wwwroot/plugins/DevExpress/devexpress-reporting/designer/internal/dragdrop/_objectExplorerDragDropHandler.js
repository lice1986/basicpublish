﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_objectExplorerDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export class ObjectExplorerDragDropHandler extends DragDropHandler {
    constructor(_canAddItems, surface, selection, undoEngine, dragHelperContent) {
        super(surface, selection, undoEngine, null, dragHelperContent);
        this._canAddItems = _canAddItems;
        this.undoEngine = undoEngine;
        this._lastList = null;
        this._timeout = null;
        this.cursor = 'arrow';
        this.alwaysAlt = true;
        this.containment = '.dxrd-designer';
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
    }
    drag(event, ui) {
        let isLocked = this.selection && this.selection.dropTarget && this.selection.dropTarget.locked;
        if (this.reportControlsDragDropHelper.started) {
            const target = event['toElement'] || (ko.dataFor(event.relatedTarget) && event.relatedTarget) || (event && event.target) || null;
            if (target) {
                this.reportControlsDragDropHelper.setNewDropTarget(ko.dataFor(target), target, event.pageY);
            }
            const _target = this.reportControlsDragDropHelper['_target'];
            if (_target && _target.hasItems && _target.collapsed) {
                if (this._lastList !== _target) {
                    this._timeout && clearTimeout(this._timeout);
                    this._lastList = _target;
                    this._timeout = setTimeout(() => {
                        this._lastList.collapsed && this._lastList.toggleCollapsed();
                    }, 500);
                }
            }
            else {
                this._lastList = null;
                this._timeout && clearTimeout(this._timeout);
            }
            isLocked = isLocked || !this._canAddItems();
        }
        this.dragHelperContent.isLocked(isLocked);
    }
}
