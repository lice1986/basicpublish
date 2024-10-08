﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailRelationSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { KeyColumnSurface } from './_keyColumnSurface';
export class MasterDetailRelationSurface {
    constructor(relation, parent) {
        this.isEditable = ko.observable(false);
        this.relationName = relation.name;
        this.keyColumns = ko.pureComputed(() => {
            return relation.keyColumns().map((item) => {
                return {
                    master: new KeyColumnSurface(item.masterColumn, relation.masterQuery(), true),
                    detail: new KeyColumnSurface(item.detailColumn, relation.detailQuery(), false)
                };
            });
        });
        this.create = () => {
            relation.createKeyColumn();
        };
        this.remove = (data) => {
            relation.keyColumns.remove(item => item.masterColumn === data.master.column && item.detailColumn === data.detail.column);
            if (relation.keyColumns().length === 0)
                parent.remove(this);
        };
    }
}
