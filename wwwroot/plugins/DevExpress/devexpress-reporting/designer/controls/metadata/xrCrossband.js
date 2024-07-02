﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCrossband.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point } from '@devexpress/analytics-core/analytics-elements';
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { borderColor, borderDashStyleValues, borders, borderWidth, canPublish, foreColor, lineStyle } from './properties/metadata';
import { baseControlProperties } from './properties/metadataGroups';
export const crossBandLineWidth = { propertyName: 'width', modelName: '@WidthF', defaultVal: 1, editor: editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', from: floatFromModel };
export const startPoint = { propertyName: 'startPoint', modelName: '@StartPointFloat', from: Point.fromString, displayName: 'Start Point', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.StartPoint', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.StartPointF.Description', localizable: true, editor: editorTemplates.getEditor('objecteditor') };
export const endPoint = { propertyName: 'endPoint', modelName: '@EndPointFloat', from: Point.fromString, displayName: 'End Point', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.EndPoint', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.EndPointF.Description', localizable: true, editor: editorTemplates.getEditor('objecteditor') };
export const startBand = { propertyName: 'startBand', modelName: '@StartBand', link: true, displayName: 'Start Band', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.StartBand', editor: designerEditorTemplates.getEditor('bands') };
export const endBand = { propertyName: 'endBand', modelName: '@EndBand', link: true, displayName: 'End Band', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.EndBand', editor: designerEditorTemplates.getEditor('bands') };
export const borderDashStyleCrossband = {
    propertyName: 'borderDashStyleCrossband', modelName: '@BorderDashStyle',
    editor: editorTemplates.getEditor('combobox'), displayName: 'Border Dash Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle', valuesArray: borderDashStyleValues
};
export const width = { propertyName: 'width', modelName: '@WidthF', defaultVal: 0, editor: editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.WidthF.Description', from: floatFromModel, localizable: true };
export const crossBandBoxControlSerializationsInfo = [
    startPoint, startBand, endPoint, endBand, width,
    borderColor, borderDashStyleCrossband, canPublish,
    $.extend({}, borders, { defaultVal: 'All' }),
    $.extend({}, borderWidth, { defaultVal: 2 }),
    { propertyName: 'locationF', modelName: '@LocationFloat', from: Point.fromString },
].concat(baseControlProperties);
export const crossBandLineControlSerializationsInfo = [
    startPoint, startBand, endPoint, endBand, width,
    foreColor, lineStyle, crossBandLineWidth, canPublish,
    { propertyName: 'locationF', modelName: '@LocationFloat', from: Point.fromString, }
].concat(baseControlProperties);
export const popularPropertiesCrossLine = ['lineStyle'];
