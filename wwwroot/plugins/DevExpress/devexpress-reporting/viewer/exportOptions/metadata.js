﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { rtfExportMode, getExportModeValues, docxExportMode, htmlExportMode, xlsExportMode, imageExportMode, xlsxExportMode } from '../../common/exportOptions/metadata';
import { extend } from '@devexpress/analytics-core/analytics-internal-native';
import { currentMultiPlatformEngine, nativeMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export const rtfExportModeMergedPreview = extend({}, rtfExportMode, {
    valuesArray: getExportModeValues('Rtf', true, true)
});
export const docxExportModeMergedPreview = extend({}, docxExportMode, {
    valuesArray: getExportModeValues('Docx', true, true)
});
export const excludeModesForMergedDocuments = 'SingleFilePageByPage';
export const exportModePreviewBase = {
    from: (val, serializer) => {
        const engine = serializer.engineType === 'multiplatform' ? currentMultiPlatformEngine : nativeMultiPlatformEngine;
        return engine.wrap(val === 'DifferentFiles' ? 'SingleFile' : val);
    }
};
export const htmlExportModePreviewBase = {
    propertyName: htmlExportMode.propertyName, modelName: htmlExportMode.modelName, defaultVal: htmlExportMode.defaultVal,
    editor: htmlExportMode.editor, displayName: htmlExportMode.displayName, localizationId: htmlExportMode.localizationId
};
export const htmlExportModePreview = extend({}, htmlExportModePreviewBase, exportModePreviewBase, {
    valuesArray: getExportModeValues('Html', true)
});
export const htmlExportModeMergedPreview = extend({}, htmlExportModePreviewBase, {
    valuesArray: getExportModeValues('Html', true, true)
});
export const xlsExportModePreviewBase = {
    propertyName: xlsExportMode.propertyName, modelName: xlsExportMode.modelName, defaultVal: xlsExportMode.defaultVal,
    editor: xlsExportMode.editor, displayName: xlsExportMode.displayName, localizationId: xlsExportMode.localizationId
};
export const xlsExportModePreview = extend({}, xlsExportModePreviewBase, exportModePreviewBase, {
    valuesArray: getExportModeValues('Xls', true)
});
export const xlsExportModeMergedPreview = extend({}, xlsExportModePreviewBase, {
    valuesArray: getExportModeValues('Xls', true, true)
});
export const imageExportModePreviewBase = {
    propertyName: imageExportMode.propertyName, modelName: imageExportMode.modelName, defaultVal: imageExportMode.defaultVal,
    editor: imageExportMode.editor, displayName: imageExportMode.displayName, localizationId: imageExportMode.localizationId
};
export const imageExportModePreview = extend({}, imageExportModePreviewBase, exportModePreviewBase, {
    valuesArray: getExportModeValues('Image', true)
});
export const imageExportModeMergedPreview = extend({}, imageExportModePreviewBase, {
    valuesArray: getExportModeValues('Image', true, true)
});
export const xlsxExportModePreviewBase = {
    propertyName: xlsxExportMode.propertyName, modelName: xlsxExportMode.modelName, defaultVal: xlsxExportMode.defaultVal,
    editor: xlsxExportMode.editor, displayName: xlsxExportMode.displayName, localizationId: xlsxExportMode.localizationId
};
export const xlsxExportModePreview = extend({}, xlsxExportModePreviewBase, exportModePreviewBase, {
    valuesArray: getExportModeValues('Xlsx', true)
});
export const xlsxExportModeMergedPreview = extend({}, xlsxExportModePreviewBase, {
    valuesArray: getExportModeValues('Xlsx', true, true)
});