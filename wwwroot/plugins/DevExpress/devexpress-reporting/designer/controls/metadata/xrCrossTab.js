﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCrossTab.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataMember, dataSource, filterString, filterStringEditable } from './../../controls/metadata/properties/metadata';
import { columnDefinitions, rowDefinitions } from './crosstab/defenitions';
import { columnFields, dataFields, rowFields } from './crosstab/fields';
import { crossTabLayoutOptions } from './crosstab/layoutOptions';
import { crossTabPrintOptions } from './crosstab/printOptions';
import { baseControlProperties, bookmarkGroup, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { crossTabStyles } from './properties/style';
import { controlParametersInfo } from './xrChart';
const cells = { propertyName: 'cells', modelName: 'Cells', array: true };
const originalPivotGridLayout = { propertyName: 'originalPivotGridLayout', modelName: '@OriginalPivotGridLayout', defaultVal: '' };
export const crossTabSerializationInfo = [rowFields, columnFields, dataFields, rowDefinitions,
    columnDefinitions, dataSource, dataMember, crossTabLayoutOptions, crossTabPrintOptions,
    originalPivotGridLayout, controlParametersInfo, controlScripts, filterString, filterStringEditable].concat(baseControlProperties, sizeLocation, bookmarkGroup, cells, crossTabStyles);