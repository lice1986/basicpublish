﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\tableQueryMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const tableQuerySerializationsInfo = [
    { propertyName: 'type', modelName: '@Type' },
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'parameters', modelName: 'Parameters', array: true },
    {
        propertyName: '_tablesObject', modelName: 'Tables', info: [
            {
                propertyName: 'tables', modelName: 'SelectedTables', array: true, info: [
                    { propertyName: 'name', modelName: '@Name' },
                    { propertyName: 'alias', modelName: '@Alias' }
                ]
            }
        ]
    },
    { propertyName: 'filterString', modelName: 'Filter', defaultVal: '' },
    { propertyName: 'itemType', modelName: '@ItemType' }
];