﻿/**
* DevExpress Analytics (query-builder\elements\tableSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { QueryElementBaseSurface } from './queryElementSurface';
import { TableViewModel } from './tableModel';
import { ColumnSurface } from './columnSurface';
import { AllColumnsSurface } from './allColumnsSurface';
import { extend } from '../../serializer/_utils';
export class TableSurface extends QueryElementBaseSurface {
    constructor(control, context) {
        super(control, context, null);
        this.showSourceName = false;
        this.contenttemplate = 'dxqb-table';
        this.titletemplate = 'dxqb-table-title';
        this.template = 'dxqb-table-main';
        this.toggleSelected = () => {
            this.getControlModel().toggleSelectedColumns();
        };
        this.selectedWrapper = ko.pureComputed(() => {
            return this.getControlModel().allColumnsSelected();
        });
        this.isInitialized = control.isInitialized;
        this.columns = ko.pureComputed(() => {
            return control.columns().map(columnVewModel => new ColumnSurface(columnVewModel, context));
        });
        this.asterisk = new AllColumnsSurface(control.asterisk, context);
    }
    resizable(resizeHandler, element) {
        return extend({}, resizeHandler, {
            handles: 'e,w',
            $selectedNodes: $.fn.constructor(element),
            minWidth: TableViewModel.TABLE_MIN_WIDTH,
        });
    }
}