﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataContainer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { SeriesViewModel } from '../series/_series';
import { SeriesTemplateViewModel } from '../series/_template';
export declare class DataContainerViewModel extends SerializableModel implements IChartComponent {
    static from(model: object, serializer?: IModelSerializer): DataContainerViewModel;
    static toJson(value: DataContainerViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    getChildComponents(): IChartComponentInfo[];
    constructor(model: object, serializer?: IModelSerializer);
    seriesTemplate: SeriesTemplateViewModel;
    series: ko.ObservableArray<SeriesViewModel>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    pivotGridDataSourceOptions: {
        autoBindingSettingsEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
    };
}
export declare const dataContainerSerializationsInfo: ISerializationInfoArray;
export declare const dataContainer: ISerializationInfo;