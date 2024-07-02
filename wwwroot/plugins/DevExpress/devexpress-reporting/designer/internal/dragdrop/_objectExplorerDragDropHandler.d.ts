﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_objectExplorerDragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { DragDropHandler, DragHelperContent, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ObjectExplorerDragDropHelper } from './_objectExplorerDragDropHelper';
export declare class ObjectExplorerDragDropHandler extends DragDropHandler {
    private _canAddItems;
    protected undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
    protected _lastList: TreeListItemViewModel;
    protected _timeout: any;
    constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent: DragHelperContent);
    drag(event: MouseEvent | JQueryEventObject, ui: HTMLElement): void;
    reportControlsDragDropHelper: ObjectExplorerDragDropHelper;
}
