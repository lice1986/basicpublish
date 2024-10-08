﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrSubreport.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates as analyticsEditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { SubreportViewModel } from '../subreportViewModel';
import { ParameterBinding } from '../xrSubreportParameterBinding';
import { formattingRuleLinks } from './properties/formattingRulesLink';
import { bookmarkParent, canShrink, tag } from './properties/metadata';
import { baseControlProperties, sizeLocation } from './properties/metadataGroups';
import { subreportScripts } from './properties/scriptMetadata';
export const reportSourceUrl = { propertyName: 'reportSourceUrl', modelName: '@ReportSourceUrl', defaultVal: '', editor: designerEditorTemplates.getEditor('reportSourceUrl'), displayName: 'Report Source Url', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.ReportSourceUrl' };
export const reportSource = {
    propertyName: 'reportSource', modelName: 'ReportSource',
    from: SubreportViewModel.from,
    toJsonObject: SubreportViewModel.toJson
};
export const parameterBindings = { propertyName: 'parameterBindings', modelName: 'ParameterBindings', displayName: 'Parameter Bindings', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.ParameterBindings', array: true, editor: analyticsEditorTemplates.getEditor('commonCollection'), addHandler: ParameterBinding.createNew, template: '#dxrd-commonCollectionItem' };
export const generateOwnPages = { propertyName: 'generateOwnPages', defaultVal: false, modelName: '@GenerateOwnPages', displayName: 'Generate Own Pages', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.GenerateOwnPages', descriptionLocalizationId: 'DevExpress.XtraReports.UI.SubreportBase.GenerateOwnPages.Description', editor: analyticsEditorTemplates.getEditor('bool'), from: parseBool };
export const subreportSerializationsInfo = [
    reportSource, reportSourceUrl, subreportScripts, parameterBindings, bookmarkParent, canShrink, generateOwnPages, formattingRuleLinks
].concat(sizeLocation, baseControlProperties.filter(x => x.modelName != tag.modelName));
