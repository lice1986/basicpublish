﻿/**
* DevExpress Analytics (query-builder\elements\columnExpression.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../serializer/serializer';
import { OperandProperty } from '../../widgets/criteria/operators/property';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { columnExpressionSerializationsInfo, ColumnType } from './columnExpressionMeta';
import { criteriaForEach } from '../../widgets/criteria/utils/criteriaEnumeration';
import { CriteriaOperatorStateMachine } from '../../widgets/criteria/utils/criteriaOperatorStateMachine';
export class ColumnExpression {
    constructor(model, query, serializer) {
        this.initialize(model, query, serializer);
    }
    actualName() {
        return this.alias() || this.column();
    }
    initialize(model, query, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this._dependedTables = [];
        if (this.table()) {
            const tableRef = query.getTable(this.table());
            this.table = ko.pureComputed(() => tableRef.actualName());
            this._dependedTables.push(tableRef);
        }
        else if (this.expression()) {
            try {
                this._criteria = CriteriaOperatorStateMachine.parse(this.expression());
                criteriaForEach(this._criteria, (operand) => {
                    if (operand instanceof OperandProperty) {
                        const dependedTable = findFirstItemMatchesCondition(query.tables(), table => operand.propertyName.indexOf(table.actualName() + '.') === 0);
                        dependedTable && this._dependedTables.push(dependedTable);
                    }
                });
            }
            catch (e) {
            }
        }
        this.__table = this.table;
        this.__column = this.column;
        this.__expression = this.expression;
    }
    toTable() {
        this.table = this.__table;
        this.column = this.__column;
        this.expression = ko.observable(null);
        this.itemType(ColumnType[ColumnType.Column]);
        if (!!this.__column.peek() && this.alias().indexOf('Expr') === 0)
            this.alias(null);
    }
    getInfo() {
        return columnExpressionSerializationsInfo;
    }
    isDepended(tableActualName) {
        return !!findFirstItemMatchesCondition(this._dependedTables, depended => depended.actualName() === tableActualName);
    }
}
