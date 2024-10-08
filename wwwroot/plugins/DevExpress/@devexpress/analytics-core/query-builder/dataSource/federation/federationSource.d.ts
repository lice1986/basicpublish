﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { Disposable } from '../../../serializer/disposable';
export declare class FederationSource extends Disposable {
    constructor(model: any, serializer?: any, path?: string, sourceName?: string);
    getInfo(): ISerializationInfoArray;
    getDataSourceName(): string;
    getPath(): string;
    hasDataMember(): boolean;
    sourceName: ko.Observable<string> | ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
}
