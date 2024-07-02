﻿/**
* DevExpress Analytics (core\internal\_stores.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
export declare class ControlsStore extends Disposable {
    private _filter;
    dataSource: ko.Computed<DataSource>;
    constructor(allControls: ko.ObservableArray<any>);
    getFilter(): any;
    setFilter(filter: any): void;
    resetFilter(): void;
    visible: ko.Computed<boolean>;
}
