﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_elementCollection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { initCollectionItem } from '../components/axis/_axis';
export class ChartElementCollectionItemBase extends SerializableModel {
    constructor(model, parent, serializer, info) {
        super(model, serializer, info);
        initCollectionItem(this, parent)();
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, null, refs);
    }
}
