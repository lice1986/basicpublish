﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDisplayedValue, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { IParameter, IParameterDescriptor } from './parameterHelper';
import { PreviewParameterHelper } from './previewParameterHelper';
import { IPreviewParameterInfo } from './previewParametersViewModel';
export interface IPreviewParameterDescriptor extends IParameterDescriptor {
    hasLookUpValues?: boolean;
}
export declare class PreviewParameter extends BaseModel implements IParameter {
    onPropertyChanged(args: PropertyChangedEventArgs<this> | ArrayPropertyChangedEventArgs<this>): void;
    static _compareValues(value1: any, value2: any): boolean;
    constructor(parameterInfo: IPreviewParameterInfo, parameterHelper: PreviewParameterHelper);
    getParameterDescriptor: () => IParameterDescriptor;
    safeAssignObservable(name: 'value' | '_value', value: any): void;
    _validateRangeType(value: unknown): boolean;
    validateAndAssignValue(value: unknown): void;
    initialize(value: any, parameterHelper: PreviewParameterHelper): void;
    serialize(): {
        Value: any;
        Key: string;
        TypeName: string;
    };
    hasVerticalLabel: boolean;
    valueInfo: ISerializationInfo;
    value: any;
    _value: any;
    _originalLookUpValues: Array<IDisplayedValue>;
    _originalValue: any;
    isRange: boolean;
    tag: any;
    type: string;
    path: string;
    isFilteredLookUpSettings: boolean;
    hasBindedExpressions: boolean;
    hasVisibleExpression: boolean;
    lookUpValues: IDisplayedValue[];
    valueStoreCache: any;
    allowNull: boolean;
    isMultiValue: boolean;
    selectAllValues: boolean;
    isMultiValueWithLookUp: boolean;
    multiValueInfo: ISerializationInfo;
    visible: boolean;
    enabled: boolean;
    intTypes: string[];
    floatTypes: string[];
    isTypesCurrentType: (types: string[], type: string) => boolean;
}
