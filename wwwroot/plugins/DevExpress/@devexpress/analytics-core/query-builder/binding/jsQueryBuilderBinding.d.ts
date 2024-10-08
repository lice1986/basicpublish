﻿/**
* DevExpress Analytics (query-builder\binding\jsQueryBuilderBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DxAnalyticsComponentCommon, JSDesignerBindingCommon } from '../../core/binding/_jsDesignerBindingCommon';
import { IQueryBuilderModel } from '../_queryBuilderModel';
import { JSQueryBuilder } from './jsQueryBuilder';
import { IQueryBuilderOptions } from './jsQueryBuilderBindingOptions';
export declare class JSQueryBuilderBinding extends JSDesignerBindingCommon<JSQueryBuilder, IQueryBuilderOptions> {
    private options;
    private _deferreds;
    private _callbacks;
    _templateHtml: string;
    private _applyBindings;
    private _initializeCallbacks;
    _createModel(element: any): JQueryDeferred<IQueryBuilderModel>;
    constructor(options: IQueryBuilderOptions, customEventRaiser?: any);
    dispose(): void;
    applyBindings(element: HTMLElement): void;
}
export declare class DxQueryBuilder extends DxAnalyticsComponentCommon<IQueryBuilderOptions> {
    getBindingName(): string;
}
