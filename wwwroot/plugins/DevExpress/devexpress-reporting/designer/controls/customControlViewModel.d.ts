﻿/**
* DevExpress HTML/JS Reporting (designer\controls\customControlViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class CustomControlSerializableModel extends SerializableModel {
    static from(model: any, serializer: IModelSerializer, info: ISerializationInfoArray): CustomControlSerializableModel;
    static toJson(value: SerializableModel, serializer: IModelSerializer, refs: IModelSerializerRef): any;
}
