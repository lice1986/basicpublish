﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Rectangle } from '@devexpress/analytics-core/analytics-elements';
import { DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportSurface } from '../../controls/xrReport';
import { DataBindingMode } from '../_dataBindingMode';
import { listMemberControlsMap, memberControlsMap } from './_fieldListDragDropHelper';
import { dragDropComponentAdded, getExpressionPath, isList, selectTreeListItem } from './_utils';
export class FieldListDragDropHandler extends DragDropHandler {
    constructor(_canAddItems, surface, selection, _undoEngine, snapHelper, dragHelperContent, _dataSources, onComponentAdded) {
        super(surface, selection, _undoEngine, snapHelper, dragHelperContent);
        this._canAddItems = _canAddItems;
        this._undoEngine = _undoEngine;
        this._dataSources = _dataSources;
        this._getKey = (item) => (item.data.isList || item.isMultiSelected) ? 'List' : item.data.specifics;
        this._isIcon = false;
        this._disposables.push(this.dataBindingMode = ko.computed(() => { return surface() && surface()._control.dataBindingMode || DataBindingMode.Expressions; }));
        this.cursor = 'arrow';
        this.onComponentAdded = (e) => { onComponentAdded && onComponentAdded(e); };
        this.containment = '.dxrd-designer';
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
        this['helper'] = (draggable, event) => {
            super.helper(draggable);
            const item = draggable;
            selectTreeListItem(item, event);
            this._setDragHelperContent(memberControlsMap, this._getKey(item));
        };
    }
    _setDragHelperContent(memberControlsMap, key) {
        const size = (memberControlsMap[key] || memberControlsMap['Default']).size(this.surface());
        this.recalculateSize(size);
        this.dragHelperContent.reset();
        this.dragHelperContent.setContent(new Rectangle(0, 0, this._size.width(), this._size.height()));
    }
    _getDropTarget(memberControlsMapElement) {
        return memberControlsMapElement && memberControlsMapElement.adjustDropTarget && memberControlsMapElement.adjustDropTarget(this.selection.dropTarget) || this.selection.dropTarget;
    }
    _needToChangeHelperContent(dragHelperContent, className) {
        return dragHelperContent && dragHelperContent.className === className;
    }
    _updateInnerControlSize(control) {
        if (!control.rows)
            return;
        const cells = control.rows()[0].cells();
        let innerControls = [];
        cells.forEach(cell => {
            innerControls = innerControls.concat(cell.controls());
        });
        if (innerControls.length === 0)
            return;
        const cellWidth = cells[0].width();
        const cellHeight = cells[0].height();
        innerControls.forEach(control => {
            control.size.width(cellWidth);
            control.size.height(cellHeight);
        });
    }
    _addControl(control, dropTarget) {
        if (!control)
            return;
        this._undoEngine().start();
        this.addControl(control, dropTarget, this._size);
        this._updateInnerControlSize(control);
        this._undoEngine().end();
        const parent = dropTarget.getControlModel();
        dragDropComponentAdded(control, parent);
        this.onComponentAdded({ parent: parent, model: control });
    }
    _isDefaultBindingAssigned(control, treeListItem) {
        if (control['hasDefaultBindingProperty'] && !isList(treeListItem.data)) {
            if (this.dataBindingMode() === DataBindingMode.Bindings) {
                const dataBinding = control.getDefaultBinding();
                dataBinding.updateBinding(treeListItem.path, this._dataSources.peek());
            }
            else {
                const expression = control.getDefaultBinding();
                expression.value(getExpressionPath(control, new PathRequest(treeListItem.path)));
            }
            return true;
        }
        return false;
    }
    canDrop(dropTarget, controlModel, metaData) {
        const canDrop = super.canDrop(dropTarget, controlModel, metaData);
        return canDrop && (this._canAddItems() || this._isIcon);
    }
    drag(event, ui, draggable) {
        this._isIcon = false;
        this._snapDisabled = false;
        if (this.selection.dropTarget) {
            const key = this._getKey(draggable);
            const dropTarget = this._getDropTarget(memberControlsMap[key]);
            const dropTargetControl = dropTarget.getControlModel();
            const boundedClass = 'dxrd-image-ghost-bounded';
            const dragHelperContent = this.dragHelperContent.controls()[0];
            if (dropTargetControl['hasDefaultBindingProperty'] && !isList(draggable.data) || dropTarget.dragCallback) {
                if (!this._needToChangeHelperContent(dragHelperContent, boundedClass)) {
                    const rect = new Rectangle(12, 12, 12, 12);
                    rect.className = boundedClass;
                    this._size.width(12);
                    this._size.height(12);
                    this.dragHelperContent.reset();
                    this.dragHelperContent.setContent(rect);
                }
                dropTarget.dragCallback && dropTarget.dragCallback(draggable);
                this.snapHelper.deactivateSnapLines();
                this._snapDisabled = true;
                this._isIcon = true;
            }
            else if (this._needToChangeHelperContent(dragHelperContent, boundedClass)) {
                this._setDragHelperContent(memberControlsMap, key);
            }
        }
        super.drag(event, ui, draggable);
    }
    doStopDrag(uiElement, draggable, event) {
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.selection.dropTarget) {
            if (this.selection.dropTarget instanceof ReportSurface)
                return;
            const position = this._getAbsoluteSurfacePosition(uiElement);
            this.selection.dropTarget.underCursor().x = position.left - this.selection.dropTarget['absolutePosition'].x();
            this.selection.dropTarget.underCursor().y = position.top - this.selection.dropTarget['absolutePosition'].y();
            const item = draggable;
            const key = item.data.isList ? 'List' : item.data.specifics;
            if (this.surface().isFit && this.surface().isFit(this.selection.dropTarget) || this.selection.dropTarget.underCursor().isOver) {
                let dropTarget = this._getDropTarget(memberControlsMap[key]);
                const dropTargetControl = dropTarget.getControlModel();
                const isMultiSelect = item.getSelectedItems().length > 1;
                if (!isMultiSelect && this._isDefaultBindingAssigned(dropTargetControl, item))
                    return;
                if (dropTarget.dropCallback) {
                    dropTarget.dropCallback(item);
                    return;
                }
                dropTarget = dropTargetControl.getMetaData().isContainer ? dropTarget : dropTarget.parent;
                if (!dropTarget.canDrop())
                    return;
                if (!isMultiSelect && !isList(item.data)) {
                    const control = (memberControlsMap[key] || memberControlsMap['Default']).drop(item, dropTarget.getControlModel(), this.dataBindingMode());
                    this._addControl(control, dropTarget);
                    return;
                }
                listMemberControlsMap[isMultiSelect ? 'MultiList' : key]
                    .drop(item, dropTarget.getControlModel(), this.dataBindingMode(), listMemberControlsMap[isMultiSelect ? 'MultiList' : key].size(this.surface()))
                    .done((control) => {
                    this._addControl(control, dropTarget);
                });
            }
        }
    }
}
