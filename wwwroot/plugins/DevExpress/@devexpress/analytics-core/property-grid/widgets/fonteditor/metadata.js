﻿/**
* DevExpress Analytics (property-grid\widgets\fonteditor\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../editorsInfo';
import { availableFonts } from './_fonts';
import { availableUnits } from './_model';
export const fontName = {
    propertyName: 'family', displayName: 'Font Name', localizationId: 'AnalyticsCoreStringId.FormatFontName',
    editor: editorTemplates.getEditor('combobox'), values: availableFonts, editorOptions: { searchEnabled: true }
};
export const fontSize = {
    propertyName: 'size', displayName: 'Size', localizationId: 'AnalyticsCoreStringId.Font.Size', editor: editorTemplates.getEditor('numeric')
};
export const fontSizeUnit = {
    propertyName: 'unit', displayName: 'Unit', localizationId: 'AnalyticsCoreStringId.Font.Unit', editor: editorTemplates.getEditor('combobox'),
    valuesArray: availableUnits
};
export const fontInfo = [
    fontName,
    fontSize,
    fontSizeUnit,
    { propertyName: 'modificators', editor: editorTemplates.getEditor('modificators') },
];
