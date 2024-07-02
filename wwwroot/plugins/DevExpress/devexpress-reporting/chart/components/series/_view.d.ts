﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_view.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { TitleViewModel } from '../models/_title';
import { FillStyle } from './_fillStyle';
import { Indicator } from './_indicator';
export declare class SeriesViewViewModel extends SerializableModel implements IChartComponent {
    static from(model: object, serializer?: IModelSerializer): ko.Observable<SeriesViewViewModel>;
    dispose(): void;
    static toJson(value: ko.Observable<SeriesViewViewModel>, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    _getInfo(typeName: string): ISerializationInfoArray;
    private _createPropertyDisabledDependence;
    private _createMarkerDependences;
    private _createLinkOptionsDependences;
    preInitProperties(model: object): void;
    getChildComponents(): IChartComponentInfo[];
    constructor(model: object, serializer?: IModelSerializer);
    axisXName: ko.Observable<string> | ko.Computed<string>;
    axisYName: ko.Observable<string> | ko.Computed<string>;
    paneName: ko.Observable<string> | ko.Computed<string>;
    fillStyle: FillStyle;
    indicators: ko.ObservableArray<Indicator>;
    titles: ko.ObservableArray<TitleViewModel>;
    barWidth: ko.Observable<number> | ko.Computed<number>;
    typeName: string;
}
export declare const view: ISerializationInfo;
