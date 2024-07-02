﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrGauge.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { createPopularBindingInfos } from '../utils/_metaUtils';
import { XRGaugeViewModel } from '../xrGauge';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { imageType } from './properties/metadata';
import { commonControlProperties, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const actualValue = { propertyName: 'actualValue', defaultVal: null, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Actual Value', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ActualValue', modelName: '@ActualValue' };
export const maximum = { propertyName: 'maximum', defaultVal: null, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum', modelName: '@Maximum' };
export const minimum = { propertyName: 'minimum', modelName: '@Minimum', defaultVal: null, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' };
export const tickmarkCount = { propertyName: 'tickmarkCount', modelName: '@TickmarkCount', defaultVal: 11, editor: editorTemplates.getEditor('numeric'), displayName: 'Tickmark Count', localizationId: 'DevExpress.XtraReports.UI.XRGauge.TickmarkCount' };
export const targetValue = { propertyName: 'targetValue', modelName: '@TargetValue', defaultVal: null, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Target Value', localizationId: 'DevExpress.XtraReports.UI.XRGauge.TargetValue' };
export const viewStyle = { propertyName: 'viewStyle', modelName: '@ViewStyle', displayName: 'View Style', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewStyle', editor: designerEditorTemplates.getEditor('viewStyle') };
export const viewTheme = {
    propertyName: 'viewTheme', modelName: '@ViewTheme',
    defaultVal: 'FlatLight', displayName: 'View Theme', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewTheme', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'FlatLight', displayValue: 'FlatLight', localizationId: 'GaugesPresetsStringId.ThemeFlatLight' },
        { value: 'FlatDark', displayValue: 'FlatDark', localizationId: 'GaugesPresetsStringId.ThemeFlatDark' }
    ]
};
export const viewType = {
    propertyName: 'viewType', modelName: '@ViewType',
    defaultVal: 'Circular', displayName: 'View Type', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewType', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'Circular', displayValue: 'Circular', localizationId: 'ASPxReportsStringId.ReportDesigner_GaugeViewType_Circular' },
        { value: 'Linear', displayValue: 'Linear', localizationId: 'ASPxReportsStringId.ReportDesigner_GaugeViewType_Linear' }
    ]
};
export const xrGaugeSerializationInfo = [
    viewStyle, viewTheme, viewType, actualValue, tickmarkCount, maximum, minimum, targetValue,
    anchorVertical, anchorHorizontal, controlScripts, imageType, action,
    dataBindings(['ActualValue', 'Bookmark', 'Maximum', 'Minimum', 'NavigateUrl', 'Tag', 'TargetValue'])
].concat(XRGaugeViewModel.bindings
    .map(name => createPopularBindingInfos({ propertyName: name, localizationId: 'DevExpress.XtraReports.UI.XRGauge.' + name }))
    .reduce((a, b) => a.concat(b)))
    .concat(sizeLocation, commonControlProperties, navigationGroup);
export const popularPropertiesGauge = ['viewType', 'viewStyle', 'viewTheme', 'actualValue', 'popularDataBindingActualValue', 'targetValue', 'popularDataBindingTargetValue',
    'minimum', 'popularDataBindingMinimum', 'maximum', 'popularDataBindingMaximum'];
