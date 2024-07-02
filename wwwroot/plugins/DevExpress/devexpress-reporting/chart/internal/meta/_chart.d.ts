﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_chart.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare const sideBySideEqualBarWidth: ISerializationInfo, sideBySideBarDistanceFixed: ISerializationInfo, sideBySideBarDistance: ISerializationInfo;
export declare const commonSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], bubbleSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], rangeSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], stockSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const barPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const piePositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const funnelPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const waterfallPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare const padding: ISerializationInfo;
export declare const lineMarkerOptionsSerializationsInfo: ISerializationInfoArray, lineMarker: ISerializationInfo;
export declare const topNOptionsSerializationsInfo: ISerializationInfoArray, topNOptions: ISerializationInfo;
export declare const autoBindingSettingsEnabled: ISerializationInfo, autoLayoutSettingsEnabled: ISerializationInfo;
export declare const pivotGridDataSourceOptions: ISerializationInfo;
export declare const dataFiltersConjunctionMode: ISerializationInfo;
export declare const colorDataMember: ISerializationInfo;
export declare const points: ISerializationInfo;
export declare const createViewsArray: (limitation: boolean) => IDisplayedValue[];
export declare const viewBindableSerializationInfo: ISerializationInfo;
export declare const qualitativeSummaryOptions: ISerializationInfo;
export declare const numericSummaryOptions: ISerializationInfo;
export declare const dateTimeSumaryOptions: ISerializationInfo;
export declare const seriesSerializable: ISerializationInfo;
export declare const seriesDataMember: ISerializationInfo;
export declare const enableAntialiasing: ISerializationInfo;
export declare const emptyChartTextSerializationsInfo: ISerializationInfoArray;
export declare const emptyChartText: ISerializationInfo;
export declare const smallChartText: ISerializationInfo;
export declare const titles: ISerializationInfo;
export declare const legendSerializationsInfo: ISerializationInfoArray;
export declare const additionalLegendSerializationsInfo: ISerializationInfoArray;
export declare const legends: ISerializationInfo;
export declare const appearanceName: ISerializationInfo;
export declare const paletteName: ISerializationInfo;
export declare const backImage: ISerializationInfo;