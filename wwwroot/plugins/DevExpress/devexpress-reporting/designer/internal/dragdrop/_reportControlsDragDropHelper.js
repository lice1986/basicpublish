﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportControlsDragDropHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { BandViewModel } from '../../bands/xrBand';
import { ReportViewModel } from '../../controls/xrReport';
import { XRTableControlViewModel } from '../../controls/xrTable';
import { XRTableCellViewModel } from '../../controls/xrTableCell';
import { XRTableRowViewModel } from '../../controls/xrTableRow';
import { _isReorderBand } from '../../utils/utils';
import { ObjectExplorerDragDropHelper } from './_objectExplorerDragDropHelper';
export class ReportControlsDragDropHelper extends ObjectExplorerDragDropHelper {
    constructor(_dragHelperContent, _undoEngine) {
        super(_dragHelperContent);
        this._dragHelperContent = _dragHelperContent;
        this._undoEngine = _undoEngine;
        this._isTargetContainer = false;
        this._tableControlTypes = ['XRTableCell', 'XRTableRow'];
        this._restrictedTargets = ['XRCrossTabCell', 'XRCrossTab'];
    }
    _canReorder(currentTarget, draggableData) {
        const currentModel = this._getElementViewModel(currentTarget);
        if (BandViewModel.isReorderingBand(this._draggableModel) && BandViewModel.isReorderingBand(currentModel))
            return _isReorderBand(this._draggableModel.surface, currentModel);
        return currentTarget.data.specifics === draggableData.specifics ||
            (this._draggableModel.getMetaData().canDrop(currentModel.surface, this._draggableModel) &&
                !currentModel.getMetaData().isContainer && !(currentModel instanceof ReportViewModel));
    }
    _canInsertToTarget(targetModel) {
        const targetIsContainer = targetModel.getMetaData().isContainer || targetModel instanceof ReportViewModel;
        if (this._tableControlTypes.indexOf(this._draggableModel.controlType) === -1 && (targetModel.controlType === 'XRTable' || targetModel.controlType === 'XRTableRow'))
            return false;
        return targetIsContainer && targetModel.surface && targetModel.surface.canDrop()
            && this._draggableModel.getMetaData().canDrop(targetModel.surface, this._draggableModel);
    }
    _targetIsClosestOfDraggable(target, draggable) {
        return target === draggable || (target.parent && this._targetIsClosestOfDraggable(target.parent, draggable));
    }
    _canDrop(target, targetModel) {
        const isReportExplorerTreeListItem = target instanceof TreeListItemViewModel && target.data && target.data['data'] instanceof ElementViewModel;
        if (!isReportExplorerTreeListItem || this._restrictedTargets.indexOf(targetModel.controlType) !== -1) {
            return false;
        }
        return (this._draggableParent !== this._targetModel && !this._targetIsClosestOfDraggable(this._target, this._draggable) &&
            (this._canReorder(target, this._draggable.data) || this._canInsertToTarget(targetModel)));
    }
    _insertTableChildren(parent, selectedEl, position, weightsCells = null) {
        let newChild, selectedRowHeight = 0;
        if (selectedEl['@ControlType'] === 'XRTableRow') {
            newChild = new XRTableRowViewModel(selectedEl, parent);
            selectedRowHeight = newChild.height.peek();
        }
        else if (selectedEl['@ControlType'] === 'XRTableCell') {
            newChild = new XRTableCellViewModel(selectedEl, parent);
        }
        parent.addChild(newChild, position);
        if (weightsCells) {
            weightsCells.splice(position, 0, parseFloat(selectedEl['@Weight']));
            weightsCells.forEach((weight, index) => {
                parent.cells()[index].weight(weight);
            });
        }
        if (selectedRowHeight) {
            parent.size.height(parent.size.height() + selectedRowHeight);
        }
        return newChild.surface;
    }
    _shouldCheckAreas() {
        this._isTargetContainer = this._draggableModel.controlType === 'DetailReportBand';
        return this._isTargetContainer;
    }
    _getDroppableClassName(isInTopOrderArea, isInBottomOrderArea) {
        let className = this.droppableClassName;
        const targetModel = this._getElementViewModel(this._target);
        if (this._canDrop(this._target, targetModel) && (!this._dragHelperContent || !this._dragHelperContent.isLocked())) {
            const canOrder = this._canReorder(this._target, this._draggable.data);
            const isDragToBottom = canOrder && this.isDragToBottom();
            className = className + ' ' + this.approveClassName;
            if (canOrder && this._draggableModel.controlType !== 'DetailReportBand') {
                className = className + ' ' + this.getDroppablePosition();
                this._isTargetContainer = false;
            }
            else if (canOrder && isDragToBottom && isInBottomOrderArea) {
                className = [className, this.classDropAfter].join(' ');
                this._isTargetContainer = false;
            }
            else if (canOrder && !isDragToBottom && isInTopOrderArea) {
                className = className + ' ' + this.classDropBefore;
                this._isTargetContainer = false;
            }
        }
        return className;
    }
    _reorderBands(targetModel) {
        if (this._isTargetContainer) {
            targetModel.addChild(this._draggableModel);
        }
        else {
            this._undoEngine && this._undoEngine.start();
            this._draggableModel['level'](targetModel['level']());
            this._undoEngine && this._undoEngine.end();
        }
    }
    _reorderTableControls(targetModel, siblings, isDragToBottom) {
        const clonedSiblings = siblings && siblings().slice(0);
        const draggableInfoClone = this._serializer.serialize(this._draggableModel);
        let weightsCells;
        if (this._draggableModel.controlType === 'XRTableCell') {
            weightsCells = clonedSiblings.filter((cell) => {
                return cell.name.peek() !== this._draggableModel.name.peek();
            }).map(cell => cell.weight.peek());
        }
        return this._insertTableChildren(targetModel.parentModel(), draggableInfoClone, siblings.indexOf(targetModel) + isDragToBottom, weightsCells);
    }
    _changeControlParent(targetModel) {
        const targetRect = targetModel.surface.rect();
        const draggableRect = this._draggableModel.surface.rect();
        const rect = {};
        if (targetRect.width < draggableRect.left + draggableRect.width) {
            rect['left'] = targetRect.width - draggableRect.width;
            rect['left'] = rect['left'] > 0 ? rect['left'] : 0;
        }
        if (targetRect.height < draggableRect.top + draggableRect.height) {
            rect['top'] = targetRect.height - draggableRect.height;
            rect['top'] = rect['top'] > 0 ? rect['top'] : 0;
        }
        this._draggableModel.surface.rect(rect);
        targetModel.addChild(this._draggableModel);
    }
    start(draggable) {
        super.start(draggable);
        this._serializer = new ModelSerializer();
        this._draggableParent = this._draggableModel.parentModel();
    }
    getSiblings() {
        const draggablePathName = this._draggable.data.name.split('.')[0];
        return (this._targetModel.parentModel() || this._targetModel)[draggablePathName];
    }
    stop() {
        super.stop();
        if (!this._target || !this._targetModel || !this._canDrop(this._target, this._targetModel)) {
            return this._draggableModel.surface;
        }
        const canReorder = this._canReorder(this._target, this._draggable.data), isReorderingBand = BandViewModel.isReorderingBand(this._draggableModel), isDragToBottom = this.isDragToBottom(), isBandReordering = isReorderingBand && !this._isTargetContainer;
        if (!isBandReordering) {
            this._draggableParent.removeChild(this._draggableModel);
        }
        if (canReorder) {
            if (isReorderingBand) {
                this._reorderBands(this._targetModel);
            }
            else if (this._tableControlTypes.indexOf(this._draggableModel.controlType) !== -1) {
                this._reorderTableControls(this._targetModel, this.getSiblings(), isDragToBottom);
            }
            else {
                this.reorderSiblings(isDragToBottom);
            }
        }
        else if (this._targetModel instanceof XRTableControlViewModel || this._targetModel instanceof XRTableRowViewModel) {
            const draggableInfoClone = this._serializer.serialize(this._draggableModel);
            return this._insertTableChildren(this._targetModel, draggableInfoClone, 0);
        }
        else {
            this._changeControlParent(this._targetModel);
        }
        return this._draggableModel.surface;
    }
}