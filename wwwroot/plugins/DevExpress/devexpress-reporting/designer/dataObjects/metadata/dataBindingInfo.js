﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\dataBindingInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const dataBindingBaseSerializationInfo = [
    { propertyName: 'parameter', modelName: '@Parameter', link: true },
    { propertyName: 'dataSource', modelName: '@DataSource', link: true },
    { propertyName: 'dataMember', modelName: '@DataMember' }
];
export const dataBindingSerializationInfo = dataBindingBaseSerializationInfo.concat([
    { propertyName: 'propertyName', modelName: '@PropertyName' },
    { propertyName: 'formatString', modelName: '@FormatString' }
]);
