﻿/**
* DevExpress Analytics (widgets\criteria\operators\parameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { OperandValue } from './value';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class OperandParameter extends OperandValue {
    constructor(parameterName, value) {
        super(value);
        this.type = 'parameter';
        this.parameterName = parameterName || '';
    }
    get displayType() {
        return '?' + this.parameterName;
    }
    accept(visitor) {
        return visitor.visitOperandParameter
            ? visitor.visitOperandParameter(this)
            : new OperandParameter(this.parameterName, this.value);
    }
}
criteriaCreator.register('parameter', (options) => {
    return new OperandParameter(options.parameterName, options.value);
});
