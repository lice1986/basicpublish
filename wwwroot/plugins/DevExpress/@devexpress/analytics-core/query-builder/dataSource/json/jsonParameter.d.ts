﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonParameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IModelSerializer } from '../../../serializer/serializer';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IExpressionOptions } from '../../../widgets/expressioneditor/expressioneditor';
import { IItemsProvider } from '../../../widgets/utils';
export declare enum JsonParameterType {
    PathParameter = 0,
    QueryParameter = 1,
    Header = 2
}
export declare class JsonParameter extends Disposable {
    expression_Prefix: string;
    static from(model: any, serializer?: IModelSerializer): JsonParameter;
    static toJson(value: JsonParameter, serializer: any, refs: any): any;
    _initEditingProperties(): void;
    switchEditors(): void;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    itemType: ko.Observable<string>;
    name: ko.Observable<string> | ko.Computed<string>;
    namePlaceholder: () => any;
    valuePlaceholder: () => any;
    value: ko.Observable<string> | ko.Computed<string>;
    _editingValue: ko.Observable<string>;
    _expression: IExpressionOptions;
    isExpression: ko.Observable<boolean>;
    itemsProvider: IItemsProvider;
    _parameterTypes: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    nameValidationRules: Array<{
        type: string;
        message: string;
    }>;
}