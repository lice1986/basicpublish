﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\transformQuery.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IFederationQuery } from '../../utils';
import { IModelSerializer } from '../../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { FederatedQueryExpression } from '../federatedQueryExpression';
import { SourceQuery } from './sourceQuery';
import { Disposable } from '../../../../serializer/disposable';
import { FederationSource } from '../federationSource';
export declare const transformQuerySerializationsInfo: ISerializationInfoArray;
export declare const transformationRuleSerializationsInfo: ISerializationInfoArray;
export declare class TransformQuery extends Disposable implements IFederationQuery {
    constructor(model: any, serializer?: IModelSerializer);
    alias: ko.Observable<string> | ko.Computed<string>;
    queryType: ko.Observable<string> | ko.Computed<string>;
    transformationRules: ko.ObservableArray<FederationTransformationRule>;
    expressions: ko.ObservableArray<FederatedQueryExpression>;
    root: ko.Observable<SourceQuery>;
    get sources(): ko.ObservableArray<FederationSource>;
    getInfo(): ISerializationInfoArray;
    generateName(): string;
}
export declare class FederationTransformationRule {
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    name: ko.Observable<string> | ko.Computed<string>;
    alias: ko.Observable<string> | ko.Computed<string>;
    unfold: ko.Observable<false>;
    flatten: ko.Observable<false>;
}
