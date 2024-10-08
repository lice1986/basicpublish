﻿/**
* DevExpress Analytics (serializer\_internal.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function _defineProperty(legacyObject: any, realObject: any, propertyName: any, newPropertyName?: any): void;
export declare function _definePropertyByString(rootObject: any, ...objectPathes: string[]): void;
export declare function addDisposeCallback(element: Node, callback: () => any): void;
export interface IGlobalSubscribableValue<T> {
    (newVal?: T): T;
    subscribe: (callback: (newVal: T) => void) => () => void;
    notifySubscribers: (newVal: T) => void;
}
export declare function createGlobalModuleVariableFunc<T>(defaultVal: T, onValueChanged?: (value: T) => void): IGlobalSubscribableValue<T>;
