﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\reportParameterHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ParameterHelper } from '../../viewer/parameters/parameterHelper';
import { IParameterContainer, ParameterPanelLayoutItem } from '../dataObjects/parameters/layoutItems';
import { Parameter } from '../dataObjects/parameters/parameter';
export declare class ReportParameterHelper extends ParameterHelper {
    container: IParameterContainer;
    allLayoutItems: ko.Computed<ParameterPanelLayoutItem[]>;
    get parameters(): ko.ObservableArray<Parameter>;
    get parameterPanelLayoutItems(): ko.ObservableArray<ParameterPanelLayoutItem>;
    getAllLayoutItems(items: ParameterPanelLayoutItem[]): Array<any>;
    constructor(container: IParameterContainer);
    addParameterPanelLayoutItem(item: ParameterPanelLayoutItem): void;
    startEditing(): void;
    endEditing(): void;
    updateParameterLayoutItems(): void;
    clearLayoutItems(): void;
    getParameterLayoutItem(parameter: Parameter): ParameterPanelLayoutItem;
    removeParameterModel(parameter: Parameter): void;
}
