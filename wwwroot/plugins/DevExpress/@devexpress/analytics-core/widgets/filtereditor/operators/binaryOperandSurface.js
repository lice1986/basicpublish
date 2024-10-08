﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\binaryOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
export class BinaryOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.contentTemplateName = 'dx-filtereditor-binary';
        this.leftOperand = ko.observable(null);
        this.rightOperand = ko.observable(null);
        this.leftOperand(this._createLeftPartProperty(operator.leftOperand));
        this.rightOperand(this.createChildSurface(operator.rightOperand));
    }
    get leftPart() {
        return this.leftOperand();
    }
    get rightPart() {
        return this.rightOperand();
    }
    dispose() {
        this.leftOperand().dispose();
        this.rightOperand().dispose();
        super.dispose();
    }
}
