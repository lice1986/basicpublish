﻿/**
* DevExpress Analytics (query-builder\_initializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IQueryBuilderOptions } from './binding/jsQueryBuilderBindingOptions';
import { IDBSchemaProvider } from './dataSource/dbSchemaProvider';
import { QueryViewModel, QueryViewModelBase } from './elements/queryModel';
import { QuerySurface } from './elements/querySurface';
import { IQueryBuilderCustomizationHandler } from './utils/_callbacks';
import { IQueryBuilderModel } from './_queryBuilderModel';
export interface IQueryBuilderSurfaceCreator {
    options: IQueryBuilderOptions;
    creator: (options: IQueryBuilderOptions) => QueryViewModelBase;
}
export declare function updateQueryBuilderSurfaceContentSize(getRoot: () => JQuery<HTMLElement>, surfaceSize: ko.Observable<number> | ko.Computed<number>, surface: ko.Observable<QuerySurface>, updateLayoutCallbacks?: Array<() => void>): () => void;
export declare function createIsLoadingFlag(model: ko.Observable<QueryViewModel> | ko.Computed<QueryViewModel>, dbSchemaProvider: ko.Observable<IDBSchemaProvider> | ko.Computed<IDBSchemaProvider>): ko.PureComputed<boolean>;
export declare function createQueryBuilder(element: Element, options: IQueryBuilderOptions, callbacks: IQueryBuilderCustomizationHandler, applyBindings?: boolean): JQueryDeferred<IQueryBuilderModel>;
export declare function createQueryBuilderSurface(element: Element, options: IQueryBuilderOptions, queryCreator: (options: IQueryBuilderOptions) => QueryViewModelBase): IQueryBuilderModel;