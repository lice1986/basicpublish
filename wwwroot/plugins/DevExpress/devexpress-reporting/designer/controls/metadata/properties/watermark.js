﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\watermark.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { imageSource } from '../xrPicturebox';
import { font, foreColor } from './metadata';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
export const foreColorWatermark = extend({}, foreColor, { defaultVal: 'Red' });
export const fontWatermark = extend({}, font, { defaultVal: 'Verdana, 36pt', editorOptions: { hideUnderline: true, hideStrikeout: true } });
const watermarkTextValues = [
    { value: 'ASAP', displayValue: 'ASAP', localizationId: 'PreviewStringId.WMForm_Watermark_Asap' },
    { value: 'CONFIDENTIAL', displayValue: 'CONFIDENTIAL', localizationId: 'PreviewStringId.WMForm_Watermark_Confidential' },
    { value: 'COPY', displayValue: 'COPY', localizationId: 'PreviewStringId.WMForm_Watermark_Copy' },
    { value: 'DO NOT COPY', displayValue: 'DO NOT COPY', localizationId: 'PreviewStringId.WMForm_Watermark_DoNotCopy' },
    { value: 'DRAFT', displayValue: 'DRAFT', localizationId: 'PreviewStringId.WMForm_Watermark_Draft' },
    { value: 'EVALUATION', displayValue: 'EVALUATION', localizationId: 'PreviewStringId.WMForm_Watermark_Evaluation' },
    { value: 'ORIGINAL', displayValue: 'ORIGINAL', localizationId: 'PreviewStringId.WMForm_Watermark_Original' },
    { value: 'PERSONAL', displayValue: 'PERSONAL', localizationId: 'PreviewStringId.WMForm_Watermark_Personal' },
    { value: 'SAMPLE', displayValue: 'SAMPLE', localizationId: 'PreviewStringId.WMForm_Watermark_Sample' },
    { value: 'TOP SECRET', displayValue: 'TOP SECRET', localizationId: 'PreviewStringId.WMForm_Watermark_TopSecret' },
    { value: 'URGENT', displayValue: 'URGENT', localizationId: 'PreviewStringId.WMForm_Watermark_Urgent' }
];
const watermarkContentPosition = [
    { value: 'Behind', displayValue: 'Behind', localizationId: 'DevExpress.XtraPrinting.Drawing.WatermarkPosition.Behind' },
    { value: 'InFront', displayValue: 'InFront', localizationId: 'DevExpress.XtraPrinting.Drawing.WatermarkPosition.InFront' }
];
export const watermarkSerializationsInfo = [
    { propertyName: 'watermarkId', modelName: '@Id', displayName: 'Watermark Id', localizationId: 'DevExpress.XtraReports.UI.XtraReport.WatermarkId', editor: designerEditorTemplates.getEditor('watermarkId') },
    fontWatermark,
    foreColorWatermark,
    { propertyName: 'textTransparency', modelName: '@TextTransparency', displayName: 'Text Transparency', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextTransparency', defaultVal: 50, editor: editorTemplates.getEditor('numeric') },
    {
        propertyName: 'text', modelName: '@Text', displayName: 'Text', localizable: true, localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.Text', defaultVal: '',
        editor: editorTemplates.getEditor('comboboxEditable'),
        valuesArray: watermarkTextValues
    },
    {
        propertyName: 'textDirection', modelName: '@TextDirection', displayName: 'Text Direction', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextDirection', defaultVal: 'ForwardDiagonal', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Horizontal', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.Horizontal' },
            { value: 'ForwardDiagonal', displayValue: 'ForwardDiagonal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.ForwardDiagonal' },
            { value: 'BackwardDiagonal', displayValue: 'BackwardDiagonal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.BackwardDiagonal' },
            { value: 'Vertical', displayValue: 'Vertical', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.Vertical' }
        ]
    },
    {
        propertyName: 'textPosition', modelName: '@TextPosition', displayName: 'Text Position', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextPosition', defaultVal: 'Behind', editor: editorTemplates.getEditor('combobox'),
        valuesArray: watermarkContentPosition
    },
    imageSource,
    {
        propertyName: 'imagePosition', modelName: '@ImagePosition', displayName: 'Image Position', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImagePosition', defaultVal: 'Behind', editor: editorTemplates.getEditor('combobox'),
        valuesArray: watermarkContentPosition
    },
    { propertyName: 'imageTransparency', modelName: '@ImageTransparency', displayName: 'Image Transparency', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTransparency', defaultVal: 0, editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'imageTiling', modelName: '@ImageTiling', displayName: 'Image Tiling', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTiling', defaultVal: false, editor: editorTemplates.getEditor('bool'), from: parseBool },
    {
        propertyName: 'imageAlign', modelName: '@ImageAlign', displayName: 'Image Alignment', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageAlign', defaultVal: 'MiddleCenter', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'TopLeft', displayValue: 'TopLeft', localizationId: 'System.Drawing.ContentAlignment.TopLeft' },
            { value: 'TopCenter', displayValue: 'TopCenter', localizationId: 'System.Drawing.ContentAlignment.TopCenter' },
            { value: 'TopRight', displayValue: 'TopRight', localizationId: 'System.Drawing.ContentAlignment.TopRight' },
            { value: 'MiddleLeft', displayValue: 'MiddleLeft', localizationId: 'System.Drawing.ContentAlignment.MiddleLeft' },
            { value: 'MiddleCenter', displayValue: 'MiddleCenter', localizationId: 'System.Drawing.ContentAlignment.MiddleCenter' },
            { value: 'MiddleRight', displayValue: 'MiddleRight', localizationId: 'System.Drawing.ContentAlignment.MiddleRight' },
            { value: 'BottomLeft', displayValue: 'BottomLeft', localizationId: 'System.Drawing.ContentAlignment.BottomLeft' },
            { value: 'BottomCenter', displayValue: 'BottomCenter', localizationId: 'System.Drawing.ContentAlignment.BottomCenter' },
            { value: 'BottomRight', displayValue: 'BottomRight', localizationId: 'System.Drawing.ContentAlignment.BottomRight' }
        ]
    },
    {
        propertyName: 'imageViewMode', modelName: '@ImageViewMode', displayName: 'Image View Mode', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageViewMode', defaultVal: 'Clip', editor: editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'Clip', displayValue: 'Clip', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Clip' },
            { value: 'Stretch', displayValue: 'Stretch', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Stretch' },
            { value: 'Zoom', displayValue: 'Zoom', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Zoom' }
        ]
    },
    { propertyName: 'pageRange', modelName: '@PageRange', displayName: 'Page Range', localizationId: 'DevExpress.XtraPrinting.Drawing.Watermark.PageRange', defaultVal: '', editor: editorTemplates.getEditor('text') }
];
