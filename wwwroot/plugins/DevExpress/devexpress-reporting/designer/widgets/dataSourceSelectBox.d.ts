﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceSelectBox.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
export declare class DataSourceSelectBox extends Editor {
    static createDataSource(values: any): DataSource;
    getValues(): ko.Computed<DataSource>;
    dataSource: ko.Computed<DataSource>;
}
