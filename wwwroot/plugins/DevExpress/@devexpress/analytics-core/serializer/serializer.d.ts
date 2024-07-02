﻿/**
* DevExpress Analytics (serializer\serializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializerOptions as IModelSerializerOptionsNative, NativeModelSerializer, IModelSerializer as IModelSerializerNative, IModelSerializerRef as IModelSerializerRefNative } from './native/serializer';
import { IModel } from './native/models/interfaces.model';
import { EngineType } from './native/models/base.model';
export interface IModelSerializer extends IModelSerializerNative {
}
export interface IModelSerializerRef extends IModelSerializerRefNative {
}
export interface IModelSerializerOptions extends IModelSerializerOptionsNative {
}
export declare class ModelSerializer extends NativeModelSerializer {
    engineType: EngineType;
    constructor(options?: IModelSerializerOptions);
    wrapPropertyArrayValue(value: unknown[]): unknown[];
    wrapPropertyValue(value: unknown): unknown;
    unwrapPropertyValue(value: unknown): unknown;
    setLinkProperty(viewModel: any, propertyName: string, newVal: any): any;
    getLinkProperty(viewModel: any, propertyName: string): any;
    generateProperty(model: IModel, propertyName: string, value: unknown): void;
    generateArrayProperty(model: IModel, propertyName: string, value: unknown[]): void;
}