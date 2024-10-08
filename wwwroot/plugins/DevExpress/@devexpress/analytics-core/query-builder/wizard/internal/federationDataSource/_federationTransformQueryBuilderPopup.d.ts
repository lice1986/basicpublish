﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTransformQueryBuilderPopup.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ITreeListOptions, TreeListItemViewModel } from '../../../../widgets/treelist/_treelistItem';
import { TransformQuery } from '../../../dataSource/federation/federatedQueries/transformQuery';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
export declare class FederationTransformQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    private _updateColumns;
    protected _aliasValidationCallback(alias: string, data: {
        alias: string;
        key: string;
    }): boolean;
    constructor(onSaveCallback: (query: TransformQuery) => void, dataSource: FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
    dispose(): void;
    addDataMember(item: TreeListItemViewModel): void;
    updateColumns(): void;
    canSave(): boolean;
    save(): void;
    onHiding(): void;
    show(query: TransformQuery): void;
    transformGrid: any;
    transformGridTitle: ko.Observable<string>;
    transformResultGridTitle: ko.Observable<string>;
    transformResultCollapsed: ko.Observable<boolean>;
    transformSources: ko.Observable<any[]>;
    resultFieldListModel: ko.Observable<ITreeListOptions>;
    currentPath: ko.Observable<string>;
    transformQuery: ko.Observable<TransformQuery>;
    popupContentTemplate: string;
}
