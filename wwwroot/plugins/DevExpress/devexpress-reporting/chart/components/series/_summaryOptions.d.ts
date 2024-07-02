﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_summaryOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { SummaryFunctionModel } from '../../widgets/_summaryFunctionEditor';
export declare class SummaryOptionsModelBase implements ISerializableModel {
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    resetAllProperties(): void;
    summaryFunction: SummaryFunctionModel;
}
export declare class QualitativeSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model: any, serializer?: IModelSerializer): QualitativeSummaryOptionsModel;
    static toJson(value: QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare class NumericSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model: any, serializer?: IModelSerializer): NumericSummaryOptionsModel;
    static toJson(value: QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DateTimeSummaryOptionsModel extends SummaryOptionsModelBase {
    static from(model: any, serializer?: IModelSerializer): DateTimeSummaryOptionsModel;
    static toJson(value: QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
