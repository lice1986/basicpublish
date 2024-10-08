﻿/**
* DevExpress Analytics (diagram\dragDrop\connectionPointDragHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ConnectionPointSurface } from '../elements/connectors/connectionPointSurface';
import { ConnectingPointViewModel } from '../elements/connectingPointModel';
import { DiagramElementViewModel } from '../elements/diagramElementViewModel';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../../core/internal/_utils.unitsConvertation';
export class ConnectionPointDragHandler extends DragDropHandler {
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent);
        this.currentConnectionPoint = null;
        this.cursor = 'arrow';
        this.containment = '.dxrd-ghost-container';
        this['helper'] = (draggable) => {
            dragHelperContent.update(draggable);
        };
    }
    startDrag(control) {
        if (!(control instanceof ConnectionPointSurface)) {
            throw new Error('ConnectionPointDragHandler can be applied to the ConnectionPoint only.');
        }
        this.currentConnectionPoint = control;
    }
    drag(event, uiElement) {
        uiElement.dataset.leftPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.leftPosition) + uiElement['scroll'].left);
        uiElement.dataset.topPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.topPosition) + uiElement['scroll'].top);
        const position = this._getAbsoluteSurfacePosition(uiElement);
        this.currentConnectionPoint.rect({ top: position.top, left: position.left });
    }
    doStopDrag() {
        this.dragHelperContent.reset();
        if (this.selection.dropTarget) {
            const dropTarget = this.selection.dropTarget.getControlModel();
            if (dropTarget instanceof ConnectingPointViewModel) {
                const connector = this.currentConnectionPoint.parent.getControlModel();
                if (this.currentConnectionPoint.getControlModel() === connector.startPoint()) {
                    connector.startPoint().connectingPoint(dropTarget);
                }
                else {
                    connector.endPoint().connectingPoint(dropTarget);
                }
            }
            else if (dropTarget instanceof DiagramElementViewModel) {
                const connector = this.currentConnectionPoint.parent.getControlModel();
                const connectings = dropTarget.connectingPoints();
                if (this.currentConnectionPoint.getControlModel() === connector.startPoint()) {
                    connector.startPoint().connectingPoint(connectings[0]);
                }
                else {
                    connector.endPoint().connectingPoint(connectings[0]);
                }
            }
        }
    }
}
