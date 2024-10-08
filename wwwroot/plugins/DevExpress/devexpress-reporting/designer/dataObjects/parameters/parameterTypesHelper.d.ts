﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterTypesHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEnumType } from '../../../common/customTypes';
export interface IParameterType {
    value: string;
    displayValue: string;
    defaultVal: any;
    specifics: string;
    valueConverter: (val: any) => any;
}
export interface IParameterTypeValue {
    value: string;
    displayValue: string;
    defaultValue: any;
    specifics: string;
    valueConverter: (val: any, defaultValue?: any) => any;
    icon?: string;
    localizationId?: string;
}
export declare class ParameterTypesHelper {
    private knownEnums?;
    static defaultGuidValue: string;
    static typeValues: IParameterTypeValue[];
    enumValueTypes?: IParameterTypeValue[];
    private _getTypeInfo;
    private _tryConvertValue;
    convertSingleValue(value: any, typeName: string): any;
    getSpecifics(typeName: string): string;
    getIcon(typeName: string): string;
    getDefaultValue(typeName: string): any;
    getEnumTypeValues(): IParameterTypeValue[];
    constructor(knownEnums?: Array<IEnumType>);
}
