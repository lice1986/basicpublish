﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\valueSourceSettingsHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LookUpValue } from './lookUpValue';
import { Parameter } from './parameter';
export declare class ValueSourceSettingsHelper {
    parameter: Parameter;
    private _updateValueSourceSettingsType;
    private _updateValueSourceSettings;
    constructor(parameter: Parameter);
    initializeParameterSettingsType(): void;
    initializeLookupValueSubscribe(report: any): void;
    initializeLookUpValue(lookUpValue: LookUpValue): void;
    updateLookUpValues(newType: string, value?: any): void;
    updateSettingValues(newType: string, value?: any): void;
}