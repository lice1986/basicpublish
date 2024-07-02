﻿/**
* DevExpress Analytics (diagram\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../property-grid/widgets/editorsInfo';
import { nameValidationRules } from '../core/internal/_validation';
import { Size } from '../core/elements/size';
import { Point } from '../core/elements/point';
export const name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', editor: editorTemplates.getEditor('text'), validationRules: nameValidationRules };
export const text = { propertyName: 'text', modelName: '@Text', displayName: 'Text', editor: editorTemplates.getEditor('text') };
export const size = { propertyName: 'size', modelName: '@Size', defaultVal: '100,50', from: Size.fromString, displayName: 'Size', editor: editorTemplates.getEditor('objecteditor') };
export const location = { propertyName: 'location', modelName: '@Location', from: Point.fromString, displayName: 'Location', editor: editorTemplates.getEditor('objecteditor') };
export const sizeLocation = [size, location];
export const unknownSerializationsInfo = [name].concat(sizeLocation);