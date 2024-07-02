﻿/**
* DevExpress HTML/JS Reporting (common\utils\_chartUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
export interface IChartComponentInfo {
    component?: IChartComponent | IChartComponent[];
    path: string;
}
export interface IXRChartComponentInfo {
    component: IChartComponent;
    path: string;
    displayPath: string;
}
export interface IChartComponent extends ISerializableModel {
    getChildComponents?: () => IChartComponentInfo[];
    getExpressionProperties?: () => string[];
    name?: ko.Observable<string> | ko.Computed<string>;
}
export declare function getChartChildComponents(chartComponent: IChartComponent, path: string, displayPath?: string): IXRChartComponentInfo[];