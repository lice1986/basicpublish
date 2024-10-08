﻿/**
* DevExpress Analytics (core\dragDrop\_toolboxDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from './_dragDropHandler';
import { ControlsFactory } from '../utils/controlsFactory';
import { ISurfaceContext } from '../elements/baseSurface';
import { SurfaceSelection } from '../selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { DragHelperContent } from './_dragHelperContent';
export declare class ToolboxDragDropHandler extends DragDropHandler {
    private _controlsFactory;
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent, controlsFactory: ControlsFactory);
    helper(draggable: any): void;
    doStopDrag(uiElement: any, draggableModel: any): void;
}
