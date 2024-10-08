﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_legend.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { IChartComponentWithText } from '../../internal/_localizableElementCollection';
export declare class LegendViewModel extends SerializableModel {
    static from(model: object, serializer?: IModelSerializer): LegendViewModel;
    static toJson(value: LegendViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    constructor(model: object, serializer?: IModelSerializer);
    title: IChartComponentWithText;
}
export declare const legend: ISerializationInfo;
