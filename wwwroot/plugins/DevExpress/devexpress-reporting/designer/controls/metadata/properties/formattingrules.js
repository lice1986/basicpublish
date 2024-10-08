﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\formattingrules.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, nameValidationRules } from '@devexpress/analytics-core/analytics-internal';
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { previewSides } from '../../../../common/metadata';
import { backColor, borderColor, borderDashStyle, dataMember, dataSource, defaultBooleanValuesArray, font, foreColor, paddingGroup, textAlignment } from './metadata';
export const formattingRuleLinkSerializationsInfo = [
    { propertyName: 'value', modelName: '@Value', link: true }
];
export const defaultBooleanVisible = {
    propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.Formatting.Visible', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValuesArray
};
const borderWidthSerializable = { propertyName: 'borderWidthSerializable', modelName: '@BorderWidthSerializable', displayName: 'Border Width', localizationId: 'DevExpress.XtraReports.UI.Formatting.BorderWidthSerializable', from: floatFromModel, editor: editorTemplates.getEditor('numeric') }, sides = extend({ displayName: 'Borders', editor: editorTemplates.getEditor('borders'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders' }, previewSides);
export const formattingSerializationsInfo = [backColor, sides, borderColor, borderDashStyle, borderWidthSerializable,
    foreColor, font, textAlignment, defaultBooleanVisible
].concat(paddingGroup);
export const conditionObj = { propertyName: 'conditionObj', displayName: 'Condition', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition', editor: editorTemplates.getEditor('expressionEditor') };
export const formatting = { propertyName: 'formatting', modelName: 'Formatting', displayName: 'Formatting', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Formatting', info: formattingSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const formattingRuleSerializationsInfo = [
    { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Name', editor: editorTemplates.getEditor('text'), validationRules: nameValidationRules },
    { propertyName: 'condition', modelName: '@Condition', displayName: 'Condition', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition', defaultVal: '' },
    conditionObj,
    dataSource, dataMember,
    formatting
];
