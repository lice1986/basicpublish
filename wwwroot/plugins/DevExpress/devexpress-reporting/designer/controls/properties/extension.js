﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\extension.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export class ExtensionModel {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return extensionSerializationInfo;
    }
}
const extensionSerializationInfo = [
    { propertyName: 'key', modelName: '@Key' },
    { propertyName: 'value', modelName: '@Value' }
];