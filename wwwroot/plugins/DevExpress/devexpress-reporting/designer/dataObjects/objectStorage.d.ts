﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ObjectItem, ObjectStorageItem } from './objectStorageItem';
import { DynamicListLookUpSettings, StaticListLookUpSettings } from './parameters/lookupSettings';
import { RangeParametersSettings } from './parameters/rangeSettings';
export declare class ObjectsStorage extends Disposable {
    constructor(objects: ko.ObservableArray<ObjectItem>, dsHelperProvider: any);
    findType(content: string): ObjectStorageItem;
    getType(type: string): ObjectStorageItem;
    addValue(): ObjectStorageItem;
    createStaticLookUpSetting(): StaticListLookUpSettings;
    createDynamicLookUpSetting(): DynamicListLookUpSettings;
    createRangeSetting(): RangeParametersSettings;
    objects: ko.ObservableArray<ObjectItem>;
    dsHelperProvider: () => DataSourceHelper;
}
