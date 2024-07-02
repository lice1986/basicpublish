﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonAuthenticationInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../../serializer/serializer';
export class JsonAuthenticationInfo {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model || {});
    }
    static from(model, serializer) {
        return new JsonAuthenticationInfo(model, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    getInfo() {
        return [
            { propertyName: 'password', modelName: '@password', defaultVal: '' },
            { propertyName: 'userName', modelName: '@user', defaultVal: '' }
        ];
    }
}
