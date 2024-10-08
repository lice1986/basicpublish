﻿/**
* DevExpress Analytics (query-builder\elements\relationModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { deserializeArray } from '../../serializer/utils';
import { JoinConditionViewModel } from './joinConditionModel';
import { relationSerializationInfo } from './relationModelMeta';
import { extend } from '../../serializer/_utils';
export class RelationViewModel extends QueryElementBaseViewModel {
    constructor(model, query, serializer) {
        super(extend(model, { '@ControlType': 'Relation', '@ItemType': 'Relation' }), query, serializer);
        this.parentTable = ko.observable(query.getTable(this.parentTableName.peek()));
        this.nestedTable = ko.observable(query.getTable(this.nestedTableName.peek()));
        this.parentTableName = ko.pureComputed(() => this.parentTable().actualName());
        this.nestedTableName = ko.pureComputed(() => this.nestedTable().actualName());
        this.conditions = deserializeArray(model['KeyColumns'], (item) => {
            return new JoinConditionViewModel(item, this, serializer);
        });
    }
    _getConditionNumber() {
        let result = this.conditions().length + 1;
        const existingNumbers = this.conditions().map(_c => _c.seriesNumber());
        for (let index = 0; index < this.conditions().length; index++) {
            if (existingNumbers.indexOf(index + 1) !== -1)
                continue;
            result = index + 1;
            break;
        }
        return result;
    }
    getInfo() {
        return relationSerializationInfo;
    }
    addChild(control) {
        const condition = control;
        if (this.conditions && this.conditions.indexOf(condition) === -1) {
            condition.seriesNumber(this._getConditionNumber());
            condition.parentModel(this);
            this.conditions.push(condition);
        }
    }
    removeChild(control) {
        const index = this.conditions().indexOf(control);
        if (index > -1)
            this.conditions.splice(index, 1);
        if (this.conditions().length === 0)
            this.parentModel().removeChild(this);
    }
}
