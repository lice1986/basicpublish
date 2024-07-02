﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\watermark.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { ImageSource } from '../../../common/imageSource';
import { watermarkSerializationsInfo } from '../metadata/properties/watermark';
export class WatermarkModel extends SerializableModel {
    constructor(model, serializer) {
        super(model || {}, serializer, watermarkSerializationsInfo);
        this.rtl = $.noop;
        if (!this.imageSource() && model && model['@Image']) {
            this.imageSource(new ImageSource('img', model['@Image']));
            delete this['_model']['@Image'];
        }
    }
    get displayName() {
        return this['displayNameObject']() || this.watermarkId();
    }
    get name() {
        return this.watermarkId();
    }
    displayType() {
        return getLocalization('Watermark', 'DevExpress.XtraReports.UI.XtraReport.Watermark');
    }
    shouldDrawWatermarkImage() {
        return this.imageSource() && this.imageSource().sourceType !== 'svg';
    }
}
