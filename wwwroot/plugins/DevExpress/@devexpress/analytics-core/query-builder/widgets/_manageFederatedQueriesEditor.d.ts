﻿/**
* DevExpress Analytics (query-builder\widgets\_manageFederatedQueriesEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PopupEditorBase } from '../../core/widgets/_popupEditorBase';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
import { FederationQueryType } from '../dataSource/utils';
import { FederatedQueriesHelper } from './_federatedQueriesHelper';
export declare class ManageFederatedQueriesEditor extends PopupEditorBase {
    private _dataSource;
    private _callBack;
    rtl: boolean;
    private _createAddQueryButton;
    constructor(_dataSource: FederationDataSource, _callBack: () => void, rtl?: boolean);
    queriesGrid: any;
    queriesStoreData: ko.PureComputed<{
        'id': string;
        'name': string;
        'type': FederationQueryType;
    }[]>;
    save(): void;
    canSave(): boolean;
    close(): void;
    dispose(): void;
    className: string;
    _queriesPopupHelper: FederatedQueriesHelper;
    title(): string;
}
