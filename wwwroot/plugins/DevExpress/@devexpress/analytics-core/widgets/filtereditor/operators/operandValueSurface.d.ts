﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandValueSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { CriteriaOperator } from '../../criteria/operators/criteriaOperator';
import { OperandValue } from '../../criteria/operators/value';
import { IItemsProvider } from '../../utils';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
import { OperandSurfaceBase } from './operandSurfaceBase';
export declare class OperandValueSurface extends OperandSurfaceBase<OperandValue> {
    private static _defaultValue;
    private _value;
    private _scroll;
    private _updateDate;
    get items(): any[];
    constructor(operator: OperandValue, parent: CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: IItemsProvider, path: any);
    get displayType(): any;
    changeValue: () => void;
    isDefaultDisplay(): boolean;
    getDefaultValue(): any;
    scrollTo(element: HTMLElement): void;
    dataType: ko.Observable<string> | ko.Computed<string>;
    values: ko.Observable<any[]>;
    value: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<DataSource> | ko.Computed<DataSource>;
    isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
    templateName: string;
    _getBaseOptions: (element: HTMLElement) => {
        value: ko.Observable<any>;
        onFocusOut: () => any;
        onFocusIn: () => void;
    };
    getNumberEditorOptions: (element: HTMLElement) => any;
    getStringEditorOptions: (element: HTMLElement) => {
        value: ko.Observable<any>;
        onFocusOut: () => any;
        onFocusIn: () => void;
    };
    getBoolEditorOptions: (element: HTMLElement, $root: any) => {
        value: ko.Observable<any>;
        onFocusOut: () => any;
        onFocusIn: () => void;
        dataSource: {
            val: string;
            text: string;
            localizationId: string;
        }[];
        valueExpr: string;
        displayExpr: string;
        dropDownOptions: {
            container: any;
        };
    };
    getDateEditorOptions: (element: HTMLElement, $root: any) => {
        value: ko.Observable<any>;
        onFocusOut: () => any;
        onFocusIn: () => void;
        closeOnValueChange: boolean;
        type: string;
        dropDownOptions: {
            container: any;
        };
    };
    getListEditOptions: (element: HTMLElement, $root: any) => {
        value: ko.Observable<any>;
        onFocusOut: () => any;
        onFocusIn: () => void;
        dataSource: ko.Observable<DataSource<any, any>> | ko.Computed<DataSource<any, any>>;
        acceptCustomValue: boolean;
        valueExpr: string;
        displayExpr: string;
        useItemTextAsTitle: boolean;
        searchEnabled: boolean;
        dropDownOptions: {
            container: any;
        };
    };
}
