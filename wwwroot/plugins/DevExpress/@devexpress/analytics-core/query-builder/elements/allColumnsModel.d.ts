﻿/**
* DevExpress Analytics (query-builder\elements\allColumnsModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { TableViewModel } from './tableModel';
import { IModelSerializer } from '../../serializer/serializer';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class AllColumnsViewModel extends QueryElementBaseViewModel {
    static DisplayName: () => any;
    constructor(parent: TableViewModel, serializer?: IModelSerializer);
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
    name: ko.Computed<string>;
    getInfo(): ISerializationInfoArray;
}
