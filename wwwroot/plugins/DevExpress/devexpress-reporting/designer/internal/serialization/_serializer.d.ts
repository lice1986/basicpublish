﻿/**
* DevExpress HTML/JS Reporting (designer\internal\serialization\_serializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, IModelSerializerOptions, IModelSerializerRef, ISerializableModel, ISerializationInfo, ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IReportSerializableModel } from '../../controls/utils/_IReportSerializableModel';
export declare class ReportModelSerializer extends ModelSerializer implements IModelSerializer {
    reportModel?: IReportSerializableModel;
    localizationJsonObj: any[];
    isLocalized: boolean;
    constructor(reportModel?: IReportSerializableModel, options?: IModelSerializerOptions);
    serialize(viewModel?: ISerializableModel, serializationsInfo?: ISerializationInfoArray, refs?: IModelSerializerRef): any;
    serializeProperty(modelPropertyInfo: ISerializationInfo, viewModel: ISerializableModel, serializationsInfo: ISerializationInfoArray, refs: IModelSerializerRef, result: any): void;
    deserialize(viewModel: IReportSerializableModel, model: any, serializationsInfo?: ISerializationInfoArray): void;
}
