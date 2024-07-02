﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\selectQuery.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { IModelSerializer } from '../../../../serializer/serializer';
import { Disposable } from '../../../../serializer/disposable';
import { IFederationQuery } from '../../utils';
import { FederatedQueryExpression } from '../federatedQueryExpression';
import { FederationSource } from '../federationSource';
import { SourceQuery } from './sourceQuery';
import { SubNode } from './subNode';
export declare const selectQuerySerializationsInfo: ISerializationInfoArray;
export declare class SelectQuery extends Disposable implements IFederationQuery {
    private _path?;
    constructor(model: any, serializer?: IModelSerializer, _path?: string);
    alias: ko.Observable<string> | ko.Computed<string>;
    queryType: ko.Observable<string> | ko.Computed<string>;
    subNodes: ko.ObservableArray<SubNode>;
    expressions: ko.ObservableArray<FederatedQueryExpression>;
    root: ko.Observable<SourceQuery>;
    get sources(): ko.ObservableArray<FederationSource>;
    getInfo(): ISerializationInfoArray;
    generateName(): string;
    init(model: any, serializer?: IModelSerializer, rootPath?: string): void;
}
