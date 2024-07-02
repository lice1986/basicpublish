﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrVerticalBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { keepTogetherDefaultValueFalse } from '../../controls/metadata/properties/metadata';
import { repeatEveryPage } from './bandsMetadata';
import { bandSerializationInfo } from './xrBandMetaData';
const width = { propertyName: 'width', modelName: '@WidthF', defaultVal: 300, editor: editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', from: floatFromModel, localizable: true };
export const commonVerticalBandProperties = [width, keepTogetherDefaultValueFalse].concat(bandSerializationInfo);
export const bandLayout = {
    propertyName: 'bandLayout',
    modelName: '@BandLayout',
    displayName: 'Band Layout',
    localizationId: 'DevExpress.XtraReports.UI.VerticalDetailBand.BandLayout',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'AcrossOnly', displayValue: 'Across Only', localizationId: 'DevExpress.XtraReports.UI.VerticalBandLayout.AcrossOnly' },
        { value: 'AcrossThenDown', displayValue: 'Across Then Down', localizationId: 'DevExpress.XtraReports.UI.VerticalBandLayout.AcrossThenDown' }
    ],
    defaultVal: 'AcrossOnly'
};
export const verticalHeaderBandSerializationInfo = [repeatEveryPage].concat(commonVerticalBandProperties);
export const popularPropertiesVerticalHeaderBand = ['repeatEveryPage'];
export const verticalTotalBandSerializationInfo = [].concat(commonVerticalBandProperties);
export const popularPropertiesVerticalTotalBand = [];