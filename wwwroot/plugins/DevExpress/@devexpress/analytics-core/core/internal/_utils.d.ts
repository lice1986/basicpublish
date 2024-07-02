﻿/**
* DevExpress Analytics (core\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementMetadata } from '../elements/elementViewModel';
import { ToolboxItem } from '../tools/toolbox';
export declare function getToolboxItems(controlsMap: {
    [key: string]: IElementMetadata;
}, defaultGroup?: string): ToolboxItem[];
export declare function blur(element: Element): void;