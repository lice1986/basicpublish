﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\universalDataSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ObjectItem, ObjectStorageParameter } from './objectStorageItem';
export declare class TableInfoCollectionItem extends SerializableModel {
    constructor(model: any, dataSource: any, dsHelper: any, serializer?: IModelSerializer);
    filterString: ko.Observable<FilterStringOptions>;
}
export declare class UniversalDataSource extends ObjectItem {
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    parameters: ko.ObservableArray<ObjectStorageParameter>;
    tableInfoCollection: ko.ObservableArray<TableInfoCollectionItem>;
    spParameterInfoCollection: ko.ObservableArray<SerializableModel>;
}
