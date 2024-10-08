﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_elementCollection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IAction, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ICollectionItem } from '../components/axis/_axis';
export declare class ChartElementCollectionItemBase extends SerializableModel implements ICollectionItem {
    static toJson(value: ChartElementCollectionItemBase, serializer: any, refs: any): any;
    constructor(model: any, parent: ko.ObservableArray<ChartElementCollectionItemBase>, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    parent: ko.ObservableArray<ICollectionItem>;
    name: ko.Observable<string> | ko.Computed<string>;
    defaultItemName: (parentName?: string) => string;
    innerActions: IAction[];
}
