﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_additionalLegend.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { additionalLegendSerializationsInfo } from '../../internal/meta/_chart';
import { ChartLocalizableElementCollectionItemBase } from '../../internal/_localizableElementCollection';
export class AdditionalLegendViewModel extends ChartLocalizableElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(model, parent, serializer, additionalLegendSerializationsInfo);
    }
    static from(model, serializer) {
        return new AdditionalLegendViewModel(model || {}, null, serializer);
    }
}
AdditionalLegendViewModel.prefix = 'Legend';