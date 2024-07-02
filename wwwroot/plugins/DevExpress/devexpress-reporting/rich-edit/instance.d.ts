﻿/**
* DevExpress HTML/JS Reporting (rich-edit\instance.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as richEditInstanceImported from 'devexpress-richedit';
export declare const getRichEditInstance: () => typeof richEditInstanceImported;
export declare function setRichEditInstance(instance: any): void;
export declare const createRichEdit: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<(element: any, options: any) => richEditInstanceImported.RichEdit>;
export declare const createRichEditOptions: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<() => richEditInstanceImported.Options>;