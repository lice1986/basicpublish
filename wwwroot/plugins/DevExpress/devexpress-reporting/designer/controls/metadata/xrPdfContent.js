﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPdfContent.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { pageRange } from '../../../common/exportOptions/metadata';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { tag } from './properties/metadata';
import { baseControlProperties, bookmarkGroup, sizeLocation } from './properties/metadataGroups';
import { pdfContentScripts } from './properties/scriptMetadata';
import { generateOwnPages } from './xrSubreport';
export const pdfSource = { propertyName: 'source', modelName: '@SourceSerializable', displayName: 'Source', defaultVal: null, editor: designerEditorTemplates.getEditor('pdfContentLoad'), localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.Source' };
export const pdfSourceUrl = { propertyName: 'sourceUrl', modelName: '@SourceUrl', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'Source Url', localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl' };
const generateOwnPagesPdfContent = extend({}, generateOwnPages, { defaultVal: true, localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.GenerateOwnPages' });
export const pageCount = { propertyName: 'pageCount', modelName: '@PageCount', displayName: 'PageCount', localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.PageCount', editor: editorTemplates.getEditor('numeric'), disabled: true, defaultVal: 0 };
const pageRangePdfContent = extend({}, pageRange, { localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.PageRange' });
export const pdfContentSerializationInfo = [pdfSource, pdfSourceUrl, pdfContentScripts, generateOwnPagesPdfContent, pageRangePdfContent, pageCount, dataBindings(['Bookmark', 'Source', 'SourceUrl', 'PageRange'])].concat(sizeLocation, baseControlProperties, bookmarkGroup, [tag]);
export const popularPropertiesPdfContent = ['name', 'source', 'sourceUrl', 'generateOwnPages'];
