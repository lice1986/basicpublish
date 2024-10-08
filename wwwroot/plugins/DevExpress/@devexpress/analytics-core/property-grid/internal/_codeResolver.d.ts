﻿/**
* DevExpress Analytics (property-grid\internal\_codeResolver.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
export interface ICodeResolverTask {
    $promise: JQueryPromise<any>;
    dispose: () => void;
    doNext: () => void;
    force: () => void;
}
export declare class CodeResolver {
    private _queue;
    private _queueObj;
    private _done;
    private _doneOnce;
    clear(): void;
    done(callback: any): void;
    doneOnce(callback: any): void;
    private _executeNext;
    execute(func: any, time?: number): ICodeResolverTask;
}
export declare const globalResolver: CodeResolver;
