﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\masterDetailRelation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
export declare class MasterDetailRelation extends Disposable {
    dispose(): void;
    private _customName;
    constructor(model: any, serializer?: IModelSerializer);
    name: ko.PureComputed<string>;
    masterQuery: ko.Observable<string> | ko.Computed<string>;
    detailQuery: ko.Observable<string> | ko.Computed<string>;
    keyColumns: ko.ObservableArray<{
        masterColumn: ko.Observable<string> | ko.Computed<string>;
        detailColumn: ko.Observable<string> | ko.Computed<string>;
    }>;
    createKeyColumn(): void;
    getInfo(): ISerializationInfoArray;
}
