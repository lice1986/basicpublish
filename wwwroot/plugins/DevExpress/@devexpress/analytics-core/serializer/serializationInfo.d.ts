﻿/**
* DevExpress Analytics (serializer\serializationInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Observable } from 'knockout';
import { IModelSerializer } from './serializer';
import { IGlobalSubscribableValue } from './_internal';
export interface IEditorInfo {
    header?: string;
    content?: string;
    custom?: string;
    editorType?: any;
    extendedOptions?: any;
}
export interface ISerializationInfo {
    propertyName: string;
    modelName?: string;
    defaultVal?: any;
    type?: ISerializableModelConstructor;
    info?: ISerializationInfoArray;
    from?: (val: any, serializer?: IModelSerializer) => any;
    toJsonObject?: any;
    array?: boolean;
    link?: boolean;
    editor?: IEditorInfo;
    displayName?: string;
    values?: {
        [key: string]: string;
    } | Observable<{
        [key: string]: string;
    }> | IGlobalSubscribableValue<{
        [key: string]: string;
    }>;
    valuesArray?: Array<IDisplayedValue>;
    initialize?: (viewModel: any, serilizer?: IModelSerializer) => void;
    validationRules?: Array<any>;
    validatorOptions?: any;
    editorOptions?: any;
    localizationId?: string;
    descriptionLocalizationId?: string;
    visible?: any;
    disabled?: any;
    valueStore?: any;
    addHandler?: () => any;
    alwaysSerialize?: boolean;
    template?: string;
    beforeSerialize?: (value: any) => any;
    isRequired?: boolean;
    localizable?: boolean;
    asRef?: boolean;
}
export interface IDisplayedValue {
    value: any;
    displayValue: string;
    localizationId?: string;
}
export interface ISerializationInfoArray extends Array<ISerializationInfo> {
}
export interface ISerializableModel {
    _model?: any;
    getInfo?: () => ISerializationInfoArray;
}
export interface ISerializableModelConstructor extends ISerializableModel {
    new (model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray): any;
}
