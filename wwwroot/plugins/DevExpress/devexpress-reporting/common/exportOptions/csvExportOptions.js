﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\csvExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { csvExportOptionsSerializationInfo } from './csvMetaData';
import { BaseRenderingMultiplatformModel, subscribableProperty } from '@devexpress/analytics-core/analytics-serializer-native';
export class CsvExportOptions extends BaseRenderingMultiplatformModel {
    constructor(model, serializer) {
        super(model, serializer);
        this.defaultSeparatorValue = '';
        this.assignProperty('useCustomSeparator', this._get('separator') !== this.defaultSeparatorValue);
        this.assignProperty('_separatorValue', this._get('separator'));
        this.addDisposable(this.subscribeProperty('useCustomSeparator', (newValue) => {
            if (!newValue)
                this._set('_separatorValue', this.defaultSeparatorValue);
        }));
        this.createComputedProperty('separator', {
            read: () => { return this._get('_separatorValue'); },
            write: (newValue) => {
                this._set('_separatorValue', newValue);
                if (this.useCustomSeparator)
                    this._set('useCustomSeparator', newValue !== this.defaultSeparatorValue);
            }
        }, [
            subscribableProperty(this, ['_separatorValue'])
        ]);
    }
    static from(model, serializer) {
        return new CsvExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, csvExportOptionsSerializationInfo, refs);
    }
    getInfo() {
        return csvExportOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        return (name === 'separator') && !(this._get('useCustomSeparator'));
    }
}
