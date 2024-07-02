﻿/**
* DevExpress Analytics (property-grid\widgets\editorValidator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { Editor } from './editor';
export declare class EditorValidator extends Disposable {
    private _editor;
    private _lastValidatorOptions;
    private _lastModelOverridableRules;
    private _validatorInstance;
    private _onValidatedHandler;
    dispose(): void;
    constructor(_editor: Editor);
    _isValid(validationRules: any, newValue: any): {
        brokenRule?: any;
        isValid?: boolean;
        validationRules?: Array<any>;
        value?: any;
    };
    get validatorInstance(): any;
    set validatorInstance(newValue: any);
    get onValidatedHandler(): any;
    set onValidatedHandler(newValue: any);
    getValidationRules(): any;
    getValidatorOptions(templateValidatorOptions?: any): any;
    areRulesChanged(overridableRuleSet: Array<{
        type: string;
        message: any;
        validationCallback?: any;
    }>): number | boolean;
    wrapOnValidatorInitialized(options: any): void;
    _onValidatorInitialized(e: any): void;
    _concatValidationRules(validatorOptions: any, validationRules: any): any;
    _wrapValidatorEvents(validatorOptions: any): any;
    assignWithValidation(newValue: any, assignValueFunc: () => void): void;
}
