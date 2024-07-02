﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableCell.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { createSinglePopularBindingInfos } from '../utils/_metaUtils';
import { textEditOptions } from './properties/editOptions';
import { accessibleRole, allowMarkupText, defaultAccessibleRole, textTrimming } from './properties/metadata';
import { labelGroup } from './properties/metadataGroups';
import { labelScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
import { extend } from '@devexpress/analytics-core/analytics-internal';
export const weight = { propertyName: 'weight', localizable: true, modelName: '@Weight', defaultVal: 0, from: floatFromModel };
export const rowSpan = { propertyName: 'rowSpan', modelName: '@RowSpan', displayName: 'Row Span', localizationId: 'DevExpress.XtraReports.UI.XRTableCell.RowSpan', defaultVal: 1, editor: editorTemplates.getEditor('numeric') };
const accessibleRoleCell = extend({}, accessibleRole, { valuesArray: [
        defaultAccessibleRole,
        { value: 'TableHeaderCell', displayValue: 'Table Header Cell', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.TableHeaderCell' }
    ] });
export const tableCellSerializationsInfo = [
    accessibleRoleCell,
    weight, labelScripts, rowSpan, textTrimming,
    { propertyName: 'width', displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width' },
    { propertyName: 'controls', modelName: 'Controls', array: true },
    dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark']),
    textEditOptions, allowMarkupText, action
].concat(createSinglePopularBindingInfos('Text'), labelGroup);
export const popularPropertiesTableCell = ['text', 'textArea', 'popularDataBinding', 'textFormatString', 'Summary', 'canGrow', 'canShrink', 'multiline', 'wordWrap'];
