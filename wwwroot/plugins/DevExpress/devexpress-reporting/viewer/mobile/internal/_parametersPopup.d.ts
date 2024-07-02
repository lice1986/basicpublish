﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewParametersViewModel } from '../../parameters/previewParametersViewModel';
import { MobileReportPreview } from '../mobilePreview';
import { DateRangeEditor } from '../../widgets/dateRange/dateRangeEditor';
import { BaseRenderingModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDateRangeEditorViewModel } from '../../widgets/dateRange/dateRangeEditor.viewmodel';
import { IDateRangeEditorItem } from '../../widgets/dateRange/dateRangeEditor.ranges';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets-native';
import { IDateRangeParemeterPopupViewModel, IDateRangePopupButton, IParametersPopupAction, IParametersPopupButton, IParametersPopupViewModelBase } from './_parametersPopup.viewModel';
import { ClickEvent } from 'devextreme/ui/button';
export interface IParamtersPopupFormModel {
    visible: boolean;
    submit?: () => void;
    reset?: () => void;
    cancel?: () => void;
}
export declare class ParametersPopupModelBase extends BaseRenderingModel<IParametersPopupViewModelBase> {
    _formModel: IParamtersPopupFormModel;
    private _parametersButtonContaner;
    _cancelButton: IParametersPopupButton;
    _cancelAction: IParametersPopupAction;
    _submitButton: IParametersPopupButton;
    _submit: (params: ClickEvent) => void;
    _reset: () => void;
    _cancel: () => void;
    createViewModel(): IParametersPopupViewModelBase;
    updateViewModel(args: PropertyChangedEventArgs<ParametersPopupModelBase>): void;
    onPropertyChanged(): void;
    constructor(_formModel: IParamtersPopupFormModel);
    cacheElementContent(element: HTMLElement): void;
    dispose(): void;
    initVisibilityIcons(): void;
    title: string;
    contentTemplate: string;
    model: any;
    visible: boolean;
    cancelDisabled: boolean;
    showIcons: boolean;
    className: string;
}
export declare class ParametersPopupModel extends ParametersPopupModelBase {
    model: PreviewParametersViewModel;
    private _reportPreview;
    constructor(model: PreviewParametersViewModel, _reportPreview: MobileReportPreview);
    createViewModel(): IParametersPopupViewModelBase;
    objectProperties: ObjectProperties;
}
export declare class DateRangeParemeterPopupModel extends ParametersPopupModelBase {
    model: DateRangeEditor;
    private _oldStart;
    private _oldEnd;
    constructor(model: DateRangeEditor);
    createViewModel(): IDateRangeParemeterPopupViewModel;
    setRangeValue(value: IDateRangeEditorItem): void;
    updateViewModel(args: PropertyChangedEventArgs): void;
    startButton: IDateRangePopupButton;
    endButton: IDateRangePopupButton;
    editorViewModel: IDateRangeEditorViewModel;
    textRangeValue: string;
    getStringDate: (value: Date) => string;
}