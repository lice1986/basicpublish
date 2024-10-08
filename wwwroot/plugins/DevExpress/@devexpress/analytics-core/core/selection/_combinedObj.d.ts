﻿/**
* DevExpress Analytics (core\selection\_combinedObj.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { UndoEngine } from '../../undo-engine/undoengine';
import { ISelectionProvider } from './_selection';
export interface ICombinedProperty {
    result: any;
    subscriptions: ko.Subscription[];
}
export declare class CombinedObject {
    private static getInfo;
    private static isPropertyDisabled;
    private static getPath;
    private static isPropertyVisible;
    private static mergeProperty;
    static _createProperty(result: any, propertyName: any, propertyValue: any): void;
    static _merge(controls: any[], undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customMerge?: any, ignoreProperties?: any): {
        result: {};
        subscriptions: any[];
    };
    static mergeControls(controls: any[], undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customMerge?: any, ignoreProperties?: string[]): {
        result: any;
        subscriptions: any[];
    };
    static getEditableObject(selectionProvider: ISelectionProvider, undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customMerge?: any): ko.Observable | ko.Computed;
}
