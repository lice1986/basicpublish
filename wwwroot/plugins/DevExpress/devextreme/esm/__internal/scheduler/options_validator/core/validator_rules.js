/**
 * DevExtreme (esm/__internal/scheduler/options_validator/core/validator_rules.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export var createValidatorRule = (name, ruleFunc) => {
    Object.defineProperty(ruleFunc, "name", {
        value: name,
        writable: false
    });
    return ruleFunc
};