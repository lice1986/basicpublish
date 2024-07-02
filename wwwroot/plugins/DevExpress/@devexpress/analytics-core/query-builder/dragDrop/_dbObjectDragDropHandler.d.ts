﻿/**
* DevExpress Analytics (query-builder\dragDrop\_dbObjectDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { QuerySurface } from '../elements/querySurface';
import { QueryViewModelBase } from '../elements/queryModel';
import { TableViewModel } from '../elements/tableModel';
import { UndoEngine } from '../../undo-engine/undoengine';
import { SurfaceSelection } from '../../core/selection/_selection';
import { SnapLinesHelper } from '../../core/snapLines/_snapLinesHelper';
import { DragHelperContent } from '../../core/dragDrop/_dragHelperContent';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
export declare class DbObjectDragDropHandler extends DragDropHandler {
    private _undoEngine;
    private _querySurface;
    protected _query: () => QueryViewModelBase;
    protected suggestLocation(newControl: TableViewModel, query: QueryViewModelBase): void;
    getDropCallback: (undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, suggestLocation: boolean) => (item: TreeListItemViewModel, query: QueryViewModelBase) => TableViewModel;
    constructor(surface: ko.Observable<QuerySurface>, selection: SurfaceSelection, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent);
    startDrag(draggable: any): void;
    doStopDrag(uiElement: any, _: any): void;
    addControl(control: any, dropTargetSurface: any, size: any): void;
}
