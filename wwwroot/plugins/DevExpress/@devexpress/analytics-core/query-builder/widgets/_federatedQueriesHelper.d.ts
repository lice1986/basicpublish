﻿/**
* DevExpress Analytics (query-builder\widgets\_federatedQueriesHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
import { FederationQueryType, IFederationQuery } from '../dataSource/utils';
import { IFederationQueryBuilderCallbacks } from '../wizard/internal/federationDataSource/_federatedQueriesTreeNode';
export interface IFederatedQueriesCallbacks {
    afterAddQuery?: (query: IFederationQuery) => void;
    onSave?: () => void;
    onClose?: () => void;
}
export declare class FederatedQueriesHelper extends Disposable {
    private _dataSource;
    private queries;
    private _getQuery;
    private _showSelectQbCallBack;
    private _showUnionQbCallBack;
    private _showTransformQbCallBack;
    private _setQuery;
    private _popupSelectQueryBuilder;
    private _popupUnionQueryBuilder;
    private _popupTransformQueryBuilder;
    private _afterAddQuery;
    constructor(_dataSource: FederationDataSource, queries: ko.ObservableArray<IFederationQuery>, callbacks: IFederatedQueriesCallbacks, rtl?: boolean);
    editQuery(type: FederationQueryType, name: string): void;
    dispose(): void;
    template: string;
    callBacks: IFederationQueryBuilderCallbacks;
    popupItems: {
        template: string;
        model: any;
    }[];
}
