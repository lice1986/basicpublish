﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_constantLine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { constantLineSerializationsInfo } from '../../internal/meta/_axis';
import { ChartLocalizableElementCollectionItemBase } from '../../internal/_localizableElementCollection';
export class ConstantLineViewModel extends ChartLocalizableElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(model, parent, serializer, constantLineSerializationsInfo);
        this.axisValue = this._axisValue;
    }
    static from(model, serializer) {
        return new ConstantLineViewModel(model || {}, null, serializer);
    }
    getExpressionProperties() {
        return ['LegendText', 'AxisValue'];
    }
}
ConstantLineViewModel.prefix = 'Constant Line ';
