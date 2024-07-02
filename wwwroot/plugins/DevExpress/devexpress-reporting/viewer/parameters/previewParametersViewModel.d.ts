﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { TabInfoWithPropertyGrid } from '@devexpress/analytics-core/analytics-utils-native';
import { IEnumType } from '../../common/customTypes';
import { IKeyValuePair } from '../../common/types';
import { ReportPreview } from '../reportPreview';
import { IParameterPanelItemInfo, ParameterPanelItemBase } from './parameterPanelItemBase';
import { PreviewParameter } from './previewParameter';
import { PreviewParameterHelper } from './previewParameterHelper';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IPreviewParametersViewModel } from './previewParametersViewModel.viewmodel';
export interface IReportParametersInfo {
    shouldRequestParameters?: boolean;
    parameters?: Array<IPreviewParameterInfo>;
    knownEnums?: Array<IEnumType>;
    parameterPanelLayout?: IParameterPanelItemInfo;
}
export interface IPreviewParameterInfo {
    Path: string;
    Description: string;
    Name: string;
    Value: any;
    TypeName: string;
    ValueInfo?: any;
    MultiValue?: boolean;
    SelectAllValues?: boolean;
    AllowNull?: boolean;
    IsFilteredLookUpSettings?: boolean;
    LookUpValues?: Array<ILookUpValue>;
    Visible?: boolean;
    Enabled?: boolean;
    Tag?: any;
    EnabledExpression?: string;
    VisibleExpression?: string;
}
export interface IRange {
    Start: any;
    End: any;
}
export interface ILookUpValue {
    Description: string;
    Value: any;
}
export interface IUpdateParameterResponse {
    enabled: boolean;
    visible: boolean;
    lookUpValues: any;
}
export declare class PreviewParametersViewModel extends ParameterPanelItemBase<IPreviewParametersViewModel> {
    private _reportPreview;
    private _updateParametersTimeOut;
    private _topChangedParameter;
    _needToUpdateParameter: boolean;
    createViewModel(): IPreviewParametersViewModel;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    private get _visibleParameters();
    private _shouldProcessParameter;
    private _getParametersStateRequest;
    private _getDoneGetParametersStateHandler;
    private subscribeParameter;
    private _getFailGetParametersStateHandler;
    private _setLookUpValues;
    private _getParameterValuesContainedInLookups;
    private _filterParameterValuesContainsInLookups;
    private _setParameterValue;
    setParameterValue(parameterName: string, value: unknown): void;
    onPropertyChanged(args: PropertyChangedEventArgs<PreviewParametersViewModel> | ArrayPropertyChangedEventArgs<PreviewParametersViewModel>): void;
    constructor(reportPreview: ReportPreview, parameterHelper?: PreviewParameterHelper, enableKeyboardSupport?: boolean);
    initialize(originalParametersInfo: IReportParametersInfo): void;
    getPathsAfterPath(parameterPath: string): Array<string>;
    serializeParameters(): Array<IKeyValuePair<any>>;
    restore: () => void;
    updateParameters(changedParameter: PreviewParameter): void;
    submit: () => void;
    validateAndSubmit: (params: any) => void;
    processInvisibleParameters: boolean;
    parametersLoading: boolean;
    tabInfo: TabInfoWithPropertyGrid;
    popupInfo: {
        visible: boolean;
        notEmpty: boolean;
    };
    _popupVisible: boolean;
    _popupVisibleSwitch: boolean;
    parameterHelper: PreviewParameterHelper;
    prevParametersStateRequest: JQuery.Deferred<any>;
}
