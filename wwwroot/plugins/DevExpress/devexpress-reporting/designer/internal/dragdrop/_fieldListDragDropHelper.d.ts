﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IElementViewModel, ISize, ISurfaceContext, Size } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ITreeListItemViewModel, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { DataBindingMode } from '../_dataBindingMode';
export declare class FieldListDragDropHelper {
    private _dataBindingMode;
    private _size?;
    constructor(_dataBindingMode: DataBindingMode, _size?: Size);
    private _createTable;
    private _getItemsFromList;
    private _getFirstLevelItems;
    createTableFromListSource(treeListItem: ITreeListItemViewModel, parent: XRReportElementViewModel): JQueryPromise<IElementViewModel>;
    createTableFromItems(treeListItems: TreeListItemViewModel[], parent: ElementViewModel): JQueryPromise<IElementViewModel>;
}
interface IMemberContolBase {
    size: (surface?: ISurfaceContext) => ISize;
    adjustDropTarget?: (dropTarget: ISelectionTarget) => ISelectionTarget;
}
interface IMemberContol extends IMemberContolBase {
    drop: (treeListItem: ITreeListItemViewModel, dropTargetControl: XRReportElementViewModel, dataBindingMode: DataBindingMode, size?: ISize) => XRReportElementViewModel;
}
interface IListMemberContol extends IMemberContolBase {
    drop: (treeListItem: ITreeListItemViewModel, dropTargetControl: XRReportElementViewModel, dataBindingMode: DataBindingMode, size?: ISize) => JQueryPromise<IElementViewModel>;
}
export declare const listMemberControlsMap: {
    [key: string]: IListMemberContol;
};
export declare const memberControlsMap: {
    [key: string]: IMemberContol;
};
export {};
