﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportToolboxDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { DragHelperContent, ISelectionTarget, SnapLinesHelper, SurfaceSelection, ToolboxDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ControlType } from '../../controls/utils/_controlTypes';
import { ReportSurface } from '../../controls/xrReport';
import { IComponentAddedEventArgs } from '../../utils/inititalizer';
export declare class ReportToolboxDragDropHandler extends ToolboxDragDropHandler {
    _wholeWideControls: string[];
    dispose(): void;
    surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>;
    constructor(surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent, controlsFactory: ControlsFactory, onComponentAdded?: any);
    helper(draggable: any): void;
    private _processProperty;
    doStopDrag(ui: any, draggable: any): void;
    addControl(control: IElementViewModel, dropTargetSurface: ISelectionTarget<ControlType>, size: any): void;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
