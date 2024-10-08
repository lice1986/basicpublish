﻿/**
* DevExpress Analytics (serializer\native\serializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModel } from './models/interfaces.model';
import { ISerializableModel, ISerializationInfo, ISerializationInfoArray } from '../serializationInfo';
import { EngineType } from './models/base.model';
export interface IModelSerializerOptions {
    useRefs: boolean;
    serializeDate?: (date: Date) => string;
}
export interface IModelSerializer {
    deserialize(viewModel: ISerializableModel, model: any, serializationsInfo?: ISerializationInfoArray): void;
    serialize(viewModel: ISerializableModel, serializationsInfo?: ISerializationInfoArray, refs?: any): any;
    engineType: EngineType;
}
export interface IModelSerializerRef {
    linkObjTable: {
        setRef: (ref: number) => void;
        obj: any;
    }[];
    objects: any[];
}
export declare class NativeModelSerializer implements IModelSerializer {
    engineType: EngineType;
    private _options;
    private _refTable;
    createObjectByInfo(info: ISerializationInfoArray): ISerializableModel;
    private _linkTable;
    private linkObjects;
    wrapPropertyValue(value: unknown): unknown;
    wrapPropertyArrayValue(value: unknown[]): unknown[];
    unwrapPropertyValue(value: unknown): unknown;
    private _getModel;
    private _collectLinks;
    private _enumRefs;
    _collectLinksAndEnumRefs(model: any, internalModel?: any, propertyPath?: any[]): void;
    constructor(options?: IModelSerializerOptions);
    setLinks(refs: IModelSerializerRef): void;
    deserializeProperty(modelPropertyInfo: ISerializationInfo, model: any): any;
    deserializeDefaultValue(modelPropertyInfo: ISerializationInfo): any;
    deserializePropertyValue(modelPropertyInfo: ISerializationInfo, modelValue: any, strict?: boolean): any;
    setLinkProperty(viewModel: any, propertyName: string, newVal: any): any;
    getLinkProperty(viewModel: any, propertyName: string): any;
    setReferencedProperty(viewModel: ISerializableModel, model: any, refValue: string): void;
    generateProperty(model: IModel, propertyName: string, value: unknown): void;
    generateArrayProperty(model: IModel, propertyName: string, value: unknown[]): void;
    deserialize(viewModel: ISerializableModel, model: any, serializationsInfo?: ISerializationInfoArray): void;
    serialize(viewModel: ISerializableModel, serializationsInfo?: ISerializationInfoArray, refs?: IModelSerializerRef | null): any;
    private _isSerializableValue;
    protected serializeProperty(modelPropertyInfo: ISerializationInfo, viewModel: ISerializableModel, serializationsInfo: ISerializationInfoArray, refs: IModelSerializerRef, result: any): void;
    private _serialize;
}
