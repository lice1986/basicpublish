﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrShape.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { colorFromString, colorToString, floatFromModel, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { angle, foreColor, lineStyle, lineWidth } from './properties/metadata';
import { commonControlProperties, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
const shapes = [
    { value: 'Rectangle', displayValue: 'Rectangle', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Rectangle' },
    { value: 'Ellipse', displayValue: 'Ellipse', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Ellipse' },
    { value: 'Top Arrow', displayValue: 'Top Arrow', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.TopArrow' },
    { value: 'Right Arrow', displayValue: 'Right Arrow', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.RightArrow' },
    { value: 'Bottom Arrow', displayValue: 'Bottom Arrow', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.BottomArrow' },
    { value: 'Left Arrow', displayValue: 'Left Arrow', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.LeftArrow' },
    { value: 'Triangle', displayValue: 'Triangle', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Triangle' },
    { value: 'Square', displayValue: 'Square', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Square' },
    { value: 'Pentagon', displayValue: 'Pentagon', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Pentagon' },
    { value: 'Hexagon', displayValue: 'Hexagon', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Hexagon' },
    { value: 'Octagon', displayValue: 'Octagon', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Octagon' },
    { value: '3-Point Star', displayValue: '3-Point Star', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.ThreePointStar' },
    { value: '4-Point Star', displayValue: '4-Point Star', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.FourPointStar' },
    { value: '5-Point Star', displayValue: '5-Point Star', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.FivePointStar' },
    { value: '6-Point Star', displayValue: '6-Point Star', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.SixPointStar' },
    { value: '8-Point Star', displayValue: '8-Point Star', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.EightPointStar' },
    { value: 'Vertical Line', displayValue: 'Vertical Line', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.VerticalLine' },
    { value: 'Horizontal Line', displayValue: 'Horizontal Line', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.HorizontalLine' },
    { value: 'Slant Line', displayValue: 'Slant Line', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.SlantLine' },
    { value: 'Backslant Line', displayValue: 'Backslant Line', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.BackslantLine' },
    { value: 'Cross', displayValue: 'Cross', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Cross' },
    { value: 'Bracket', displayValue: 'Bracket', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Bracket' },
    { value: 'Brace', displayValue: 'Brace', localizationId: 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Brace' },
];
export const shapeType = { propertyName: 'shapeType', modelName: '@ShapeName', defaultVal: 'Ellipse' };
export const stretch = { propertyName: 'stretch', modelName: '@Stretch', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Stretch', localizationId: 'DevExpress.XtraReports.UI.XRShape.Stretch' };
export const fillColor = { propertyName: 'fillColor', modelName: '@FillColor', defaultVal: 'transparent', editor: editorTemplates.getEditor('customColorEditor'), from: colorFromString, toJsonObject: colorToString, displayName: 'Fill Color', localizationId: 'DevExpress.XtraReports.UI.XRShape.FillColor' };
export const Shape = { propertyName: 'Shape', modelName: 'Shape' };
export const shapeFake = { propertyName: 'shapeFake', editor: designerEditorTemplates.getEditor('contentByType'), displayName: 'Shape', valuesArray: shapes, localizationId: 'DevExpress.XtraReports.UI.XRShape.Shape' };
export const shapeElementSerializationsInfo = [shapeType];
const fillet = { propertyName: 'fillet', modelName: '@Fillet', defaultVal: 0, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Fillet', localizationId: 'DevExpress.XtraPrinting.Shape.FilletShapeBase.Fillet' };
const shapeRectangleSerializationsInfo = [shapeType, fillet];
const shapeStarSerializationsInfo = [
    shapeType,
    { propertyName: 'concavity', modelName: '@Concavity', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Concavity', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeStar.Concavity' },
    { propertyName: 'starPointCount', modelName: '@StarPointCount', defaultVal: 3, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Count of Star Points', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeStar.StarPointCount' },
    fillet
];
const shapeBraceSerializationsInfo = [
    shapeType,
    { propertyName: 'fillet', modelName: '@Fillet', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Fillet', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBrace.Fillet' },
    { propertyName: 'tailLength', modelName: '@TailLength', defaultVal: 20, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: "Tail\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBrace.TailLength' },
    { propertyName: 'tipLength', modelName: '@TipLength', defaultVal: 20, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: "Tip\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBracket.TipLength' }
];
const shapeBracketSerializationsInfo = [
    shapeType,
    { propertyName: 'tipLength', modelName: '@TipLength', defaultVal: 20, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: "Tip\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBracket.TipLength' }
];
const shapePolygonSerializationsInfo = [
    shapeType, fillet,
    { propertyName: 'numberOfSides', modelName: '@NumberOfSides', defaultVal: 3, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Number of Sides', localizationId: 'DevExpress.XtraPrinting.Shape.ShapePolygon.NumberOfSides' },
];
const shapeArrowSerializationsInfo = [
    shapeType,
    { propertyName: 'arrowHeight', modelName: '@ArrowHeight', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Arrow Height', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeArrow.ArrowHeight' },
    { propertyName: 'arrowWidth', modelName: '@ArrowWidth', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Arrow Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeArrow.ArrowWidth' },
    fillet
];
const shapeCrossSerializationsInfo = [
    shapeType, fillet,
    { propertyName: 'horizontalLineWidth', modelName: '@HorizontalLineWidth', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Horizontal Line Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeCross.HorizontalLineWidth' },
    { propertyName: 'verticalLineWidth', modelName: '@VerticalLineWidth', defaultVal: 50, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Vertical Line Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeCross.VerticalLineWidth' }
];
export const shapesMap = {
    'Rectangle': shapeRectangleSerializationsInfo,
    'Arrow': shapeArrowSerializationsInfo,
    'Ellipse': shapeElementSerializationsInfo,
    'Polygon': shapePolygonSerializationsInfo,
    'Star': shapeStarSerializationsInfo,
    'Line': shapeElementSerializationsInfo,
    'Bracket': shapeBracketSerializationsInfo,
    'Cross': shapeCrossSerializationsInfo,
    'Brace': shapeBraceSerializationsInfo
};
export const shapeSerializationsInfo = [
    lineWidth, lineStyle, foreColor, Shape, fillColor, stretch, angle,
    anchorVertical, anchorHorizontal, controlScripts, shapeFake, action,
    dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
].concat(sizeLocation, commonControlProperties, navigationGroup);
export const popularPropertiesShape = ['stretch', 'fillColor', 'lineWidth', 'angle', 'bookmark', 'bookmarkParent', 'shapeFake'];
