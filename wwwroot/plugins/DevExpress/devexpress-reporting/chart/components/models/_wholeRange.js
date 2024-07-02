﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_wholeRange.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export class WholeRangeModel extends SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info);
    }
    getExpressionProperties() {
        return ['MinValue', 'MaxValue'];
    }
}