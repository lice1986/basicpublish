﻿/**
* DevExpress Analytics (core\utils\controlsFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
import { ElementViewModel, IElementMetadata, IElementViewModel } from '../elements/elementViewModel';
export declare class ControlsFactory<T extends string = string> {
    getControlInfo(controlType: T): IElementMetadata;
    getControlType(model: any): string;
    createControl(model: any, parent: ElementViewModel, serializer?: IModelSerializer): IElementViewModel;
    controlsMap: {
        [key in T | string]?: IElementMetadata;
    };
    registerControl(typeName: T, metadata: IElementMetadata): void;
    _getPropertyInfoByDisplayName(info: ISerializationInfoArray, path: string[], position: number): ISerializationInfo;
    _getPropertyInfoByName(info: ISerializationInfoArray, path: string[], position: number): ISerializationInfo;
    _getPropertyInfo(info: ISerializationInfoArray, path: string[], position: number): ISerializationInfo;
    getPropertyInfo(controlType: T, path: any): ISerializationInfo;
}
