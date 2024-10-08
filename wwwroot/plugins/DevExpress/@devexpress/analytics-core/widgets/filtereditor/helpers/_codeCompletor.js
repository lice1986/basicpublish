﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_codeCompletor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CodeCompletor, createFunctionCompletion } from '../../common/_codeCompletor';
import { FilterEditorHelper } from './helper';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { FunctionOperatorType } from '../../criteria/operators/options/function';
export class FilterEditorCodeCompletor extends CodeCompletor {
    constructor(options) {
        super(options);
        const helper = new FilterEditorHelper();
        const functions = [];
        const aggregate = [];
        const operators = [];
        const groups = Object.keys(helper.filterEditorOperators);
        groups.forEach((groupName) => {
            helper.filterEditorOperators[groupName].forEach((operator) => {
                if (operator.insertVal) {
                    const name = operator.name, insertVal = operator.insertVal, paramCount = operator.paramCount;
                    if (operator.type === FunctionOperatorType && functions.filter(x => x.name === name).length === 0) {
                        functions.push({ name: name, insertVal: insertVal });
                    }
                    else if (operator.type === AggregateOperand && aggregate.filter(x => x.name === name).length === 0) {
                        aggregate.push({ name: name, insertVal: insertVal });
                    }
                    else if (operator.type !== AggregateOperand && operator.type !== FunctionOperatorType && operators.filter(x => x.name === name).length === 0) {
                        operators.push({ name: name, insertVal: insertVal, paramCount: paramCount });
                    }
                }
            });
        });
        this.filterEditorAvailable = { operators, aggregate, functions };
    }
    getFunctionsCompletions() {
        const functions = [];
        this.filterEditorAvailable.functions.forEach(funcItem => {
            functions.push(createFunctionCompletion({ text: funcItem.name, paramCount: funcItem.insertVal.split(',').length }, funcItem.insertVal, funcItem.insertVal));
        });
        return functions;
    }
    getAggregateCompletions() {
        const functions = [];
        this.filterEditorAvailable.aggregate.forEach(funcItem => {
            functions.push(createFunctionCompletion({ text: funcItem.name, paramCount: 0 }, funcItem.insertVal, funcItem.insertVal));
        });
        return functions;
    }
    getOperatorCompletions(prefix) {
        const operators = [];
        this.filterEditorAvailable.operators.forEach(operator => {
            operators.push((operator.insertVal.match(new RegExp('\\([^\\(\\)]*\\)', 'g'))) ?
                createFunctionCompletion({ text: operator.name, paramCount: operator.paramCount || operator.insertVal.split(',').length }, operator.insertVal, operator.insertVal) :
                { caption: operator.insertVal, snippet: prefix + operator.insertVal, meta: 'operator' });
        });
        return operators;
    }
}
