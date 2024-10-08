﻿/**
* DevExpress Analytics (accessibility\_controlElementBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../serializer/disposable';
export declare class AccessibilityControlElementBase extends Disposable {
    element: HTMLElement;
    private _eventListeners;
    dispose(): void;
    constructor(element: HTMLElement);
    addListener(element: HTMLElement, eventType: string, handler: any): void;
    setTabIndex(index: string): void;
    setFocus(): void;
}
