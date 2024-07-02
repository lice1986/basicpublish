﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrRichText.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { createPopularBindingInfo } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { accessibleDescription, keepTogetherDefaultValueFalse, nullValueText } from './properties/metadata';
import { canGrowShrinkGroup, commonControlProperties, fontGroup, navigationGroup, processGroup, sizeLocation } from './properties/metadataGroups';
import { textControlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const rtf = { propertyName: '_rtf', defaultVal: '', displayName: 'RTF', editor: editorTemplates.getEditor('stringArray'), localizationId: 'ASPxReportsStringId.ExportName_rtf' };
export const textRtf = { propertyName: 'textRtf', defaultVal: '', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRRichTextBase.RtfText', editor: editorTemplates.getEditor('stringArray') };
export const serializableRtfString = { propertyName: 'serializableRtfString', modelName: '@SerializableRtfString' };
export const newDocumentData = { propertyName: '_newDocumentData', displayName: 'Load File', localizationId: 'AnalyticsCoreStringId.UploadFile', editor: designerEditorTemplates.getEditor('richTextLoad') };
export const richTextSerializationsInfo = [
    serializableRtfString,
    rtf, textRtf, action,
    newDocumentData,
    nullValueText, keepTogetherDefaultValueFalse, anchorVertical, anchorHorizontal, textControlScripts,
    dataBindings(['Bookmark', 'Html', 'NavigateUrl', 'Rtf', 'Tag']),
    createPopularBindingInfo({ bindingName: 'Html', propertyName: 'popularDataBindingHtml', displayName: 'Html Data Binding', localizationId: 'ReportStringId.STag_Name_HtmlDataBinding' }, false),
    createPopularBindingInfo({ bindingName: 'Html', propertyName: 'popularExpressionHtml', displayName: 'Html Expression', localizationId: 'ReportStringId.STag_Name_HtmlExpressionBinding' }),
    createPopularBindingInfo({ bindingName: 'Rtf', propertyName: 'popularDataBindingRtf', displayName: 'Rtf Data Binding', localizationId: 'ReportStringId.STag_Name_RtfDataBinding' }, false),
    createPopularBindingInfo({ bindingName: 'Rtf', propertyName: 'popularExpressionRtf', displayName: 'Rtf Expression', localizationId: 'ReportStringId.STag_Name_RtfExpressionBinding' }),
].concat(sizeLocation, fontGroup, commonControlProperties, navigationGroup, processGroup, canGrowShrinkGroup).filter(x => x != accessibleDescription);
export const popularPropertiesRichText = ['rtf', 'popularDataBindingRtf', 'popularExpressionRtf', 'html', 'popularDataBindingHtml', 'popularExpressionHtml', '_newDocumentData', 'bookmark', 'bookmarkParent', 'canGrow', 'canShrink'];