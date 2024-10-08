﻿/**
* DevExpress Analytics (core\utils\_utils.ajax.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
export declare function setAjax(newFunc: any): void;
export interface IAjaxSettings {
    uri: string;
    action: string;
    arg: any;
    processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void;
    ignoreError?: () => boolean;
    customOptions?: any;
    isError?: (data: any) => boolean;
    getErrorMessage?: (jqXHR: any) => string;
    method?: 'POST' | 'GET';
}
export declare function _ajax(uri: any, action: any, arg: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void, ignoreError?: () => boolean, customOptions?: any, isError?: (data: any) => boolean, getErrorMessage?: (deferredResult: any) => string, method?: string): JQuery.Promise<any, any, any>;
export declare function _ajaxWithOptions(options: IAjaxSettings): JQuery.Promise<any, any, any>;
export declare function encodeURIExtended(str: string): string;
export declare let sendRequest: (...params: (IAjaxSettings | any)[]) => any;
