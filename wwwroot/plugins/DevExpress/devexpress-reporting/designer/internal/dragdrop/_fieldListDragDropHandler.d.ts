﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { DragDropHandler, DragHelperContent, IDataSourceInfo, ISelectionTarget, SnapLinesHelper, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ReportSurface } from '../../controls/xrReport';
import { IComponentAddedEventArgs } from '../../utils/inititalizer';
import { DataBindingMode } from '../_dataBindingMode';
export declare class FieldListDragDropHandler extends DragDropHandler {
    private _canAddItems;
    private _undoEngine;
    private _dataSources;
    private _getKey;
    private _isIcon;
    private _setDragHelperContent;
    private _getDropTarget;
    private _needToChangeHelperContent;
    private _updateInnerControlSize;
    private _addControl;
    private _isDefaultBindingAssigned;
    canDrop(dropTarget: ISelectionTarget, controlModel: ElementViewModel, metaData: object): boolean;
    constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>, selection: SurfaceSelection, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent, _dataSources: ko.ObservableArray<IDataSourceInfo>, onComponentAdded?: (e: IComponentAddedEventArgs) => void);
    drag(event: MouseEvent, ui: HTMLElement, draggable: ITreeListItemViewModel): void;
    doStopDrag(uiElement: HTMLElement, draggable: ITreeListItemViewModel, event: MouseEvent): void;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
    dataBindingMode: ko.Computed<DataBindingMode>;
}
