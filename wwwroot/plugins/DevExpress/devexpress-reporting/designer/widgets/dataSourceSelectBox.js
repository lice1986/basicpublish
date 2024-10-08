﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceSelectBox.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
export class DataSourceSelectBox extends Editor {
    static createDataSource(values) {
        const store = new ArrayStore(values);
        const options = { store: store, pageSize: 20, paginate: true };
        return new DataSource(options);
    }
    getValues() {
        if (!this.dataSource)
            this._disposables.push(this.dataSource = ko.computed(() => DataSourceSelectBox.createDataSource(this._get('values'))));
        return this.dataSource;
    }
}
