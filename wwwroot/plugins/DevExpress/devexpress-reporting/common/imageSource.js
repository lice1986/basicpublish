﻿/**
* DevExpress HTML/JS Reporting (common\imageSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal-native';
export class ImageSource {
    constructor(sourceType, data) {
        this.sourceType = sourceType;
        this.data = data;
    }
    getDataUrl() {
        switch (this.sourceType) {
            case 'svg':
                return 'data:image/svg+xml;charset=UTF-8;base64,' + encodeURI(this.data);
            case 'img':
                return 'data:image/x;base64,' + this.data;
        }
        if (this.sourceType === 'png' || this.sourceType === 'jpg' || this.sourceType === 'jpeg')
            return 'data:image/' + this.sourceType + ';base64,' + this.data;
    }
    static parse(val) {
        const [sourceType, data] = (val || '').split(',');
        return sourceType && new ImageSource(sourceType, data);
    }
    static toString(val) {
        return formatUnicorn('{0},{1}', val.sourceType, val.data);
    }
}
