﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_value.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../_editorTemplates';
export const commonValueSerializationsInfo = [
    { propertyName: 'value', displayName: 'Value', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
];
export const valueWeightSerializationsInfo = [
    { propertyName: 'value', displayName: 'Value', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
    { propertyName: 'weight', displayName: 'Weight', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraPivotGrid.PivotKPIType.Weight' },
];
export const value1Value2SerializationsInfo = [
    { propertyName: 'value1', displayName: 'Value 1', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.ValueLevel.Value_1' },
    { propertyName: 'value2', displayName: 'Value 2', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.ValueLevel.Value_2' },
];
export const stockValueSerializationsInfo = [
    { propertyName: 'low', displayName: 'Low', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Low' },
    { propertyName: 'high', displayName: 'High', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.High' },
    { propertyName: 'open', displayName: 'Open', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Open' },
    { propertyName: 'close', displayName: 'Close', editor: editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Close' },
];