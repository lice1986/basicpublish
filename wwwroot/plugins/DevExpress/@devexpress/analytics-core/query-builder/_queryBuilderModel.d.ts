﻿/**
* DevExpress Analytics (query-builder\_queryBuilderModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IDisposable } from '../serializer/disposable';
import { ColumnDragHandler } from './dragDrop/_columnDragHandler';
import { IDesignerModel } from '../core/utils/_designerCreator';
import { DbObjectDragDropHandler } from './dragDrop/_dbObjectDragDropHandler';
import { QueryBuilderObjectsProvider } from './widgets/filterEditor/_queryBuilderObjectsProvider';
import { IItemsProvider } from '../widgets/utils';
export interface IQueryBuilderModel extends IDesignerModel, IDisposable {
    rootStyle: string;
    columnDragHandler: ColumnDragHandler;
    connectionPointDragHandler: ColumnDragHandler;
    fieldDragHandler: DbObjectDragDropHandler;
    fieldListProvider: QueryBuilderObjectsProvider;
    dataBindingsProvider: QueryBuilderObjectsProvider;
    parametersBindingsProvider: IItemsProvider;
    dataBindingsGroupProvider: QueryBuilderObjectsProvider;
    selectStatmentPreview: IQueryBuilderDialog;
    dataPreview: IQueryBuilderDialog;
    findControl: (s: any, e: JQueryEventObject) => void;
    showPreview: () => void;
    showStatement: () => void;
    columnsLoadingMsg?: () => string;
    updateSurfaceSize: () => void;
    updateSurface: () => void;
}
export interface IQueryBuilderDialog {
    isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
    isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    template: string;
    title: () => string;
    data: any;
    okButtonText: () => string;
    okButtonHandler: (e: any) => void;
    container: any;
}
