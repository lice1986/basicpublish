﻿/**
* DevExpress Analytics (serializer\propertyChangedEvents.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare type SinglePropertyChangedEvents<T = any> = {
    [K in keyof T as `${string & K}Changed`]: PropertyChangedEventArgs<T> | ArrayPropertyChangedEventArgs<T>;
};
declare type AllPropertiesChangedEvents<T = any> = {
    propertyChanged: PropertyChangedEventArgs<T> | ArrayPropertyChangedEventArgs<T>;
};
export declare type PropertyChangedEvents<T = any> = AllPropertiesChangedEvents<T> & SinglePropertyChangedEvents<T>;
export declare type PropertyChangedEventArgs<T = any> = {
    propertyName: keyof T;
    oldValue: unknown;
    newValue: unknown;
};
export declare type ArrayPropertyChangedEventArgs<T = any> = PropertyChangedEventArgs<T> & {
    added: {
        item: unknown;
        index: number;
    }[];
    removed: {
        item: unknown;
        index: number;
    }[];
};
export {};
