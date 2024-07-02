﻿/**
* DevExpress HTML/JS Reporting (chart\_control.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISize } from '@devexpress/analytics-core/analytics-elements';
import { FieldListProvider, IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory, Disposable, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartViewModel } from './components/models/_chart';
import { IChartControlCallbacks } from './_IChartControlCallbacks';
export interface IChartControlOptions {
    chartSource?: any;
    chart?: ChartViewModel;
    dataSource: ko.Observable<IDataSourceInfo> | ko.Computed<IDataSourceInfo>;
    size?: ISize;
    disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
    callbacks?: IChartControlCallbacks;
    parameters?: ko.ObservableArray;
}
export declare class ChartControlViewModel extends Disposable {
    getInfo(): ISerializationInfoArray;
    getControlFactory(): ControlsFactory;
    isSeriesPropertyDisabled(name: string): boolean;
    isSeriesTemplatePropertyDisabled(name: string): boolean;
    private _getSeriesActualArgumentScaleType;
    private _initSeries;
    private _initChartElementFunctions;
    constructor(options: IChartControlOptions);
    getPath(propertyName: string): string;
    serialize(): object;
    save(): object;
    isPropertyDisabled(name: string): boolean;
    chart: ChartViewModel;
    onSave: (data: any) => void;
    dataSource: ko.Observable<IDataSourceInfo> | ko.Computed<IDataSourceInfo>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    fieldListProvider: ko.Observable<FieldListProvider>;
    parameters: ko.ObservableArray;
}
export declare const chartDataMember: ISerializationInfo;
export declare const chartSeriesDataMember: ISerializationInfo;
export declare const fakeChartSerializationInfo: ISerializationInfoArray;
export declare const chartControlSerializationsInfo: ISerializationInfoArray;