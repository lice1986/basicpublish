﻿/**
* DevExpress Analytics (query-builder\wizard\internal\initializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IConnectionStringDefinition {
    name: string;
    description?: string;
}
export interface IDataSourceWizardConnectionStrings {
    sql: ko.ObservableArray<IConnectionStringDefinition>;
    json?: ko.ObservableArray<IConnectionStringDefinition>;
}
