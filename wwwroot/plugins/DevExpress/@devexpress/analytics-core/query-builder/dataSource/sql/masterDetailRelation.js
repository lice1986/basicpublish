﻿/**
* DevExpress Analytics (query-builder\dataSource\sql\masterDetailRelation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { ModelSerializer } from '../../../serializer/serializer';
import { masterDetailRelationSerializationsInfo } from './masterDetailRelationMeta';
import { extend } from '../../../serializer/_utils';
export class MasterDetailRelation extends Disposable {
    constructor(model, serializer) {
        super();
        this.name = ko.pureComputed({
            read: () => {
                return this._customName() || this.masterQuery() + this.detailQuery();
            },
            write: (value) => {
                this._customName(value);
            },
            deferEvaluation: true
        });
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Relation' }));
        this._disposables.push(this.name);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.keyColumns);
    }
    createKeyColumn() {
        const newKeyColumn = {
            masterColumn: ko.observable(),
            detailColumn: ko.observable(),
            itemType: 'KeyColumn'
        };
        this.keyColumns.push(newKeyColumn);
    }
    getInfo() {
        return masterDetailRelationSerializationsInfo;
    }
}
