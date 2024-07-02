﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\functionOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { UnaryOperandSurface } from './unaryOperandSurface';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { FunctionOperatorType } from '../../criteria/operators/options/function';
export class FunctionOperandSurface extends OperandSurfaceBase {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.canRemove = true;
        this.contentTemplateName = 'dx-filtereditor-function';
        this.operands = ko.observableArray([]);
        if (operator.operands.length === 0) {
            if (parent instanceof UnaryOperandSurface) {
                this.specifics = parent.parent.specifics;
            }
            else {
                this.specifics = parent.specifics;
            }
            this.contentTemplateName = 'dx-filtereditor-function-lightweight';
            this.canRemove = false;
        }
        else {
            this.operands.push(this._createLeftPartProperty(operator.operands[0]));
            for (let i = 1; i < operator.operands.length; i++) {
                this.operands.push(this.createChildSurface(operator.operands[i]));
            }
        }
    }
    get leftPart() {
        return this.operands && this.operands()[0];
    }
    get rightPart() {
        return this.operands && this.operands().filter((_, index) => { return index !== 0; });
    }
    get displayType() {
        const item = this.items.filter((item) => { return this.operatorType() === item.value && this.reverse === item.reverse && this.model.enumType === item.type; })[0];
        if (item && item.name) {
            return item.displayText || getLocalization(item.name, item.localizationId);
        }
        else {
            if (!isNaN(parseInt(this.operatorType()))) {
                return FunctionOperatorType[this.operatorType()];
            }
            else {
                return this.operatorType() || '';
            }
        }
    }
    dispose() {
        this.operands().forEach(x => x.dispose());
        super.dispose();
    }
}