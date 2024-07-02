﻿/**
* DevExpress Analytics (query-builder\binding\jsQueryBuilderBindingOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDBSchemaProvider } from '../dataSource/dbSchemaProvider';
import { IItemsProvider } from '../../widgets/utils';
import { RequestWrapper } from '../utils/requestwrapper';
import { IJSQueryBuilderCallbacks } from '../utils/_callbacks';
import { IJSDesignerBindingCommonOptions } from '../../core/binding/_jsDesignerBindingCommonOptions';
import { IDataSourceBase } from '../dataSource/sql/sqlDataSource';
export interface IQueryBuilderOptions extends IJSDesignerBindingCommonOptions {
    queryBuilderModel?: ko.Observable<any>;
    dataSourceJson?: string;
    queryModelJson?: string;
    querySource: ko.Observable<{}> | ko.Computed<{}>;
    dbSchemaProvider?: ko.Observable<IDBSchemaProvider> | ko.Computed<IDBSchemaProvider>;
    parametersItemsProvider?: IItemsProvider;
    requestWrapper?: RequestWrapper;
    parametersMode?: string;
    callbacks?: IJSQueryBuilderCallbacks;
    localization?: any;
    rtl?: boolean;
    requestOptions?: {
        host?: string;
        invokeAction: string;
        getLocalizationAction?: string;
    };
    handlerUri?: string;
    dataSource?: IDataSourceBase;
    showPropertyGridCondition?: (editableObj: any) => boolean;
}
