﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_controller.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { DragDropHandler, DragHelperContent, ObjectStructureTreeListController, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ChartTreeListDragDropHelper } from './_chartTreeListDragDropHelper';
export declare class ChartStructureTreeListController extends ObjectStructureTreeListController {
    private surface?;
    private undoEngine?;
    private dragHelperContent?;
    constructor(propertyNames?: string[], listPropertyNames?: string[], selectCallback?: (value: TreeListItemViewModel) => void, surface?: SurfaceSelection, undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent?: DragHelperContent);
}
export declare class ChartDragDropHandler extends DragDropHandler {
    private undoEngine;
    dispose(): void;
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent: DragHelperContent);
    startDrag(draggable: ITreeListItemViewModel): void;
    drag(event: MouseEvent, ui: HTMLElement): void;
    doStopDrag(ui: Element, draggable: ITreeListItemViewModel, event: MouseEvent): void;
    dragDropHelper: ChartTreeListDragDropHelper;
}