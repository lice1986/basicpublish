﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataFilter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare const dataFilterSerializationsInfo: ISerializationInfoArray;
export declare class DataFilterModel implements ISerializableModel {
    static createNew(): DataFilterModel;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    columnName: ko.Observable<string>;
    name: ko.Computed<string>;
}
export declare const DefaultDataFilterModel: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<typeof DataFilterModel>;
