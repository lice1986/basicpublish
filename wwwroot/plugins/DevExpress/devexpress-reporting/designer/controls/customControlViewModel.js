﻿/**
* DevExpress HTML/JS Reporting (designer\controls\customControlViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export class CustomControlSerializableModel extends SerializableModel {
    static from(model, serializer, info) {
        return new CustomControlSerializableModel(model || {}, serializer, info);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, undefined, refs);
    }
}
