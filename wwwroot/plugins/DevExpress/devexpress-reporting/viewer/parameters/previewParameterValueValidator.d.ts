﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterValueValidator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class PreviewParameterValueValidator {
    private _validatorMap;
    private _registerType;
    private _numericTypes;
    constructor();
    validate(type: string, value: any): boolean;
    isNumericType(type: string): boolean;
}
