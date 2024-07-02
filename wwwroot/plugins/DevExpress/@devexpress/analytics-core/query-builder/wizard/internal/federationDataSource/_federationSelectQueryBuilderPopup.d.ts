﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationSelectQueryBuilderPopup.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ResizeHelper } from '../../../../widgets/internal/_resizeHelper';
import { TreeListItemViewModel } from '../../../../widgets/treelist/_treelistItem';
import { SelectQuery } from '../../../dataSource/federation/federatedQueries/selectQuery';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { IQueryBuilderSurfaceCreator } from '../../../_initializer';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
export interface IFederationSelectQBGridAllColumns {
    column: string;
    table: string;
    key: string;
}
export interface IFederationSelectQBGridColumnsExpressions extends IFederationSelectQBGridAllColumns {
    alias: string;
    index: number;
    isExpression: ko.Observable<boolean>;
    expression: ko.Observable<string> | ko.Computed<string>;
}
export declare class FederationSelectQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    private _qbOptions;
    private _bindingContext;
    private _gridComponent;
    private _onContentReady;
    private _getQuery;
    private _afterChangeColumn;
    private _changeColumn;
    private _switchEditors;
    private _deleteRow;
    private _onRowUpdating;
    protected _aliasValidationCallback(alias: string, data: {
        key: string;
        alias: string;
    }): boolean;
    dispose(): void;
    private _generateKey;
    private _isSelectAllItemByKey;
    constructor(onSaveCallback: (query: SelectQuery) => void, dataSource: FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
    save(): void;
    addRow(): void;
    canSave(): boolean;
    addDataMember(item: TreeListItemViewModel, position?: {
        left: number;
        top: number;
    }): void;
    show(query: SelectQuery): void;
    popupTarget(): string;
    gridResizeHelper: ResizeHelper;
    columnsGrid: any;
    addRowDisabled: ko.PureComputed<boolean>;
    popupContentTemplate: string;
    columnsExpressions: ko.PureComputed<IFederationSelectQBGridColumnsExpressions[]>;
    allColumns: ko.PureComputed<IFederationSelectQBGridAllColumns[]>;
    queryBuilderSurfaceCreator: IQueryBuilderSurfaceCreator;
    _querySource: ko.Observable<any>;
    designer: ko.Observable<any>;
    joinResultCollapsed: ko.Observable<boolean>;
    selectQuery: SelectQuery;
    width: string;
    height: string;
    cssClass: string;
}
