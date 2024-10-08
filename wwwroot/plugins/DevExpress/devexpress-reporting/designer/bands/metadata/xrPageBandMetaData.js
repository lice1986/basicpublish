﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrPageBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { commonBandScripts } from '../../controls/metadata/properties/scriptMetadata';
import { printAcrossBands } from './bandsMetadata';
import { bandSerializationInfo } from './xrBandMetaData';
export const printOn = {
    propertyName: 'printOn',
    modelName: '@PrintOn', displayName: 'Print On', localizationId: 'DevExpress.XtraReports.UI.PageBand.PrintOn', defaultVal: 'AllPages',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'AllPages', displayValue: 'All Pages', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.AllPages' },
        { value: 'NotWithReportHeader', displayValue: 'Not with Report Header', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeader' },
        { value: 'NotWithReportFooter', displayValue: 'Not with Report Footer', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportFooter' },
        { value: 'NotWithReportHeaderAndReportFooter', displayValue: 'Not with Report Header and Report Footer', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeaderAndReportFooter' }
    ]
};
export const pageBandSerializationInfoPageHeader = [printOn, commonBandScripts].concat(bandSerializationInfo);
export const pageBandSerializationInfo = [printOn, commonBandScripts].concat(bandSerializationInfo);
export const popularPropertiesPageHeader = ['printOn', printAcrossBands.propertyName];
export const popularPropertiesPageFooter = ['printOn'];
