﻿/**
* DevExpress Analytics (query-builder\wizard\stateManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageFactory } from './pageFactory';
export declare class StateManager {
    private globalState;
    private pageFactory;
    private defaultState;
    private _getPageState;
    constructor(globalState: any, pageFactory: PageFactory);
    setPageState(pageId: string, data: any): void;
    getPageState(pageId: string): any;
    resetPageState(pageId: string): void;
    getCurrentState(): any;
    reset(): void;
}
