﻿/**
* DevExpress Analytics (diagram\dragDrop\connectingPointDragHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ConnectingPointSurface } from '../elements/connectingPointSurface';
import { ConnectingPointViewModel } from '../elements/connectingPointModel';
import { findSurface } from '../../core/internal/_surfaceHelpers';
import { DiagramElementViewModel } from '../elements/diagramElementViewModel';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../../core/internal/_utils.unitsConvertation';
export class ConnectingPointDragHandler extends DragDropHandler {
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent);
        this.startConnectingPoint = null;
        this.newConnector = null;
        this.cursor = 'arrow';
        this.containment = '.dxrd-ghost-container';
        this['helper'] = (draggable) => {
            dragHelperContent.update(draggable);
        };
    }
    startDrag(control) {
        if (!(control instanceof ConnectingPointSurface)) {
            throw new Error('ConnectingPointDragHandler can be applied to the ConnectingPoint only.');
        }
        this.startConnectingPoint = control;
        const diagramElement = this.startConnectingPoint.parent.getControlModel();
        this.newConnector = diagramElement.parentModel().createChild({ '@ControlType': 'RoutedConnector' });
        this.newConnector.startPoint().connectingPoint(this.startConnectingPoint.getControlModel());
    }
    drag(event, uiElement) {
        uiElement.dataset.leftPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.leftPosition) + uiElement['scroll'].left);
        uiElement.dataset.topPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.topPosition) + uiElement['scroll'].top);
        const position = this._getAbsoluteSurfacePosition(uiElement);
        this.newConnectorSurface.endPoint().rect({ top: position.top, left: position.left });
    }
    doStopDrag() {
        this.dragHelperContent.reset();
        if (this.selection.dropTarget) {
            const dropTarget = this.selection.dropTarget.getControlModel();
            if (dropTarget instanceof ConnectingPointViewModel) {
                this.newConnector.endPoint().connectingPoint(dropTarget);
            }
            else if (dropTarget instanceof DiagramElementViewModel) {
                const connectings = dropTarget.connectingPoints();
                this.newConnector.endPoint().connectingPoint(connectings[0]);
            }
            this.selection.initialize(this.newConnectorSurface);
        }
    }
    get newConnectorSurface() {
        return this.newConnector && findSurface(this.newConnector);
    }
}
