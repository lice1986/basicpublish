﻿/**
* DevExpress Analytics (serializer\disposable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
declare type DisposeFunctionType = () => void;
export declare type DisposableType = ko.Subscription | ko.ComputedFunctions | IDisposable;
export interface IDisposable {
    dispose: () => void;
    _disposables?: Array<DisposableType>;
}
export declare class Disposable implements IDisposable {
    _disposables: Array<DisposableType>;
    isDisposing: boolean;
    constructor();
    disposeObservableArray(array: ko.ObservableArray<IDisposable>): void;
    resetObservableArray(array: ko.ObservableArray<any>): void;
    disposeArray(array: IDisposable[]): void;
    addDisposable(...disposables: Array<DisposableType | DisposeFunctionType>): void;
    dispose(): void;
    removeProperties(): void;
}
export {};
