﻿/**
* DevExpress Analytics (accessibility\_accordionKeyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICollapsedViewModel, IEditorViewModel } from '../property-grid/widgets/editor';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export declare class AccordionKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _editorViewModelsAccessor;
    private _onToggleCollapsed;
    controlElementClassName: string;
    constructor(_editorViewModelsAccessor: () => ICollapsedViewModel, _onToggleCollapsed?: () => void);
    private _collapseItem;
    itemHandleEnterKey(e: any, index?: any): boolean;
    itemHandleSpaceKey(e: any, index?: any): boolean;
    clickHandler(e: any, index: any): void;
}
export declare class PropertyGridKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _editorsViewModelsAccessor;
    controlElementClassName: string;
    focusFirstFocusableDescendant: boolean;
    private _complexEditorMap;
    private _triggersParentToChildMap;
    constructor(_editorsViewModelsAccessor: () => IEditorViewModel[]);
    private _getElementsCount;
    private _defferedInit;
    private _getComplexEditors;
    private _getComplexEditorsHierarchy;
    private _filterPredicate;
    initialize(): void;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
}
