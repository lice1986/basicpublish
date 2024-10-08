﻿/**
* DevExpress Analytics (query-builder\elements\columnModelMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { name, selected } from '../metadata';
import { editorTemplates } from '../widgets/editorTemplates';
export const AggregationType = {
    None: 'None',
    Count: 'Count',
    Max: 'Max',
    Min: 'Min',
    Avg: 'Avg',
    Sum: 'Sum',
    CountDistinct: 'CountDistinct',
    AvgDistinct: 'AvgDistinct',
    SumDistinct: 'SumDistinct'
};
export const columnSerializationInfo = [
    name,
    { propertyName: 'displayType', displayName: 'Type', localizationId: 'DataAccessUIStringId.ParametersColumn_Type', disabled: true, editor: editorTemplates.getEditor('text') },
    { propertyName: 'alias', displayName: 'Alias', localizationId: 'DataAccessUIStringId.QueryBuilderColumns_Alias', editor: editorTemplates.getEditor('text') },
    selected,
    {
        propertyName: 'sortingType',
        displayName: 'Sort Type',
        editor: editorTemplates.getEditor('combobox'),
        defaultVal: 'Unsorted',
        valuesArray: [
            { value: 'Unsorted', displayValue: 'Unsorted', localizationId: 'DataAccessUIStringId.SortingTypeNone' },
            { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DataAccessUIStringId.SortingTypeAscending' },
            { value: 'Descending', displayValue: 'Descending', localizationId: 'DataAccessUIStringId.SortingTypeDescending' }
        ],
        localizationId: 'AnalyticsCoreStringId.QueryBuilder_SortType'
    },
    { propertyName: 'sortOrder', displayName: 'Sort Order', editor: editorTemplates.getEditor('numeric'), localizationId: 'DataAccessUIStringId.QueryBuilderColumns_SortOrder' },
    { propertyName: 'groupBy', displayName: 'Group By', editor: editorTemplates.getEditor('bool'), defaultVal: false, localizationId: 'DataAccessUIStringId.QueryBuilderColumns_GroupBy' },
    {
        propertyName: 'aggregate',
        displayName: 'Aggregate',
        editor: editorTemplates.getEditor('comboboxUndo'),
        values: AggregationType,
        defaultVal: AggregationType.None,
        localizationId: 'DataAccessUIStringId.QueryBuilderColumns_Aggregate'
    }
];
