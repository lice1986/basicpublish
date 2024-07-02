﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\rangeSettings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectItem } from '../objectStorageItem';
import { Parameter } from './parameter';
export declare class RangeParametersSettings extends ObjectItem {
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    private _updateInfo;
    preInitProperties(model: any, helper: any, serializer: any): void;
    getInfo(): ISerializationInfoArray;
    initalizeRangeParameter(rangeParameter: RangeBoundaryParameter, parameter: Parameter, namePostfix?: string): void;
    assingParameterInfo(parameter: Parameter): void;
    initializeParameters(parameter: Parameter): void;
    _isEditing: ko.Observable<boolean>;
    startParameter: ko.Observable<RangeBoundaryParameter>;
    endParameter: ko.Observable<RangeBoundaryParameter>;
}
export declare class RangeBoundaryParameter extends ObjectItem {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, dsHelperProvider: any, serializer?: IModelSerializer);
    get name(): string;
    get displayName(): string;
    get specifics(): string;
    _specifics: ko.Observable<string>;
    valueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    parameterName: ko.Observable<string>;
    value: ko.Observable | ko.Computed;
    templateName: string;
    type: ko.Observable | ko.Computed;
}
export declare class RangeStartParameter extends RangeBoundaryParameter {
    constructor(model: any, dsHelperProvider: any, serializer?: IModelSerializer);
}
export declare class RangeEndParameter extends RangeBoundaryParameter {
    constructor(model: any, dsHelperProvider: any, serializer?: IModelSerializer);
}