﻿/**
* DevExpress Analytics (core\internal\_controlsHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable, Disposable } from '../../serializer/disposable';
export interface IDisplayedObject {
    name: ko.Observable<string> | ko.Computed<string>;
}
export interface IDesignControlsHelper extends IDisposable {
    getControls: (target: any) => ko.ObservableArray<IDisplayedObject>;
    allControls: ko.ObservableArray<IDisplayedObject>;
    getNameProperty?: (model: any) => ko.Observable<string> | ko.Computed<string>;
    getControlByName: (name: string) => IDisplayedObject;
}
export declare class DesignControlsHelper extends Disposable implements IDesignControlsHelper {
    protected target: any;
    private collectionNames?;
    private _handlers;
    private _setText;
    private _visitedCollections;
    private _subscriptions;
    getNameProperty(model: any): any;
    getControlByName(name: string): any;
    protected _setName(value: any): void;
    protected _setDefaultText(value: any): void;
    protected _getNamePrefix(value: any): string;
    dispose(): void;
    private added;
    private deleted;
    processCollection(collection: any): void;
    _collectControls(target: any): void;
    constructor(target: any, handlers?: Array<{
        added: (control: any) => void;
        deleted?: (control: any) => void;
    }>, collectionNames?: string[]);
    getControls(target: any): ko.ObservableArray<IDisplayedObject>;
    allControls: ko.ObservableArray<IDisplayedObject>;
}