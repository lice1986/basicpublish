/**
 * DevExtreme (esm/__internal/scheduler/options_validator/core/validator_rules.test.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    createValidatorRule
} from "../../../scheduler/options_validator/core/validator_rules";
describe("createValidatorRule", () => {
    it('should add the "name" property to the passed function', () => {
        var result = createValidatorRule("test-name", () => true);
        expect(result.name).toBe("test-name")
    })
});
