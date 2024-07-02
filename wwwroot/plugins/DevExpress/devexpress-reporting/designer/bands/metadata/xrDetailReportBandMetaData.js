﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrDetailReportBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { datasourcePrintOptionsGroup } from '../../controls/metadata/properties/metadataGroups';
import { detailReportBandScripts } from '../../controls/metadata/properties/scriptMetadata';
import { drillDownControl, drillDownDetailReportExpanded, height, level, pageBreak } from './bandsMetadata';
import { commonBandSerializationInfo } from './xrBandMetaData';
export const detailReportBandSerializationInfo = [
    level, height, pageBreak, detailReportBandScripts,
    drillDownDetailReportExpanded,
    drillDownControl,
].concat(commonBandSerializationInfo, datasourcePrintOptionsGroup).filter((x) => x.propertyName !== 'bands').concat([{
        propertyName: 'bands',
        modelName: 'Bands',
        array: true
    }]);
export const popularPropertiesDetailReport = ['dataSource', 'dataMember', 'dataAdapter', 'filterString'];
