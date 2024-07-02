﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrChart.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { chart as internalChart } from '../../../chart/components/models/_chart';
import { appearanceName, paletteName } from '../../../chart/internal/meta/_chart';
import { chartDataSource } from '../../../chart/internal/_editorTemplates';
import { ControlParameter } from '../properties/controlParameter';
import { imageType, rtl } from './properties/metadata';
import { baseControlProperties, bordersProperties, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { chartScripts } from './properties/scriptMetadata';
import { stylePriority } from './properties/style';
import { action } from './properties/action';
export const chart = { propertyName: 'chart', modelName: 'Chart', from: internalChart.from, toJsonObject: internalChart.toJsonObject };
export const controlParametersInfo = {
    propertyName: 'controlParameters', modelName: 'Parameters', displayName: 'Parameters', localizationId: 'DevExpress.XtraReports.UI.XRChart.Parameters',
    array: true, editor: editorTemplates.getEditor('commonCollection'), addHandler: ControlParameter.createNew, template: '#dxrd-commonCollectionItem'
};
const chartRtl = extend(true, {}, rtl);
chartRtl.defaultVal = undefined;
export const xrChartSerializationInfo = [appearanceName, paletteName, chart, stylePriority, chartDataSource, imageType, chartScripts,
    controlParametersInfo, chartRtl, action,
    { propertyName: 'dataMember', displayName: 'Data Member', localizationId: 'DevExpress.XtraReports.UI.XRChart.DataMember', defaultVal: '', editor: editorTemplates.getEditor('dataMember') }
].concat(baseControlProperties, sizeLocation, bordersProperties, navigationGroup);