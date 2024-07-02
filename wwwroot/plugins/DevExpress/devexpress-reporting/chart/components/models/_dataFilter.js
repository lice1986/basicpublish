﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataFilter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc, getLocalization } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { editorTemplates as chartEditorTemplates } from '../../internal/_editorTemplates';
export const dataFilterSerializationsInfo = [
    { propertyName: 'columnName', displayName: 'Column Name', editor: ko.bindingHandlers['displayNameExtender'] ? editorTemplates.getEditor('field') : chartEditorTemplates.getEditor('fieldChart'), modelName: '@ColumnNameSerializable', localizationId: 'DevExpress.XtraCharts.DataFilter.ColumnName' },
    {
        propertyName: 'dataType', displayName: 'Data Type', defaultVal: 'System.String', editor: editorTemplates.getEditor('combobox'), modelName: '@DataTypeSerializable',
        valuesArray: [{ value: 'System.Boolean', displayValue: 'System.Boolean' }, { value: 'System.Byte', displayValue: 'System.Byte' }, { value: 'System.Char', displayValue: 'System.Char' }, { value: 'System.DateTime', displayValue: 'System.DateTime' }, { value: 'System.Decimal', displayValue: 'System.Decimal' }, { value: 'System.Double', displayValue: 'System.Double' }, { value: 'System.Guid', displayValue: 'System.Guid' }, { value: 'System.Int16', displayValue: 'System.Int16' }, { value: 'System.Int32', displayValue: 'System.Int32' }, { value: 'System.Int64', displayValue: 'System.Int64' }, { value: 'System.SByte', displayValue: 'System.SByte' }, { value: 'System.Single', displayValue: 'System.Single' }, { value: 'System.String', displayValue: 'System.String' }, { value: 'System.TimeSpan', displayValue: 'System.TimeSpan' }, { value: 'System.UInt16', displayValue: 'System.UInt16' }, { value: 'System.UInt32', displayValue: 'System.UInt32' }, { value: 'System.UInt64', displayValue: 'System.UInt64' }],
        localizationId: 'DevExpress.XtraCharts.DataFilter.DataType'
    },
    {
        propertyName: 'condition', displayName: 'Condition', defaultVal: 'Equal', editor: editorTemplates.getEditor('combobox'), modelName: '@Condition',
        valuesArray: [{ value: 'Equal', displayValue: 'Equal', localizationId: 'DevExpress.XtraCharts.DataFilterCondition.Equal' }, { value: 'GreaterThan', displayValue: 'GreaterThan' }, { value: 'GreaterThanOrEqual', displayValue: 'GreaterThanOrEqual' }, { value: 'LessThan', displayValue: 'LessThan' }, { value: 'LessThanOrEqual', displayValue: 'LessThanOrEqual' }, { value: 'NotEqual', displayValue: 'NotEqual' }],
        localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition'
    },
    { propertyName: 'value', displayName: 'Value', editor: editorTemplates.getEditor('text'), modelName: '@InvariantValueSerializable', localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' }
];
export class DataFilterModel {
    constructor(model, serializer) {
        this.columnName = ko.observable('');
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.name = ko.pureComputed(() => {
            return !!this.columnName() ? this.columnName() : getLocalization('DataFilter', 'ChartStringId.DefaultDataFilterName');
        });
    }
    static createNew() {
        return new (DefaultDataFilterModel())({}, new ModelSerializer());
    }
    getInfo() {
        return dataFilterSerializationsInfo;
    }
}
export const DefaultDataFilterModel = createGlobalModuleVariableFunc(DataFilterModel);
const dataFilters = {
    modelName: 'DataFilters', displayName: 'Data Filters', propertyName: 'dataFilters',
    editor: editorTemplates.getEditor('commonCollection'), array: true, addHandler: DataFilterModel.createNew, template: '#dxrd-collectionItemWithAccordion',
    localizationId: 'DevExpress.XtraCharts.SeriesBase.DataFilters'
};