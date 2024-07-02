﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\unionQuery.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IFederationQuery } from '../../utils';
import { IModelSerializer } from '../../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { SelectQuery } from './selectQuery';
import { FederatedQueriesContainer } from '../federatedQueriesContainer';
import { IDataSourceInfo } from '../../../../core/utils/_fieldListProvider';
export declare const unionQuerySerializationsInfo: ISerializationInfoArray;
export declare enum UnionTypes {
    Union = 0,
    UnionAll = 1
}
export declare class UnionQuery extends FederatedQueriesContainer implements IFederationQuery {
    constructor(model: any, dataSources: ko.ObservableArray<IDataSourceInfo> | ko.Computed<IDataSourceInfo[]>, serializer?: IModelSerializer);
    alias: ko.Observable<string> | ko.Computed<string>;
    queryType: ko.Observable<string> | ko.Computed<string>;
    unionType: ko.Observable<string> | ko.Computed<string>;
    unionElements: ko.ObservableArray<SelectQuery>;
    getInfo(): ISerializationInfoArray;
    generateName(): string;
}