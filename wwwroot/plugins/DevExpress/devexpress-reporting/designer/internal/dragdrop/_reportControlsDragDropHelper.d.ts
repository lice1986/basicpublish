﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportControlsDragDropHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragHelperContent, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ObjectExplorerDragDropHelper } from './_objectExplorerDragDropHelper';
export declare class ReportControlsDragDropHelper extends ObjectExplorerDragDropHelper {
    private _dragHelperContent?;
    private _undoEngine?;
    private _isTargetContainer;
    private _serializer;
    private _tableControlTypes;
    private _restrictedTargets;
    private _canReorder;
    private _canInsertToTarget;
    private _targetIsClosestOfDraggable;
    private _canDrop;
    private _insertTableChildren;
    protected _shouldCheckAreas(): boolean;
    protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
    private _reorderBands;
    private _reorderTableControls;
    private _changeControlParent;
    constructor(_dragHelperContent?: DragHelperContent, _undoEngine?: UndoEngine);
    start(draggable: ITreeListItemViewModel): void;
    getSiblings(): ko.ObservableArray<any>;
    stop(): ISelectionTarget;
}
