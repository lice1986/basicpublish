﻿/**
* DevExpress Analytics (core\internal\_ko_integration.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ComputedOptions, MultiPlatformObservable, MultiplatformEngine } from '../../serializer/native/multiplatformEngine';
import { IMutableOptions } from '../../serializer/native/models/base.model';
export declare class KoEngine extends MultiplatformEngine {
    private _notifyModel;
    addDisposeCallback(element: Node, disposeCallback: () => void): void;
    removeDisposeCallback(element: Node, disposeCallback: () => void): void;
    peek(value: any): any;
    getPropertyValue(model: any, propertyName: any): any;
    setPropertyValue(model: any, propertyName: any, value: any, currentValue?: any): void;
    generateProperty(model: any, propertyName: any, value: any, options?: IMutableOptions): void;
    generateArrayProperty(model: any, propertyName: any, value: any, options?: IMutableOptions): void;
    createComputedProperty(configurableModel: any, configurablePropertyName: any, comOptions: ComputedOptions<any>, properties: any, options?: IMutableOptions, pure?: boolean): () => void;
    subscribeOnPropertyChanged(model: any, subscribablePropertyName: any, callback: (newVal: any) => void): () => void;
    subscribeValue(value: any, callback: (newVal: any) => void): () => void;
    unwrap(value: any): any;
    wrap<T>(value: T): MultiPlatformObservable<T>;
    applyBindings(value: unknown, element: Element): void;
    cleanNode(element: Element): void;
}
export declare function useKoIntegration(): void;
