﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_additionalPane.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { additionalPaneSerializationsInfo } from '../../internal/meta/_common';
import { ChartLocalizableElementCollectionItemBase } from '../../internal/_localizableElementCollection';
export class AdditionalPaneViewModel extends ChartLocalizableElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(model, parent, serializer, additionalPaneSerializationsInfo);
    }
    static from(model, serializer) {
        return new AdditionalPaneViewModel(model || {}, null, serializer);
    }
}
AdditionalPaneViewModel.prefix = 'Pane ';