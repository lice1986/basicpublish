﻿/**
* DevExpress HTML/JS Reporting (designer\utils\inititalizer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataSourceInfo, IDesignerPart, IGlobalizeSettings, _ICommonCallbacksHandler } from '@devexpress/analytics-core/analytics-internal';
import { IAction, IDataMemberInfo, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import { IStandardPattern } from '@devexpress/analytics-core/analytics-widgets-internal';
import { DataSourceWizardSettings, IConnectionStringDefinition, IDataSourceWizardSettings, ITypeItem } from '@devexpress/analytics-core/analytics-wizard';
import { IEnumType } from '../../common/customTypes';
import { IKeyValuePair } from '../../common/types';
import { IParametersCustomizationHandler } from '../../viewer/utils/initializer';
import { ControlsFactory } from '../controls/utils/controlsFactory';
import { IErrorPanelViewModelSettings } from '../internal/errorPanel/_errorPanelViewModel';
import { ReportDialogBase } from '../tools/dialogs/reportDialogBase';
import { IReportPreviewSettings } from '../tools/generator/_settings';
import { INavigateTab } from '../tools/navigation/navigateTab';
import { WizardType, WizardTypeString } from '../wizard/wizardTypes';
import { DataBindingModeValue, DefaultCrossTabControlValue } from './settings';
export interface IComponentAddedEventArgs {
    parent: any;
    model: any;
}
export interface ICultureItem {
    DisplayName: string;
    Name: string;
}
export interface IReportNavigationTabsCustomizationHandler {
    reportTabClosing?: (tab: INavigateTab, deffered: JQueryDeferred<any>) => boolean;
    reportTabClosed?: (tab: INavigateTab) => void;
    reportOpening?: (e: any) => void;
    reportOpened?: (e: any) => void;
    tabChanged?: (tab: INavigateTab) => void;
}
export interface IReportDesignerCustomizationHandler extends IParametersCustomizationHandler, _ICommonCallbacksHandler, IReportNavigationTabsCustomizationHandler {
    fieldLists?: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    exitDesigner?: () => void;
    reportSaving?: (e: any) => void;
    reportSaved?: (e: any) => void;
    customizeParts?: (parts: IDesignerPart[]) => void;
    componentAdded?: (e: IComponentAddedEventArgs) => void;
    customizeSaveDialog?: (popup: ReportDialogBase) => void;
    customizeOpenDialog?: (popup: ReportDialogBase) => void;
    customizeWizard?: (wizardType: WizardTypeString, wizard: WizardType) => void;
    customizeSaveAsDialog?: (popup: ReportDialogBase) => void;
    customizeToolbox?: (controlsStore: ControlsFactory) => void;
    customizeFieldListActions?: (fieldListItem: IDataMemberInfo, actions: IAction[]) => void;
}
export interface IDataSourceRefInfo {
    ref: string;
    name: string;
    isFederationDataSource?: boolean;
    isSqlDataSource?: boolean;
    isJsonDataSource?: boolean;
    isObjectDataSource?: boolean;
    isListType?: boolean;
    isSupportQueries?: boolean;
    hasParams?: boolean;
    hasErrors?: boolean;
    dataSerializer?: string;
}
export interface ICultureInfoList {
    csvSeparator?: string;
    fontSet?: Array<string>;
}
export declare enum SearchBoxVisibilityMode {
    Auto = 0,
    Always = 1,
    Never = 2
}
export interface IReportWizardSettings extends IDataSourceWizardSettings {
    useFullscreenWizard?: boolean;
    useMasterDetailWizard?: boolean;
    reportWizardTemplatesSearchBoxVisibility?: SearchBoxVisibilityMode;
}
export declare class ReportWizardSettings extends DataSourceWizardSettings implements IReportWizardSettings {
    createDefault(wizardSettings?: IReportWizardSettings): IReportWizardSettings;
    useFullscreenWizard?: boolean;
    useMasterDetailWizard?: boolean;
}
export interface IWizardConnections {
    sql?: IConnectionStringDefinition[];
    json?: IConnectionStringDefinition[];
}
export interface IReportDesignerErrorPanelSettings {
    enableErrorCodeLinks?: boolean;
    showErrors?: boolean;
    showWarnings?: boolean;
    showInformation?: boolean;
    showReportLayoutErrorSource?: boolean;
    showReportScriptsErrorSource?: boolean;
    showReportCreationErrorSource?: boolean;
    showReportExportErrorSource?: boolean;
    enableReportLayoutErrorSource?: boolean;
    enableReportScriptsErrorSource?: boolean;
    enableReportCreationErrorSource?: boolean;
    enableReportExportErrorSource?: boolean;
    suppressedErrorCodes?: string[];
}
export interface IDataSourceSettings {
    allowAddDataSource?: boolean;
    allowRemoveDataSource?: boolean;
    allowEditDataSource?: boolean;
}
export interface IReportWizardTypeItem extends ITypeItem {
    id: string;
    canInstantlyFinish?: boolean;
    localizationID?: string;
}
export interface IReportDesignerInitializationData {
    dataSourceSettings?: IDataSourceSettings;
    report: ko.Observable<any>;
    dataBindingMode: DataBindingModeValue;
    convertBindingsToExpressions?: string;
    allowMDI?: boolean;
    errorPanelSettings?: IReportDesignerErrorPanelSettings;
    allowCreateNewJsonConnection?: boolean;
    reportUrl: ko.Observable<string> | ko.Computed<string>;
    availableDataSources: IDataSourceInfo[];
    formatStringData?: {
        standardPatterns: {
            [key: string]: IStandardPattern;
        };
        customPatterns: {
            [key: string]: Array<string>;
        };
    };
    dataSourceRefs: any[];
    state?: any;
    cultureInfoList?: ICultureInfoList;
    isReportServer?: boolean;
    disableCustomSql: boolean;
    wizardSettings?: IReportWizardSettings;
    wizardConnections?: IWizardConnections;
    isScriptsDisabled?: boolean;
    reportStorageWebIsRegister: boolean;
    subreports?: any;
    reportPreviewSettings?: IReportPreviewSettings;
    defaultCrossTabControl?: DefaultCrossTabControlValue;
    reportWizardTemplates?: IReportWizardTypeItem[];
    customControls?: ICustomControlTypeInfo[];
    customGlobalExpressions?: ICustomExpressionInfo[];
    customReportExpressions?: ICustomExpressionInfo[];
    developmentMode?: boolean;
}
export interface IReportDesignerInitializationModel extends IGlobalizeSettings {
    dataSourceSettings?: IDataSourceSettings;
    reportModel?: any;
    errorPanelSettings?: IErrorPanelViewModelSettings;
    reportModelRootName?: string;
    dataBindingMode?: DataBindingModeValue;
    defaultCrossTabControl?: DefaultCrossTabControlValue;
    allowCreateNewJsonConnection?: boolean;
    convertBindingsToExpressions?: string;
    allowMDI?: boolean;
    formatStringData?: {
        customPatterns: Array<IKeyValuePair<any>>;
        standardPatterns: Array<IKeyValuePair<any>>;
    };
    availableCultures?: ICultureItem[];
    reportUrl?: string;
    dataSources?: IDataSourceInfo[];
    dataSourcesData?: any[];
    dataSourceRefs?: any[];
    subreports?: any;
    internalSettings?: {
        isReportServer?: boolean;
    };
    disableCustomSql: boolean;
    scriptsEnabled?: boolean;
    reportStorageWebIsRegister?: boolean;
    cultureInfoList?: ICultureInfoList;
    reportExtensions?: any;
    wizardSettings?: IReportWizardSettings;
    wizardConnections?: IWizardConnections;
    knownEnums?: Array<IEnumType>;
    localization?: any;
    fieldListMaxNestingLevelUpdate?: number;
    rtl?: boolean;
    handlerUri?: string;
    viewerHandlerUri?: string;
    limitation?: boolean;
    queryBuilderHandlerUri?: string;
    reportPreviewSettings?: IReportPreviewSettings;
    reportWizardTemplates?: IReportWizardTypeItem[];
    customControls?: ICustomControlTypeInfo[];
    customGlobalExpressions?: ICustomExpressionInfo[];
    customReportExpressions?: ICustomExpressionInfo[];
    developmentMode?: boolean;
}
export interface ICustomControlTypeInfo {
    className: string;
    fullTypeName: string;
    inheritClassName: string;
    showInToolbox: boolean;
    properties: ICustomControlPropertyInfo[];
    initValues: IKeyValuePair<string>[];
}
export interface ICustomControlPropertyInfo {
    name: string;
    model: string;
    category: string;
    editor: EditorName;
    displayName: string;
    defaultValue: any;
    isFavorite: boolean;
}
export interface ICustomControlObjectPropertyInfo extends ICustomControlPropertyInfo {
    properties: ICustomControlPropertyInfo[];
}
export interface ICustomControlLinkPropertyInfo extends ICustomControlPropertyInfo {
    link: boolean;
}
export interface ICustomControlArrayPropertyInfo extends ICustomControlPropertyInfo {
    array: boolean;
    properties: ICustomControlPropertyInfo[];
}
export interface ICustomControlEnumPropertyInfo extends ICustomControlPropertyInfo {
    values: IDisplayedValue[];
}
export declare type EditorName = 'unknown' | 'text' | 'boolean' | 'irrationalNumber' | 'rationalNumber' | 'string' | 'guid' | 'date' | 'color' | 'object' | 'array' | 'enum' | 'link';
export interface ICustomExpressionInfo {
    name: string;
    category: string;
    description: string;
    minOperandCount: number;
    maxOperandCount: number;
}
