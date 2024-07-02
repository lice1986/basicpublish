﻿/**
* DevExpress Analytics (widgets\criteria\operators\value.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from './criteriaOperator';
import { validateGuid } from '../../../property-grid/widgets/internal/_internal';
import { parseDate } from '../../../property-grid/localization/_localization';
import { criteriaCreator } from '../utils/criteriaOperatorPreprocessor';
export class OperandValue extends CriteriaOperator {
    constructor(value, isSomeType) {
        super();
        this.type = 'value';
        let result = value !== null && value !== undefined ? value : '';
        const isGuid = validateGuid(value);
        if (value && value['length'] && ((value[0] === "'" && value[value.length - 1] === "'") || isGuid)) {
            this.specifics = 'string';
            if (isGuid && value[0] === '{' && value[value.length - 1] === '}')
                this.specifics = 'guid';
            result = this._processStringValue(value);
        }
        else if (value && value['length'] && value[0] === '#' && value[value.length - 1] === '#' && !isSomeType) {
            result = value.slice(1, value.length - 1);
            result = parseDate(result);
            if (!result) {
                result = parseDate(value.slice(1, value.length - 1));
            }
        }
        else if (String(value).toLowerCase() === 'true' || String(value).toLowerCase() === 'false') {
            result = String(value).toLowerCase() === 'true' ? 'True' : 'False';
        }
        else if (isSomeType) {
            this.specifics = value.match(/\#\w+\#/g)[0].replace(/\#/g, '').toLowerCase();
        }
        this.value = result;
    }
    _processStringValue(value) {
        let result = value.slice(1, value.length - 1);
        result = result.replace(/''/g, "'");
        return result;
    }
    get displayType() {
        return this.value || '?';
    }
    accept(visitor) {
        return visitor.visitOperandValue ? visitor.visitOperandValue(this) : this;
    }
}
criteriaCreator.register('value', (options) => {
    return new OperandValue(options === null || options === void 0 ? void 0 : options.value, options === null || options === void 0 ? void 0 : options.isSomeType);
});
