﻿/**
* DevExpress Analytics (core\internal\_stores.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { CustomSortedArrayStore } from './_arrayStores';
export class ControlsStore extends Disposable {
    constructor(allControls) {
        super();
        this._filter = ko.observable(null);
        let dataSource = null;
        this._disposables.push(this.dataSource = ko.computed(() => {
            dataSource && dataSource.dispose();
            const items = this._filter() ? allControls().filter(this._filter()) : allControls();
            dataSource = new DataSource({
                store: new CustomSortedArrayStore(items),
                paginate: true,
                pageSize: 100
            });
            return dataSource;
        }));
        this._disposables.push(this.visible = ko.computed(() => {
            return allControls().length > 0;
        }));
    }
    getFilter() {
        return this._filter();
    }
    setFilter(filter) {
        this._filter(filter);
    }
    resetFilter() {
        this._filter(null);
    }
}