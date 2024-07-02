﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCharactercomb.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { createSinglePopularBindingInfos } from '../utils/_metaUtils';
import { editOptions } from './properties/editOptions';
import { formattingRuleLinks } from './properties/formattingRulesLink';
import { accessibleRole, autoWidth, backColor, borderColor, borderDashStyle, borderDashStyleValues, borderWidth, canPublish, foreColor, keepTogetherDefaultValueFalse, multiline, nullValueText, rtl, summary, text, textAlignment, textArea, textFormatString, xlsxFormatString } from './properties/metadata';
import { baseControlProperties, canGrowShrinkGroup, navigationGroup, processGroup, sizeLocation } from './properties/metadataGroups';
import { interactiveSorting } from './properties/sortingOptions';
import { evenStyleName, oddStyleName, styleName, stylePriority } from './properties/style';
import { action } from './properties/action';
export const cellVerticalSpacing = { propertyName: 'verticalSpacing', localizable: true, modelName: '@CellVerticalSpacing', defaultVal: 0, displayName: 'Cell Vertical Spacing', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellVerticalSpacing', editor: editorTemplates.getEditor('numeric') };
export const cellHorizontalSpacing = { propertyName: 'horizontalSpacing', localizable: true, modelName: '@CellHorizontalSpacing', defaultVal: 0, displayName: 'Cell Horizontal Spacing', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellHorizontalSpacing', editor: editorTemplates.getEditor('numeric') };
export const cellWidth = {
    propertyName: 'cellWidth', modelName: '@CellWidth', defaultVal: 25, displayName: 'Cell Width', localizable: true, localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellWidth', editor: editorTemplates.getEditor('numeric'), editorOptions: { placeholder: ko.observable(getLocalization('(Auto)', 'ASPxReportsStringId.ReportDesigner_PropertyGrid_AutoValueString')) }
};
export const cellHeight = {
    propertyName: 'cellHeight', modelName: '@CellHeight', defaultVal: 25, displayName: 'Cell Height', localizable: true, localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellHeight', editor: editorTemplates.getEditor('numeric'), editorOptions: { placeholder: ko.observable(getLocalization('(Auto)', 'ASPxReportsStringId.ReportDesigner_PropertyGrid_AutoValueString')) }
};
export const cellSizeMode = {
    propertyName: 'sizeMode', modelName: '@CellSizeMode', displayName: 'Cell Size Mode', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellSizeMode', defaultVal: 'AutoSize', editor: designerEditorTemplates.getEditor('comboboxUndo'),
    valuesArray: [
        { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraPrinting.SizeMode.Custom' },
        { value: 'AutoWidth', displayValue: 'Auto Width', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoWidth' },
        { value: 'AutoHeight', displayValue: 'Auto Height', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoHeight' },
        { value: 'AutoSize', displayValue: 'Auto Size', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoSize' }
    ]
};
const wordWrap = { propertyName: 'wordWrap', modelName: '@WordWrap', defaultVal: true, from: parseBool, displayName: 'Word Wrap', localizationId: 'DevExpress.XtraReports.UI.XRControl.WordWrap', editor: editorTemplates.getEditor('bool') };
export const characterCombFont = { propertyName: 'font', modelName: '@Font', displayName: 'Font', localizationId: 'DevExpress.XtraReports.UI.XRControl.Font', editor: designerEditorTemplates.getEditor('fontUndo') };
export const characterCombBorders = { propertyName: 'borders', modelName: '@Borders', displayName: 'Borders', localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', defaultVal: 'All', editor: editorTemplates.getEditor('borders') };
export const characterCombBorderDashStyle = $.extend({}, borderDashStyle, { valuesArray: borderDashStyleValues });
export const characterCombSerializationsInfo = [
    accessibleRole, styleName, evenStyleName, oddStyleName, stylePriority, canPublish, backColor, autoWidth, action,
    formattingRuleLinks, cellSizeMode, wordWrap, cellWidth, cellHeight, cellVerticalSpacing, cellHorizontalSpacing, dataBindings(['Text']),
    textAlignment, text, textFormatString, textArea, nullValueText, keepTogetherDefaultValueFalse, summary, multiline, wordWrap,
    xlsxFormatString, rtl, characterCombBorders, borderWidth, characterCombBorderDashStyle, borderColor, characterCombFont, foreColor, editOptions, interactiveSorting
].concat(createSinglePopularBindingInfos('Text'), baseControlProperties, navigationGroup, canGrowShrinkGroup, processGroup, sizeLocation);
