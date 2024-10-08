﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_settings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, IDataSourceInfo, ILocalizationSettings, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { IItemsProvider, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizard, FullscreenDataSourceWizard, IDataSourceWizardConnectionStrings, MultiQueryDataSourceWizard, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IMultiQueryDataSourceWizardCallbacks } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { IEnumType } from '../../../common/customTypes';
import { IKeyValuePair } from '../../../common/types';
import { IReportParametersInfo } from '../../../viewer/parameters/previewParametersViewModel';
import { IExportSettings, IPreviewCustomizationHandler, IProgressBarSettings, ISearchSettings } from '../../../viewer/utils/initializer';
import { DataSourceActions } from '../../actions/_dataSourceActions';
import { FederationDataSourceEditor } from '../../actions/_federationDataSourceEditor';
import { JsonDataSourceEditor } from '../../actions/_jsonDataSourceEditor';
import { ObjectDataSourceEditor } from '../../actions/_objectDataSourceEditor';
import { SqlDataSourceEditor } from '../../actions/_sqlDataSourceEditor';
import { ReportViewModel } from '../../controls/xrReport';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { IReportDesignerCustomizationHandler, IReportDesignerInitializationData, IReportWizardSettings } from '../../utils/inititalizer';
import { FullscreenReportWizard } from '../../wizard/fullscreenReportWizard';
import { LegacyReportWizard } from '../../wizard/legacyReportWizard';
import { ReportWizard } from '../../wizard/reportWizard';
import { OpenReportDialog } from '../dialogs/openReportDialog';
import { SaveAsReportDialog } from '../dialogs/saveAsReportDialog';
import { SaveReportDialog } from '../dialogs/saveReportDialog';
import { NavigateByReports } from '../navigation/navigateByReports';
export interface IReportDesignerGeneratorSettings {
    selection?: SurfaceSelection;
    rtl?: boolean;
    callbacks: {
        designer?: IReportDesignerCustomizationHandler;
        preview?: IPreviewCustomizationHandler;
    };
    reportStorageWebIsRegister?: boolean;
    allowMDI?: boolean;
    knownEnums?: IEnumType[];
    reportUrl?: ko.Observable<string> | ko.Computed<string>;
    availableDataSources?: IDataSourceInfo[];
    convertBindingsToExpressions?: string;
    state?: any;
    reportPreviewSettings?: IReportPreviewSettings;
    data: IReportDesignerInitializationData;
}
export interface IReportPreviewSettings {
    exportSettings?: IExportSettings;
    progressBarSettings?: IProgressBarSettings;
    searchSettings?: ISearchSettings;
}
export interface IReportUriSettings {
    reportDesignerUri?: string;
    previewUri?: string;
}
export interface PreviewOptions {
    element: HTMLElement;
    callbacks: IPreviewCustomizationHandler;
    localizationSettings?: ILocalizationSettings;
    parametersInfo?: IReportParametersInfo;
    handlerUri?: string;
    rtl?: boolean;
    exportSettings?: IExportSettings;
    progressBarSettings?: IProgressBarSettings;
    searchSettings?: ISearchSettings;
}
export declare class WizardsInitializerSettings {
    private callbacks;
    private _doFinishCallback;
    private _getParameters;
    private _getItemsProviderCallBack;
    registerReportWizardPages: (pageFactory: PageFactory) => void;
    registerMultiQueryDataSourceWizardPages: (pageFactory: PageFactory) => void;
    sqlDataSourceEditor: SqlDataSourceEditor;
    federationDataSourceEditor: FederationDataSourceEditor;
    jsonDataSourceEditor: JsonDataSourceEditor;
    objectDataSourceEditor: ObjectDataSourceEditor;
    dataSourceActionProvider: DataSourceActions;
    dataSourceWizard: DataSourceWizard;
    multiQueryDataSourceWizard: MultiQueryDataSourceWizard | FullscreenDataSourceWizard;
    multipleQueriesWizardCallbacks: IMultiQueryDataSourceWizardCallbacks;
    reportWizard: ReportWizard | LegacyReportWizard | FullscreenReportWizard;
    createSqlDataSourceWizard(disableCustomSql: boolean, itemsProvider?: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, model?: ko.Observable<ReportViewModel>): DataSourceWizard;
    createSqlDataSourceEditor(settings: {
        dataSourceHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
        dataSourceWizard: DataSourceWizard;
        model: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
        undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
        fieldListProvider: ko.Observable<FieldListProvider> | ko.Computed<FieldListProvider>;
        rtl: boolean;
        allowEditDataSource: boolean;
        allowRemoveDataSource: boolean;
    }): void;
    createMultipleQueriesWizardCallbacks(itemsProvider?: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, model?: ko.Observable<ReportViewModel>, state?: () => any): void;
    createMultiQueryDataSourceWizard(disableCustomSql: boolean, multipleQueriesWizardCallbacks?: IMultiQueryDataSourceWizardCallbacks, allowCreateNewJsonConnection?: boolean): void;
    createReportWizard(settings: {
        dataSourceHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
        navigation: NavigateByReports;
        isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
        state: () => any;
        model: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
        undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
        fieldListProvider: ko.Observable<FieldListProvider> | ko.Computed<FieldListProvider>;
        data: IReportDesignerInitializationData;
    }): void;
    constructor(connectionStrings: IDataSourceWizardConnectionStrings, wizardSettings: IReportWizardSettings, callbacks: IReportDesignerCustomizationHandler, rtl: boolean, dataSources: ko.PureComputed<IDataSourceInfo[]>, predefinedDataSources: ko.PureComputed<IDataSourceInfo[]>);
    private reportWizardOptions;
    private multiQueryWizardOptions;
    private dataSourceWizardOptions;
}
export declare class ReportDialogSettings {
    private _designerCallbacks;
    saveReportDialog: SaveAsReportDialog;
    saveReportDialogLight: SaveReportDialog;
    openReportDialog: OpenReportDialog;
    constructor(_designerCallbacks: IReportDesignerCustomizationHandler);
    createSaveReportDialog(reportUrls: ko.ObservableArray<IKeyValuePair<string>>): void;
    createSaveReportDialogLight(saveReportDialog?: SaveAsReportDialog): void;
    createOpenReportDialog(reportUrls: ko.ObservableArray<IKeyValuePair<string>>, navigation: NavigateByReports): void;
}
