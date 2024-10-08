﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesigner.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IEditorInfo, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { PreviewModel } from '../viewer/internal/_previewModel';
import { ControlType } from './controls/utils/_controlTypes';
import { IParameterTypeValue } from './dataObjects/parameters/parameterTypesHelper';
import { IReportDesignerRootContext } from './tools/generator/reportDesignerContext';
import { INavigateTab, NavigateTab } from './tools/navigation/navigateTab';
import { WizardRunType } from './wizard/wizardTypes';
export declare class JSReportDesigner {
    private _designerModel;
    get designerModel(): IReportDesignerRootContext;
    set designerModel(newVal: IReportDesignerRootContext);
    constructor(_designerModel: ko.Observable<IReportDesignerRootContext>);
    UpdateLocalization(localization: {
        [key: string]: string;
    }): void;
    GetDesignerModel(): IReportDesignerRootContext;
    GetPreviewModel(): PreviewModel;
    GetPropertyInfo(controlType: ControlType, path: string | Array<string>): ISerializationInfo;
    GetButtonStorage(): any;
    RunWizard(wizardType: WizardRunType): void;
    GetJsonReportModel(): any;
    IsModified(): boolean;
    ResetIsModified(): void;
    AddToPropertyGrid(groupName: string, property: ISerializationInfo): void;
    AddParameterType(parameterInfo: IParameterTypeValue, editorInfo: IEditorInfo): void;
    RemoveParameterType(parameterType: string): void;
    GetParameterInfo(parameterType: string): IParameterTypeValue;
    GetParameterEditor(valueType: string): IEditorInfo;
    ReportStorageGetData(url: string): JQuery.Promise<any>;
    ReportStorageSetData(reportLayout: string, url: string): JQuery.Promise<any>;
    ReportStorageSetNewData(reportLayout: string, url: string): JQuery.Promise<any>;
    SaveReport(): JQuery.Promise<any>;
    GetTabs(): INavigateTab[];
    GetCurrentTab(): NavigateTab;
    CloseTab(tab: INavigateTab, force?: boolean): void;
    CloseCurrentTab(): void;
    AdjustControlCore(): void;
    SaveNewReport(reportName: string): JQuery.Promise<any>;
    ReportStorageGetUrls(): JQuery.Promise<any[]>;
    OpenReport(url: string): void;
    ShowPreview(): void;
}
