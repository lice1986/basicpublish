﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\masterDetailRelationMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const masterDetailRelationSerializationsInfo = [
    { propertyName: 'masterQuery', modelName: '@Master' },
    { propertyName: 'detailQuery', modelName: '@Detail' },
    { propertyName: '_customName', modelName: '@Name' },
    {
        propertyName: 'keyColumns', modelName: 'KeyColumns', array: true, info: [
            { propertyName: 'masterColumn', modelName: '@Master' },
            { propertyName: 'detailColumn', modelName: '@Detail' },
            { propertyName: 'itemType', modelName: '@ItemType' }
        ]
    },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
