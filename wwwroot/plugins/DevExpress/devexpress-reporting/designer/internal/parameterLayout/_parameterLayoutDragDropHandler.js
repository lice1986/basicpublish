﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parameterLayoutDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragHelperContent } from '@devexpress/analytics-core/analytics-internal';
import { getTemplate } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { GroupLayoutItem, ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { ObjectExplorerDragDropHandler } from '../dragdrop/_objectExplorerDragDropHandler';
import { ObjectExplorerDragDropHelper } from '../dragdrop/_objectExplorerDragDropHelper';
class ParameterLayoutDragDropHelper extends ObjectExplorerDragDropHelper {
    constructor(_selectedItem, dragHelperContent) {
        super(dragHelperContent);
        this._selectedItem = _selectedItem;
        this._dropBefore = false;
        this._dropInside = false;
    }
    _getDroppableClassName(isInTopOrderArea, isInBottomOrderArea) {
        if (!this.canDrop()) {
            return this.droppableClassName;
        }
        this._dropInside = false;
        const className = this.droppableClassName + ' ' + this.approveClassName;
        if (isInBottomOrderArea) {
            this._dropBefore = true;
            return className + ' ' + this.classDropAfter;
        }
        else if (isInTopOrderArea) {
            this._dropBefore = false;
            return className + ' ' + this.classDropBefore;
        }
        else if (this._targetModel instanceof GroupLayoutItem) {
            this._dropInside = true;
            return className;
        }
        return '';
    }
    getSiblings() {
        return this._draggableModel.parentModel().parameterPanelLayoutItems;
    }
    getNewParentModel() {
        return this._dropInside ? this._targetModel : this._targetModel.parentModel();
    }
    getTargetSiblings() {
        return this.getNewParentModel().parameterPanelLayoutItems;
    }
    reorderSiblings(isDragToBottom = this.isDragToBottom()) {
        const siblings = this.getSiblings();
        const targetSiblings = this.getTargetSiblings();
        if (siblings && targetSiblings) {
            const _siblings = siblings.peek();
            const _targetSiblings = targetSiblings.peek();
            _siblings.splice(siblings.indexOf(this._draggableModel), 1);
            let targetIndex = _targetSiblings.indexOf(this._targetModel);
            targetIndex === -1 && targetIndex++;
            _targetSiblings.splice(targetIndex + (isDragToBottom ? 1 : 0), 0, this._draggableModel);
            this._draggableModel.parentModel(this.getNewParentModel());
            siblings.valueHasMutated();
            siblings !== targetSiblings && targetSiblings.valueHasMutated();
            this._selectedItem(this._draggableModel);
        }
    }
    canDrop() {
        let currentParent = this._targetModel;
        while (currentParent instanceof ParameterPanelLayoutItem) {
            if (this._draggableModel === currentParent)
                return false;
            currentParent = currentParent.parentModel();
        }
        return true;
    }
    stop() {
        super.stop();
        if (!this._target || !this._targetModel || !this.canDrop()) {
            return;
        }
        this.reorderSiblings(this._dropBefore);
    }
}
export class ParameterLayoutDragDropHandler extends ObjectExplorerDragDropHandler {
    constructor(selectedItem) {
        super(ko.observable(false), null, null, ko.observable(null), new DragHelperContent(null));
        this.containment = 'parent';
        this.parent = () => $.fn.constructor('.dx-designer-viewport .dxrd-parameters-edit-dialog .dxrd-parameters-content-list');
        this.reportControlsDragDropHelper = new ParameterLayoutDragDropHelper(selectedItem, this.dragHelperContent);
        this.helper = (draggable, event) => {
            this.reportControlsDragDropHelper.helper(draggable, event);
            const templateHtml = getTemplate(this.dragHelperContent.template);
            const $container = $.fn.constructor(templateHtml).css({ 'display': 'block' });
            $container.prependTo(this.parent());
            ko.applyBindingsToDescendants(this.dragHelperContent, $container[0]);
            return $container;
        };
    }
    startDrag(draggable) {
        this.reportControlsDragDropHelper.start(draggable);
        super.startDrag(draggable);
    }
    doStopDrag(ui, draggable, event) {
        this.reportControlsDragDropHelper.started && this.reportControlsDragDropHelper.clearDroppableClasses();
        this.dragHelperContent.reset();
        this.reportControlsDragDropHelper.stop();
    }
}