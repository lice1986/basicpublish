﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCheckbox.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { CheckEditOptions } from '../properties/editOptions';
import { GlyphOptions } from '../properties/glyphOptions';
import { createPopularBindingInfos } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { editOptions } from './properties/editOptions';
import { keepTogether, rtl, text, textAlignment, textFormatString, textTrimming, wordWrap, xlsxFormatString } from './properties/metadata';
import { commonControlProperties, fontGroup, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { textControlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const checkState = {
    propertyName: 'checkBoxState',
    modelName: '@CheckBoxState', displayName: 'Check Box State', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState', editor: editorTemplates.getEditor('combobox'),
    defaultVal: 'Unchecked',
    valuesArray: [
        { value: 'Unchecked', displayValue: 'Unchecked', localizationId: 'StringId.CheckUnchecked' },
        { value: 'Checked', displayValue: 'Checked', localizationId: 'StringId.CheckChecked' },
        { value: 'Indeterminate', displayValue: 'Indeterminate', localizationId: 'StringId.CheckIndeterminate' }
    ]
};
export const checked = { propertyName: 'checked', modelName: '@Checked', defaultVal: false, from: parseBool, displayName: 'Checked', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.Checked', editor: editorTemplates.getEditor('bool') };
export const glyphOptions = {
    propertyName: 'glyphOptions',
    modelName: 'GlyphOptions',
    displayName: 'Glyph Options',
    localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.GlyphOptions',
    editor: editorTemplates.getEditor('objecteditor'),
    from: (model, serializer) => new GlyphOptions(model, serializer),
    toJsonObject: (value, serializer) => serializer.serialize(value)
};
export const checkEditOptions = $.extend({}, editOptions, {
    propertyName: 'checkEditOptions',
    from: (model, serializer) => new CheckEditOptions(model, serializer)
});
const checkboxTextFormatString = Object.assign(Object.assign({}, textFormatString), { descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRCheckBox.TextFormatString.Description' });
const checkboxTextTrimming = Object.assign(Object.assign({}, textTrimming), { descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRCheckBox.TextTrimming.Description' });
export const checkboxSerializationsInfo = [
    checkState, checked, text, action, checkboxTextFormatString, wordWrap, keepTogether, anchorVertical, anchorHorizontal, glyphOptions,
    $.extend({}, textAlignment, { defaultVal: 'MiddleLeft' }),
    textControlScripts, checkboxTextTrimming, xlsxFormatString,
    dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark', 'CheckBoxState']),
    rtl,
    checkEditOptions
].concat(createPopularBindingInfos({ propertyName: 'CheckBoxState', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState' }), createPopularBindingInfos({ propertyName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.Text' }), sizeLocation, commonControlProperties, fontGroup, navigationGroup);
export const popularPropertiesCheckBox = ['checkBoxState', 'popularDataBindingCheckState', 'text', 'popularDataBindingText', 'glyphOptions', 'bookmark', 'bookmarkParent', 'textFormatString', 'alignment'];
