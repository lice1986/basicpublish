﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_diagram.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { axisX, axisY } from '../../components/axis/_axisXYViewModel';
import { editorTemplates as chartEditorTemplates } from '../_editorTemplates';
import { axisX3D, axisY3D, radarAxisX, radarAxisY } from './_axis';
import { backColor, defaultPane, enableAxisXScrolling, enableAxisXZooming, enableAxisYScrolling, enableAxisYZooming, margin, rotated } from './_common';
const dimension = { propertyName: 'dimension', modelName: '@Dimension', displayName: 'Dimension', editor: editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.SimpleDiagram3D.Dimension' }, equalPieSize = { propertyName: 'equalPieSize', modelName: '@EqualPieSize', displayName: 'EqualPieSize', editor: editorTemplates.getEditor('bool'), from: parseBool }, typeNameNotShowDiagram = { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' };
export const secondaryAxesX = { propertyName: 'secondaryAxesX', modelName: 'SecondaryAxesX', displayName: 'Secondary Axes X', array: true, editor: chartEditorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesX' };
export const secondaryAxesY = { propertyName: 'secondaryAxesY', modelName: 'SecondaryAxesY', displayName: 'Secondary Axes Y', array: true, editor: chartEditorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesY' };
export const panes = { propertyName: 'panes', modelName: 'Panes', displayName: 'Additional Panes', array: true, editor: chartEditorTemplates.getEditor('collection'), localizationId: 'ChartDesignerStringIDs.TreeAdditionalPanelCollection' };
const drawingStyle = {
    propertyName: 'drawingStyle', modelName: '@DrawingStyle', displayName: 'Drawing Style', localizationId: 'DevExpress.XtraCharts.RadarDiagram.DrawingStyle', defaultVal: 'Circle',
    editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.RadarDiagramDrawingStyle.Circle' },
        { value: 'Polygon', displayValue: 'Polygon', localizationId: 'DevExpress.XtraCharts.RadarDiagramDrawingStyle.Polygon' }
    ]
}, startAngleInDegrees = {
    propertyName: 'startAngleInDegrees', modelName: '@StartAngleInDegrees', displayName: 'Start Angle in Degrees', localizationId: 'DevExpress.XtraCharts.RadarDiagram.StartAngleInDegrees', editor: editorTemplates.getEditor('numeric'), defaultVal: 0
}, rotationDirection = {
    propertyName: 'rotationDirection', modelName: '@RotationDirection', displayName: 'Rotation Direction', localizationId: 'DevExpress.XtraCharts.RadarDiagram.RotationDirection', defaultVal: 'Counterclockwise',
    editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Counterclockwise', displayValue: 'Counterclockwise', localizationId: 'DevExpress.XtraCharts.RadarDiagramRotationDirection.Counterclockwise' },
        { value: 'Clockwise', displayValue: 'Clockwise', localizationId: 'DevExpress.XtraCharts.RadarDiagramRotationDirection.Clockwise' }
    ]
};
export const diagramSerializationsInfo = [typeNameNotShowDiagram];
const radarSerializationsInfo = [drawingStyle, startAngleInDegrees, rotationDirection, radarAxisX, radarAxisY, margin, backColor].concat(diagramSerializationsInfo), polarSerializationsInfo = [radarAxisX, radarAxisY, margin, backColor].concat(diagramSerializationsInfo), simple3DSerializationsInfo = [dimension, margin, equalPieSize].concat(diagramSerializationsInfo), funnel3DSerializationsInfo = [].concat(simple3DSerializationsInfo), simpleSerializationsInfo = [dimension, margin, equalPieSize].concat(diagramSerializationsInfo), XY2DSerializationsInfo = [defaultPane, panes, axisX, axisY, secondaryAxesX, secondaryAxesY, margin, enableAxisXScrolling, enableAxisXZooming, enableAxisYScrolling, enableAxisYZooming, typeNameNotShowDiagram], XYSerializationsInfo = [rotated].concat(XY2DSerializationsInfo), XY3DSerializationsInfo = [axisX3D, axisY3D, backColor, typeNameNotShowDiagram], GanttDiagramSerializationsInfo = [].concat(XY2DSerializationsInfo);
const XYObject = { info: XYSerializationsInfo, type: 'XYDiagram' }, XY2DObject = { info: XY2DSerializationsInfo, type: 'SwiftPlotDiagram' }, XY3DObject = { info: XY3DSerializationsInfo, type: 'XYDiagram3D' }, radarObject = { info: radarSerializationsInfo, type: 'RadarDiagram' }, polarObject = { info: polarSerializationsInfo, type: 'PolarDiagram' }, simpleObject = { info: simpleSerializationsInfo, type: 'SimpleDiagram' }, simple3DObject = { info: simple3DSerializationsInfo, type: 'SimpleDiagram3D' }, funnel3DObject = { info: funnel3DSerializationsInfo, type: 'FunnelDiagram' }, gantObject = { info: GanttDiagramSerializationsInfo, type: 'GanttDiagram' };
export const diagramMapper = {
    'SideBySideBarSeriesView': XYObject,
    'StackedBarSeriesView': XYObject,
    'FullStackedBarSeriesView': XYObject,
    'SideBySideStackedBarSeriesView': XYObject,
    'SideBySideFullStackedBarSeriesView': XYObject,
    'WaterfallSeriesView': XYObject,
    'SideBySideBar3DSeriesView': XY3DObject,
    'StackedBar3DSeriesView': XY3DObject,
    'FullStackedBar3DSeriesView': XY3DObject,
    'SideBySideStackedBar3DSeriesView': XY3DObject,
    'SideBySideFullStackedBar3DSeriesView': XY3DObject,
    'ManhattanBarSeriesView': XY3DObject,
    'PointSeriesView': XYObject,
    'BubbleSeriesView': XYObject,
    'LineSeriesView': XYObject,
    'StackedLineSeriesView': XYObject,
    'FullStackedLineSeriesView': XYObject,
    'StepLineSeriesView': XYObject,
    'SplineSeriesView': XYObject,
    'ScatterLineSeriesView': XYObject,
    'SwiftPlotSeriesView': XY2DObject,
    'Line3DSeriesView': XY3DObject,
    'StackedLine3DSeriesView': XY3DObject,
    'FullStackedLine3DSeriesView': XY3DObject,
    'StepLine3DSeriesView': XY3DObject,
    'Spline3DSeriesView': XY3DObject,
    'PieSeriesView': simpleObject,
    'DoughnutSeriesView': simpleObject,
    'NestedDoughnutSeriesView': simpleObject,
    'Pie3DSeriesView': simple3DObject,
    'Doughnut3DSeriesView': simple3DObject,
    'FunnelSeriesView': simpleObject,
    'Funnel3DSeriesView': funnel3DObject,
    'AreaSeriesView': XYObject,
    'StackedAreaSeriesView': XYObject,
    'FullStackedAreaSeriesView': XYObject,
    'StepAreaSeriesView': XYObject,
    'SplineAreaSeriesView': XYObject,
    'StackedSplineAreaSeriesView': XYObject,
    'FullStackedSplineAreaSeriesView': XYObject,
    'Area3DSeriesView': XY3DObject,
    'StackedArea3DSeriesView': XY3DObject,
    'FullStackedArea3DSeriesView': XY3DObject,
    'StepArea3DSeriesView': XY3DObject,
    'SplineArea3DSeriesView': XY3DObject,
    'StackedSplineArea3DSeriesView': XY3DObject,
    'FullStackedSplineArea3DSeriesView': XY3DObject,
    'OverlappedRangeBarSeriesView': XYObject,
    'SideBySideRangeBarSeriesView': XYObject,
    'RangeAreaSeriesView': XYObject,
    'RangeArea3DSeriesView': XY3DObject,
    'RadarPointSeriesView': radarObject,
    'RadarLineSeriesView': radarObject,
    'RadarAreaSeriesView': radarObject,
    'PolarPointSeriesView': polarObject,
    'PolarLineSeriesView': polarObject,
    'PolarAreaSeriesView': polarObject,
    'StockSeriesView': XYObject,
    'CandleStickSeriesView': XYObject,
    'OverlappedGanttSeriesView': gantObject,
    'SideBySideGanttSeriesView': gantObject
};
