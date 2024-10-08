﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\defenitions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { autoSizeMode } from './xrCrossTabCell';
export const crossTabCellWidth = { propertyName: 'width', modelName: '@Width', localizationId: 'AnalyticsCoreStringId.SizeF.Width', defaultVal: 100, from: floatFromModel };
const autoWidthMode = { propertyName: 'autoWidthMode', modelName: '@AutoWidthMode', defaultVal: 'None', valuesArray: autoSizeMode };
const visible = { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: parseBool };
export const crossTabColumnDefinitionInfo = [crossTabCellWidth, autoWidthMode, visible];
export const crossTabCellHeight = { propertyName: 'height', modelName: '@Height', displayName: 'Height', localizationId: 'AnalyticsCoreStringId.SizeF.Height', defaultVal: 25, from: floatFromModel };
const autoHeightMode = { propertyName: 'autoHeightMode', modelName: '@AutoHeightMode', defaultVal: 'None', valuesArray: autoSizeMode };
export const crossTabRowDefinitionInfo = [crossTabCellHeight, autoHeightMode, visible];
export const rowDefinitions = { propertyName: '_rowDefinitions', modelName: 'RowDefinitions', array: true, alwaysSerialize: true };
export const columnDefinitions = { propertyName: '_columnDefinitions', modelName: 'ColumnDefinitions', array: true, alwaysSerialize: true };
