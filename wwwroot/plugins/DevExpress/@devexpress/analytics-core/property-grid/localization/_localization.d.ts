﻿/**
* DevExpress Analytics (property-grid\localization\_localization.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
export declare function loadMessages(_messages: {
    [key: string]: string;
}): void;
export declare function getLocalization(text: string, id?: string, _removeWinSymbols?: boolean): any;
export declare const removeWinSymbols = true;
export declare const Globalize: any;
export declare const messages: {};
export declare const custom_localization_values: {};
export declare function selectPlaceholder(): any;
export declare function noDataText(): any;
export declare function searchPlaceholder(): any;
export declare function resolveFromPromises<T>(promises: JQueryPromise<any>[], createModel: () => T): JQueryDeferred<T>;
export declare function isCustomizedWithUpdateLocalizationMethod(text: string): boolean;
export declare function localizeWithUpdateLocalizationMethod(oldText: string): string | boolean;
export declare function localize(val: string): any;
export declare function formatDate(val: any): string;
export declare function parseDate(val: any, useDefault?: boolean, format?: string): Date;
