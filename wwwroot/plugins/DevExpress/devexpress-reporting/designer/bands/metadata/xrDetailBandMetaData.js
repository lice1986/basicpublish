﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrDetailBandMetaData.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { keepTogetherDefaultValueFalse } from '../../controls/metadata/properties/metadata';
import { commonBandScripts } from '../../controls/metadata/properties/scriptMetadata';
import { evenStyleName, oddStyleName } from '../../controls/metadata/properties/style';
import { GroupFieldModel } from '../groupfield';
import { drillDownControl, drillDownDetailReportExpanded, keepTogetherWithDetailReports, level, pageBreak, printAcrossBands } from './bandsMetadata';
import { multiColumn } from './multiColumnMetaData';
import { bandSerializationInfo } from './xrBandMetaData';
export const sortFields = {
    propertyName: 'sortFields',
    modelName: 'SortFields', displayName: 'Sort Fields', localizationId: 'DevExpress.XtraReports.UI.DetailBand.SortFields', array: true, editor: editorTemplates.getEditor('commonCollection'),
    addHandler: GroupFieldModel.createNew, template: '#dxrd-collection-item-group',
    getChildCaption: (index) => {
        if (index === 0)
            return getLocalization('Sort By', 'ASPxReportsStringId.ReportDesigner_SortFields_SortBy');
        return getLocalization('Then By', 'ASPxReportsStringId.ReportDesigner_SortFields_ThenBy');
    }
};
const hierarchyPrintOptionsSerializationsInfo = [
    {
        propertyName: 'childListFieldName',
        modelName: '@ChildListFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.ChildListFieldName',
        displayName: 'Child List Field Name',
        editor: editorTemplates.getEditor('field')
    }, {
        propertyName: 'keyFieldName',
        modelName: '@KeyFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.KeyFieldName',
        displayName: 'Key Field Name',
        editor: editorTemplates.getEditor('field')
    }, {
        propertyName: 'parentFieldName',
        modelName: '@ParentFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.ParentFieldName',
        displayName: 'Parent Field Name',
        editor: editorTemplates.getEditor('field')
    }, {
        propertyName: 'indent',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.Indent',
        modelName: '@Indent',
        defaultVal: 20,
        displayName: 'Indent',
        editor: editorTemplates.getEditor('numeric')
    }, {
        propertyName: 'keepTogetherWithFirstChild',
        modelName: '@KeepTogetherWithFirstChild',
        defaultVal: true,
        displayName: 'Keep Together With First Child',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.KeepTogetherWithFirstChild',
        editor: editorTemplates.getEditor('bool'),
        from: parseBool
    }
];
export const hierarchyPrintOptions = {
    modelName: 'HierarchyPrintOptions',
    propertyName: 'hierarchyPrintOptions',
    info: hierarchyPrintOptionsSerializationsInfo,
    localizationId: 'DevExpress.XtraReports.UI.DetailBand.HierarchyPrintOptions',
    displayName: 'Hierarchy Print Options',
    editor: editorTemplates.getEditor('objecteditor')
};
export const fillEmptySpace = { propertyName: 'fillEmptySpace', modelName: '@FillEmptySpace', defaultVal: false, from: parseBool, displayName: 'Fill Empty Space', localizationId: 'DevExpress.XtraReports.UI.DetailBand.FillEmptySpace', editor: editorTemplates.getEditor('bool') };
export const generalBandSerializationInfo = [
    evenStyleName, oddStyleName,
    keepTogetherDefaultValueFalse,
    pageBreak, commonBandScripts
].concat(bandSerializationInfo);
export const subBandSerializationInfo = [
    level
].concat(generalBandSerializationInfo);
export const generalBandPopularProperties = ['pageBreak', 'keepTogether', printAcrossBands.propertyName];
export const detailBandSerializationInfo = generalBandSerializationInfo.concat(drillDownDetailReportExpanded, hierarchyPrintOptions, drillDownControl, keepTogetherWithDetailReports, fillEmptySpace, sortFields, multiColumn);
export const popularPropertiesDetail = generalBandPopularProperties.concat('sortFields', 'keepTogetherWithDetailReports', fillEmptySpace.propertyName, 'multiColumn');
