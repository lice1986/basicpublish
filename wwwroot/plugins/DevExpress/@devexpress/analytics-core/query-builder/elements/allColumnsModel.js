﻿/**
* DevExpress Analytics (query-builder\elements\allColumnsModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { ColumnType } from './columnExpressionMeta';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { allColumnsSerializationInfo } from './allColumnsModelMeta';
import { ColumnExpression } from './columnExpression';
export class AllColumnsViewModel extends QueryElementBaseViewModel {
    constructor(parent, serializer) {
        super({ '@ControlType': 'Column' }, parent, serializer);
        const query = parent.parentModel();
        const targetColumn = ko.pureComputed(() => {
            return findFirstItemMatchesCondition(query.columns(), item => {
                return parent.actualName() === item.table() && ColumnType.AllColumns === item.itemType();
            });
        });
        this.selected = ko.pureComputed({
            read: () => !!targetColumn(),
            write: (value) => {
                if (!!targetColumn() === value)
                    return;
                if (value) {
                    query.columns.push(new ColumnExpression({ '@ItemType': ColumnType.AllColumns, '@Table': parent.actualName() }, query, serializer));
                }
                else {
                    query.columns.remove(item => parent.actualName() === item.table() && ColumnType.AllColumns === item.itemType());
                }
            }
        });
        this.name = ko.pureComputed(AllColumnsViewModel.DisplayName);
        this._disposables.push(this.name);
    }
    getInfo() {
        return allColumnsSerializationInfo;
    }
}
AllColumnsViewModel.DisplayName = () => {
    const name = getLocalization('(All Columns)', 'DataAccessStringId.QueryBuilder_AllColumns');
    return name.charAt(0) === '*' ? name : '* ' + name;
};
