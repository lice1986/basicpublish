﻿/**
* DevExpress Analytics (widgets\ace\_binding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IAceEditor {
    require(module: string): any;
    edit(element: HTMLElement): any;
}
export declare function defineAce(ace: any): void;