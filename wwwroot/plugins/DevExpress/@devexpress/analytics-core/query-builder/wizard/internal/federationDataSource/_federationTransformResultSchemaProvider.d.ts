﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTransformResultSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IPathRequest } from '../../../../widgets/common/pathRequest';
import { IDataMemberInfo, IItemsProvider } from '../../../../widgets/utils';
export declare class TransformResultSchemaProvider implements IItemsProvider {
    constructor(itemsProvider: IItemsProvider, transformData: ko.Observable<any[]>, currentPath: ko.Observable<string>);
    dispose: () => void;
    getItems: (path: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
}