﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrChart.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartViewModel } from '../../chart/components/models/_chart';
import { ChartControlViewModel } from '../../chart/_control';
import { IXRChartComponentInfo } from '../../common/utils/_chartUtils';
import { IControlPropertyDescription } from '../dataObjects/expressions/_expressionWrapper';
import { ControlType } from './utils/_controlTypes';
import { ChartLocalizationProvider } from './utils/_localizationUtils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRChartViewModel extends XRControlViewModel {
    static assignValueDataMembers(chart: ChartViewModel, str: string): void;
    static setDataMembers(chart: ChartViewModel, isPivotGrid: boolean): void;
    private _createChartModel;
    private _updateExpressionObjectProperties;
    _getExpressionObjectProperties(chartComponents: IXRChartComponentInfo[]): IControlPropertyDescription[];
    _getChildComponents(): IXRChartComponentInfo[];
    createLocalizationProvider(): ChartLocalizationProvider;
    constructor(model: object, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    isPropertyDisabled(name: string): boolean;
    getPath(propertyName: string): string;
    pivotGridDataSourceOptions: ko.Computed<any>;
    isPivotGridDataSource: ko.Observable<boolean> | ko.Computed<boolean>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    chart: ChartViewModel;
    chartModel: ChartControlViewModel;
    dataSource: ko.Observable | ko.Computed;
    realDataSource: ko.Observable | ko.Computed;
    controlParameters: ko.ObservableArray<any>;
    allChartComponents: ko.Computed<IXRChartComponentInfo[]>;
}
export declare class XRChartSurface extends XRControlSurface {
    constructor(control: XRChartViewModel, context: ISurfaceContext);
    designTime: ko.Observable<boolean>;
    isLoading: ko.Observable<boolean>;
    imageSrc: ko.Observable<string>;
    runDesignerButtonText(): string;
}