﻿/**
* DevExpress Analytics (serializer\native\models\base.model.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EventPropertyManager } from '../../eventManager';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs, PropertyChangedEvents } from '../../propertyChangedEvents';
import { ISerializableModel } from '../../serializationInfo';
import { Disposable } from '../../disposable';
import { ComputedOptions, SubscribableProperty, Unwrapped, MultiplatformEngine } from '../multiplatformEngine';
import { IModelSerializer } from '../serializer';
import { IModel, IRenderingModel, IViewModel } from './interfaces.model';
export interface IMutableOptions {
    rateLimit?: {
        timeout?: number;
        method?: string;
    };
    deferred?: boolean;
    notify?: 'always' | never;
}
export declare abstract class BaseModel extends Disposable implements ISerializableModel, IModel {
    deferredUpdateViewModel(): boolean;
    assignProperty<K extends keyof this = keyof this>(propertyName: K, value: this[K], options?: IMutableOptions): void;
    assignArrayProperty<K extends keyof this = keyof this>(propertyName: K, value: this[K], options?: IMutableOptions): void;
    deserialize(model: object, serializer: IModelSerializer): void;
    dispose(): void;
    _needInitializeModel(): boolean;
    _initializeModel(model: object, serializer: IModelSerializer): void;
    constructor(model?: object, serializer?: IModelSerializer);
    events: EventPropertyManager<this>;
    _model?: any;
    __decorators?: Array<(model: this) => void>;
    abstract onPropertyChanged(args: PropertyChangedEvents['propertyChanged']): void;
}
export declare function mutable(defaultVal?: (() => any) | any, options?: IMutableOptions): (target: BaseModel, propertyKey: string) => any;
export declare function mutableArray(defaultVal?: () => any[], options?: IMutableOptions): (target: BaseModel, propertyKey: string) => any;
export declare class BaseEmptyModel extends BaseModel {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
}
export declare class BaseRenderingModel<TViewModel extends IViewModel> extends BaseModel implements IRenderingModel, ISerializableModel {
    __viewModel: TViewModel | undefined;
    getViewModel(): TViewModel;
    onPropertyChanged(args: PropertyChangedEvents['propertyChanged']): void;
    initializeViewModel(): void;
    updateViewModel(args: PropertyChangedEvents['propertyChanged']): void;
    setProperty(propertyName: string, value: unknown): void;
    getProperty(propertyName: string): unknown;
    createViewModel(): TViewModel;
}
declare type GetType = 'unwrap' | 'peek' | 'wrapped';
declare type GetFunctionReturnType<Model, K extends keyof Model, Type extends GetType> = Type extends 'unwrap' | 'peek' ? Unwrapped<Model[K]> : Model[K];
export declare type EngineType = 'multiplatform' | 'native';
export declare class BaseRenderingMultiplatformModel<TViewModel extends IViewModel> extends BaseRenderingModel<TViewModel> {
    _engineType: EngineType;
    constructor(model?: object, serializer?: IModelSerializer, _engineType?: EngineType);
    private _propertiesSubscriptions;
    _needInitializeModel(): boolean;
    _getEngine(): MultiplatformEngine;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    subscribeOnChanges<T>(viewModel: IViewModel, propertyNames: Array<keyof T>): void;
    _get<K extends keyof this, Type extends GetType = 'unwrap'>(propertyName: K | string, unwrap?: GetType): GetFunctionReturnType<this, K, Type>;
    _set<K extends keyof this>(propertyName: K | string, value: Unwrapped<this[K]> | any): void;
    assignProperty<K extends keyof this>(propertyName: K, value: this[K], options?: IMutableOptions): void;
    assignArrayProperty<K extends keyof this>(propertyName: K, value: this[K], options?: IMutableOptions): void;
    createComputedProperty<K extends keyof this>(propertyName: K, computedOptions: ComputedOptions<this[K]>, properties: SubscribableProperty<any>[], options?: IMutableOptions, pure?: boolean): () => void;
    subscribeProperty<K extends keyof this>(propertyName: K, callback: (newVal: this[K]) => void, onDispose?: () => void): () => void;
    unwrap<T>(value: T): Unwrapped<T>;
    peek<T>(value: T): Unwrapped<T>;
    destroyPropertySubscription(propertyName: string): void;
    dispose(): void;
}
export {};
