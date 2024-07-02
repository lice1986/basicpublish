﻿/**
* DevExpress Analytics (serializer\native\deserializationEngine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '../propertyChangedEvents';
import { IMutableOptions } from './models/base.model';
import { IModel } from './models/interfaces.model';
export interface IPropertyDeserializationEngine {
    generateProperty: (model: IModel, propertyName: string, value: unknown, options?: IMutableOptions) => void;
    generateArrayProperty: (model: IModel, propertyName: string, value: Array<unknown>) => void;
}
export declare function notifyPropertyChanged(model: IModel, args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
export declare const arrayModificationMapper: {
    push: (array: unknown[], callback: any) => void;
    splice: (array: any[], callback: any) => void;
    pop: (array: any[], callback: any) => void;
};
export declare class PropertyDeserializationEngine implements IPropertyDeserializationEngine {
    _defineProperty(model: IModel, propertyName: string, createCurrentValue: () => unknown, onValueChanged?: (newVal: any) => void, options?: IMutableOptions): void;
    generateArrayProperty(model: IModel, propertyName: string, value: Array<unknown>, options?: IMutableOptions): void;
    generateProperty(model: IModel, propertyName: string, value: unknown, options?: IMutableOptions): void;
}
export declare const defaultPropertyDeserializatonEngine: PropertyDeserializationEngine;