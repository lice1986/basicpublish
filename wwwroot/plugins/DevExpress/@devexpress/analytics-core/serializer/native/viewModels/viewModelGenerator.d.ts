﻿/**
* DevExpress Analytics (serializer\native\viewModels\viewModelGenerator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EventManager } from '../../eventManager';
import { IModel } from '../models/interfaces.model';
export declare const ViewModelChangedEvent = "viewModelChanged";
declare type ViewModelChangedEventArgs = {
    propertyName: string | number;
    oldValue: any;
    newValue: any;
};
declare type ViewModelEvents = {
    'viewModelChanged': ViewModelChangedEventArgs;
};
export declare type EventManagerHolder<T> = T & {
    _viewModelEvents: EventManager<T, ViewModelEvents>;
};
export declare type ViewModelGenerator<T> = {
    createDefaultModel(model: IModel): ViewModelGenerator<T>;
    generateProperty<K extends keyof T>(propertyName: K, value?: T[K], suppressViewModelNotification?: boolean): ViewModelGenerator<T>;
    configureProperty<K extends keyof T>(propertyName: K, configure: (property: T[K]) => void): ViewModelGenerator<T>;
    getViewModel(): T;
};
export declare type ValueStorageFactory = (initialValue: any) => {
    getValue: () => any;
    setValue: (value: any) => void;
    explicitNotifySubscribers: () => void;
};
export declare const viewModelGeneratorSettings: {
    customValueStorageFactory: ValueStorageFactory;
    ensureChangesImmutable: boolean;
    addTestFlag: boolean;
};
export declare const createViewModelGenerator: <T>(_viewModel?: Partial<T>) => ViewModelGenerator<T>;
export {};
