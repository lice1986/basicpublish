﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { ObjectStorageItem } from './objectStorageItem';
import { DynamicListLookUpSettings, StaticListLookUpSettings } from './parameters/lookupSettings';
import { RangeEndParameter, RangeParametersSettings, RangeStartParameter } from './parameters/rangeSettings';
export class ObjectsStorage extends Disposable {
    constructor(objects, dsHelperProvider) {
        super();
        this.objects = objects;
        this.dsHelperProvider = dsHelperProvider;
    }
    findType(content) {
        const objectStorages = this.objects().filter((item) => { return item instanceof ObjectStorageItem; });
        const result = objectStorages.filter((item) => {
            return !!item.type && item.type() === 'System.Type' && item.content() === content;
        });
        return result.length === 0 ? null : result[0];
    }
    getType(type) {
        let typeObject = this.findType(type);
        if (!typeObject) {
            typeObject = new ObjectStorageItem({
                '@Content': type,
                '@Type': 'System.Type'
            }, this.dsHelperProvider);
            this.objects.push(typeObject);
        }
        return typeObject;
    }
    addValue() {
        const newValueRef = new ObjectStorageItem({ '@Content': '' }, this.dsHelperProvider);
        this.objects.push(newValueRef);
        return newValueRef;
    }
    createStaticLookUpSetting() {
        const lookUpObject = new StaticListLookUpSettings({}, this.dsHelperProvider);
        this.objects.push(lookUpObject);
        return lookUpObject;
    }
    createDynamicLookUpSetting() {
        const lookUpObject = new DynamicListLookUpSettings({}, this.dsHelperProvider);
        this.objects.push(lookUpObject);
        return lookUpObject;
    }
    createRangeSetting() {
        const rangeSettingsObject = new RangeParametersSettings({}, this.dsHelperProvider);
        this.objects.push(rangeSettingsObject);
        const startParameter = new RangeStartParameter({}, this.dsHelperProvider);
        rangeSettingsObject.startParameter(startParameter);
        this.objects.push(startParameter);
        const endParameter = new RangeEndParameter({}, this.dsHelperProvider);
        rangeSettingsObject.endParameter(endParameter);
        this.objects.push(endParameter);
        return rangeSettingsObject;
    }
}
