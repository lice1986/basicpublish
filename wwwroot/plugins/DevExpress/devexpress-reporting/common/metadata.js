﻿/**
* DevExpress HTML/JS Reporting (common\metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements-native';
import { colorFromString, colorToString, floatFromModel } from '@devexpress/analytics-core/analytics-utils-native';
export const previewBackColor = { propertyName: 'backColor', modelName: '@BackColor', from: colorFromString, toJsonObject: colorToString };
export const previewSides = { propertyName: 'borders', modelName: '@Sides' };
export const previewBorderColor = { propertyName: 'borderColor', modelName: '@BorderColor', from: colorFromString, toJsonObject: colorToString };
export const previewBorderStyle = { propertyName: 'borderStyle', modelName: '@BorderStyle' };
export const previewBorderDashStyle = { propertyName: 'borderDashStyle', modelName: '@BorderDashStyle' };
export const previewBorderWidth = { propertyName: 'borderWidth', modelName: '@BorderWidthSerializable', from: floatFromModel };
export const previewForeColor = { propertyName: 'foreColor', modelName: '@ForeColor', from: colorFromString, toJsonObject: colorToString };
export const previewFont = { propertyName: 'font', modelName: '@Font' };
export const previewPadding = { propertyName: 'padding', modelName: '@Padding', from: PaddingModel.from };
export const previewTextAlignment = { propertyName: 'textAlignment', modelName: '@TextAlignment' };
export const brickStyleSerializationsInfo = [
    previewBackColor,
    previewSides,
    previewBorderColor,
    previewBorderStyle,
    previewBorderDashStyle,
    previewBorderWidth,
    previewForeColor,
    previewFont,
    previewPadding,
    previewTextAlignment
];
