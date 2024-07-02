﻿/**
* DevExpress Analytics (query-builder\dragDrop\_columnDragHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ColumnViewModel } from '../elements/columnModel';
import { QuerySurface } from '../elements/querySurface';
import { SurfaceSelection, ISelectionTarget } from '../../core/selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { SnapLinesHelper } from '../../core/snapLines/_snapLinesHelper';
import { DragHelperContent } from '../../core/dragDrop/_dragHelperContent';
import { RoutedConnectorSurface } from '../../diagram/elements/connectors/routedConnectorSurface';
export declare class ColumnDragHandler extends DragDropHandler {
    private querySurface;
    private undoEngine;
    private _dragColumn;
    private _dragConditionSurface;
    private _scrollProcessor;
    private _needToCreateRelation;
    constructor(querySurface: ko.Observable<QuerySurface>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent);
    startDrag(control: ISelectionTarget): void;
    setConnectorPoints(cursorPosition: {
        top: number;
        left: number;
    }): void;
    drag(event: MouseEvent, uiElement: any): void;
    doStopDrag(): void;
    dragDropConnector: ko.Observable<RoutedConnectorSurface>;
    getDragColumn(): ColumnViewModel;
}
