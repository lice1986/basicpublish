﻿/**
* DevExpress Analytics (serializer\native\multiplatformEngine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IMutableOptions } from './models/base.model';
import { IModel } from './models/interfaces.model';
import { IModelSerializer, IModelSerializerOptions } from './serializer';
declare type SubscribableProperties<T, K extends keyof T = keyof T> = Array<K | ComplexSubscribableProperty<T[K] | string> | string> | '*';
declare type ComplexSubscribableProperty<T> = {
    propertyName: T;
    subscribables: SubscribableProperties<Unwrapped<T>>;
};
export declare type SubscribableProperty<T> = {
    model: T;
    properties: SubscribableProperties<T>;
};
export declare function subscribableProperty<T>(model: SubscribableProperty<T>['model'], properties: SubscribableProperty<T>['properties']): SubscribableProperty<T>;
export declare type ComputedOptions<T> = (() => T) | ({
    read: () => T;
    write: (val: T) => void;
});
export declare type MultiPlatformObservable<T> = T | ko.Observable<T>;
export declare type MultiPlatformComputed<T> = T | ko.Computed<T>;
export declare type Unwrapped<T> = T extends ko.Subscribable<infer R> ? R : T;
export declare class MultiplatformEngine {
    cleanNode(child: Element): void;
    addDisposeCallback(element: Node, disposeCallback: () => void): void;
    removeDisposeCallback(element: Node, disposeCallback: () => void): void;
    peek<T extends {}>(value: T): Unwrapped<T>;
    getPropertyValue<T extends IModel, Key extends keyof T>(model: T, propertyName: Key | string): T[Key];
    setPropertyValue<T extends IModel, Key extends keyof T>(model: T, propertyName: Key | string, value: Unwrapped<T[Key]>, currentValue?: T[Key]): void;
    generateProperty<T extends IModel, Key extends keyof T>(model: T, propertyName: Key, value: T[Key], options?: IMutableOptions): void;
    generateArrayProperty<T extends IModel, Key extends keyof T>(model: T, propertyName: Key, value: T[Key], options?: IMutableOptions): void;
    createComputedProperty<T extends IModel, Key extends keyof T>(configurableModel: T, configurablePropertyName: Key, comOptions: ComputedOptions<T[Key]>, properties: SubscribableProperty<any>[], options?: IMutableOptions, pure?: boolean): () => void;
    subscribeValue<T>(value: T, callback: (newVal: T) => void): () => void;
    subscribeOnPropertyChanged<T extends IModel, Key extends keyof T>(model: T, subscribablePropertyName: Key, callback: (newVal: T[Key]) => void, onDispose?: () => void): () => void;
    unwrap<T>(value: T): Unwrapped<T>;
    wrap<T>(value: T): MultiPlatformObservable<T>;
    applyBindings(value: unknown, element: Element): void;
}
export declare const nativeMultiPlatformEngine: MultiplatformEngine;
export declare const nativeModelSerializer: (options?: IModelSerializerOptions) => IModelSerializer;
export declare let currentModelSerializer: (options?: IModelSerializerOptions) => IModelSerializer;
export declare let currentMultiPlatformEngine: MultiplatformEngine;
export declare function setCurrentMultiplatfromEngine(engine: MultiplatformEngine): void;
export declare function setCurrentModelSerializer(serializerCallback: typeof currentModelSerializer): void;
export {};
