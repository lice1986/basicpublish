﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookupSettings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { ObjectItem, ObjectStorageItem } from '../objectStorageItem';
import { LookUpValue } from './lookUpValue';
export declare class LookUpSettings extends ObjectItem {
    getInfo(): ISerializationInfoArray;
    updateFilter(parameter: any, report: ReportViewModel): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    filterString: any;
    _filterString: any;
}
export declare class StaticListLookUpSettings extends LookUpSettings {
    getInfo(): ISerializationInfoArray;
    preInitProperties(model: any, helper: any, serializer: any): void;
    afterDeserialization(model: any, serializer: any): void;
    updateFilter(parameter: any, report: ReportViewModel): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    _isEditing: ko.Observable<boolean>;
    lookUpValues: ko.ObservableArray<LookUpValue>;
}
export declare class DynamicListLookUpSettings extends LookUpSettings {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    dsHelperProvider: () => DataSourceHelper;
    dataSource: ko.Observable<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    getPath(propertyName: any): any;
    isPropertyDisabled(name: string): boolean;
}
