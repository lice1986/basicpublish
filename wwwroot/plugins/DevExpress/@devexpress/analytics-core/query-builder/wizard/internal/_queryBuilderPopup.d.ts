﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_queryBuilderPopup.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ILocalizationInfo } from '../../../property-grid/widgets/internal/_utils';
import { ISerializableModel } from '../../../serializer/serializationInfo';
import { Disposable } from '../../../serializer/disposable';
import { UndoEngine } from '../../../undo-engine/undoengine';
import { IAction } from '../../../widgets/utils';
import { IQueryBuilderOptions } from '../../binding/jsQueryBuilderBindingOptions';
import { IDBSchemaProvider } from '../../dataSource/dbSchemaProvider';
import { IDataSourceBase, IDataSourceDBSchema, SqlDataSource } from '../../dataSource/sql/sqlDataSource';
import { TableQuery } from '../../dataSource/sql/tableQuery';
import { DbObjectDragDropHandler } from '../../dragDrop/_dbObjectDragDropHandler';
import { QueryViewModel } from '../../elements/queryModel';
import { IRetrieveQuerySqlCallback } from '../dataSourceWizard';
export declare abstract class QueryBuilderPopupBase extends Disposable {
    customizeQBInitializationData: (options: IQueryBuilderOptions) => IQueryBuilderOptions;
    protected _rtl: boolean;
    protected _querySource: ko.Observable | ko.Computed;
    protected _dbSchemaProvider: ko.Observable<IDBSchemaProvider> | ko.Computed<IDBSchemaProvider>;
    protected _dataSource: IDataSourceDBSchema;
    protected _applyQuery: any;
    constructor(applyNewQuery: any, rtl?: boolean, customizeQBInitializationData?: (options: IQueryBuilderOptions) => IQueryBuilderOptions);
    designer: ko.Observable<{
        model: ko.Observable<QueryViewModel> | ko.Computed<QueryViewModel>;
        updateSurface: () => void;
        showPreview: () => void;
        dataPreview: any;
        fieldDragHandler: DbObjectDragDropHandler;
        undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
    }>;
    qbOptions: ko.Observable<IQueryBuilderOptions>;
    okButtonDisabled: ko.PureComputed<boolean>;
    isVisible: ko.Observable<boolean>;
    showLoadIndicator: ko.Observable<boolean>;
    static customizeQueryBuilderActions: (sender: any, args: {
        Actions: IAction[];
    }) => void;
    show(query: any, dataSource: IDataSourceDBSchema): void;
    cancelHandler(): void;
    previewHandler(): void;
    okHandler(): void;
    abstract createQuery(): ISerializableModel;
    abstract getDataSource(): IDataSourceBase;
    onHiddingHandler(): void;
    popupViewModel(element: HTMLElement): {
        visible: ko.Observable<boolean>;
        title: any;
        showTitle: boolean;
        shading: boolean;
        fullScreen: boolean;
        width: string;
        height: string;
        container: any;
        wrapperAttr: {
            class: string;
        };
        position: {
            of: any;
        };
        onHidding: () => void;
    };
    getDisplayText(key: any): any;
    localizationIdMap: {
        [key: string]: ILocalizationInfo;
    };
}
export declare class QueryBuilderPopup extends QueryBuilderPopupBase {
    customizeQBInitializationData: (options: IQueryBuilderOptions) => IQueryBuilderOptions;
    protected _applyQuery: IRetrieveQuerySqlCallback;
    constructor(applyNewQuery: IRetrieveQuerySqlCallback, rtl?: boolean, customizeQBInitializationData?: (options: IQueryBuilderOptions) => IQueryBuilderOptions);
    getDataSource(): SqlDataSource;
    createQuery(): TableQuery;
}
