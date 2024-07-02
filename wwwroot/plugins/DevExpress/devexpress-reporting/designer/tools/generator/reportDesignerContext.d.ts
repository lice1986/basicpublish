﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\reportDesignerContext.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, IActionsProvider, IDataSourceInfo, IDesignerModel, IDesignerPart, IGlobalSubscribableValue, IItemsExtender, INamedValue, ObjectExplorerProvider, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizard, IDataSourceWizardConnectionStrings, MultiQueryDataSourceWizard } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IKeyValuePair } from '../../../common/types';
import { PreviewModel } from '../../../viewer/internal/_previewModel';
import { FormattingRule } from '../../controls/properties/formattingrules';
import { StyleModel } from '../../controls/properties/style';
import { XRChartSurface } from '../../controls/xrChart';
import { ReportSurface, ReportViewModel } from '../../controls/xrReport';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { DesignControlsHelper } from '../../helpers/_designControlsHelper';
import { StylesHelper } from '../../helpers/_styleHelper';
import { FieldListDragDropHandler } from '../../internal/dragdrop/_fieldListDragDropHandler';
import { ReportToolboxDragDropHandler } from '../../internal/dragdrop/_reportToolboxDragDropHandler';
import { DesignerErrorProvider } from '../../internal/errorPanel/_designerErrorProvider';
import { ErrorPanelViewModel } from '../../internal/errorPanel/_errorPanelViewModel';
import { RuntimeErrorProvider } from '../../internal/errorPanel/_runtimeErrorProvider';
import { CalculatedFieldsSource } from '../../internal/fieldlist/_calculatedFieldsSource';
import { FieldListDataSourcesHelper } from '../../internal/fieldlist/_fieldListDataSourcesHelper';
import { ParametersViewModel } from '../../internal/fieldlist/_parametersViewModel';
import { ReportItemsProvider } from '../../internal/reportExplorer/_reportItemsProvider';
import { ScriptsEditor } from '../../internal/scripting/_scriptsEditor';
import { ControlScrollingTool } from '../../internal/_controlScrollingTool';
import { DisplayNameProvider } from '../../internal/_displayNameProvider';
import { WizardRunner } from '../../internal/_wizardRunner';
import { LocalizationEditor } from '../../localization/_localizationEditor';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { ReportExpressionEditorWrapper } from '../../widgets/expressioneditor/reportExpressionEditorWrapper';
import { ReportWizard } from '../../wizard/reportWizard';
import { OpenReportDialog } from '../dialogs/openReportDialog';
import { SaveAsReportDialog } from '../dialogs/saveAsReportDialog';
import { SaveReportDialog } from '../dialogs/saveReportDialog';
import { NavigateByReports } from '../navigation/navigateByReports';
import { INavigateTab } from '../navigation/navigateTab';
import { WatermarksViewModel } from '../../internal/fieldlist/_watermarksViewModel';
export interface IReportDesignerRootContext extends IDesignerModel {
    fullScreen: IGlobalSubscribableValue<boolean>;
    canAddItems: ko.Computed<boolean>;
    _wizardRunner: WizardRunner;
    model: ko.Observable<ReportViewModel>;
    surface: ko.Observable<ReportSurface>;
    navigateByReports: NavigateByReports;
    reportUrls: ko.ObservableArray<IKeyValuePair<string>>;
    fieldListItemsExtenders: ko.Observable<IItemsExtender[]>;
    validationMode: ko.Computed<boolean>;
    drawCrossbandContent: ko.Observable<boolean>;
    rootStyle: string;
    toolboxDragHandler: ReportToolboxDragDropHandler;
    isDirty: ko.Computed<boolean>;
    calculatedFieldsSource: ko.Computed<CalculatedFieldsSource>;
    watermarks: ko.Computed<WatermarksViewModel>;
    parameters: ko.Computed<ParametersViewModel>;
    reportPreviewModel: PreviewModel;
    fieldListActionProviders: IActionsProvider[];
    wizard: ReportWizard;
    dataSourceWizard: DataSourceWizard;
    multiQueryDataSourceWizard: MultiQueryDataSourceWizard;
    localizationEditor: LocalizationEditor;
    addOns: ko.ObservableArray<IDesignerPart>;
    scriptsEditor: ScriptsEditor;
    state: any;
    events: ko.Computed<any[]>;
    gotoEvent: (functionName: any, eventName: any, model: any) => void;
    saveReportDialog: SaveAsReportDialog;
    saveReportDialogLight: SaveReportDialog;
    connections: IDataSourceWizardConnectionStrings;
    availableDataSources: IDataSourceInfo[];
    openReportDialog: OpenReportDialog;
    styles: ko.Computed<ko.ObservableArray<StyleModel>>;
    formattingRuleSheet: ko.Computed<ko.ObservableArray<FormattingRule>>;
    reportExplorerProvider: ObjectExplorerProvider;
    designMode: ko.Observable<boolean> | ko.Computed<boolean>;
    displayNameProvider: ko.Computed<DisplayNameProvider>;
    getDisplayNameByPath: (path: string, value: string) => JQueryPromise<string>;
    fieldListProvider: ko.Computed<FieldListProvider>;
    dataBindingsProvider: ko.Computed<FieldListProvider>;
    fieldListDataSources: ko.ObservableArray<IDataSourceInfo>;
    reportItemsProvider: ko.Computed<ReportItemsProvider>;
    expressionDisplayNameProvider: ko.Computed<DisplayNameProvider>;
    dataSourceHelper: ko.Computed<DataSourceHelper>;
    selectedPath: ko.Observable<string> | ko.Computed<string>;
    controls: ko.Computed<INamedValue[]>;
    bands: ko.Computed<INamedValue[]>;
    isMenuCollapsed: ko.Observable<boolean>;
    chartDataSources: ko.Computed<Array<{
        displayName: string;
        value: any;
    }>>;
    getControls: (target: any) => ko.Computed<ko.Computed<INamedValue[]>>;
    actionStorage: any;
    fieldDragHandler: FieldListDragDropHandler;
    runChartDesigner: (chart: XRChartSurface) => void;
    zoomStep: ko.Observable<number> | ko.Computed<number>;
    onViewPortScroll: (viewPort: HTMLElement) => void;
    updateSurfaceSize: () => void;
    openReport: (url: string) => void;
    showPreview: () => void;
    getTabs: () => INavigateTab[];
    closeTab: (tab: INavigateTab, force?: boolean) => void;
    localizationMode: ko.Observable<boolean>;
    errorPanelViewModel: ErrorPanelViewModel;
    controlScrollingTool: ControlScrollingTool;
    afterRender?: () => void;
    activatedExpressionEditor: ko.Observable<ReportExpressionEditorWrapper>;
}
export interface IDesignerContextOptionsInitOptions {
    availableDataSources: IDataSourceInfo[];
    state?: any;
}
export interface IDesignerContextOptions {
    initializeOptions: IDesignerContextOptionsInitOptions;
    selection: SurfaceSelection;
    report?: ReportViewModel;
    knownEnums?: any;
    url?: string | ko.Observable<string> | ko.Computed<string>;
    data?: any;
    dataSourceRefs?: any;
    designerCallbacks: IReportDesignerCustomizationHandler;
}
export interface IReportDesignerContext {
    report: ReportViewModel;
    url: ko.Observable<string> | ko.Computed<string>;
    surface: ReportSurface;
    dataSourceHelper: DataSourceHelper;
    parameters: ParametersViewModel;
    reportErrorProvider: DesignerErrorProvider;
    runtimeErrorProvider: RuntimeErrorProvider;
    fieldListDataSourceHelper: FieldListDataSourcesHelper;
    watermarks: WatermarksViewModel;
    calcFieldsSource: CalculatedFieldsSource;
    fieldListItemsExtenders: IItemsExtender[];
    fieldListProvider: FieldListProvider;
    reportItemsProvider: ReportItemsProvider;
    dataBindingsProvider: FieldListProvider;
    chartValueBindingProvider: FieldListProvider;
    displayNameProvider: DisplayNameProvider;
    expressionDisplayNameProvider: DisplayNameProvider;
    controlsHelper: DesignControlsHelper;
    stylesHelper: StylesHelper;
    state: () => any;
}
export declare class ReportDesignerContext extends Disposable implements IReportDesignerContext {
    state: () => any;
    url: ko.Observable<string> | ko.Computed<string>;
    report: ReportViewModel;
    reportErrorProvider: DesignerErrorProvider;
    runtimeErrorProvider: RuntimeErrorProvider;
    surface: ReportSurface;
    dataSourceHelper: DataSourceHelper;
    watermarks: WatermarksViewModel;
    parameters: ParametersViewModel;
    fieldListDataSourceHelper: FieldListDataSourcesHelper;
    calcFieldsSource: CalculatedFieldsSource;
    fieldListItemsExtenders: IItemsExtender[];
    fieldListProvider: FieldListProvider;
    reportItemsProvider: ReportItemsProvider;
    dataBindingsProvider: FieldListProvider;
    chartValueBindingProvider: FieldListProvider;
    displayNameProvider: DisplayNameProvider;
    expressionDisplayNameProvider: DisplayNameProvider;
    controlsHelper: DesignControlsHelper;
    stylesHelper: StylesHelper;
    private _getChartAvailableSources;
    getInfo(): ISerializationInfoArray;
    isModelReady(): boolean;
    dispose(): void;
    constructor(options: IDesignerContextOptions);
}