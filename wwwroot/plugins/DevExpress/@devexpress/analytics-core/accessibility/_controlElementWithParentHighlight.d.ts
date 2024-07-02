﻿/**
* DevExpress Analytics (accessibility\_controlElementWithParentHighlight.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
export declare class ControlElementWithParentHighlight extends AccessibilityControlElementBase {
    element: HTMLElement;
    protected _parentElement: Element;
    protected _borderCssClassName: string[];
    dispose(): void;
    toolbarItemHandleFocus: () => void;
    toolbarItemHandleBlur: () => void;
    constructor(element: HTMLElement, _parentElement: Element);
}