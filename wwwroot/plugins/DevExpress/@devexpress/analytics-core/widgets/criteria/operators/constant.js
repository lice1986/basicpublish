﻿/**
* DevExpress Analytics (widgets\criteria\operators\constant.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
import { OperandValue } from './value';
export class ConstantValue extends OperandValue {
    constructor(value, specifics) {
        super(value);
        this.type = 'value';
        if (specifics && !this.specifics)
            this.specifics = specifics;
    }
    accept(visitor) {
        return visitor.visitConstantValue
            ? visitor.visitConstantValue(this)
            : new ConstantValue(this.value, this.specifics);
    }
}
criteriaCreator.register('const', (options) => new ConstantValue((options === null || options === void 0 ? void 0 : options.value) || null));
