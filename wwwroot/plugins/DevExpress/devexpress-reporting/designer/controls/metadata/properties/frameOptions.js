﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\frameOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { colorFromString, colorToString } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates as analyticEditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const defaultFrameOptionsSerializationInfo = { propertyName: 'name', modelName: '@Name' };
const frameOptionsCorner = [
    defaultFrameOptionsSerializationInfo,
    { propertyName: 'frameColor', modelName: '@FrameColor', displayName: 'Frame Color', from: colorFromString, toJsonObject: colorToString, editor: analyticEditorTemplates.getEditor('customColorEditor'), defaultVal: 'black', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.FrameColor' },
    { propertyName: 'frameWidth', modelName: '@FrameWidth', displayName: 'Frame Width', editor: analyticEditorTemplates.getEditor('numeric'), defaultVal: 2, localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.FrameWidth' },
    { propertyName: 'padding', modelName: '@Padding', defaultVal: '5,5,5,5,96' },
    { propertyName: 'paddingObj', displayName: 'Padding', editor: analyticEditorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.Padding' },
    { propertyName: 'text', modelName: '@Text', defaultVal: '', displayName: 'Text', editor: analyticEditorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.Text' },
    { propertyName: 'textAlignment', modelName: '@TextAlignment', displayName: 'Text Alignment', editor: analyticEditorTemplates.getEditor('combobox'), localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.TextAlignment', valuesArray: [
            { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextAlignment.Center' },
            { value: 'Baseline', displayValue: 'Baseline', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextAlignment.Baseline' },
        ], defaultVal: 'Center' },
    { propertyName: 'textColor', modelName: '@TextColor', displayName: 'Text Color', from: colorFromString, toJsonObject: colorToString, editor: analyticEditorTemplates.getEditor('customColorEditor'), defaultVal: 'black', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.TextColor' },
    { propertyName: 'textPosition', modelName: '@TextPosition', displayName: 'Text Position', editor: analyticEditorTemplates.getEditor('combobox'), localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.TextPosition', valuesArray: [
            { value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextPosition.Top' },
            { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextPosition.Bottom' },
            { value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextPosition.Left' },
            { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameTextPosition.Right' },
        ], defaultVal: 'Bottom' },
];
const frameOptionsRectangle = [
    { propertyName: 'cornerRadius', modelName: '@CornerRadius', displayName: 'Corner Radius', editor: analyticEditorTemplates.getEditor('numeric'), defaultVal: 2, localizationId: 'DevExpress.XtraPrinting.BarCode.QRFrameOptions.CornerRadius' }
].concat(frameOptionsCorner);
export const frameOptionsTypes = [
    { value: 'Corner', displayValue: 'Corner', localizationId: 'DevExpress.XtraPrinting.BarCode.CornerQRFrameOptions' },
    { value: 'Rectangle', displayValue: 'Rectangle', localizationId: 'DevExpress.XtraPrinting.BarCode.RectangleQRFrameOptions' },
];
export const FrameOptionsTypesEPC = frameOptionsTypes.concat([
    { value: 'PaymentServicesAustria', displayValue: 'Payment Services Austria Frame', localizationId: 'DevExpress.XtraPrinting.BarCode.PaymentServicesAustriaQRFrameOptions' },
]);
export const frameOptionsMap = {
    'Rectangle': frameOptionsRectangle,
    'Corner': frameOptionsCorner,
    'PaymentServicesAustria': [defaultFrameOptionsSerializationInfo]
};
