﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewEditingFieldsKeyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase, AccessibilityKeyboardHelperBase } from '@devexpress/analytics-core/analytics-internal-native';
import { EditingFieldBase } from '../editing/models/editingFieldBase';
import { PreviewPage } from '../internal/_page';
export declare class PreviewEditingFieldsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _page;
    controlElementClassName: string;
    accessibilityCompliantEnabled: boolean;
    constructor(_page: PreviewPage);
    initialize(): void;
    clickHandler(): void;
    itemHandleEnterKey(e: any, index: any): boolean;
    itemHandleSpaceKey(e: any, index: any): boolean;
    createControlElement(element: HTMLElement, index?: number): PreviewEditingFieldsElement;
}
declare class PreviewEditingFieldsElement extends AccessibilityControlElementBase {
    element: HTMLElement;
    private model;
    private _processFocus;
    dispose(): void;
    actionExecute(e: FocusEvent): void;
    private _isClick;
    private _activateHandler;
    private _blur;
    constructor(element: HTMLElement, model: EditingFieldBase);
}
export {};
