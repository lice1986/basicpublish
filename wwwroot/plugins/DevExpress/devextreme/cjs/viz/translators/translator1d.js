/**
 * DevExtreme (cjs/viz/translators/translator1d.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Translator1D = Translator1D;
const _Number = Number;

function Translator1D() {
    this.setDomain(arguments[0], arguments[1]).setCodomain(arguments[2], arguments[3]).setInverted(false)
}
Translator1D.prototype = {
    constructor: Translator1D,
    setDomain: function(domain1, domain2) {
        this._domain1 = _Number(domain1);
        this._domain2 = _Number(domain2);
        this._domainDelta = this._domain2 - this._domain1;
        return this
    },
    setCodomain: function(codomain1, codomain2) {
        this._codomain1 = _Number(codomain1);
        this._codomain2 = _Number(codomain2);
        this._codomainDelta = this._codomain2 - this._codomain1;
        return this
    },
    setInverted(state) {
        this.inverted = state
    },
    getDomain: function() {
        return [this._domain1, this._domain2]
    },
    getCodomain: function() {
        return [this._codomain1, this._codomain2]
    },
    getDomainStart: function() {
        return this._domain1
    },
    getDomainEnd: function() {
        return this._domain2
    },
    getCodomainStart: function() {
        return this._codomain1
    },
    getCodomainEnd: function() {
        return this._codomain2
    },
    getDomainRange: function() {
        return this._domainDelta
    },
    getCodomainRange: function() {
        return this._codomainDelta
    },
    translate: function(value) {
        let ratio = (_Number(value) - this._domain1) / this._domainDelta;
        this.inverted && (ratio = 1 - ratio);
        return 0 <= ratio && ratio <= 1 ? this._codomain1 + ratio * this._codomainDelta : NaN
    },
    adjust: function(value) {
        const ratio = (_Number(value) - this._domain1) / this._domainDelta;
        let result = NaN;
        if (ratio < 0) {
            result = this._domain1
        } else if (ratio > 1) {
            result = this._domain2
        } else if (0 <= ratio && ratio <= 1) {
            result = _Number(value)
        }
        return result
    }
};
