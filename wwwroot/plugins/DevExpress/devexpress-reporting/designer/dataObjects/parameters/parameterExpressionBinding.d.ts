﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { WrappedExpressionOptions } from '../expressions/_wrappedExpressionOptions';
export interface IParameterExpressionBinding {
    propertyName: ko.Observable<string>;
    expression: ko.Observable<string>;
}
export declare function createExpressionProperty(object: any, propertyName: string, suffix?: string): WrappedExpressionOptions;
export declare class ParameterExpressionBinding implements IParameterExpressionBinding {
    static expressionSuff: string;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isEmpty(): boolean;
    propertyName: ko.Observable<string>;
    expression: ko.Observable<string>;
}
