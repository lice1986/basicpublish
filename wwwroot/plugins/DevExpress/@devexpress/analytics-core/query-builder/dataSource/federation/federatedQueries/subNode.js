﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\subNode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '../../../../serializer/serializer';
import { extend } from '../../../../serializer/_utils';
import { BinaryOperator } from '../../../../widgets/criteria/operators/binary';
import { GroupOperator } from '../../../../widgets/criteria/operators/group';
import { BinaryOperatorType } from '../../../../widgets/criteria/operators/options/binary';
import { CriteriaOperatorStateMachine } from '../../../../widgets/criteria/utils/criteriaOperatorStateMachine';
import { operatorTokens } from '../../../../widgets/criteria/utils/operatorTokens';
import { RelationViewModel } from '../../../elements/relationModel';
import { SourceQuery } from './sourceQuery';
export const subNodeSerializationInfo = [
    { propertyName: 'condition', modelName: '@Condition', defaultVal: '' },
    {
        propertyName: 'joinType',
        modelName: '@JoinType',
        defaultVal: 'Inner',
    },
    { propertyName: 'query', modelName: 'Query' },
];
export class SubNode {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, extend(model, { '@ItemType': 'JoinElement' }));
        if (model['Query'])
            this.query = ko.observable(new SourceQuery(model['Query']));
    }
    static deserializeRelationModel(subNodeQuery, relation) {
        const parentTableName = relation.parentTableName();
        const nestedTableName = relation.nestedTableName();
        const conditionStrings = [];
        relation.conditions().forEach(condition => {
            const firstCondition = '[' + nestedTableName + '.' + condition.nestedColumnName() + ']';
            const secondCondition = '[' + parentTableName + '.' + condition.parentColumnName() + ']';
            const operator = operatorTokens[condition.operator()];
            const conditionString = firstCondition + ' ' + operator + ' ' + secondCondition;
            conditionStrings.push(conditionString);
        });
        const subNode = new SubNode({ '@JoinType': relation.joinType(), '@Condition': conditionStrings.join(' And ') });
        subNode.query(subNodeQuery);
        return subNode;
    }
    _parsePath(condition) {
        if (condition[0] === '[' && condition[condition.length - 1] === ']')
            return CriteriaOperatorStateMachine.parse(condition)['propertyName'];
        return condition;
    }
    _createCondition(parent, nested, operator) {
        return {
            '@ControlType': 'JoinCondition',
            '@ItemType': 'KeyColumn',
            '@Operator': operator,
            '@Nested': nested,
            '@Parent': parent
        };
    }
    _conditionBinary(operator) {
        const leftPath = this._parsePath(operator.leftPart['propertyName']);
        const rightPath = this._parsePath(operator.rightPart['propertyName']);
        const _operator = BinaryOperatorType[operator.operatorType];
        return this._createCondition(rightPath.split('.')[1], leftPath.split('.')[1], _operator);
    }
    createRelationModel(query) {
        const result = CriteriaOperatorStateMachine.parse(this.condition());
        const _operands = [];
        if (result instanceof GroupOperator) {
            result.operands.forEach(operand => {
                if (operand instanceof BinaryOperator)
                    _operands.push(operand);
            });
        }
        else if (result instanceof BinaryOperator) {
            _operands.push(result);
        }
        const parentTable = this._parsePath(_operands[0].rightPart['propertyName']).split('.')[0];
        const nestedTable = this._parsePath(_operands[0].leftPart['propertyName']).split('.')[0];
        const _keyColumns = {};
        for (let j = 0; j < _operands.length; j++) {
            const operator = _operands[j];
            _keyColumns['Item' + (j + 1)] = this._conditionBinary(operator);
        }
        return new RelationViewModel({
            '@Parent': parentTable,
            '@Nested': nestedTable,
            '@Type': this.joinType(),
            'KeyColumns': _keyColumns
        }, query, new ModelSerializer());
    }
    getInfo() {
        return subNodeSerializationInfo;
    }
}
