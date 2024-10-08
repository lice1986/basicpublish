﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_secondaryAxisViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { secondaryAxisXYSerializationsInfo } from '../../internal/meta/_axis';
import { initCollectionItem } from './_axis';
import { AxisXYViewModel } from './_axisXYViewModel';
export class SecondaryAxisViewModel extends AxisXYViewModel {
    constructor(model, parent, serializer) {
        super(model, serializer, secondaryAxisXYSerializationsInfo);
        initCollectionItem(this, parent)();
    }
    get axisID() {
        return this.parent().indexOf(this);
    }
}
SecondaryAxisViewModel.xPrefix = 'Secondary Axis X';
SecondaryAxisViewModel.yPrefix = 'Secondary Axis Y';
