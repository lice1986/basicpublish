﻿/**
* DevExpress Analytics (diagram\dragDrop\connectingPointDragHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ISurfaceContext } from '../../core/elements/baseSurface';
import { SurfaceSelection, ISelectionTarget } from '../../core/selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { SnapLinesHelper } from '../../core/snapLines/_snapLinesHelper';
import { DragHelperContent } from '../../core/dragDrop/_dragHelperContent';
import { ConnectingPointSurface } from '../elements/connectingPointSurface';
import { ConnectorViewModel } from '../elements/connectors/connectorModel';
import { ConnectorSurface } from '../elements/connectors/connectorSurface';
export declare class ConnectingPointDragHandler extends DragDropHandler {
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent);
    startDrag(control: ISelectionTarget): void;
    drag(event: MouseEvent, uiElement: any): void;
    doStopDrag(): void;
    startConnectingPoint: ConnectingPointSurface;
    newConnector: ConnectorViewModel;
    get newConnectorSurface(): ConnectorSurface;
}
