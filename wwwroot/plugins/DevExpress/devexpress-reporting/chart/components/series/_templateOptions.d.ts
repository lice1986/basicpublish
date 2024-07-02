﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_templateOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { StockValueDataMembers } from '../../internal/data/_stockValue';
import { Value1Value2DataMembers } from '../../internal/data/_value1Value2';
import { ValueWeightDataMembers } from '../../internal/data/_valueWeight';
export declare const viewTypesDataMembers: {
    BubbleSeriesView: typeof ValueWeightDataMembers;
    OverlappedRangeBarSeriesView: typeof Value1Value2DataMembers;
    SideBySideRangeBarSeriesView: typeof Value1Value2DataMembers;
    RangeAreaSeriesView: typeof Value1Value2DataMembers;
    RangeArea3DSeriesView: typeof Value1Value2DataMembers;
    OverlappedGanttSeriesView: typeof Value1Value2DataMembers;
    SideBySideGanttSeriesView: typeof Value1Value2DataMembers;
    StockSeriesView: typeof StockValueDataMembers;
    CandleStickSeriesView: typeof StockValueDataMembers;
};
export declare const mapTypes: {
    [key: string]: string;
};
export declare const onlyNumericArgumentSupportedSeriesViewTypes: Array<string>;
