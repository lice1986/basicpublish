﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_templateOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { StockValueDataMembers } from '../../internal/data/_stockValue';
import { Value1Value2DataMembers } from '../../internal/data/_value1Value2';
import { ValueWeightDataMembers } from '../../internal/data/_valueWeight';
export const viewTypesDataMembers = {
    'BubbleSeriesView': ValueWeightDataMembers,
    'OverlappedRangeBarSeriesView': Value1Value2DataMembers,
    'SideBySideRangeBarSeriesView': Value1Value2DataMembers,
    'RangeAreaSeriesView': Value1Value2DataMembers,
    'RangeArea3DSeriesView': Value1Value2DataMembers,
    'OverlappedGanttSeriesView': Value1Value2DataMembers,
    'SideBySideGanttSeriesView': Value1Value2DataMembers,
    'StockSeriesView': StockValueDataMembers,
    'CandleStickSeriesView': StockValueDataMembers
};
export const mapTypes = {
    'SideBySideBarSeriesView': 'SideBySideBarSeriesLabel',
    'StackedBarSeriesView': 'StackedBarSeriesLabel',
    'FullStackedBarSeriesView': 'FullStackedBarSeriesLabel',
    'SideBySideStackedBarSeriesView': 'StackedBarSeriesLabel',
    'SideBySideFullStackedBarSeriesView': 'FullStackedBarSeriesLabel',
    'WaterfallSeriesView': 'WaterfallSeriesLabel',
    'SideBySideBar3DSeriesView': 'Bar3DSeriesLabel',
    'StackedBar3DSeriesView': 'StackedBar3DSeriesLabel',
    'FullStackedBar3DSeriesView': 'FullStackedBar3DSeriesLabel',
    'SideBySideStackedBar3DSeriesView': 'StackedBar3DSeriesLabel',
    'SideBySideFullStackedBar3DSeriesView': 'FullStackedBar3DSeriesLabel',
    'ManhattanBarSeriesView': 'Bar3DSeriesLabel',
    'PointSeriesView': 'PointSeriesLabel',
    'BubbleSeriesView': 'BubbleSeriesLabel',
    'LineSeriesView': 'PointSeriesLabel',
    'StackedLineSeriesView': 'StackedLineSeriesLabel',
    'FullStackedLineSeriesView': 'StackedLineSeriesLabel',
    'StepLineSeriesView': 'PointSeriesLabel',
    'SplineSeriesView': 'PointSeriesLabel',
    'ScatterLineSeriesView': 'PointSeriesLabel',
    'SwiftPlotSeriesView': null,
    'Line3DSeriesView': 'Line3DSeriesLabel',
    'StackedLine3DSeriesView': 'StackedLine3DSeriesLabel',
    'FullStackedLine3DSeriesView': 'StackedLine3DSeriesLabel',
    'StepLine3DSeriesView': 'Line3DSeriesLabel',
    'Spline3DSeriesView': 'Line3DSeriesLabel',
    'PieSeriesView': 'PieSeriesLabel',
    'DoughnutSeriesView': 'DoughnutSeriesLabel',
    'NestedDoughnutSeriesView': 'NestedDoughnutSeriesLabel',
    'Pie3DSeriesView': 'Pie3DSeriesLabel',
    'Doughnut3DSeriesView': 'Doughnut3DSeriesLabel',
    'FunnelSeriesView': 'FunnelSeriesLabel',
    'Funnel3DSeriesView': 'Funnel3DSeriesLabel',
    'AreaSeriesView': 'PointSeriesLabel',
    'StackedAreaSeriesView': 'PointSeriesLabel',
    'FullStackedAreaSeriesView': 'FullStackedAreaSeriesLabel',
    'StepAreaSeriesView': 'PointSeriesLabel',
    'SplineAreaSeriesView': 'PointSeriesLabel',
    'StackedSplineAreaSeriesView': 'PointSeriesLabel',
    'FullStackedSplineAreaSeriesView': 'FullStackedSplineAreaSeriesLabel',
    'Area3DSeriesView': 'Area3DSeriesLabel',
    'StackedArea3DSeriesView': 'StackedArea3DSeriesLabel',
    'FullStackedArea3DSeriesView': 'FullStackedArea3DSeriesLabel',
    'StepArea3DSeriesView': 'Area3DSeriesLabel',
    'SplineArea3DSeriesView': 'Area3DSeriesLabel',
    'StackedSplineArea3DSeriesView': 'StackedArea3DSeriesLabel',
    'FullStackedSplineArea3DSeriesView': 'FullStackedArea3DSeriesLabel',
    'OverlappedRangeBarSeriesView': 'RangeBarSeriesLabel',
    'SideBySideRangeBarSeriesView': 'RangeBarSeriesLabel',
    'RangeAreaSeriesView': 'RangeAreaSeriesLabel',
    'RangeArea3DSeriesView': 'RangeArea3DSeriesLabel',
    'RadarPointSeriesView': 'RadarPointSeriesLabel',
    'RadarLineSeriesView': 'RadarPointSeriesLabel',
    'RadarAreaSeriesView': 'RadarPointSeriesLabel',
    'PolarPointSeriesView': 'RadarPointSeriesLabel',
    'PolarLineSeriesView': 'RadarPointSeriesLabel',
    'PolarAreaSeriesView': 'RadarPointSeriesLabel',
    'StockSeriesView': 'StockSeriesLabel',
    'CandleStickSeriesView': 'StockSeriesLabel',
    'OverlappedGanttSeriesView': 'RangeBarSeriesLabel',
    'SideBySideGanttSeriesView': 'RangeBarSeriesLabel'
};
export const onlyNumericArgumentSupportedSeriesViewTypes = [
    'PolarPointSeriesView',
    'PolarLineSeriesView',
    'PolarAreaSeriesView'
];
