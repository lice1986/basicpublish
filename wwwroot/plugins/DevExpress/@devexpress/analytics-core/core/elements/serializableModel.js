﻿/**
* DevExpress Analytics (core\elements\serializableModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { ModelSerializer } from '../../serializer/serializer';
export class SerializableModel extends Disposable {
    preInitProperties(model, serializer, info) { }
    constructor(model, serializer, info) {
        super();
        this.preInitProperties(model, serializer, info);
        if (info) {
            this.getInfo = () => {
                return info;
            };
        }
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model, info);
    }
    getInfo() {
        return null;
    }
}
