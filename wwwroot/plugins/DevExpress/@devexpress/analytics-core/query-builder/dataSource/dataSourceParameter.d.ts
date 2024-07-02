﻿/**
* DevExpress Analytics (query-builder\dataSource\dataSourceParameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { ISerializableModel, ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
export declare class DataSourceParameter extends Disposable implements ISerializableModel {
    private _serializationsInfo;
    private _name;
    static _typeValues: any[];
    static _getTypeValue(typeName: string, resultType?: string): any;
    private _getTypeValue;
    private _tryConvertValue;
    private static _isValueValid;
    getEditorType(type: any): {
        header?: any;
        content?: any;
        custom?: any;
    };
    private _updateValueInfo;
    private _valueInfo;
    private _value;
    private _expressionValue;
    private _previousResultType;
    private _parametersFunctions;
    constructor(model: any, serializer?: IModelSerializer, _serializationsInfo?: ISerializationInfoArray);
    get specifics(): any;
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    name: ko.Computed<string>;
    value: ko.Observable | ko.Computed;
    type: ko.Observable<string> | ko.Computed<string>;
    resultType: ko.Observable<string> | ko.Computed<string>;
    getInfo(): ISerializationInfoArray;
    isPropertyVisible(propName: string): boolean;
}