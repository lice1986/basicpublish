﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\sortingOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
const sortingFieldName = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.SortingOptions.FieldName', defaultVal: '', editor: designerEditorTemplates.getEditor('fieldsCombobox') }, targetBand = { propertyName: 'targetBand', modelName: '@TargetBand', link: true, displayName: 'Target Band', localizationId: 'DevExpress.XtraReports.UI.SortingOptions.TargetBand', editor: designerEditorTemplates.getEditor('sortingBand') };
export const sortingOptionsSerializationsInfo = [targetBand, sortingFieldName];
export const interactiveSorting = { propertyName: 'interactiveSorting', modelName: 'InteractiveSorting', displayName: 'Interactive Sorting', localizationId: 'DevExpress.XtraReports.UI.XRLabel.InteractiveSorting', info: sortingOptionsSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
