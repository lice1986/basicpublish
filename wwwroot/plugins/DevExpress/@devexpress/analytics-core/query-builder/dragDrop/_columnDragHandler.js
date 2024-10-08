﻿/**
* DevExpress Analytics (query-builder\dragDrop\_columnDragHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ColumnSurface } from '../elements/columnSurface';
import { ConnectionPointSurface } from '../../diagram/elements/connectors/connectionPointSurface';
import { findSurface } from '../../core/internal/_surfaceHelpers';
import { RoutedConnectorViewModel } from '../../diagram/elements/connectors/routedConnectorModel';
import { RoutedConnectorSurface } from '../../diagram/elements/connectors/routedConnectorSurface';
import { determineConnectingPoints } from '../../diagram/utils';
import { dxScrollProcessor } from '../../core/internal/_scrollProcessor';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../../core/internal/_utils.unitsConvertation';
export class ColumnDragHandler extends DragDropHandler {
    constructor(querySurface, selection, undoEngine, snapHelper, dragHelperContent) {
        super(querySurface, selection, undoEngine, snapHelper, dragHelperContent);
        this.querySurface = querySurface;
        this.undoEngine = undoEngine;
        this._dragColumn = ko.observable(null);
        this._dragConditionSurface = null;
        this.dragDropConnector = ko.observable(null);
        this.cursor = 'arrow';
        this.containment = '.dxrd-ghost-container';
        this['helper'] = undefined;
    }
    _needToCreateRelation() {
        if (!(this.selection.dropTarget && this.selection.dropTarget instanceof ColumnSurface))
            return false;
        const table = this.selection.dropTarget.getControlModel().parentModel();
        return table !== this.getDragColumn().parentModel();
    }
    startDrag(control) {
        this._scrollProcessor = new dxScrollProcessor(document.getElementsByClassName('dxqb-mainwin')[0]);
        if (control instanceof ConnectionPointSurface) {
            const condition = control.getControlModel().parentModel();
            this._dragConditionSurface = findSurface(condition);
            if (!this._dragConditionSurface)
                return;
            this._dragConditionSurface.isVisible(false);
            this._dragColumn((condition.startPoint() === control.getControlModel()) ? condition.nestedColumn() : condition.parentColumn());
        }
        else if (!(control instanceof ColumnSurface)) {
            throw new Error('ColumnDragHandler can be applied to the Column only.');
        }
        else {
            this._dragColumn(control.getControlModel());
        }
        const connectorModel = new RoutedConnectorViewModel({}, this.querySurface().getControlModel());
        this.dragDropConnector(new RoutedConnectorSurface(connectorModel, this.surface()));
    }
    setConnectorPoints(cursorPosition) {
        const startColumn = this._dragColumn(), connectorModel = this.dragDropConnector().getControlModel();
        if (this._needToCreateRelation()) {
            const points = determineConnectingPoints(startColumn, this.selection.dropTarget.getControlModel());
            connectorModel.startPoint().connectingPoint(points.start);
            connectorModel.endPoint().connectingPoint(points.end);
        }
        else {
            const _leftConnectionPointX = this.querySurface().rtl() ? this.querySurface().pageWidth() - startColumn.leftConnectionPoint.location.x() : startColumn.leftConnectionPoint.location.x();
            const _rightConnectionPointX = this.querySurface().rtl() ? this.querySurface().pageWidth() - startColumn.rightConnectionPoint.location.x() : startColumn.rightConnectionPoint.location.x();
            const point = Math.abs(_leftConnectionPointX - cursorPosition.left) > Math.abs(_rightConnectionPointX - cursorPosition.left) ?
                startColumn.rightConnectionPoint : startColumn.leftConnectionPoint;
            connectorModel.startPoint().connectingPoint(point);
            this.dragDropConnector().endPoint().rect({ top: cursorPosition.top, left: cursorPosition.left });
        }
    }
    drag(event, uiElement) {
        const scrollOffset = this._scrollProcessor.getScrollOffset();
        uiElement.dataset.leftPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.leftPosition) + (uiElement['scroll'].left + scrollOffset.left));
        uiElement.dataset.topPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.topPosition) + (uiElement['scroll'].top + scrollOffset.top));
        uiElement['delta'].left = convertFromCssPixelUnits(uiElement.dataset.leftPosition) - this.surface()['underCursor']().x - 6;
        uiElement['delta'].top = convertFromCssPixelUnits(uiElement.dataset.topPosition) - this.surface()['underCursor']().y - 6;
        this.setConnectorPoints(this._getAbsoluteSurfacePosition(uiElement));
        this._scrollProcessor.processOffset({ x: event.clientX, y: event.clientY });
    }
    doStopDrag() {
        this._scrollProcessor.dispose();
        this._scrollProcessor = null;
        this.dragHelperContent.reset();
        this.dragDropConnector() && this.dragDropConnector().dispose();
        this.dragDropConnector(null);
        try {
            let editableCondition = null;
            if (this._dragConditionSurface && !this._dragConditionSurface.isVisible()) {
                editableCondition = this._dragConditionSurface.getControlModel();
                this._dragConditionSurface.isVisible(true);
            }
            const query = this.querySurface().getControlModel();
            if (this._needToCreateRelation()) {
                const nestedColumn = this.selection.dropTarget.getControlModel();
                this.undoEngine().start();
                if (editableCondition) {
                    editableCondition.parentModel().removeChild(editableCondition);
                }
                const condition = query.cerateJoinCondition(this._dragColumn(), nestedColumn);
                this.undoEngine().end();
                if (condition !== null) {
                    this.selection.initialize(findSurface(condition));
                }
            }
        }
        finally {
            this._dragColumn(null);
        }
    }
    getDragColumn() {
        return this._dragColumn();
    }
}
