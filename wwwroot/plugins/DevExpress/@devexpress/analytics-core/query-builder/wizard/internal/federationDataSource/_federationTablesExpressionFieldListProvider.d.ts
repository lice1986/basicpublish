﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTablesExpressionFieldListProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider } from '../../../../widgets/utils';
import { FederationTableViewModel } from '../../../elements/_federationQueryModel';
export declare class FederationTablesExpressionFieldListProvider implements IItemsProvider {
    private provider;
    private tables;
    getItems(pathRequest: any): JQuery.Promise<IDataMemberInfo[], any, any>;
    constructor(provider: IItemsProvider, tables: ko.ObservableArray<FederationTableViewModel>);
}
