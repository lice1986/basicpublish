﻿/**
* DevExpress Analytics (widgets\treelist\_reorderTreeListDragDropHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Rectangle } from '../../core/elements/rectangle';
import { find } from '../../core/utils/_arrayutils';
import { Disposable } from '../../serializer/disposable';
import * as $ from 'jquery';
export class ReorderTreeListDragDropHelper extends Disposable {
    constructor(dragHelperContent) {
        super();
        this.dragHelperContent = dragHelperContent;
        this.droppableClassName = 'dxrd-treelist-droppable';
        this.approveClassName = 'dxrd-drop-approve';
        this.classDropBefore = 'drop-before';
        this.classDropAfter = 'drop-after';
        this.started = false;
    }
    _getElementViewModel(item) {
        return item && item.data && item.data['data'];
    }
    dispose() {
        super.dispose();
        this._targetElement = null;
        this._target = null;
        this._draggable = null;
    }
    isDragToBottom() {
        return find(this._draggable.parent.items, item => item === this._draggable || item === this._target) === this._draggable;
    }
    start(draggable) {
        this.started = true;
        this._draggable = draggable.getModel();
        this._draggableModel = this._getElementViewModel(this._draggable);
    }
    canDrop() {
        return this._draggable !== this._target && this._draggable.parent === this._target.parent;
    }
    reorderSiblings(isDragToBottom = this.isDragToBottom()) {
        const siblings = this.getSiblings();
        if (siblings) {
            const _siblings = siblings.peek();
            const index = _siblings.indexOf(this._draggableModel);
            if (index > -1)
                _siblings.splice(index, 1);
            _siblings.splice(_siblings.indexOf(this._targetModel) + (isDragToBottom ? 1 : 0), 0, this._draggableModel);
            siblings.valueHasMutated();
        }
    }
    clearDroppableClasses() {
        this._removeClass(this._targetElement);
    }
    getDroppablePosition() {
        return this.isDragToBottom() ? this.classDropAfter : this.classDropBefore;
    }
    drag(elementModel, element) {
        this.clearDroppableClasses();
        this._target = elementModel.getModel();
        this._targetElement = $.fn.constructor(element).closest('.dx-treelist-item').get(0);
        this._targetModel = this._getElementViewModel(this._target);
    }
    stop() {
        this.clearDroppableClasses();
        this.started = false;
    }
    helper(draggable, event) {
        const target = $.fn.constructor(event.target).closest('.ui-draggable');
        const rect = new Rectangle(6, 6, null, target.height());
        rect.className = 'dxrd-image-ghost-report';
        this.dragHelperContent.reset();
        this.dragHelperContent.setContent(rect, {
            template: 'dxrd-drag-helper-source-reorder-treelist',
            data: {
                imageClassName: draggable.imageClassName,
                imageTemplateName: draggable.imageTemplateName,
                text: draggable.text
            }
        });
    }
    addDroppableClass() {
        let className = this.droppableClassName;
        if (this.canDrop()) {
            className = className + ' ' + this.approveClassName + ' ' + this.getDroppablePosition();
        }
        $.fn.constructor(this._targetElement).addClass(className);
    }
    _removeClass(target) {
        $.fn.constructor(target).removeClass(this.droppableClassName + ' ' + this.approveClassName + ' ' + this.classDropBefore + ' ' + this.classDropAfter);
    }
}