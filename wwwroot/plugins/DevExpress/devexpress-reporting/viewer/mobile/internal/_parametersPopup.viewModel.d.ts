﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IViewModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { ValueChangedEvent } from 'devextreme/ui/select_box';
import { HiddenEvent } from 'devextreme/ui/popup';
import { ButtonStyle } from 'devextreme/ui/button';
import { IDateRangeEditorViewModel } from '../../widgets/dateRange/dateRangeEditor.viewmodel';
import { IDateRangeEditorItem } from '../../widgets/dateRange/dateRangeEditor.ranges';
import { DateRangeParemeterPopupModel, ParametersPopupModel, ParametersPopupModelBase } from './_parametersPopup';
export interface IParametersPopupAction {
    className: string;
    action: (params: any) => void;
    disabled: boolean;
    visible: boolean;
}
export interface IParametersPopupButton extends IParametersPopupAction {
    text: string;
    id: 'dxrv-mobile-reset' | 'dxrv-mobile-cancel' | 'dxrv-mobile-submit' | string;
}
export interface IParametersPopupViewModelBase extends IViewModel {
    className: string;
    title: string;
    contentTemplate: string;
    model: any;
    visible: boolean;
    showIcons: boolean;
    cancelDisabled: boolean;
    actionButtons: IParametersPopupButton[];
    actionIcons: IParametersPopupAction[];
    cacheElementContent: (element: HTMLElement) => void;
    onHidden: (event: HiddenEvent) => void;
}
export declare function createParametersPopupBaseViewModel(this: ParametersPopupModelBase, base: IViewModel): IParametersPopupViewModelBase;
export declare function createParametersPopupViewModel(this: ParametersPopupModel, base: IViewModel): IParametersPopupViewModelBase;
export interface IDateRangeParemeterPopupViewModel extends IParametersPopupViewModelBase {
    startButton: IDateRangePopupButton;
    endButton: IDateRangePopupButton;
    textRangeValue: string;
    untilText: string;
    fromText: string;
    selectPeriodPlaceholder: string;
    onTextChanged: (event: ValueChangedEvent) => void;
}
export interface IDateRangePopupButton {
    text: string;
    focused: boolean;
    stylingMode: ButtonStyle;
    focusStateEnabled: boolean;
    activeStateEnabled: boolean;
    onClick: () => void;
}
export interface IDateRangeEditorMobileViewModel extends IDateRangeEditorViewModel {
    popupModel: IDateRangeParemeterPopupViewModel;
    items: IDateRangeEditorItem[];
}
export declare function createDateRangeParemeterPopupViewModel(this: DateRangeParemeterPopupModel, base: IViewModel): IDateRangeParemeterPopupViewModel;