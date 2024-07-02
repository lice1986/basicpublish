﻿/**
* DevExpress Analytics (core\internal\_validation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare type ValidationRule = {
    type: string;
    validationCallback?: (options: any) => boolean;
    readonly message: string;
};
export declare function validateName(nameCandidate: string): boolean;
export declare function replaceInvalidSymbols(text: string): string;
export declare const nameValidationRules: ValidationRule[];
export {};
