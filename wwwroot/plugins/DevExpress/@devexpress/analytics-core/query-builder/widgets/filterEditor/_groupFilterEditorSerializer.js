﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_groupFilterEditorSerializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FilterEditorSerializer } from '../../../widgets/filtereditor/helpers/_serializer';
import { find } from '../../../core/utils/_arrayutils';
import { isAggregatedExpression } from './_queryBuilderObjectsProvider';
import { OperandProperty } from '../../../widgets/criteria/operators/property';
import { criteriaForEach } from '../../../widgets/criteria/utils/criteriaEnumeration';
import { CriteriaOperatorStateMachine } from '../../../widgets/criteria/utils/criteriaOperatorStateMachine';
export class GroupFilterEditorSerializer extends FilterEditorSerializer {
    constructor(_columns) {
        super();
        this._columns = _columns;
        this._aggregatePropertyName = (operand) => {
            const itemColumnAggregate = this._findAggregatedColumn(c => c.actualName() === operand.propertyName);
            return itemColumnAggregate ? this._columnDisplayName(itemColumnAggregate) : operand.propertyName;
        };
    }
    _columnDisplayName(column) {
        return column.table() + '.' + column.actualName();
    }
    _findAggregatedColumn(predicate) {
        return find(this._columns(), c => isAggregatedExpression(c) && predicate(c));
    }
    serializeOperandProperty(operand) {
        const column = this._findAggregatedColumn(c => operand.propertyName === this._columnDisplayName(c));
        return '[' + (column ? column.actualName() : operand.propertyName) + ']';
    }
    deserialize(stringCriteria) {
        const operand = CriteriaOperatorStateMachine.parse(stringCriteria);
        if (operand) {
            criteriaForEach(operand, operator => {
                if (operator instanceof OperandProperty) {
                    operator['propertyName'] = this._aggregatePropertyName(operator);
                }
            });
        }
        return super.deserializeOperand(operand);
    }
}
