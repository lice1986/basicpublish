﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\glyphOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import { CheckState, GlyphStyle } from '../../../../viewer/editing/models/checkEditingField';
import { getEnumValues } from '../../../../viewer/internal/_utils';
import { getDefaultCheckSize, _getCustomGlyphsInfo } from '../../properties/glyphsInfo';
export const glyphAlignment = {
    propertyName: 'alignment',
    modelName: '@Alignment', displayName: 'Alignment', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.GlyphAlignment',
    editor: editorTemplates.getEditor('combobox'),
    defaultVal: 'Near', valuesArray: [
        { value: 'Near', displayValue: 'Near', localizationId: 'DevExpress.Utils.HorzAlignment.Near' },
        { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.Utils.HorzAlignment.Center' },
        { value: 'Far', displayValue: 'Far', localizationId: 'DevExpress.Utils.HorzAlignment.Far' }
    ]
};
const _checkStates = getEnumValues(CheckState);
const customGlyphChecked = _getCustomGlyphsInfo(_checkStates[CheckState.Checked]);
const customGlyphUnChecked = _getCustomGlyphsInfo(_checkStates[CheckState.Unchecked]);
const customGlyphIndeterminate = _getCustomGlyphsInfo(_checkStates[CheckState.Indeterminate]);
const customGlyphsSerializationInfo = [customGlyphChecked, customGlyphUnChecked, customGlyphIndeterminate];
const customGlyphs = { propertyName: 'customGlyphs', modelName: 'CustomGlyphs', info: customGlyphsSerializationInfo, displayName: 'Custom Glyphs', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.CustomGlyphs', editor: editorTemplates.getEditor('objecteditor') };
const style = {
    propertyName: 'style',
    modelName: '@Style', displayName: 'Glyph Style', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.Style',
    editor: $.extend({}, editorTemplates.getEditor('combobox'), { header: 'dxrd-checkbox-style-combobox' }),
    defaultVal: 'StandardBox1', valuesArray: getEnumValues(GlyphStyle).map(item => ({
        value: item,
        displayValue: item,
        localizationId: 'DevExpress.XtraPrinting.GlyphStyle.' + item,
        templateBinding: (templateName) => ({ name: templateName, if: SvgTemplatesEngine.getExistingTemplate(templateName) })
    }))
};
const size = { propertyName: 'size', modelName: '@Size', from: Size.fromString, defaultVal: getDefaultCheckSize().toString(), displayName: 'Size', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.Size', editor: editorTemplates.getEditor('objecteditor') };
export const glyphOptionsSerializationInfo = [customGlyphs, glyphAlignment, size, style];
