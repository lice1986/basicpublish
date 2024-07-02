﻿/**
* DevExpress Analytics (query-builder\elements\queryModelMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../widgets/editorTemplates';
import { floatFromModel, parseBool } from '../../core/utils/parsers';
export const querySerializationsInfo = [
    {
        propertyName: '_tablesObject', modelName: 'Tables', info: [
            { propertyName: 'tables', modelName: 'SelectedTables', array: true },
            { propertyName: 'relations', modelName: 'Relations', array: true }
        ]
    },
    { propertyName: 'parameters', modelName: 'Parameters', array: true },
    { propertyName: 'type', modelName: '@Type' },
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'editableName', displayName: 'Name', localizationId: 'DevExpress.DataAccess.Sql.SqlQuery.Name', editor: editorTemplates.getEditor('text') },
    { propertyName: '_filterString', modelName: 'Filter', defaultVal: '' },
    { propertyName: 'filterString', defaultVal: '', displayName: 'Filter', localizationId: 'DataAccessUIStringId.FiltersView_Filter', editor: editorTemplates.getEditor('filterEditor') },
    { propertyName: '_groupFilterString', modelName: 'GroupFilter', defaultVal: '' },
    { propertyName: 'groupFilterString', defaultVal: '', displayName: 'Group Filter', localizationId: 'DataAccessUIStringId.FiltersView_GroupFilter', editor: editorTemplates.getEditor('filterGroupEditor') },
    { propertyName: 'columns', modelName: 'Columns', array: true },
    { propertyName: 'sorting', modelName: 'Sorting', array: true },
    { propertyName: 'grouping', modelName: 'Grouping', array: true },
    { propertyName: 'itemType', modelName: '@ItemType' },
    { propertyName: 'allColumnsInTablesSelected', displayName: 'Select All (*)', localizationId: 'AnalyticsCoreStringId.QueryBuilder_SelectAll', editor: editorTemplates.getEditor('bool') },
    { propertyName: 'top', modelName: '@Top', displayName: 'Select Top', defaultVal: 0, from: floatFromModel, localizationId: 'AnalyticsCoreStringId.QueryBuilder_SelectTop', editor: editorTemplates.getEditor('numeric'), editorOptions: { format: '#0', min: 0 } },
    { propertyName: 'skip', modelName: '@Skip', displayName: 'Offset', defaultVal: 0, from: floatFromModel, localizationId: 'AnalyticsCoreStringId.QueryBuilder_Offset', editor: editorTemplates.getEditor('numeric'), editorOptions: { format: '#0', min: 0 } },
    { propertyName: 'distinct', modelName: '@Distinct', defaultVal: false, from: parseBool, displayName: 'Select distinct', localizationId: 'AnalyticsCoreStringId.QueryBuilder_SelectDistinct', editor: editorTemplates.getEditor('bool') }
];