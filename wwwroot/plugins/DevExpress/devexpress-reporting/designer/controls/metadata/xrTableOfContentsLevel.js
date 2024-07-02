﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableOfContentsLevel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { colorFromString, colorToString, floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { levelDefaultHeight } from '../defaultTableOfContentsLevelHeight';
import { paddingGroup } from './properties/metadata';
const font = { propertyName: 'font', localizable: true, modelName: '@Font', defaultVal: 'Times New Roman, 9.75pt', displayName: 'Font', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font', editor: editorTemplates.getEditor('font') };
const backColor = { propertyName: 'backColor', modelName: '@BackColor', defaultVal: 'Transparent', from: colorFromString, toJsonObject: colorToString, displayName: 'Background Color', localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor', editor: editorTemplates.getEditor('customColorEditor') };
const foreColor = { propertyName: 'foreColor', modelName: '@ForeColor', defaultVal: 'Black', from: colorFromString, toJsonObject: colorToString, displayName: 'Foreground Color', localizationId: 'DevExpress.XtraReports.UI.XRControl.ForeColor', editor: editorTemplates.getEditor('customColorEditor') };
export const baseTocLevelSerializationsInfo = [
    backColor,
    font,
    foreColor,
    { propertyName: 'height', modelName: '@Height', editor: editorTemplates.getEditor('numeric'), defaultVal: levelDefaultHeight, displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Height', from: floatFromModel, editorOptions: { min: 10 } }
].concat(paddingGroup);
export const tocLevelSerializationsInfo = [
    { propertyName: 'leaderSymbol', modelName: '@LeaderSymbol', editor: editorTemplates.getEditor('text'), defaultVal: '.', displayName: 'Leader Symbol', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.LeaderSymbol', editorOptions: { maxLength: 1 } },
    { propertyName: 'indent', modelName: '@Indent', editor: editorTemplates.getEditor('numeric'), defaultVal: null, displayName: 'Indent', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.Indent', from: floatFromModel }
].concat(baseTocLevelSerializationsInfo);