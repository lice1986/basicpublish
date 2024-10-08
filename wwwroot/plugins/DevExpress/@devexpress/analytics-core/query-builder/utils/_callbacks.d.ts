﻿/**
* DevExpress Analytics (query-builder\utils\_callbacks.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICommonBindingCustomizationHandler, ICommonCallbacksHandler } from '../../core/utils/_utils.typings';
import { IQueryBuilderModel } from '../_queryBuilderModel';
import { JSQueryBuilder } from '../binding/jsQueryBuilder';
import { IQueryBuilderPublicCallback } from './publicCallbacks';
export interface IQueryBuilderCustomizationHandler extends ICommonCallbacksHandler<JSQueryBuilder, IQueryBuilderModel> {
    saveQueryRequested?: (serializedData: any) => void;
}
export interface IJSQueryBuilderCallbacks extends IQueryBuilderCustomizationHandler, IQueryBuilderPublicCallback<JSQueryBuilder>, ICommonBindingCustomizationHandler<JSQueryBuilder> {
}
