﻿/**
* DevExpress Analytics (accessibility\_treeListKeyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListItemViewModel } from '../widgets/treelist/_treelistItem';
import { AccessibilityControlElementBase } from './_controlElementBase';
import { ListKeyboardHelper } from './_listKeyboardHelper';
export declare class TreeListKeyboardHelper extends ListKeyboardHelper {
    private _rootHolder;
    controlElementClassName: string;
    constructor(_rootHolder: {
        root: TreeListItemViewModel;
    });
    private _setFocusToParentNode;
    private _toggleCollapsed;
    private _toggleSelected;
    private _getItemModel;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    itemHandleLeftArrowKey(e: KeyboardEvent, index: number): boolean;
    itemHandleRightArrowKey(e: KeyboardEvent, index: number): boolean;
    itemHandleEnterKey(e: KeyboardEvent, index: number): boolean;
    itemHandleSpaceKey(e: KeyboardEvent, index: number): boolean;
    clickHandler(e: Event, index: number): void;
}