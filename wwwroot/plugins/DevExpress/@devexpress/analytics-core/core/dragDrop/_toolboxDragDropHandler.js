﻿/**
* DevExpress Analytics (core\dragDrop\_toolboxDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from './_dragDropHandler';
import { Size } from '../elements/size';
import { Rectangle } from '../elements/rectangle';
import { findSurface } from '../internal/_surfaceHelpers';
import { extend } from '../../serializer/_utils';
export class ToolboxDragDropHandler extends DragDropHandler {
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent);
        this.cursor = 'arrow';
        this._controlsFactory = controlsFactory;
        this.containment = '.dxrd-designer';
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
    }
    helper(draggable) {
        super.helper(draggable);
        const toolboxItem = draggable;
        const size = Size.fromString(toolboxItem.info['@SizeF'] || toolboxItem.info['size'] || '100,23');
        this.recalculateSize(size);
        this.dragHelperContent.setContent(new Rectangle(0, 0, this._size.width(), this._size.height()));
    }
    doStopDrag(uiElement, draggableModel) {
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.selection.dropTarget) {
            const toolboxItem = draggableModel, control = this._controlsFactory.createControl(extend({}, toolboxItem.info), null), parent = control.getNearestParent(this.selection.dropTarget.getControlModel()), dropTargetSurface = findSurface(parent);
            if (!dropTargetSurface || !dropTargetSurface.canDrop()) {
                return;
            }
            const position = this._getAbsoluteSurfacePosition(uiElement);
            dropTargetSurface.underCursor().x = position.left - (dropTargetSurface['absolutePosition'] && dropTargetSurface['absolutePosition'].x() || 0);
            dropTargetSurface.underCursor().y = position.top - (dropTargetSurface['absolutePosition'] && dropTargetSurface['absolutePosition'].y() || 0);
            if (this.surface().isFit && this.surface().isFit(dropTargetSurface) || dropTargetSurface.underCursor().isOver) {
                this.addControl(control, dropTargetSurface, this._size);
            }
        }
    }
}