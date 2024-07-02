﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\layoutItems.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
const orientationValues = [
    { displayValue: 'Horizontal', value: 'Horizontal' },
    { displayValue: 'Vertical', value: 'Vertical' }
];
const parameter = { propertyName: 'parameter', modelName: '@Parameter', link: true };
const layoutitemtype = { propertyName: 'layoutItemType', modelName: '@LayoutItemType', displayName: 'LayoutItemType' };
const titlevisible = { propertyName: 'titleVisible', modelName: '@TitleVisible', displayName: 'Show title', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupTitleVisible', editor: designerEditorTemplates.getEditor('parametersCheckbox'), defaultVal: true, from: parseBool };
const title = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupTitle', editor: editorTemplates.getEditor('text'), defaultVal: '' };
const bordervisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'Show borders', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupBorderVisible', editor: designerEditorTemplates.getEditor('parametersCheckbox'), defaultVal: true, from: parseBool };
const expanded = { propertyName: 'expanded', modelName: '@Expanded', displayName: 'Expanded', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupExpanded', editor: designerEditorTemplates.getEditor('parametersCheckbox'), defaultVal: true, from: parseBool };
const showexpandbutton = { propertyName: 'showExpandButton', modelName: '@ShowExpandButton', displayName: 'Show expand/collapse button', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupShowExpandButton', editor: designerEditorTemplates.getEditor('parametersCheckbox'), defaultVal: false, from: parseBool };
const orientation = { propertyName: 'orientation', modelName: '@Orientation', displayName: 'Orientation', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupOrientation', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Vertical', valuesArray: orientationValues };
const subItems = { propertyName: 'parameterPanelLayoutItems', modelName: 'Items', array: true };
export const labelOrientation = { propertyName: 'labelOrientation', modelName: '@LabelOrientation', displayName: 'Orientation', localizationId: 'ASPxReportsStringId.ReportDesigner_ParametersDialog_GroupOrientation', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Horizontal', valuesArray: orientationValues };
export const groupLayoutItemInfo = [title, orientation, showexpandbutton, expanded, layoutitemtype, titlevisible, bordervisible, subItems];
export const parameterLayoutItemInfo = [layoutitemtype, labelOrientation, parameter];
export const separatorLayoutItemInfo = [layoutitemtype];
