﻿/**
* DevExpress Analytics (core\tools\toolbox.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IToolboxItemInfo {
    '@ControlType': string;
    index: number;
    canDrop?: any;
    group?: string;
    displayName?: string;
}
export declare class ToolboxItem {
    constructor(info: IToolboxItemInfo);
    disabled: ko.Observable<boolean>;
    info: IToolboxItemInfo;
    get type(): string;
    get imageClassName(): string;
    get imageTemplateName(): string;
    get index(): number;
    get displayName(): string;
}
