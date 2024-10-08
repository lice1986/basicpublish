﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterQuerySurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { MasterDetailRelation } from '../../dataSource/sql/masterDetailRelation';
import { MasterDetailRelationSurface } from './_masterDetailRelationSurface';
import { getFirstItemByPropertyValue } from '../../../core/utils/_arrayutils';
import { getUniqueName } from '../../../core/internal/_getNameHelpers';
export class MasterQuerySurface {
    constructor(masterQueryName, relations) {
        this.relations = ko.observableArray();
        this.queryName = masterQueryName;
        this.add = (relation) => {
            this.relations.push(new MasterDetailRelationSurface(relation, this));
        };
        this.create = (detailQueryItem) => {
            const newRelation = new MasterDetailRelation({ '@Master': this.queryName, '@Detail': detailQueryItem.name });
            if (getFirstItemByPropertyValue(this.relations(), 'relationName', newRelation.name())) {
                newRelation.name(getUniqueName(this.relations().map(item => item.relationName()), newRelation.name() + '_'));
            }
            newRelation.createKeyColumn();
            this.add(newRelation);
            relations.push(newRelation);
        };
        this.remove = (relationSurface) => {
            this.relations.remove(relationSurface);
            relations.remove(item => item.name === relationSurface.relationName);
        };
    }
}
