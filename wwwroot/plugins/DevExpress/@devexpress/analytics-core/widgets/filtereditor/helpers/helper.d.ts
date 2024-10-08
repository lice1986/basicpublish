﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\helper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { ICriteriaChangeOperator } from '../../criteria/utils/criteriaChangeOperator';
import { AggregateOperandSurface } from '../operators/aggregateOperandSurface';
import { BetweenOperandSurface } from '../operators/betweenOperandSurface';
import { BinaryOperandSurface } from '../operators/binaryOperandSurface';
import { CriteriaOperatorSurface } from '../operators/criteriaOperatorSurface';
import { FunctionOperandSurface } from '../operators/functionOperandSurface';
import { GroupOperandSurface } from '../operators/groupOperandSurface';
import { InOperandSurface } from '../operators/inOperandSurface';
import { OperandParameterSurface } from '../operators/operandParameterSurface';
import { OperandPropertySurface } from '../operators/operandPropertySurface';
import { OperandValueSurface } from '../operators/operandValueSurface';
import { UnaryOperandSurface } from '../operators/unaryOperandSurface';
import { FilterEditorAddOn } from './_addon';
import { FilterEditorSerializer } from './_serializer';
import { CriteriaSurfaceValidator } from './_validator';
export declare class FilterEditorHelper {
    get _allFilterEditorOperators(): Array<ICriteriaChangeOperator>;
    _getFilterEditorOperator(item: CriteriaOperator, items: ICriteriaChangeOperator[], reverse: boolean): ICriteriaChangeOperator;
    private _initDisplayText;
    constructor(serializer?: FilterEditorSerializer);
    registrateOperator(specific: string, targetEnum: any, value: string, name: string, opreatorType?: string, reverse?: boolean, localizationId?: string): void;
    rtl: boolean;
    parameters: ko.Observable<any[]> | ko.Computed<any[]>;
    canSelectLists: boolean;
    canCreateParameters: boolean;
    canChoiceParameters: boolean;
    canChoiceProperty: boolean;
    serializer: FilterEditorSerializer;
    criteriaTreeValidator: CriteriaSurfaceValidator;
    filterEditorOperators: {
        _common: ICriteriaChangeOperator[];
        string: ICriteriaChangeOperator[];
        guid: ICriteriaChangeOperator[];
        integer: ICriteriaChangeOperator[];
        float: ICriteriaChangeOperator[];
        date: ICriteriaChangeOperator[];
        list: ICriteriaChangeOperator[];
        group: ICriteriaChangeOperator[];
        bool: ICriteriaChangeOperator[];
    };
    onChange: () => void;
    onEditorFocusOut: (criteria: CriteriaOperator) => void;
    onSave: (criteria: string) => void;
    onClosing: () => void;
    handlers: {
        create: (criteria: any, popupService: any) => {
            data: FilterEditorAddOn;
            templateName: string;
        };
        change: (criteria: any, popupService: any) => {
            data: FilterEditorAddOn;
            templateName: string;
        };
        changeProperty: (criteria: any, popupService: any) => {
            data: FilterEditorAddOn;
            templateName: string;
        };
        changeValueType: (criteria: any, popupService: any) => {
            data: FilterEditorAddOn;
            templateName: string;
        };
        changeParameter: (criteria: any, popupService: any) => {
            data: FilterEditorAddOn;
            templateName: string;
        };
    };
    generateTreelistOptions(fieldListProvider: any, path: any): any;
    mapper: {
        aggregate: typeof AggregateOperandSurface;
        property: typeof OperandPropertySurface;
        parameter: typeof OperandParameterSurface;
        value: typeof OperandValueSurface;
        group: typeof GroupOperandSurface;
        between: typeof BetweenOperandSurface;
        binary: typeof BinaryOperandSurface;
        function: typeof FunctionOperandSurface;
        in: typeof InOperandSurface;
        unary: typeof UnaryOperandSurface;
        default: typeof CriteriaOperatorSurface;
    };
    aceTheme: string;
    getDisplayPropertyName: (path: string, name: string) => JQueryPromise<string>;
}
export declare const DefaultFilterEditorHelper: import("../../../serializer/_internal").IGlobalSubscribableValue<any>;
export declare function _setDefaultFilterEditorHelper(helperType: any | FilterEditorHelper): void;
