﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parameterLayoutDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { GroupLayoutItem, ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { ObjectExplorerDragDropHandler } from '../dragdrop/_objectExplorerDragDropHandler';
import { ObjectExplorerDragDropHelper } from '../dragdrop/_objectExplorerDragDropHelper';
declare class ParameterLayoutDragDropHelper extends ObjectExplorerDragDropHelper {
    private _selectedItem;
    private _dropBefore;
    private _dropInside;
    protected _targetModel: ParameterPanelLayoutItem;
    protected _draggableModel: ParameterPanelLayoutItem;
    constructor(_selectedItem: ko.Observable<ParameterPanelLayoutItem>, dragHelperContent: any);
    protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
    getSiblings(): ko.ObservableArray<ParameterPanelLayoutItem>;
    getNewParentModel(): import("../../controls/xrReport").ReportViewModel | GroupLayoutItem;
    getTargetSiblings(): ko.ObservableArray<ParameterPanelLayoutItem>;
    reorderSiblings(isDragToBottom?: boolean): void;
    canDrop(): boolean;
    stop(): Promise<TreeListItemViewModel>;
}
export declare class ParameterLayoutDragDropHandler extends ObjectExplorerDragDropHandler {
    constructor(selectedItem: ko.Observable<ParameterPanelLayoutItem>);
    startDrag(draggable: any): void;
    doStopDrag(ui: any, draggable: any, event: JQueryEventObject): void;
    reportControlsDragDropHelper: ParameterLayoutDragDropHelper;
}
export {};
