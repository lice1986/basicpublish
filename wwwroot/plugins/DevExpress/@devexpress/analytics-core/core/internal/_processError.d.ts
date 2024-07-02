﻿/**
* DevExpress Analytics (core\internal\_processError.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisposable } from '../../serializer/disposable';
export declare const _addErrorPrefix = true;
export declare function _processError(errorThrown: string, deferred: JQueryDeferred<any>, jqXHR: any, textStatus: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void): void;
export declare const _errorProcessor: {
    handlers: any[];
    call: (e: any) => void;
};
export declare function processErrorEvent(func: any): IDisposable;