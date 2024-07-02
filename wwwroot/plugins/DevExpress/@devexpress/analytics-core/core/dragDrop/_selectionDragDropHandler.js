﻿/**
* DevExpress Analytics (core\dragDrop\_selectionDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from './_dragDropHandler';
import { findSurface } from '../internal/_surfaceHelpers';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../internal/_utils.unitsConvertation';
export class SelectionDragDropHandler extends DragDropHandler {
    adjustDropTarget(dropTargetSurface) {
        let selectedItemInTree = dropTargetSurface;
        while (selectedItemInTree != null) {
            if (selectedItemInTree.selected && selectedItemInTree.selected()) {
                dropTargetSurface = selectedItemInTree.parent;
                break;
            }
            selectedItemInTree = selectedItemInTree.parent;
        }
        return dropTargetSurface;
    }
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent);
        this.cursor = 'move';
        this.containment = '.dxrd-ghost-container';
        this['helper'] = (draggable) => {
            super.helper(draggable);
            if (this.selection.selectedItems.indexOf(draggable) === -1) {
                this.selection.updateSelection(draggable);
            }
            dragHelperContent.update(draggable);
            this._size.width(dragHelperContent.width());
            this._size.height(dragHelperContent.height());
        };
    }
    startDrag(control) {
        this.selection.swapFocusedItem(control);
        const focusedSurface = this.selection.focused();
        const baseOffsetX = focusedSurface.rect().left + focusedSurface.underCursor().x;
        const baseOffsetY = focusedSurface.rect().top + focusedSurface.underCursor().y;
        this.selection.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            if (item.parent === focusedSurface.parent) {
                item.underCursor().offsetX = item.rect().left - baseOffsetX;
                item.underCursor().offsetY = item.rect().top - baseOffsetY;
            }
        });
    }
    drag(event, uiElement, draggable) {
        uiElement.dataset.leftPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.leftPosition) + uiElement['scroll'].left);
        uiElement.dataset.topPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.topPosition) + uiElement['scroll'].top);
        super.drag(event, uiElement, draggable);
    }
    getLocation(adjustedTarget, item) {
        const left = adjustedTarget.underCursor().x + item.underCursor().offsetX, top = adjustedTarget.underCursor().y + item.underCursor().offsetY;
        return { left: left > 0 ? left : 0, top: top > 0 ? top : 0 };
    }
    ajustLocation(adjustedTarget, item) {
        item.rect(this.getLocation(adjustedTarget, item));
    }
    doStopDrag(uiElement, _) {
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.selection.dropTarget) {
            const dropTarget = this.selection.dropTarget.getControlModel(), dropTargetSurface = dropTarget.getNearestParent(dropTarget)['surface'];
            const focusedSurface = this.selection.focused();
            let adjustedTarget = this.adjustDropTarget(dropTargetSurface);
            const focusedModel = focusedSurface.getControlModel(), parent = focusedModel.getNearestParent(adjustedTarget.getControlModel());
            adjustedTarget = parent && findSurface(parent);
            const changeParent = adjustedTarget !== focusedSurface.parent;
            if (!adjustedTarget || !adjustedTarget.canDrop()) {
                return;
            }
            const position = this._getAbsoluteSurfacePosition(uiElement);
            adjustedTarget.underCursor().x = position.left - (adjustedTarget['absolutePosition'] && adjustedTarget['absolutePosition'].x() || 0) - focusedSurface.underCursor().offsetX;
            adjustedTarget.underCursor().y = position.top - (adjustedTarget['absolutePosition'] && adjustedTarget['absolutePosition'].y() || 0) - focusedSurface.underCursor().offsetY;
            const itemsToDrop = this.selection.selectedItems
                .filter((item) => { return !item.locked && item.parent === focusedSurface.parent; })
                .map((item) => {
                return item.getControlModel();
            })
                .filter((item) => {
                return item.getMetaData().canDrop(adjustedTarget, item);
            });
            if (changeParent) {
                for (let i = 0; i < itemsToDrop.length; i++) {
                    itemsToDrop[i].surface.rect({ top: 0, left: 0 });
                }
                focusedModel.parentModel().removeChilds(itemsToDrop);
                parent['addChilds'](itemsToDrop);
                for (let i = 0; i < itemsToDrop.length; i++) {
                    this.ajustLocation(adjustedTarget, itemsToDrop[i].surface);
                }
                this.selection.focused(focusedSurface);
                this.selection.selectItems(itemsToDrop.map((item) => { return item.surface; }));
            }
            else {
                for (let i = 0; i < itemsToDrop.length; i++) {
                    this.ajustLocation(adjustedTarget, itemsToDrop[i].surface);
                }
            }
            this.selection.expectClick = !changeParent;
        }
    }
}