﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\sourceQuery.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelSerializer } from '../../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { Disposable } from '../../../../serializer/disposable';
export declare const sourceQuerySerializationsInfo: ISerializationInfoArray;
export declare class SourceQuery extends Disposable {
    private _sourcePath?;
    constructor(model: any, serializer?: IModelSerializer, sourceName?: string, _sourcePath?: string);
    sourceName: ko.Observable<string> | ko.Computed<string>;
    queryType: ko.Observable<string> | ko.Computed<string>;
    alias: ko.Observable<string> | ko.Computed<string>;
    name: ko.Observable<string> | ko.Computed<string>;
    getInfo(): ISerializationInfoArray;
    getPath(): string;
}