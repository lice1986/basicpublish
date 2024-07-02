﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterPanelItemBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { PreviewParameter } from './previewParameter';
import { PreviewParameterHelper } from './previewParameterHelper';
import { IReportParametersInfo } from './previewParametersViewModel';
import { ArrayPropertyChangedEventArgs, IViewModel, PropertyChangedEventArgs, BaseRenderingModel } from '@devexpress/analytics-core/analytics-serializer-native';
export interface IParameterPanelItemInfo {
    type: string;
    titleVisible?: boolean;
    title?: string;
    orientation?: string;
    borderVisible?: boolean;
    expanded?: boolean;
    showExpandButton?: boolean;
    layoutItems?: Array<any>;
}
export interface IParameterItemInfo {
    path: string;
    labelOrientation: string;
}
export declare class ParameterPanelItemBase<T extends IViewModel> extends BaseRenderingModel<T> {
    parameterHelper: PreviewParameterHelper;
    private layoutInfo?;
    protected _parameters: PreviewParameter[];
    protected _separatorNames: string[];
    protected _groupLayoutItems: ParameterPanelItemBase<IViewModel>[];
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    constructor(parameterHelper: PreviewParameterHelper, layoutInfo?: IParameterPanelItemInfo);
    private _fixGroupPropertyName;
    private _proceedLayoutInfo;
    protected _add(parameter: PreviewParameter, parameterInfo: IParameterItemInfo): PreviewParameter;
    get groupLayoutItems(): ParameterPanelItemBase<IViewModel<unknown>>[];
    isPropertyDisabled(name: string): boolean;
    isPropertyVisible(name: string): boolean;
    initialize(originalParametersInfo: IReportParametersInfo, parameters?: PreviewParameter[]): void;
    isEmpty: boolean;
    _getInfo: ISerializationInfo[];
    getInfo: () => ISerializationInfo[];
}