﻿/**
* DevExpress Analytics (query-builder\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from './widgets/editorTemplates';
import { Size } from '../core/elements/size';
import { Point } from '../core/elements/point';
export const name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.DataAccess.Sql.SqlQuery.Name', disabled: true, editor: editorTemplates.getEditor('text') };
export const alias = { propertyName: 'alias', modelName: '@Alias', displayName: 'Alias', localizationId: 'DataAccessUIStringId.QueryBuilderColumns_Alias', defaultVal: '', editor: editorTemplates.getEditor('text') };
export const text = { propertyName: 'text', modelName: '@Text', displayName: 'Text', editor: editorTemplates.getEditor('text') };
export const selected = { propertyName: 'selected', displayName: 'Output', editor: editorTemplates.getEditor('bool'), localizationId: 'DataAccessUIStringId.QueryBuilderColumns_Output' };
export const size = { propertyName: 'size', modelName: '@Size', defaultVal: '100,125', from: Size.fromString };
export const location = { propertyName: 'location', modelName: '@Location', from: Point.fromString };
export const sizeLocation = [size, location];
export const unknownSerializationsInfo = [name].concat(sizeLocation);