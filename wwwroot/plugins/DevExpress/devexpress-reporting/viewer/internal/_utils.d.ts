﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
export declare function getCurrentResolution(zoom: any): number;
export declare function getImageBase64(url: any): JQuery.Promise<string, any, any>;
export declare function getEnumValues(enumType: any): string[];
export declare function safelyRunWindowOpen(url: string, target?: string): Window;
