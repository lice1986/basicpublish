﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportExplorerDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { DragHelperContent, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ObjectExplorerDragDropHandler } from './_objectExplorerDragDropHandler';
import { ReportControlsDragDropHelper } from './_reportControlsDragDropHelper';
export declare class ReportExplorerDragDropHandler extends ObjectExplorerDragDropHandler {
    private _isStyle;
    private _isFormatingRule;
    private _isReportControl;
    dispose(): void;
    constructor(canAddItems: ko.Computed<boolean>, surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent: DragHelperContent);
    startDrag(draggable: ITreeListItemViewModel): void;
    doStopDrag(uiElement: HTMLElement, draggable: ITreeListItemViewModel, event: MouseEvent | JQueryEventObject): void;
    reportControlsDragDropHelper: ReportControlsDragDropHelper;
}
