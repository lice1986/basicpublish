/**
 * DevExtreme (cjs/localization/currency.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../core/utils/extend");
var _default = {
    _formatNumberCore: function(value, format, formatConfig) {
        if ("currency" === format) {
            formatConfig.precision = formatConfig.precision || 0;
            let result = this.format(value, (0, _extend.extend)({}, formatConfig, {
                type: "fixedpoint"
            }));
            const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
            result = result.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
            return result
        }
        return this.callBase.apply(this, arguments)
    },
    getCurrencySymbol: function() {
        return {
            symbol: "$"
        }
    },
    getOpenXmlCurrencyFormat: function() {
        return "$#,##0{0}_);\\($#,##0{0}\\)"
    }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
