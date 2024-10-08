﻿/**
* DevExpress Analytics (widgets\criteria\operators\property.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class OperandProperty extends CriteriaOperator {
    constructor(propertyName = '', startColumn = -1, startLine = -1, originalPropertyLength = 0, circumflex = false) {
        super();
        this.type = 'property';
        this.propertyName = propertyName;
        this.originalPropertyLength = originalPropertyLength;
        this.startPosition = { column: startColumn, line: startLine };
        this.circumflex = circumflex;
    }
    get displayType() {
        return '[' + this.propertyName + ']';
    }
    accept(visitor) {
        return visitor.visitOperandProperty
            ? visitor.visitOperandProperty(this)
            : criteriaCreator.process('property', { propertyName: this.propertyName });
    }
}
criteriaCreator.register('property', (options) => {
    return new OperandProperty(options.propertyName, options.startColumn, options.startLine, options.originalPropertyLength, options.circumflex);
});
