﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\subNode.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { QueryViewModelBase } from '../../../elements/queryModel';
import { RelationViewModel } from '../../../elements/relationModel';
import { FederationTableViewModel } from '../../../elements/_federationQueryModel';
import { SourceQuery } from './sourceQuery';
export declare const subNodeSerializationInfo: ISerializationInfoArray;
export declare class SubNode {
    constructor(model: any, serializer?: any);
    static deserializeRelationModel(subNodeQuery: FederationTableViewModel, relation: RelationViewModel): SubNode;
    private _parsePath;
    private _createCondition;
    private _conditionBinary;
    createRelationModel(query: QueryViewModelBase): RelationViewModel;
    getInfo(): ISerializationInfoArray;
    query: ko.Observable<SourceQuery>;
    condition: ko.Observable<string>;
    joinType: ko.Observable<string>;
}
