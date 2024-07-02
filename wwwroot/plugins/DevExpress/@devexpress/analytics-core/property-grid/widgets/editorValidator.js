﻿/**
* DevExpress Analytics (property-grid\widgets\editorValidator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import validationEngine from 'devextreme/ui/validation_engine';
import { extend } from '../../serializer/_utils';
export class EditorValidator extends Disposable {
    constructor(_editor) {
        super();
        this._editor = _editor;
        this._lastValidatorOptions = null;
        this._lastModelOverridableRules = null;
        this._onValidatedHandler = undefined;
    }
    dispose() {
        this.onValidatedHandler = null;
        this.validatorInstance && this.validatorInstance.dispose();
        this.validatorInstance = null;
        super.dispose();
    }
    _isValid(validationRules, newValue) {
        this.onValidatedHandler = undefined;
        if (this.validatorInstance) {
            (validationRules || []).forEach(rule => rule && (rule.validator = this.validatorInstance));
            return this.validatorInstance.validate();
        }
        else {
            return validationEngine['validate'](newValue, validationRules, this._editor._get('displayName'));
        }
    }
    get validatorInstance() {
        return this._validatorInstance;
    }
    set validatorInstance(newValue) {
        if (this._validatorInstance && this.onValidatedHandler) {
            this._validatorInstance.off('validated', this._onValidatedHandler);
        }
        this._validatorInstance = newValue;
    }
    get onValidatedHandler() {
        return this._onValidatedHandler;
    }
    set onValidatedHandler(newValue) {
        if (this._onValidatedHandler && this.validatorInstance) {
            this.validatorInstance.off('validated', this._onValidatedHandler);
            this._onValidatedHandler = newValue;
            if (newValue) {
                this.validatorInstance.on('validated', this._onValidatedHandler);
            }
        }
    }
    getValidationRules() {
        const options = this.getValidatorOptions();
        const resultRules = (options || {}).validationRules;
        return resultRules || (resultRules === null ? null : []);
    }
    getValidatorOptions(templateValidatorOptions = {}) {
        const info = this._editor.peek(this._editor._get('info', 'wrapped'));
        if (!info)
            return;
        let options = this._lastValidatorOptions;
        const modelOverridableRules = this._editor._getEditorValidationRules();
        if (options && !this.areRulesChanged(modelOverridableRules)) {
            return options;
        }
        this._lastModelOverridableRules = modelOverridableRules;
        const extendedValidationRules = this._concatValidationRules(info.validatorOptions, modelOverridableRules);
        const extendedOptions = typeof info.editor.extendedOptions === 'function' ? info.editor.extendedOptions() : info.editor.extendedOptions;
        const extendedValidatorOptions = extendedOptions === null || extendedOptions === void 0 ? void 0 : extendedOptions.validatorOptions;
        options = extend({}, templateValidatorOptions, info.validatorOptions, { validationRules: extendedValidationRules }, extendedValidatorOptions);
        this._wrapValidatorEvents(options);
        this._lastValidatorOptions = options;
        return options;
    }
    areRulesChanged(overridableRuleSet) {
        if (!(this._lastModelOverridableRules && this._lastModelOverridableRules.length)) {
            return overridableRuleSet && overridableRuleSet.length;
        }
        else if (!overridableRuleSet || !overridableRuleSet.length) {
            return true;
        }
        else {
            return !overridableRuleSet.every(newRule => {
                return this._lastModelOverridableRules.some(rule => {
                    return newRule.message === rule.message && newRule.validationCallback === rule.validationCallback && newRule.type === rule.type;
                });
            });
        }
    }
    wrapOnValidatorInitialized(options) {
        const onInitializedHandler = options.onInitialized;
        const _this = this;
        options.onInitialized = function (e) {
            _this._onValidatorInitialized(e);
            onInitializedHandler && onInitializedHandler.apply(this, arguments);
        };
    }
    _onValidatorInitialized(e) {
        this.validatorInstance = e && e.component;
    }
    _concatValidationRules(validatorOptions, validationRules) {
        if ((!validatorOptions || !validatorOptions.validationRules) && !validationRules) {
            return null;
        }
        return ((validatorOptions || {}).validationRules || []).concat(validationRules || []);
    }
    _wrapValidatorEvents(validatorOptions) {
        if (!validatorOptions || !validatorOptions.validationRules || !validatorOptions.validationRules.length) {
            return;
        }
        this.wrapOnValidatorInitialized(validatorOptions);
        return validatorOptions;
    }
    assignWithValidation(newValue, assignValueFunc) {
        const validationRules = this.getValidationRules();
        const assignValueFirst = !validationRules || validationRules.some(x => x.assignValueFirst);
        if (assignValueFirst) {
            assignValueFunc();
        }
        const validationResult = this._isValid(validationRules, newValue);
        if (!validationResult.isValid) {
            if (validationResult.brokenRule && validationResult.brokenRule['isDeferred']) {
                this.onValidatedHandler = (result) => {
                    this.onValidatedHandler = undefined;
                    if (!result.isValid)
                        return;
                    assignValueFunc();
                };
            }
            return;
        }
        if (!assignValueFirst) {
            assignValueFunc();
        }
    }
}
