﻿/**
* DevExpress Analytics (accessibility\_rightPanelKeyboardHelperNative.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TabPanel } from '../core/widgets/tabPanel';
import { AccessibilityControlElementBase } from './_controlElementBase';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export declare class RightPanelKeyboardHelperNative extends AccessibilityKeyboardHelperBase {
    private _tabPanel;
    controlElementClassName: string;
    private _initTimeout;
    constructor(_tabPanel: TabPanel);
    _initialize(): void;
    bindHandler(el: any): void;
    initialize(): void;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
}
