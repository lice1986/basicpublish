﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_chart.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { IChartComponentWithText } from '../../internal/_localizableElementCollection';
import { DiagramViewModel } from '../_diagram';
import { AdditionalLegendViewModel } from './_additionalLegend';
import { DataContainerViewModel } from './_dataContainer';
import { LegendViewModel } from './_legend';
import { TitleViewModel } from './_title';
export declare class ChartViewModel extends SerializableModel implements IChartComponent {
    static from(model: object, serializer?: IModelSerializer): ChartViewModel;
    static toJson(value: ChartViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    private _patchView;
    private _patchSeries;
    _createDiagram(model: object, oldType: ko.Observable<string>, serializer: IModelSerializer): void;
    getChildComponents(): IChartComponentInfo[];
    constructor(model: object, serializer?: IModelSerializer);
    barDistance: ko.Observable<number>;
    barDistanceFixed: ko.Observable<number>;
    titles: ko.ObservableArray<TitleViewModel>;
    legends: ko.ObservableArray<AdditionalLegendViewModel>;
    legend: LegendViewModel;
    smallChartText: IChartComponentWithText;
    emptyChartText: IChartComponentWithText;
    dataContainer: DataContainerViewModel;
    diagram: ko.Observable<DiagramViewModel> | ko.Computed<DiagramViewModel>;
}
export declare const chartSerializationsInfo: ISerializationInfoArray;
export declare const chart: ISerializationInfo;