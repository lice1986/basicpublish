﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_localizableElementCollection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartElementCollectionItemBase } from './_elementCollection';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export class ChartComponentModelWithText extends SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info);
    }
    getExpressionProperties() {
        return ['Text'];
    }
}
export class ChartLocalizableElementCollectionItemBase extends ChartElementCollectionItemBase {
    getChildComponents() {
        return [
            { component: this.title, path: 'Title' },
        ];
    }
}
