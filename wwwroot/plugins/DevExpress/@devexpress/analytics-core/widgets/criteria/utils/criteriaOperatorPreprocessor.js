﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaOperatorPreprocessor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UnaryOperatorType } from '../operators/options/unary';
export class CriteriaOperatorPreprocessor {
    constructor() {
        this._func = [];
        this._factory = {};
        this._changeTypeFactory = {};
    }
    addListener(func) {
        const index = this._func.indexOf(func);
        if (index === -1) {
            this._func.push(func);
        }
    }
    removeListener(func) {
        const index = this._func.indexOf(func);
        if (index !== -1) {
            this._func.splice(index, 1);
        }
    }
    register(operatorType, create, changeType) {
        this._factory[operatorType] = create;
        if (changeType)
            this._changeTypeFactory[operatorType] = (changeOperator) => {
                let operand = changeType(changeOperator);
                if (changeOperator.reverse) {
                    operand = this.process('unary', {
                        operator: operand,
                        operatorType: UnaryOperatorType.Not
                    });
                }
                return operand;
            };
    }
    process(operatorType, options = {}) {
        let operand = operatorType in this._factory ? this._factory[operatorType](options) : this._factory['default']();
        this._func.forEach(func => { operand = func(operand, { operatorType: operatorType, options: options || {} }); });
        return operand;
    }
    changeByType(value) {
        if (this._changeTypeFactory[value._type]) {
            return this._changeTypeFactory[value._type](value);
        }
        return null;
    }
}
export const criteriaCreator = new CriteriaOperatorPreprocessor();
