﻿/**
* DevExpress Analytics (core\elements\serializableModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { IModelSerializer } from '../../serializer/serializer';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class SerializableModel extends Disposable {
    preInitProperties(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray): void;
    constructor(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getInfo(): ISerializationInfoArray;
}
