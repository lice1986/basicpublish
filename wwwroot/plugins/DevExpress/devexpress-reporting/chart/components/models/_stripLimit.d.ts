﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_stripLimit.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent } from '../../../common/utils/_chartUtils';
export declare class StripLimitViewModel extends SerializableModel implements IChartComponent {
    static from(model: object, serializer?: IModelSerializer): StripLimitViewModel;
    static toJson(value: StripLimitViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    constructor(model: object, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getExpressionProperties(): string[];
    enabled: ko.Observable<boolean>;
    axisValue: ko.Observable<string>;
    _axisValue: ko.Observable<string>;
}
export declare const stripLimitSerializationsInfo: ISerializationInfoArray;
export declare const stripMinLimitInfo: ISerializationInfo, stripMaxLimitInfo: ISerializationInfo;
