﻿/**
* DevExpress Analytics (widgets\common\_displayNameProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { OperandProperty } from '../criteria/operators/property';
import { FilterEditorSerializer } from '../filtereditor/helpers/_serializer';
import { criteriaForEach } from '../criteria/utils/criteriaEnumeration';
import { CriteriaOperatorStateMachine } from '../criteria/utils/criteriaOperatorStateMachine';
export class DisplayExpressionConverter {
    constructor(displayNameProvider) {
        this.displayNameProvider = displayNameProvider;
    }
    _replaceNames(path, expression, getDisplayExpression) {
        const def = $.Deferred();
        let expressionCriteria;
        if (!expression)
            return def.resolve('').promise();
        try {
            expressionCriteria = CriteriaOperatorStateMachine.parse(expression, true);
        }
        catch (e) {
            return def.reject().promise();
        }
        const requests = [];
        const result = [];
        const serializer = new FilterEditorSerializer();
        criteriaForEach(expressionCriteria, (operator, innerPath) => {
            if (operator instanceof OperandProperty) {
                const isContainsParentRelationshipTraversalOperator = operator.propertyName.indexOf('^.') === 0;
                let propertyName = isContainsParentRelationshipTraversalOperator ? operator.propertyName.substring(2) : operator.propertyName;
                propertyName = innerPath ? [innerPath, propertyName].join('.') : propertyName;
                const request = getDisplayExpression ? this.displayNameProvider.getDisplayNameByPath(path, propertyName) :
                    this.displayNameProvider.getRealName(path, propertyName);
                requests.push(request.done(data => {
                    let convertedName = isContainsParentRelationshipTraversalOperator ? '^.' + data : data;
                    convertedName = innerPath ? convertedName.split('.').slice(innerPath.split('.').length).join('.') : convertedName;
                    result.push({
                        operand: operator,
                        convertedName
                    });
                }));
            }
        });
        if (requests.length === 0) {
            def.resolve(expression);
        }
        else {
            let processedRequestsCount = 0;
            const onAlways = () => {
                if (++processedRequestsCount < requests.length)
                    return;
                const lines = expression.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const operands = result.filter((value) => value.operand.startPosition.line === i).sort((a, b) => {
                        return a.operand.startPosition.column - b.operand.startPosition.column;
                    });
                    for (let j = 0, delta = 0; j < operands.length; j++) {
                        const column = operands[j].operand.startPosition.column;
                        const propertyName = operands[j].operand.propertyName;
                        let deltaName = 0;
                        if (operands[j].operand.originalPropertyLength !== propertyName.length) {
                            deltaName = Math.max(0, operands[j].operand.originalPropertyLength - serializer.serialize(operands[j].operand, false).length);
                        }
                        const convertedName = operands[j].convertedName;
                        if (!propertyName || column < 0)
                            continue;
                        lines[i] = lines[i].substring(0, column + delta) + convertedName + lines[i].substring(column + propertyName.length + deltaName + delta);
                        delta += convertedName.length - propertyName.length - deltaName;
                    }
                }
                def.resolve(lines.join('\n'));
            };
            requests.forEach(r => r.always(onAlways));
        }
        return def.promise();
    }
    toDisplayExpression(path, expression) {
        return this._replaceNames(path, expression, true);
    }
    toRealExpression(path, expression) {
        return this._replaceNames(path, expression, false);
    }
}
