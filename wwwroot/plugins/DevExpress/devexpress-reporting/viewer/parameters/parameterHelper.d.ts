﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEnumType } from '../../common/customTypes';
import { IParametersCustomizationHandler } from '../utils/initializer';
import { ISerializationInfo, IDisplayedValue, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils-native';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { BaseRenderingMultiplatformModel, EngineType, IViewModel, MultiPlatformObservable } from '@devexpress/analytics-core/analytics-serializer-native';
export interface IParameter {
    getParameterDescriptor: () => IParameterDescriptor;
    value: MultiPlatformObservable<any>;
    type: any;
    isMultiValue: any;
    selectAllValues: any;
    allowNull: any;
    multiValueInfo: MultiPlatformObservable<ISerializationInfo>;
    tag?: any;
}
export interface IParameterDescriptor {
    description: string;
    name: string;
    type: string;
    value: any;
    visible: boolean;
    enabled: boolean;
    multiValue?: boolean;
    selectAllValues?: boolean;
    allowNull?: boolean;
    tag?: any;
}
export declare function getEditorType(typeString: any): any;
export declare function _convertLocalDateToUTC(localDate: Date): Date;
export declare class MultiValueItem extends BaseRenderingMultiplatformModel<IViewModel> {
    constructor(engine: EngineType);
    value: MultiPlatformObservable<any>;
    getInfo: () => ISerializationInfoArray;
}
export declare class ParameterHelper extends BaseRenderingMultiplatformModel<IViewModel> {
    private _knownEnums;
    _customizeParameterEditors: MultiPlatformObservable<(parameter: IParameterDescriptor, info: ISerializationInfo) => void>;
    private _isKnownEnumType;
    static getSerializationValue(value: any, dateConverter: any): any;
    static createDefaultDataSource(store: ArrayStore): DataSource;
    initialize(knownEnums?: Array<IEnumType>, callbacks?: IParametersCustomizationHandler): void;
    createInfo(parameter: IParameter): ISerializationInfo;
    addShowCleanButton(info: ISerializationInfo, parameter: IParameter): void;
    assignValueStore(info: ISerializationInfo, parameter: IParameter): void;
    createMultiValue(parameter: IParameter, value?: any): MultiValueItem;
    createMultiValueArray(fromArray: Array<any>, parameter: IParameter, convertSingleValue?: (val: any) => any): MultiValueItem[];
    isEnumType(parameter: IParameter): boolean;
    getItemsSource(parameterDescriptor: IParameterDescriptor, items: Array<IDisplayedValue>, sort?: boolean): any;
    getEnumCollection(parameter: IParameter): Array<IDisplayedValue>;
    getParameterInfo(parameter: IParameter): ISerializationInfo;
    getValueConverter(type: string): (val: any) => any;
    customizeParameterLookUpSource: (parameter: IParameterDescriptor, items: Array<IDisplayedValue>) => any;
    getUnspecifiedDisplayText: () => any;
}