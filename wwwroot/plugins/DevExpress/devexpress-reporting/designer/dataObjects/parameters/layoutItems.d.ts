﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\layoutItems.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { ReportParameterHelper } from '../../helpers/reportParameterHelper';
import { Parameter } from './parameter';
export interface IParameterContainer {
    parameterHelper: ReportParameterHelper;
    parameterPanelLayoutItems: ko.ObservableArray<ParameterPanelLayoutItem>;
    parentModel: ko.Observable<ElementViewModel>;
    parameters: ko.ObservableArray<Parameter>;
}
export declare class ParameterPanelLayoutItem extends ElementViewModel {
    static createLayoutItem(model: any, parent: IParameterContainer | ParameterPanelLayoutItem, serializer?: IModelSerializer): ParameterPanelLayoutItem;
    constructor(model: any, parent: IParameterContainer | ParameterPanelLayoutItem, serializer?: IModelSerializer);
    delete(): void;
    getControlFactory(): import("../../../dx-reportdesigner").ControlsFactory;
    className(): string;
    layoutItemType: ko.Observable<string>;
    name: ko.Observable<string> | ko.Computed<string>;
    parentModel: ko.Observable<GroupLayoutItem | ReportViewModel>;
}
export declare class GroupLayoutItem extends ParameterPanelLayoutItem {
    constructor(model: any, parent: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    className(): string;
    isPropertyDisabled(name: string): boolean;
    title: ko.Observable<string>;
    showExpandButton: ko.Observable<boolean>;
    parameterPanelLayoutItems: ko.ObservableArray<ParameterPanelLayoutItem>;
}
export declare class SeparatorLayoutItem extends ParameterPanelLayoutItem {
    getInfo(): ISerializationInfoArray;
    className(): string;
    layoutItemType: ko.Observable<string>;
    name: ko.Observable<string>;
}
export declare class ParameterLayoutItem extends ParameterPanelLayoutItem {
    constructor(model: any, parent: any, serializer?: IModelSerializer, parameter?: Parameter);
    className(): string;
    getInfo(): ISerializationInfoArray;
    labelOrientation: ko.Observable<string>;
    parameter: ko.Observable<Parameter>;
}
export declare const ParameterPanelMapper: {
    Group: typeof GroupLayoutItem;
    Separator: typeof SeparatorLayoutItem;
    Parameter: typeof ParameterLayoutItem;
};