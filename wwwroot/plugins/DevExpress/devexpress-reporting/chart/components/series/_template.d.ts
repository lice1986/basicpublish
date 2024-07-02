﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_template.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { SeriesLabelViewModel } from './_label';
import { DateTimeSummaryOptionsModel, NumericSummaryOptionsModel, QualitativeSummaryOptionsModel } from './_summaryOptions';
import { SeriesViewViewModel } from './_view';
export interface IViewBindableProperty {
    model: ko.Observable<any>;
    type: ko.Observable<string> | ko.Computed<string>;
}
export declare enum ScaleType {
    Qualitative = 0,
    Numerical = 1,
    DateTime = 2,
    Auto = 3
}
export declare const ScaleTypeMap: {
    [key: string]: ScaleType;
};
export declare class SeriesTemplateViewModel extends SerializableModel implements IChartComponent {
    static dataMemberProperies: string[];
    static from(model: object, serializer?: IModelSerializer): SeriesTemplateViewModel;
    static toJson(value: SeriesTemplateViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    updateByView(view: SeriesViewViewModel): void;
    preInitProperties(model: object): void;
    getChildComponents(): IChartComponentInfo[];
    getExpressionProperties(): string[];
    _isOnlyNumericArgumentScaleTypeSupported(): boolean;
    private _getCurrentSeriesPointsSortingKeys;
    private _adjustArgumentScaleType;
    private _updateSeriesPointsSortingKey;
    _isDataMemberPropertyDisabled(name: string): boolean;
    _isPropertyDisabled(name: string): boolean;
    getPath(propertyName: string): string;
    constructor(model: object, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    isPropertyVisible(propertyName: string): boolean;
    viewBindable: IViewBindableProperty;
    viewType: ko.Observable<string> | ko.Computed<string>;
    view: ko.Observable<SeriesViewViewModel>;
    label: SeriesLabelViewModel;
    legendTextPattern: ko.Observable<string>;
    dataSource: ko.Observable<any>;
    argumentDataMember: ko.Observable<string> | ko.Computed<string>;
    argumentScaleType: ko.Observable<string> | ko.Computed<string>;
    valueScaleType: ko.Observable<string> | ko.Computed<string>;
    valueDataMembers: any;
    filterString: any;
    _filterString: any;
    qualitativeSummaryOptions: QualitativeSummaryOptionsModel;
    numericSummaryOptions: NumericSummaryOptionsModel;
    dateTimeSummaryOptions: DateTimeSummaryOptionsModel;
    _actualArgumentScaleType: ko.Observable<ScaleType>;
}
export declare const seriesPointsSorting: ISerializationInfo, seriesPointsSortingKey: ISerializationInfo, legendTextPattern: ISerializationInfo, _argumentScaleTypeValidatorOptions: {
    _seriesViewModel: any;
    onInitialized: ({ model }: {
        model: any;
    }) => void;
    validationRules: {
        type: string;
        reevaluate: boolean;
        validationCallback: (params: {
            value;
            rule;
        }) => boolean;
    }[];
}, argumentScaleType: ISerializationInfo, valueScaleType: ISerializationInfo, labelsVisibility: ISerializationInfo, argumentDataMember: ISerializationInfo, valueDataMembersSerializable: ISerializationInfo;
export declare const seriesTemplateSerializationsInfo: ISerializationInfoArray;
export declare const seriesTemplate: ISerializationInfo;