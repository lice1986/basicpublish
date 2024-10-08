﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationDataSourceMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const federationDataSourceSerializationInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'queries', modelName: 'Queries', array: true },
    { propertyName: 'relations', modelName: 'Relations', array: true },
    { propertyName: 'sources', modelName: 'Sources', array: true },
    {
        modelName: 'SerializableSourceMap',
        propertyName: 'serializableSourceMap',
        array: true,
        info: [
            { modelName: '@DataSource', propertyName: 'dataSource', link: true },
            { modelName: '@Name', propertyName: 'name' }
        ]
    }
];
export const sourceSerializationInfo = [
    { propertyName: 'sourceName', modelName: '@SourceName' },
    { propertyName: 'dataMember', modelName: '@DataMember' },
];
