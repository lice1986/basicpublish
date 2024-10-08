﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_watermarksViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUniqueNameForNamedObjectsArray } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { WatermarkModel } from '../../controls/properties/watermark';
export class WatermarksViewModel extends Disposable {
    constructor(watermarks) {
        super();
        this._watermarks = watermarks;
    }
    createWatermark() {
        return new WatermarkModel({
            '@Id': getUniqueNameForNamedObjectsArray(this._watermarks(), 'watermark')
        });
    }
    getActions(context) {
        return [];
    }
}
