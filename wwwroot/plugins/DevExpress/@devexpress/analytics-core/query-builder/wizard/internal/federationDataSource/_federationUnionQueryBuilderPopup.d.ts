﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationUnionQueryBuilderPopup.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeListItemViewModel } from '../../../../widgets/treelist/_treelistItem';
import { UnionQuery } from '../../../dataSource/federation/federatedQueries/unionQuery';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
export declare class FederationUnionQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    protected _aliasValidationCallback(alias: string, data: {
        alias: string;
        key: string;
    }): boolean;
    constructor(onSaveCallback: (query: UnionQuery) => void, dataSource: FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
    dispose(): void;
    addDataMember(item: TreeListItemViewModel): void;
    canSave(): boolean;
    save(): void;
    onHiding(): void;
    show(query: UnionQuery): void;
    aliasGrid: any;
    sourcesGrid: any;
    unionQuery: ko.Observable<UnionQuery>;
    unionAll: ko.Observable<boolean>;
    columns: ko.ObservableArray<any>;
    popupContentTemplate: string;
}