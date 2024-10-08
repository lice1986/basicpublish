﻿/**
* DevExpress HTML/JS Reporting (viewer\utils\publicCallbacks.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CustomizeMenuActionsCallbacksHandler, ICommonCallbacksHandler, IDesignerPart } from '@devexpress/analytics-core/analytics-internal-native';
import { CustomizeExportOptionsEventArgs } from '../../common/binding/exportOptionsEventArgs';
import { ExportResultRequestData } from '../internal/_exportHandler';
import { PreviewDisposableModel } from '../internal/_previewModel';
import { IParameter, IParameterDescriptor } from '../parameters/parameterHelper';
import { IDisplayedValue, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { IKeyValuePair } from '../../common/types';
import { EditingField } from '../editing/editingField';
import { IBrickNode } from './utils';
interface IBrickEventArgs {
    GetBrickText: () => string;
    GetBrickValue: (key: string) => any;
}
interface IPreviewClickEventArgs extends IBrickEventArgs {
    PageIndex: number;
    Brick: IBrickNode;
    DefaultHandler: () => void;
    Handled: boolean;
}
interface IDocumentReadyEventArgs {
    ReportId: string;
    DocumentId: string;
    PageCount: number;
}
interface IEditingFieldChangedEventArgs extends IBrickEventArgs {
    Field: EditingField;
    OldValue: any;
    NewValue: any;
}
interface IParameterSubmittedArgs {
    ParametersViewModel: PreviewParametersViewModel;
    Parameters: Array<IKeyValuePair<any>>;
}
interface IParameterInitializedArgs {
    ParametersModel: PreviewParametersViewModel;
    ActualParametersInfo: any[];
    Submit: () => void;
    ShouldRequestParameters: boolean;
}
interface IParameterResetArgs {
    ParametersViewModel: PreviewParametersViewModel;
    Parameters: IParameter[];
}
interface ICustomizeParameterLookUpSourceArgs {
    parameter: IParameterDescriptor;
    items: Array<IDisplayedValue>;
    dataSource?: any;
}
interface ICustomizeParameterEditorsArgs {
    parameter: IParameterDescriptor;
    info: ISerializationInfo;
}
interface ICustomizeElementsArgs {
    Elmenets: IDesignerPart[];
    GetById: (id: string) => IDesignerPart;
}
export interface ICustomizeElementCallback<T> {
    CustomizeElements?: (sender: T, args: ICustomizeElementsArgs) => void;
}
export interface IPreviewCustomizationCallbacksCommon<T> extends ICustomizeElementCallback<T> {
    PreviewClick?: (sender: T, args: IPreviewClickEventArgs) => void;
    CustomizeParameterLookUpSource?: (sender: T, args: ICustomizeParameterLookUpSourceArgs) => void;
    CustomizeParameterEditors?: (sender: T, args: ICustomizeParameterEditorsArgs) => void;
}
export interface IPreviewCustomizationCallbacks<T> extends CustomizeMenuActionsCallbacksHandler<T>, ICustomizeElementCallback<T> {
    DocumentReady?: (sender: T, args: IDocumentReadyEventArgs) => void;
    EditingFieldChanged?: (sender: T, args: IEditingFieldChangedEventArgs) => void;
    ParametersSubmitted?: (sender: T, args: IParameterSubmittedArgs) => void;
    ParametersInitialized?: (sender: T, args: IParameterInitializedArgs) => void;
    ParametersReset?: (sender: T, args: IParameterResetArgs) => void;
    CustomizeExportOptions?: (sender: T, args: CustomizeExportOptionsEventArgs) => void;
    OnExport?: (sender: T, args: ExportResultRequestData) => void;
}
export interface IPreviewCustomizationCallbacksPublic<T> extends ICommonCallbacksHandler<T, PreviewDisposableModel>, IPreviewCustomizationCallbacks<T>, IPreviewCustomizationCallbacksCommon<T> {
}
export {};
