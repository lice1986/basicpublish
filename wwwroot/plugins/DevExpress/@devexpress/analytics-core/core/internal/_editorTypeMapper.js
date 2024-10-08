﻿/**
* DevExpress Analytics (core\internal\_editorTypeMapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
export const ExpressionType = 'DevExpress.DataAccess.Expression';
export function IsDataAccessExpression(type) {
    return type === ExpressionType;
}
export const editorTypeMapper = {
    'Enum': editorTemplates.getEditor('combobox'),
    'System.String': editorTemplates.getEditor('text'),
    'System.Guid': editorTemplates.getEditor('guid'),
    'System.SByte': editorTemplates.getEditor('sbyte'),
    'System.Decimal': editorTemplates.getEditor('decimal'),
    'System.Int64': editorTemplates.getEditor('int64'),
    'System.Int32': editorTemplates.getEditor('int32'),
    'System.Int16': editorTemplates.getEditor('int16'),
    'System.Single': editorTemplates.getEditor('single'),
    'System.Double': editorTemplates.getEditor('double'),
    'System.Byte': editorTemplates.getEditor('byte'),
    'System.UInt16': editorTemplates.getEditor('uint16'),
    'System.UInt32': editorTemplates.getEditor('uint32'),
    'System.UInt64': editorTemplates.getEditor('uint64'),
    'System.Boolean': editorTemplates.getEditor('boolSelect'),
    'System.DateTime': editorTemplates.getEditor('date'),
    'DevExpress.DataAccess.Expression': editorTemplates.getEditor('expressionEditor')
};
export function getEditorType(typeString) {
    return editorTypeMapper[typeString] || editorTemplates.getEditor('text');
}
