﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_scaleBreak.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { scaleBreakSerializationsInfo } from '../../internal/meta/_axis';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
export class ScaleBreakViewModel extends ChartElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(model, parent, serializer, scaleBreakSerializationsInfo);
    }
    static from(model, serializer) {
        return new ScaleBreakViewModel(model || {}, null, serializer);
    }
}
ScaleBreakViewModel.prefix = 'Scale Break ';
