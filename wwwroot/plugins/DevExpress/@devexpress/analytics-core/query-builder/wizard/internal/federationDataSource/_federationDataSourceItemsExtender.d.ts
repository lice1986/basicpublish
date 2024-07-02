﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationDataSourceItemsExtender.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo, IItemsExtender } from '../../../../core/utils/_fieldListProvider';
import { PathRequest } from '../../../../widgets/common/pathRequest';
import { IDataMemberInfo } from '../../../../widgets/utils';
export declare class FederationDataSourceItemsExtender implements IItemsExtender {
    private _rootItems;
    constructor(_rootItems: ko.ObservableArray<IDataSourceInfo>);
    afterItemsFilled(request: PathRequest, items: IDataMemberInfo[]): void;
    beforeItemsFilled(request: PathRequest, items: IDataMemberInfo[]): boolean;
}