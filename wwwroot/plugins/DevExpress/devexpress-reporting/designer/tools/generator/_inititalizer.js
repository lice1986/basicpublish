﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_inititalizer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ActionLists, addDisposeCallback, appendStaticContextToRootViewModel, BaseAction, CombinedObject, CommonDesignerGenerator, ContextMenuProvider, createActionWrappingFunction, DesignerBaseElements, DragDropHandler, DragHelperContent, extend, FieldListProvider, findFirstItemMatchesCondition, formatUnicorn, getControlFullName, getControlTypeName, InlineTextEdit, localizeNoneString, NotifyType, ObjectExplorerProvider, processErrorEvent, ShowMessage, SnapLinesHelper, staticContext, SurfaceSelection, updateSurfaceContentSize } from '@devexpress/analytics-core/analytics-internal';
import { ActionId as AnalyticActionId } from '@devexpress/analytics-core/analytics-tools';
import { getLocalization, ModelSerializer, TabInfo } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates, ObjectProperties, unwrapEditor } from '@devexpress/analytics-core/analytics-widgets';
import { aceAvailable, availableFonts, formatStringStandardPatterns, propertiesGridEditorsPaddingLeft, TreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { FullscreenDataSourceWizard, FullscreenWizard, _createDefaultDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import config from 'devextreme/core/config';
import dxScrollView from 'devextreme/ui/scroll_view';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { HandlerUri as ChartInternalHandlerUri } from '../../../chart/_handlerUri';
import { defaultCulture } from '../../../common/defaultCulture';
import { convertMapToKeyValuePair } from '../../../common/types';
import { createFullscreenComputed, cultureInfo } from '../../../common/utils/_utils';
import { createPreview } from '../../../viewer/internal/_initializer';
import { getDockedElementCallback } from '../../../viewer/internal/_sizeUtils';
import { formatSearchResult } from '../../../viewer/search/_utils';
import { ActionId } from '../../actions/actionId';
import { CrossTabActions } from '../../actions/crossTabActions';
import { ElementsGroupActions } from '../../actions/elementsGroupActions';
import { PdfContentActions } from '../../actions/pdfContentActions';
import { PivotGridActions } from '../../actions/pivotGridActions';
import { ReportActions } from '../../actions/reportActions';
import { ReportElementActions } from '../../actions/reportElementActions';
import { TableCellActions } from '../../actions/tableCellActions';
import { TableCellGroupActions } from '../../actions/tableCellGroupActions';
import { TableRowActions } from '../../actions/tableRowActions';
import { TextElementAction } from '../../actions/textElementAction';
import { JsonDataSourceEditor } from '../../actions/_jsonDataSourceEditor';
import { BandViewModel } from '../../bands/xrBand';
import { formattingRuleSerializationsInfo } from '../../controls/metadata/properties/formattingrules';
import { PivotGridFieldViewModel } from '../../controls/pivotgrid/pivotgridfield';
import { SortBySummaryInfoCondition } from '../../controls/pivotgrid/sortBySummary';
import { ComponentsModel } from '../../controls/properties/components';
import { registerRichEditInline } from '../../controls/richEdit';
import { createChartDesignerOptions } from '../../controls/utils/_chartUtils';
import { XRChartViewModel } from '../../controls/xrChart';
import { XRPivotGridViewModel } from '../../controls/xrPivotgrid';
import { ReportViewModel } from '../../controls/xrReport';
import { TableOfContentsLevel } from '../../controls/xrTableOfContentsLevel';
import { calculatedFieldScripts } from '../../dataObjects/metadata/calculatedField';
import { createNewObjectItem } from '../../dataObjects/objectItemCreation';
import { LookUpValue } from '../../dataObjects/parameters/lookUpValue';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { ReportDesignerControlsHelper } from '../../helpers/_reportDesignerControlsHelper';
import { FieldListDragDropHandler } from '../../internal/dragdrop/_fieldListDragDropHandler';
import { ReportExplorerDragDropHandler } from '../../internal/dragdrop/_reportExplorerDragDropHandler';
import { ReportSnapLinesCollector } from '../../internal/dragdrop/_reportSnapLinesCollector';
import { ReportToolboxDragDropHandler } from '../../internal/dragdrop/_reportToolboxDragDropHandler';
import { SelectionDragDropHandler } from '../../internal/dragdrop/_selectionDragDropHandler';
import { ErrorPanelViewModel } from '../../internal/errorPanel/_errorPanelViewModel';
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
import { FieldListDataSourcesHelper } from '../../internal/fieldlist/_fieldListDataSourcesHelper';
import { ParametersViewModel } from '../../internal/fieldlist/_parametersViewModel';
import { FieldListItemFactory } from '../../internal/fieldlist/_treelistFactory';
import { ReportExplorerModel } from '../../internal/reportExplorer/_reportExplorer';
import { ScriptsEditor } from '../../internal/scripting/_scriptsEditor';
import { ControlScrollingTool } from '../../internal/_controlScrollingTool';
import { reportCopyPasteStrategy } from '../../internal/_copyPasteStrategy';
import { CrossTabConverter, PivotGridConverter } from '../../internal/_crossTabConverter';
import { CustomMergingEngine } from '../../internal/_customMergingEngine';
import { DataBindingMode } from '../../internal/_dataBindingMode';
import { ExpressionEditorAddOn, ValueEditorAddOn } from '../../internal/_designerEditorAddOn';
import { StringId } from '../../internal/_localizationStringId';
import { ReportConverter } from '../../internal/_reportConverter';
import { reportStorageWebIsRegister } from '../../internal/_settings';
import { createReportViewModel, isControl, updateDataSourceRefs, updateSurfaceContentSizeLocalizationMode } from '../../internal/_utils';
import { WizardRunner } from '../../internal/_wizardRunner';
import { LocalizationEditor } from '../../localization/_localizationEditor';
import { LocaliziblePropertiesAccessibilityProvider } from '../../localization/_localiziblePropertiesAccessibilityProvider';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
import { ReportDataSourceService } from '../../services/_reportDataSourceService';
import { ReportPreviewService } from '../../services/_reportPreviewService';
import { ReportWizardService } from '../../services/_reportWizardService';
import { ReportDesignerAddOns, ReportDesignerElements } from '../../utils/reportDesignerElements';
import { controlsFactory, DataBindingMode as UtilsDataBindingMode, DefaultCrossTabControl, formatStringEditorCustomSet, HandlerUri as UtilsHandlerUri, smartTagFactory as UtilsSmartTagFactory } from '../../utils/settings';
import { registerControls } from '../../utils/_registerControls';
import { registerCustomControls } from '../../utils/_registerCustomControls';
import { registerCustomGlobalExpressions, registerCustomReportExpressions } from '../../utils/_registerCustomExpressions';
import { StylesEditorHeaderModel } from '../../widgets/styleseditor';
import { FullscreenReportWizard } from '../../wizard/fullscreenReportWizard';
import { _convertToStateDataSource, _restoreDataSourceFromState } from '../../wizard/pages/chooseAvailableDataSourcePage';
import { CustomizeLabelPage } from '../../wizard/pages/customizeLabelPage';
import { ReportType } from '../../wizard/reportWizardState';
import { createReportWizardState } from '../../wizard/reportWizardStateCreating';
import { NavigateByReports } from '../navigation/navigateByReports';
import { ExpressionSmartTag, TasksSmartTag } from '../smartTags/expressionSmartTag';
import { SmartTagModel } from '../smartTags/smartTagContainer';
import { ReportMenuSettings } from './_reportMenuSettings';
import { ReportDialogSettings, WizardsInitializerSettings } from './_settings';
import { ChartActions } from '../../actions/chartActions';
import { ContextMenusEnabled, SmartTagsEnabled, PropertyGrid } from '../../settings';
import { FullScreenActionBase } from '../../../viewer/internal/_actions';
export class ReportDesignerInitializer extends CommonDesignerGenerator {
    constructor(options) {
        super();
        this.options = options;
        this._onAfterRenderCallbacks = [];
        this._converters = [];
        this._customMergeEngine = new CustomMergingEngine();
        this._updateCallback = null;
        this._selection = options.selection || new SurfaceSelection;
        const serializer = new ModelSerializer();
        this.configurateRtl(options.rtl)
            .configureReportStorageRegistration(options.reportStorageWebIsRegister, options.allowMDI)
            .addCallbacks(options.callbacks)
            .addElement('state', () => options.state)
            .addElement('availableDataSources', () => {
            return (options.availableDataSources || []).map((object) => {
                return $.extend({}, object, { data: createNewObjectItem(object.data, undefined, serializer) });
            });
        });
        const navigation = new NavigateByReports({
            allowMDI: this._allowMDI,
            callbacks: this._designerCallbacks,
            knownEnums: options.knownEnums,
            reportUrl: options.reportUrl,
            initOptions: {
                availableDataSources: options.availableDataSources,
                state: options.state
            },
            selection: this._selection
        });
        const undoEngine = ko.computed(() => { return navigation.currentTab() && navigation.currentTab().undoEngine; });
        this._addDisposable(undoEngine);
        this._reportcontext = ko.computed({
            read: () => {
                return navigation.currentTab() && navigation.currentTab().context();
            },
            write: (newVal) => {
                navigation.currentTab() && navigation.currentTab().context(newVal);
            }
        });
        const model = ko.computed({
            read: () => {
                return this._reportcontext() && this._reportcontext().report;
            },
            write: (newVal) => {
                if (!this.isDisposing)
                    navigation.changeContext(newVal);
            }
        });
        const surface = ko.computed(() => this._reportcontext() && this._reportcontext().surface);
        const canAddItems = ko.computed(() => model() && model().language() === defaultCulture);
        this._addDisposable(this._reportcontext);
        this._addDisposable(model);
        this._addDisposable(surface);
        this._addDisposable(canAddItems);
        this._addDisposable(canAddItems.subscribe((newVal) => {
            this.buildingModel.toolboxItems && this.buildingModel.toolboxItems.forEach(x => x.disabled(!newVal));
        }));
        this.initializeContext({ model, surface, undoEngine });
        this.mapOnContext();
        this.addElement('canAddItems', () => canAddItems);
        this.addElement('navigateByReports', () => navigation);
        this.addElement('getTabs', () => () => navigation.tabs());
        this.addElement('closeTab', () => (tab, force = false) => navigation.removeTab(tab, force));
        this._addDisposable(this._reportcontext.subscribe((newVal) => {
            if (this.buildingModel.propertyGrid) {
                this.buildingModel.propertyGrid.cleanEditors();
                this.buildingModel.propertyGrid.editorsRendered(!this.buildingModel.propertyGrid.isSortingByGroups());
            }
            this.buildingModel.popularProperties && this.buildingModel.popularProperties.cleanEditors();
        }));
        this._selection.focused(surface());
        this._addDisposable(surface.subscribe((newValue) => {
            if (!newValue)
                this._selection.reset();
            else
                this._selection.focused(newValue);
        }));
        const isDefaultLanguage = ko.computed(() => {
            return this.buildingModel.model && this.buildingModel.model() ? this.buildingModel.model().language() == defaultCulture : false;
        });
        this._addDisposable(isDefaultLanguage);
        this._accessibilityProvider = new LocaliziblePropertiesAccessibilityProvider(isDefaultLanguage);
    }
    get reportContext() {
        return this._reportcontext;
    }
    get buildingModel() {
        return this.getModel();
    }
    get _designerCallbacks() {
        return this._callbacks && this._callbacks.designer;
    }
    getModel() {
        return super.getModel();
    }
    subscribeIncomeReport(report, reportUrl, dataSourceRefs, knownEnums) {
        this._addDisposable(report.subscribe((newValue) => {
            const newModel = new ReportViewModel(newValue, undefined, knownEnums);
            updateDataSourceRefs(newModel, dataSourceRefs);
            if (this.buildingModel.navigateByReports.tabs().length === 0) {
                this.buildingModel.navigateByReports.addTab(newModel, reportUrl, () => newModel.dispose());
            }
            else {
                this.buildingModel.model(newModel);
            }
        }));
        return this;
    }
    _addDisposable(object) {
        this._disposables.push(object);
    }
    _tryAddScriptEditor(isScriptsDisabled) {
        isScriptsDisabled = isScriptsDisabled || !aceAvailable;
        if (!isScriptsDisabled) {
            const scriptsEditor = new ScriptsEditor(this.buildingModel.model, this.buildingModel.controlsHelper.allControls);
            this._addDisposable(scriptsEditor.editorVisible.subscribe((newValue) => {
                if (newValue) {
                    const focusedControl = this.buildingModel.selection.focused();
                    if (focusedControl && focusedControl.getControlModel) {
                        const controlModel = focusedControl.getControlModel();
                        scriptsEditor.selectedControl(!!controlModel.scripts ? controlModel : controlModel.parentModel());
                    }
                    const resizeFunction = () => setTimeout(() => {
                        scriptsEditor.editorContainer().resize();
                    }, 1);
                    if (!scriptsEditor.editorContainer()) {
                        const innerSubscription = scriptsEditor.editorContainer.subscribe((newVal) => {
                            innerSubscription.dispose();
                            resizeFunction();
                        });
                    }
                    else
                        resizeFunction();
                }
                this.buildingModel.designMode(!newValue);
            }));
            this.addElement('scriptsEditor', () => scriptsEditor);
            this.addElement('events', () => ko.pureComputed(() => { return this.buildingModel.scriptsEditor.allFunctionNames; }));
            this.addElement('gotoEvent', () => (functionName, eventName, model) => {
                scriptsEditor.editorVisible(true);
                scriptsEditor.ensureEvent(eventName.substring(2), functionName, model);
            });
            return true;
        }
        else {
            const controlTypes = Object.keys(controlsFactory().controlsMap);
            for (let index = 0; index < controlTypes.length; index++) {
                ['scripts', 'scriptReferencesString', 'scriptLanguage'].forEach((propertyDisplayName) => {
                    const propertyInfo = controlsFactory().getPropertyInfo(controlTypes[index], propertyDisplayName);
                    propertyInfo && (propertyInfo.visible = false);
                });
            }
            calculatedFieldScripts.visible = false;
        }
        return false;
    }
    _getControls(controls, filter, isNoneItemAdded = true) {
        return ko.pureComputed(() => {
            let result = controls();
            if (filter) {
                result = result.filter(filter);
            }
            const allControls = result.map((item) => {
                return { displayName: ko.unwrap(item.name), value: item };
            });
            if (isNoneItemAdded)
                allControls.splice(0, 0, { displayName: localizeNoneString('(none)'), value: null });
            return allControls;
        }).extend({ throttle: 1 });
    }
    _createEmptyReportItemsProvider() {
        const reportModel = new ReportViewModel({});
        const parameters = new ParametersViewModel(reportModel);
        const dataSourceHelper = new DataSourceHelper(reportModel.objectStorage, reportModel.dataSourceRefs, undefined);
        reportModel.dataSourceHelper(dataSourceHelper);
        const fieldListDataSourceHelper = new FieldListDataSourcesHelper();
        fieldListDataSourceHelper.updateDataSources(dataSourceHelper, reportModel, parameters.parameters);
        const wrappedCallback = fieldListDataSourceHelper.wrapFieldsCallback(ReportDataSourceService.fieldListCallback, () => undefined);
        return new FieldListProvider(wrappedCallback, fieldListDataSourceHelper.fieldListDataSources, [parameters]);
    }
    addReportDialogs(func) {
        const settings = new ReportDialogSettings(this._designerCallbacks);
        func(settings);
        settings.saveReportDialog && this.addElement('saveReportDialog', () => settings.saveReportDialog);
        if (settings.saveReportDialogLight) {
            this.addElement('saveReportDialogLight', () => settings.saveReportDialogLight);
            this.buildingModel.navigateByReports.save = (tab) => {
                this.buildingModel.saveReportDialogLight.show(tab);
            };
        }
        settings.openReportDialog && this.addElement('openReportDialog', () => settings.openReportDialog);
        return this;
    }
    addErrorPanelViewModel(element, options) {
        this.addElement('errorPanelViewModel', () => {
            const getRightPositionSize = () => {
                return this.buildingModel.designMode() ?
                    this.buildingModel.tabPanel.headerWidth :
                    this.buildingModel.reportPreviewModel && this.buildingModel.reportPreviewModel.tabPanel.headerWidth;
            };
            const rightPosition = ko.observable(0);
            let dispose = null;
            const subscribeDesignMode = () => {
                dispose && dispose();
                if (this.buildingModel.designMode()) {
                    dispose = this.buildingModel.tabPanel.events.on('headerWidthChanged', (args) => {
                        rightPosition(getRightPositionSize());
                    });
                }
                else {
                    dispose = this.buildingModel.reportPreviewModel.tabPanel.events.on('headerWidthChanged', (args) => {
                        rightPosition(getRightPositionSize());
                    });
                }
                rightPosition(getRightPositionSize());
            };
            subscribeDesignMode();
            this._addDisposable(this.buildingModel.designMode.subscribe(() => subscribeDesignMode()));
            const leftPosition = ko.computed(() => {
                return this.buildingModel.designMode() ? 96 : 0;
            });
            const errorPanel = new ErrorPanelViewModel(Object.assign(Object.assign({}, options), { controlScrollingTool: this.buildingModel.controlScrollingTool, controlsHelper: this.buildingModel.controlsHelper, editableObject: this.buildingModel.editableObject, selection: this.buildingModel.selection, undoEngine: () => this.buildingModel.undoEngine(), onClick: () => {
                    if (!this.buildingModel.designMode()) {
                        this.buildingModel.reportPreviewModel.reportPreview.previewVisible = false;
                        this.buildingModel.reportPreviewModel.reportPreview.deactivate();
                    }
                    this.buildingModel.tabPanel.selectTab({
                        model: this.buildingModel.tabPanel.getTabByName('Properties')
                    });
                }, position: {
                    left: leftPosition,
                    right: rightPosition
                }, rtl: this.buildingModel.rtl }));
            errorPanel._disposables.push({ dispose }, leftPosition);
            this._addDisposable(this._reportcontext.subscribe((newVal) => {
                errorPanel.clear();
                if (newVal != null) {
                    errorPanel.subscribeProvider(newVal.reportErrorProvider);
                    errorPanel.subscribeProvider(newVal.runtimeErrorProvider);
                    errorPanel._providers.forEach(provider => provider.collectErrors());
                }
            }));
            const $root = $.fn.constructor(element);
            const $window = $.fn.constructor(window);
            const $progress = $root.find('.dxrd-error-panel');
            const updateProgressBarPosition = getDockedElementCallback($progress, $root, $window, '.dxrd-error-panel', { bottom: true });
            this._addDisposable(errorPanel.collapsed.subscribe(() => {
                updateProgressBarPosition(element);
            }));
            const wrapped = () => updateProgressBarPosition(element);
            this._onAfterRenderCallbacks.push(() => updateProgressBarPosition(element));
            window.addEventListener('scroll', wrapped);
            this._addDisposable({
                dispose: () => {
                    window.removeEventListener('scroll', wrapped);
                }
            });
            return errorPanel;
        });
        return this;
    }
    addNavigateToControl(element) {
        this.addElement('controlScrollingTool', () => {
            return new ControlScrollingTool(element);
        });
        return this;
    }
    addFlagsAndInitProperties(element) {
        this.addElement('validationMode', () => ko.computed({
            read: () => {
                return this.buildingModel.surface() && this.buildingModel.surface().validationMode();
            }, write: (newVal) => {
                this.buildingModel.surface().validationMode(newVal);
            }
        }));
        this.addElement('isDirty', () => ko.computed({
            read: () => {
                return this.buildingModel.navigateByReports.currentTab() && this.buildingModel.navigateByReports.currentTab().isDirty();
            },
            write: (newVal) => {
                this.buildingModel.navigateByReports.currentTab() && this.buildingModel.navigateByReports.currentTab().isDirty(newVal);
            }
        }));
        this.addElement('designMode', () => ko.observable(true));
        this.addIsLoading(() => {
            const isLoading = ko.observable(true);
            this.buildingModel.navigateByReports.init(isLoading);
            return isLoading;
        });
        this.addElement('rootStyle', () => 'dxrd-designer dxd-back-primary-invariant');
        this.addElement('selectedPath', () => ko.observable(null));
        this.addElement('actionsGroupTitle', () => () => formatUnicorn(getLocalization('{0} {1}', 'ReportStringId.STag_Capt_Format'), getControlTypeName(this.getModel().editableObject()), getLocalization('Tasks', 'ReportStringId.STag_Capt_Tasks')));
        this.addElement('updateFont', () => (values) => {
            availableFonts(Object.assign(Object.assign({}, availableFonts()), values));
        });
        this.addElement('afterRender', () => () => {
            this._onAfterRenderCallbacks.forEach(x => x());
            this._onAfterRenderCallbacks.splice(0);
            delete this.buildingModel.afterRender;
        });
        this.addElement('sortFont', () => () => {
            const sortedObj = {};
            const fonts = availableFonts.peek();
            Object.keys(fonts).sort((a, b) => { return a.localeCompare(b); }).forEach(key => sortedObj[key] = fonts[key]);
            availableFonts(sortedObj);
        });
        this.addElement('zoomStep', () => ko.observable(0.05));
        this.addElement('surfaceSize', () => ko.observable(0));
        if (!element)
            return this;
        this.addElement('fullScreen', () => createFullscreenComputed(element, this));
        this.addElement('drawCrossbandContent', () => ko.observable(true));
        return this;
    }
    addPreview(options) {
        const errorsAction = (response) => {
            if (!!response.errors)
                this.reportContext() && this.reportContext().runtimeErrorProvider.errors(response.errors);
        };
        createPreview({
            model: {
                parametersInfo: options.parametersInfo,
                handlerUri: options.handlerUri,
                previewVisible: false,
                rtl: options.rtl,
                accessibilityCompliant: false,
                exportSettings: options.exportSettings,
                progressBarSettings: options.progressBarSettings,
                searchSettings: options.searchSettings
            },
            element: options.element,
            callbacks: Object.assign(Object.assign({}, options.callbacks), { _onGetBuildStatus: errorsAction, _onGetDocumentDetails: errorsAction })
        })
            .done((reportPreviewModel) => {
            this.addElement('reportPreviewModel', () => {
                this._addDisposable({
                    dispose: reportPreviewModel.reportPreview.events.on('previewVisibleChanged', (args) => {
                        const newValue = args.newValue;
                        this.buildingModel.designMode(!newValue);
                        if (!newValue && this._updateCallback)
                            this._updateCallback();
                    })
                });
                return reportPreviewModel;
            });
            this._addDisposable(reportPreviewModel);
        });
        return this;
    }
    addReportUrls(subreports) {
        this.addElement('reportUrls', () => {
            return ko.observableArray(convertMapToKeyValuePair(subreports));
        });
        return this;
    }
    _wrapActionProvider(actionsProvider) {
        return {
            getActions: (context) => {
                return actionsProvider() && actionsProvider().getActions(context) || [];
            }
        };
    }
    initializeFieldListActionProviders(func = () => {
        var _a, _b, _c;
        const providers = [];
        if (this._calculatedFieldsSource)
            providers.push(this._wrapActionProvider(this._calculatedFieldsSource));
        if (this._watermarks)
            providers.push(this._wrapActionProvider(this._watermarks));
        if (this._parameters)
            providers.push(this._wrapActionProvider(this._parameters));
        if (this._dataSourceActionProvider)
            providers.push(this._dataSourceActionProvider);
        if ((_c = (_b = (_a = this.options.data) === null || _a === void 0 ? void 0 : _a.dataSourceSettings) === null || _b === void 0 ? void 0 : _b.allowEditDataSource) !== null && _c !== void 0 ? _c : true) {
            if (this._jsonDataSourceEditor)
                providers.push(this._jsonDataSourceEditor);
            if (this._sqlDataSourceEditor)
                providers.push(this._sqlDataSourceEditor);
            if (this._federationDataSourceEditor)
                providers.push(this._federationDataSourceEditor);
            if (this._objectDataSourceEditor)
                providers.push(this._objectDataSourceEditor);
        }
        return providers;
    }) {
        this.addElement('fieldListActionProviders', func);
        return this;
    }
    initializeCalculatedFieldsSource() {
        const calculatedFieldsSource = ko.computed(() => this._reportcontext() && this._reportcontext().calcFieldsSource);
        this.addElement('calculatedFieldsSource', () => calculatedFieldsSource);
        this._calculatedFieldsSource = calculatedFieldsSource;
        return this;
    }
    initializeWatermarks() {
        const watermarks = ko.computed(() => this._reportcontext() && this._reportcontext().watermarks);
        this.addElement('watermarks', () => watermarks);
        this._watermarks = watermarks;
        return this;
    }
    initializeFieldListItemsExtenders() {
        const fieldListItemsExtenders = ko.computed(() => this._reportcontext() && this._reportcontext().fieldListItemsExtenders);
        this.addElement('fieldListItemsExtenders', () => fieldListItemsExtenders);
        return this;
    }
    initializeParameters() {
        const parameters = ko.computed(() => this._reportcontext() && this._reportcontext().parameters);
        this.addElement('parameters', () => parameters);
        this._parameters = parameters;
        return this;
    }
    initializeFieldListProvider() {
        const fieldListProvider = ko.computed(() => this._reportcontext() && this._reportcontext().fieldListProvider);
        this.addElement('fieldListProvider', () => fieldListProvider);
        return this;
    }
    initializeReportItemsProvider() {
        const reportItemsProvider = ko.computed(() => this._reportcontext() && this._reportcontext().reportItemsProvider);
        this.addElement('reportItemsProvider', () => reportItemsProvider);
        return this;
    }
    initializeDataBindingsProvider() {
        const dataBindingsProvider = ko.computed(() => this._reportcontext() && this._reportcontext().dataBindingsProvider);
        this.addElement('dataBindingsProvider', () => dataBindingsProvider);
        return this;
    }
    initializeDisplayNameProvider() {
        const displayNameProvider = ko.computed(() => this._reportcontext() && this._reportcontext().displayNameProvider);
        this.addElement('displayNameProvider', () => displayNameProvider);
        this.addElement('getDisplayNameByPath', () => (path, value) => { return displayNameProvider().getDisplayNameByPath(path, value); });
        return this;
    }
    initializeExpressionDisplayNameProvider() {
        const expressionDisplayNameProvider = ko.computed(() => this._reportcontext() && this._reportcontext().expressionDisplayNameProvider);
        this.addElement('expressionDisplayNameProvider', () => expressionDisplayNameProvider);
        return this;
    }
    initializeDataSourceHelper() {
        const dataSourceHelper = ko.computed(() => this._reportcontext() && this._reportcontext().dataSourceHelper);
        this.addElement('dataSourceHelper', () => dataSourceHelper);
        const fieldListDataSourceHelper = ko.computed(() => this._reportcontext() && this._reportcontext().fieldListDataSourceHelper);
        this.addElement('fieldListDataSources', () => ko.computed(() => fieldListDataSourceHelper() && fieldListDataSourceHelper().fieldListDataSources()));
        this._addDisposable(fieldListDataSourceHelper);
        return this;
    }
    addSelection(func = (settings) => {
        settings.selection = this._selection;
        const rtl = ko.computed(() => { return this.buildingModel.surface() && this.buildingModel.surface().rtl(); });
        const snapLinesCollector = new ReportSnapLinesCollector(rtl);
        this._addDisposable(rtl);
        settings.snapHelper = new SnapLinesHelper(this.buildingModel.surface, SnapLinesHelper.snapTolerance, snapLinesCollector);
        settings.editableObject = CombinedObject.getEditableObject(settings.selection, this.buildingModel.undoEngine, (propertyName, controls, undoEngune) => this._customMergeEngine.customMerge(propertyName, controls, undoEngune)).extend({ throttle: 1 });
        settings.addDragDrop((dragDropSettings) => {
            dragDropSettings.dragHelperContent = new DragHelperContent(settings.selection);
            dragDropSettings.dragDropStarted = DragDropHandler.started;
            dragDropSettings.addDragDropHandler('dragHandler', new SelectionDragDropHandler(this.buildingModel.canAddItems, this.buildingModel.surface, settings.selection, this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent));
            dragDropSettings.addDragDropHandler('toolboxDragHandler', new ReportToolboxDragDropHandler(this.buildingModel.surface, this._selection, this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent, controlsFactory(), this._designerCallbacks.componentAdded));
            dragDropSettings.addDragDropHandler('fieldDragHandler', new FieldListDragDropHandler(this.buildingModel.canAddItems, this.buildingModel.surface, this._selection, this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent, this.buildingModel.fieldListDataSources, this._designerCallbacks.componentAdded));
        });
        settings.addResize((resizeSettings) => {
            resizeSettings.handler = {
                starting: () => {
                    this.buildingModel.inlineTextEdit.visible() &&
                        this.buildingModel.inlineTextEdit['_showInline'](false);
                    this.buildingModel['richInlineControl'] &&
                        this.buildingModel['richInlineControl'].visible() &&
                        this.buildingModel['richInlineControl']['_showInline'](false);
                    this._selection.expectClick = true;
                    this.buildingModel.undoEngine().start();
                },
                stopped: () => {
                    this.buildingModel.undoEngine().end();
                    setTimeout(() => { this._selection.expectClick = false; }, 100);
                },
                disabled: DragDropHandler.started,
                snapHelper: settings.snapHelper
            };
        });
    }) {
        super.addSelection(func);
        return this;
    }
    addToolboxItems(items) {
        super.addToolboxItems(items);
        return this;
    }
    addGroupedToolboxItems() {
        super.addGroupedToolboxItems();
        return this;
    }
    addControlProperties(editors, groups, accessibilityProvider) {
        super.addControlProperties(editors, groups, this._accessibilityProvider);
        return this;
    }
    createControlProperties(editors, groups, accessibilityProvider) {
        const properties = super.createControlProperties(editors, groups, accessibilityProvider);
        properties.createEditorAddOn = (_editor) => {
            const editor = unwrapEditor(_editor);
            const editorAddOn = new ValueEditorAddOn(editor, properties.popupService);
            const editorExression = new ExpressionEditorAddOn(editor, properties.popupService, 'dxrd-svg-properties-propertyexpression');
            editor._disposables.push(editorAddOn, editorExression);
            return {
                templateName: 'dx-editor-addons',
                data: [editorAddOn, editorExression]
            };
        };
        return properties;
    }
    addMenu(func = (settings) => void 0) {
        const settings = new ReportMenuSettings();
        func(settings);
        this._disposables.push(settings);
        extend(this.getModel(), settings.generate());
        return this;
    }
    addControlsHelper(func = (settings) => {
        const helper = ko.computed(() => this._reportcontext() && this._reportcontext().controlsHelper);
        this._addDisposable(helper);
        const controlHelper = new ReportDesignerControlsHelper(helper);
        settings
            .addControlsHelper(controlHelper)
            .addControlsStore();
    }) {
        super.addControlsHelper(func);
        return this;
    }
    addSmartTagModel() {
        let smartTagFactory = Object.assign({}, UtilsSmartTagFactory());
        extend(smartTagFactory, {
            'default': (reportElement) => {
                const result = [];
                if (SmartTagsEnabled())
                    result.push(new TasksSmartTag(reportElement, this.buildingModel.popularProperties));
                if (UtilsDataBindingMode() !== DataBindingMode.Bindings)
                    result.push(new ExpressionSmartTag(reportElement, this.buildingModel.activatedExpressionEditor));
                return result;
            }
        });
        const smartTagHelper = new SmartTagModel(this._selection, this.buildingModel.surface, this.buildingModel['verticalScrollOffset'], smartTagFactory, this.buildingModel.rtl);
        this.addElement('smartTagModel', () => smartTagHelper);
        this._disposables.push({
            dispose: () => smartTagFactory = {},
        });
        return this;
    }
    setControlsHelperFilter(filter) {
        this.buildingModel.controlsStore.setFilter(filter);
        return this;
    }
    _createPropertiesTab() {
        const getVisible = () => { return !!this.buildingModel.model(); };
        const getDisabled = () => {
            var _a, _b, _c;
            return this.buildingModel.propertyGrid.focusedItem() instanceof Array ||
                (!((_c = (_b = (_a = this.options.data) === null || _a === void 0 ? void 0 : _a.dataSourceSettings) === null || _b === void 0 ? void 0 : _b.allowEditDataSource) !== null && _c !== void 0 ? _c : true) && this.buildingModel.propertyGrid.focusedItem() instanceof ComponentsModel);
        };
        const tabInfo = new TabInfo({
            text: 'Properties',
            template: 'dxrd-propertiestab',
            model: this.buildingModel.propertyGrid,
            localizationId: 'AnalyticsCoreStringId.Cmd_Properties',
            visible: getVisible(),
            disabled: getDisabled()
        });
        this._addDisposable(this.buildingModel.model.subscribe((newVal) => {
            tabInfo.visible = getVisible();
        }));
        this._addDisposable(this.buildingModel.propertyGrid.focusedItem.subscribe((newVal) => {
            tabInfo.disabled = getDisabled();
        }));
        return tabInfo;
    }
    _createExpressionsTab(context) {
        const expressionGridModel = ko.computed(() => {
            const editableObject = this.buildingModel.editableObject();
            return editableObject && editableObject.expressionObj;
        });
        let expressionGrid = null;
        this._addDisposable(context.subscribe((newVal) => {
            expressionGrid.cleanEditors();
        }));
        expressionGrid = new ObjectProperties(expressionGridModel);
        this._addDisposable(expressionGrid);
        this._addDisposable(expressionGridModel);
        const getVisible = () => { return this.buildingModel.model() && this.buildingModel.model()._dataBindingMode() !== DataBindingMode.Bindings; };
        const getDisabled = () => {
            return !expressionGridModel() || ko.unwrap(this.buildingModel.editableObject().lockedInUserDesigner);
        };
        const expressionTab = new TabInfo({
            text: 'Expressions',
            template: 'dxrd-expressions-tab',
            model: expressionGrid,
            localizationId: 'DevExpress.XtraReports.UI.XRControl.Expressions',
            imageClassName: 'expressions',
            imageTemplateName: 'dxrd-svg-tabs-expressions',
            visible: getVisible(),
            disabled: getDisabled(),
        });
        this._addDisposable(this.buildingModel.model.subscribe((newVal) => {
            if (newVal)
                this._addDisposable(newVal._dataBindingMode.subscribe((newVal) => {
                    expressionTab.visible = getVisible();
                }));
            expressionTab.visible = getVisible();
        }));
        this._addDisposable(expressionGridModel.subscribe((newVal) => {
            expressionTab.disabled = getDisabled();
        }));
        let currentFilter = undefined;
        this._addDisposable({
            dispose: expressionTab.events.on('activeChanged', (args) => {
                if (expressionTab.active && expressionTab.visible) {
                    currentFilter = this.buildingModel.controlsStore.getFilter();
                    this.buildingModel.controlsStore.setFilter(isControl);
                }
                else if (currentFilter !== undefined)
                    this.buildingModel.controlsStore.setFilter(currentFilter);
            })
        });
        return expressionTab;
    }
    _createReportExplorerTab() {
        var _a;
        const reportExplorer = new ReportExplorerModel(this.buildingModel.model, this.buildingModel.editableObject, (targetObject) => {
            const propertiesTab = this.buildingModel.tabPanel.getTabByName('Properties');
            propertiesTab.model.focusedItem(targetObject);
            this.buildingModel.tabPanel.selectTab({ model: propertiesTab });
        }, new ReportExplorerDragDropHandler(this.buildingModel.canAddItems, this.buildingModel.surface, this.buildingModel.selection, this.buildingModel.undoEngine, this.buildingModel.dragHelperContent), this.buildingModel.selection, (_a = this.options.data) === null || _a === void 0 ? void 0 : _a.dataSourceSettings);
        this._addDisposable(reportExplorer);
        const getVisible = () => { return !!this.buildingModel.model(); };
        const tabInfo = new TabInfo({
            text: 'Report Explorer',
            template: 'dxrd-reportexplorerwrapper',
            model: reportExplorer,
            localizationId: 'ReportStringId.UD_Title_ReportExplorer',
            imageClassName: 'reportexplorer',
            imageTemplateName: 'dxrd-svg-tabs-reportexplorer',
            visible: getVisible()
        });
        this._addDisposable(this.buildingModel.model.subscribe(() => {
            tabInfo.visible = getVisible();
        }));
        return tabInfo;
    }
    _createFieldListTab(designerCallbacks, startDataSourceWizard) {
        var _a, _b, _c;
        const treeListOptions = {
            itemsProvider: this.buildingModel.fieldListProvider,
            factory: new FieldListItemFactory(),
            selectedPath: this.buildingModel.selectedPath,
            treeListController: new FieldListController(this.buildingModel.fieldListActionProviders, createActionWrappingFunction('WrapForFieldList', (model, handler) => {
                this.buildingModel.undoEngine().start();
                const result = handler(model);
                this.buildingModel.undoEngine().end();
                if (result && result.name) {
                    this.buildingModel.selectedPath(model.path + '.' + ko.unwrap(result.name));
                }
            }), this.buildingModel.fieldDragHandler, designerCallbacks.customizeFieldListActions)
        };
        const useContextMenu = ko.observable(true);
        const actions = ko.observable([]);
        this.addDisposable(treeListOptions.treeListController.subscribeOnSelectedItemChange(() => {
            var _a, _b;
            useContextMenu((_b = (_a = this.getModel().parts) === null || _a === void 0 ? void 0 : _a.some(part => part.id === ReportDesignerElements.ContextMenu)) !== null && _b !== void 0 ? _b : true);
            if (useContextMenu() && treeListOptions.treeListController.selectedItem)
                actions(treeListOptions.treeListController.getActions(treeListOptions.treeListController.selectedItem));
            else
                actions([]);
        }));
        if (!this.getModel().ContextMenusEnabled)
            this.getModel().ContextMenusEnabled = ko.observable(true);
        const fieldListContextMenu = new ContextMenuProvider({
            actions: actions,
            target: '.' + this.buildingModel.containerClass + ' .dxrd-fieldslist-context-menu-container',
            getClickActionParams: () => treeListOptions.treeListController.selectedItem && treeListOptions.treeListController.selectedItem.getViewModel(),
            contextMenusEnabled: this.getModel().ContextMenusEnabled
        });
        this.addContextMenu(fieldListContextMenu);
        const fieldListModel = {
            treeListOptions: treeListOptions,
            startWizard: () => {
                startDataSourceWizard();
            },
            visible: () => {
                const model = this.getModel();
                return model != null && model.multiQueryDataSourceWizard.canRunWizard();
            },
            addDataSourceButtonText: getLocalization('Add Data Source', 'ASPxReportsStringId.ReportDesigner_FieldList_AddDataSource'),
            allowAddDataSource: (_c = (_b = (_a = this.options.data) === null || _a === void 0 ? void 0 : _a.dataSourceSettings) === null || _b === void 0 ? void 0 : _b.allowAddDataSource) !== null && _c !== void 0 ? _c : true,
            fieldListContextMenu: fieldListContextMenu,
            useContextMenu: useContextMenu
        };
        const getVisible = () => { return !!this.buildingModel.model(); };
        const tabInfo = new TabInfo({
            text: 'Fields',
            template: 'dxrd-fieldlistwrapper',
            model: fieldListModel,
            localizationId: 'ReportStringId.UD_Title_FieldList',
            imageClassName: 'fieldlist',
            imageTemplateName: 'dxrd-svg-tabs-fieldlist',
            visible: getVisible()
        });
        this._addDisposable(this.buildingModel.model.subscribe(() => {
            tabInfo.visible = getVisible();
        }));
        return tabInfo;
    }
    addTabPanel(panel, addTabInfo = () => {
        return [
            this._createPropertiesTab(),
            this._createExpressionsTab(this._reportcontext),
            this._createFieldListTab(this._designerCallbacks, () => {
                this.buildingModel._wizardRunner.run('DataSourceWizard');
            }),
            this._createReportExplorerTab()
        ];
    }) {
        super.addTabPanel(panel, addTabInfo);
        const contextSubscription = this._reportcontext.subscribe((newVal) => {
            if (!!newVal) {
                contextSubscription.dispose();
                this.buildingModel.tabPanel.collapsed = false;
            }
        });
        this._addDisposable(contextSubscription);
        return this;
    }
    _createActionsStorage(actions) {
        const object = {};
        for (let i = actions.length - 1; i > -1; i--) {
            object[actions[i].id] = actions[i].clickAction;
        }
        return object;
    }
    addOpenReportMethod() {
        this.addElement('openReport', () => (url) => {
            this.buildingModel.navigateByReports.addTab(null, ko.observable(url));
        });
        return this;
    }
    addShowPreviewMethod() {
        this.addElement('showPreview', () => () => {
            const reportPreview = this.buildingModel.reportPreviewModel.reportPreview;
            reportPreview.previewVisible = true;
            if (!this.buildingModel.model()) {
                const subscription = this.buildingModel.model.subscribe((newVal) => {
                    subscription.dispose();
                    reportPreview.initialize(ReportPreviewService.initializePreview(this.buildingModel.model()));
                });
            }
            else {
                reportPreview.initialize(ReportPreviewService.initializePreview(this.buildingModel.model()));
            }
        });
        return this;
    }
    initializeUIEffects(applyBindings, element) {
        this._addDisposable(this.buildingModel.editableObject.subscribe(() => {
            const $scrollView = $.fn.constructor('.dxrd-designer .dxrd-properties-wrapper').find('.dx-scrollview');
            if ($scrollView.length) {
                const scrollViewInstance = dxScrollView['getInstance']($scrollView.get(0));
                scrollViewInstance && scrollViewInstance['scrollTo'] && scrollViewInstance['scrollTo'](0);
            }
        }));
        const updateSurfaceContentSize__ = updateSurfaceContentSize(this.buildingModel.surfaceSize, element, this.rtl);
        const updateSurfaceContentSizeLocalizationMode__ = updateSurfaceContentSizeLocalizationMode(this.buildingModel.surfaceSize, element, this.rtl);
        const updateSurfaceContentSize_ = () => {
            if (!this.buildingModel)
                return;
            if (this.buildingModel.localizationMode()) {
                updateSurfaceContentSizeLocalizationMode__();
            }
            else {
                updateSurfaceContentSize__();
            }
            const $root = $.fn.constructor(element).find('.dxrd-designer').eq(0);
            const $contentPanel = $root.find('.dxrd-surface-wrapper .dxrd-content-panel-wrapper').eq(0);
            areaHeight($contentPanel.height());
            areaWidth($contentPanel.width());
        };
        let updateContentSizeTimeout = null;
        const updateSurfaceContentSize_async = () => {
            updateContentSizeTimeout && clearTimeout(updateContentSizeTimeout);
            updateContentSizeTimeout = setTimeout(() => {
                updateSurfaceContentSize_();
            }, 1);
        };
        const reportHeight = ko.computed(() => {
            if (this.buildingModel.surface()) {
                updateSurfaceContentSize_async();
                return this.buildingModel.surface().effectiveHeight();
            }
        });
        const reportWidth = ko.computed(() => {
            if (this.buildingModel.surface()) {
                updateSurfaceContentSize_async();
                return this.buildingModel.surface().pageWidth();
            }
        });
        const areaHeight = ko.observable(reportHeight());
        const areaWidth = ko.observable(reportWidth());
        const verticalScrollOffset = ko.observable(0);
        const horizontalScrollOffset = ko.observable(0);
        this._addDisposable(ko.computed(() => {
            let horizontalOffset = 0;
            let verticalOffset = 0;
            [0, 0].forEach(() => {
                verticalOffset = reportHeight() - (areaHeight() - horizontalOffset) > 0.5 ? 20 : 0;
                horizontalOffset = reportWidth() - (areaWidth() - verticalOffset) > 0.5 ? 20 : 0;
            });
            horizontalScrollOffset(horizontalOffset);
            verticalScrollOffset(verticalOffset);
        }));
        this._updateCallback = () => {
            if (!this.buildingModel.reportPreviewModel.reportPreview.previewVisible)
                updateSurfaceContentSize_();
        };
        window.addEventListener('resize', this._updateCallback);
        this.buildingModel.onViewPortScroll = (viewPort) => {
            const $viewPort = $.fn.constructor(viewPort), $surface = $viewPort.closest('.dxrd-surface');
            $surface.find('.dxrd-bands-panel-wrapper').scrollTop($viewPort.scrollTop());
            $surface.find('.dxrd-hruler-wrapper').scrollLeft($viewPort.scrollLeft());
        };
        this.addElement('verticalScrollOffset', () => verticalScrollOffset);
        this.addElement('horizontalScrollOffset', () => horizontalScrollOffset);
        this._addDisposable(reportHeight);
        this._addDisposable(reportWidth);
        this._addDisposable({
            dispose: this.buildingModel.tabPanel.events.on('widthChanged', (args) => {
                updateSurfaceContentSize_async();
            })
        });
        this._addDisposable(this.buildingModel.localizationEditor.width.subscribe(() => {
            updateSurfaceContentSize_async();
        }));
        this._addDisposable(this.buildingModel.localizationMode.subscribe((newVal) => {
            updateSurfaceContentSize_async();
        }));
        this.buildingModel.updateSurfaceSize = () => {
            updateSurfaceContentSize_();
        };
        this._addDisposable(this.buildingModel.navigateByReports.height.subscribe(() => {
            updateSurfaceContentSize_async();
        }));
        if (applyBindings) {
            this.buildingModel.updateSurfaceSize();
        }
        return this;
    }
    _createNewReportFromWizardState(reportWizard, designerModel, wizardState, state, deferred) {
        ReportWizardService.generateReportFromWizardState(wizardState, reportWizard._requestModelType, state(), (wizardModel) => {
            reportWizard.events.call('beforeFinish', { state: wizardState, wizardModel: wizardModel });
        })
            .done((result) => {
            const modelJson = JSON.parse(result.reportModel);
            const newReport = new ReportViewModel(modelJson, undefined, result.knownEnums);
            newReport.dataSourceRefs = result.dataSourceRefs;
            designerModel.navigateByReports.addTab(newReport, ko.observable(''), undefined, newReport.displayNameObject() || newReport.name());
            designerModel.isDirty(true);
            designerModel.isLoading(false);
            deferred.resolve(newReport);
        })
            .fail(() => { deferred.reject(); });
    }
    _createNewViaWizardAction(reportWizard, designerModel, state) {
        const menuAction = {
            id: ActionId.NewReportViaWizard,
            container: 'menu',
            text: 'New via Wizard...',
            displayText: () => getLocalization('New via Wizard...', StringId.NewViaWizard),
            imageClassName: 'dxrd-image-new-via-wizard',
            imageTemplateName: 'dxrd-svg-menu-new_via_wizard',
            disabled: ko.observable(false),
            selected: ko.observable(false),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 'W'.charCodeAt(0) },
            clickAction: () => designerModel._wizardRunner.run('NewViaReportWizard')
        };
        designerModel._wizardRunner.registerCommand('NewViaReportWizard', () => {
            if (reportWizard instanceof FullscreenReportWizard) {
                menuAction.selected(true);
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                reportWizard['_onClose'] && reportWizard['_onClose'](() => {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            reportWizard.itemsProvider(this._createEmptyReportItemsProvider());
            reportWizard.initialize();
            reportWizard.start((reportWizardState) => {
                designerModel.isLoading(true);
                const deferred = $.Deferred();
                if (reportWizardState.jsonDataSourceWizard.jsonSource && reportWizardState.newDataSource) {
                    ReportWizardService.createNewJsonDataSource(reportWizardState.jsonDataSourceWizard, JsonDataSourceEditor.createJsonDataSourceInfo)
                        .done((dataSource) => {
                        reportWizardState.dataSource = dataSource;
                        delete reportWizardState.newDataSource;
                        if (designerModel.connections.json().every(x => x.name !== reportWizardState.jsonDataSourceWizard.newConnectionName)) {
                            designerModel.connections.json.push({
                                description: reportWizardState.jsonDataSourceWizard.newConnectionName,
                                name: reportWizardState.jsonDataSourceWizard.newConnectionName
                            });
                        }
                        this._createNewReportFromWizardState(reportWizard, designerModel, reportWizardState, state, deferred);
                    }).fail(() => deferred.reject());
                }
                else {
                    this._createNewReportFromWizardState(reportWizard, designerModel, reportWizardState, state, deferred);
                }
                return deferred.promise();
            });
        }, () => {
            designerModel.appMenuVisible(false);
            reportWizard.isVisible(false);
        });
        return menuAction;
    }
    _createLocalizationModeAction(localizationEditor, report, designerModel) {
        const menuAction = {
            id: ActionId.Localization,
            container: 'menu',
            text: 'Localization...',
            displayText: () => getLocalization('Localization...', 'ASPxReportsStringId.ReportDesigner_MenuItem_Localization'),
            imageClassName: 'dxrd-image-menu-localization',
            imageTemplateName: 'dxrd-svg-menu-localization',
            disabled: ko.pureComputed(() => { return !report(); }),
            visible: true,
            selected: ko.observable(false),
            clickAction: () => {
                designerModel._wizardRunner.run('LocalizationCommand');
            }
        };
        const start = () => {
            designerModel.appMenuVisible(true);
            designerModel.isMenuCollapsed(true);
            menuAction.selected(true);
            designerModel.localizationMode(true);
            localizationEditor.start();
            $.fn.constructor('.dx-designer .dxrd-surface-wrapper').addClass('dxrd-surface-localization-mode');
            localizationEditor.translateHelper.move('dxrd-toolbar-wrapper');
            localizationEditor.translateHelper.move('dxrd-tab-panel-wrapper', '+', 'translateX');
            localizationEditor.translateHelper.move('dxrd-navigation-panel-wrapper', '+');
            localizationEditor.translateHelper.move('dxrd-error-panel', '+');
        };
        const end = () => {
            menuAction.selected(false);
            designerModel.isMenuCollapsed(false);
            designerModel.appMenuVisible(false);
            designerModel.localizationMode(false);
            localizationEditor.finish();
            $.fn.constructor('.dx-designer .dxrd-surface-wrapper').removeClass('dxrd-surface-localization-mode');
            localizationEditor.translateHelper.reset('dxrd-toolbar-wrapper');
            localizationEditor.translateHelper.reset('dxrd-tab-panel-wrapper');
            localizationEditor.translateHelper.reset('dxrd-navigation-panel-wrapper');
            localizationEditor.translateHelper.reset('dxrd-error-panel');
        };
        designerModel._wizardRunner.registerCommand('LocalizationCommand', start, end);
        return menuAction;
    }
    _createDesignInReportWizardAction(reportWizard, designerModel, state) {
        const menuAction = {
            id: ActionId.ReportWizard,
            container: 'menu',
            text: 'Design in Report Wizard...',
            displayText: () => getLocalization('Design in Report Wizard...', 'ReportStringId.Verb_ReportWizard'),
            imageClassName: 'dxrd-image-run-wizard',
            imageTemplateName: 'dxrd-svg-menu-run_wizard',
            disabled: ko.pureComputed(() => { return !designerModel.model() || designerModel.model().language() !== defaultCulture; }),
            visible: true,
            selected: ko.observable(false),
            clickAction: () => {
                designerModel._wizardRunner.run('DesignInReportWizard');
            }
        };
        const start = () => {
            if (reportWizard instanceof FullscreenReportWizard) {
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                menuAction.selected(true);
                reportWizard['_onClose'] && reportWizard['_onClose'](() => {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            reportWizard.itemsProvider(designerModel.dataBindingsProvider());
            reportWizard.initialize(createReportWizardState(designerModel.model()));
            reportWizard.start((reportWizardState) => {
                const deferred = $.Deferred();
                if (reportWizardState.newDataSource) {
                    const ds = _restoreDataSourceFromState(reportWizardState.newDataSource);
                    ds.name = designerModel.model().dataSourceHelper().getUniqueDataSourceName(ds.name);
                    reportWizardState.newDataSource = _convertToStateDataSource(ds);
                }
                const createReport = (wizardState) => {
                    designerModel.isLoading(true);
                    designerModel.navigateByReports.currentTab().undoEngine.start();
                    designerModel.isDirty(true);
                    const _patchedInfo = this._patchReportBeforeRedesign(designerModel.model(), wizardState);
                    ReportWizardService.generateReportFromWizardState(wizardState, reportWizard._requestModelType, state(), (wizardModel) => {
                        reportWizard.events.call('beforeFinish', { state: wizardState, wizardModel: wizardModel });
                    }, _patchedInfo)
                        .done((result) => {
                        const newReport = createReportViewModel(result, designerModel.model());
                        designerModel.model(newReport);
                        deferred.resolve(newReport);
                    })
                        .fail(() => {
                        deferred.reject();
                    }).always(() => {
                        designerModel.navigateByReports.currentTab().undoEngine.end();
                        designerModel.isLoading(false);
                    });
                };
                if (reportWizardState.jsonDataSourceWizard.jsonSource && reportWizardState.newDataSource) {
                    ReportWizardService.createNewJsonDataSource(reportWizardState.jsonDataSourceWizard, JsonDataSourceEditor.createJsonDataSourceInfo)
                        .done((dataSource) => {
                        reportWizardState.dataSource = dataSource;
                        delete reportWizardState.newDataSource;
                        createReport(reportWizardState);
                    }).fail(() => deferred.reject());
                }
                else {
                    createReport(reportWizardState);
                }
                return deferred.promise();
            });
        };
        const end = () => {
            designerModel.appMenuVisible(false);
            reportWizard.isVisible(false);
        };
        designerModel._wizardRunner.registerCommand('DesignInReportWizard', start, end);
        designerModel._wizardRunner.registerCommand('ReportWizard', start, end);
        return menuAction;
    }
    _createMultiQueryDataSourceWizardAction(multiQueryDataSourceWizard, designerModel) {
        const isDisabled = ko.pureComputed(() => { return !designerModel.model(); });
        const isVisible = ko.pureComputed(() => multiQueryDataSourceWizard.canRunWizard());
        const menuAction = {
            id: ActionId.AddMultiQuerySqlDataSource,
            container: 'menu',
            text: 'Add Data Source...',
            displayText: () => getLocalization('Add Data Source...', 'ASPxReportsStringId.ReportDesigner_Wizard_AddDataSource'),
            imageClassName: 'dxrd-image-add-datasource',
            imageTemplateName: 'dxrd-svg-menu-add_datasource',
            disabled: isDisabled,
            visible: isVisible,
            selected: ko.observable(false),
            clickAction: () => designerModel._wizardRunner.run('DataSourceWizard')
        };
        this._disposables.push(isDisabled, isVisible);
        const startWizard = () => {
            if (multiQueryDataSourceWizard instanceof FullscreenDataSourceWizard) {
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                menuAction.selected(true);
                multiQueryDataSourceWizard._onClose && multiQueryDataSourceWizard._onClose(() => {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            multiQueryDataSourceWizard.initialize(_createDefaultDataSourceWizardState());
            multiQueryDataSourceWizard.start();
        };
        const closeWizard = () => {
            designerModel.appMenuVisible(false);
            multiQueryDataSourceWizard.isVisible(false);
        };
        designerModel._wizardRunner.registerCommand('DataSourceWizard', () => {
            startWizard();
        }, closeWizard);
        return menuAction;
    }
    _customizeDesignerActions(designerModel, nextCustomizer, exitDesigner, state, callbacks) {
        const report = designerModel.model, reportPreview = designerModel.reportPreviewModel.reportPreview, reportWizard = designerModel.wizard, dataSourceWizard = designerModel.dataSourceWizard, localizationEditor = designerModel.localizationEditor, multiQueryDataSourceWizard = designerModel.multiQueryDataSourceWizard, scriptsEditor = designerModel.scriptsEditor;
        return ((actions) => {
            var _a, _b, _c, _d, _e, _f;
            $.extend(findFirstItemMatchesCondition(actions, item => item.id === AnalyticActionId.Copy), { textId: StringId.Copy });
            if (reportStorageWebIsRegister()) {
                actions.push({
                    id: ActionId.NewReport,
                    container: 'menu',
                    text: 'New',
                    displayText: () => getLocalization('New', 'ReportStringId.UD_Capt_NewReport'),
                    imageClassName: 'dxrd-image-newreport',
                    imageTemplateName: 'dxrd-svg-menu-newreport',
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 'N'.charCodeAt(0) },
                    clickAction: () => {
                        designerModel.isLoading(true);
                        const wizardState = createReportWizardState();
                        wizardState.reportType = ReportType.Empty;
                        wizardState.reportTemplateID = ReportType[ReportType.Empty];
                        const deferred = $.Deferred();
                        this._createNewReportFromWizardState(reportWizard, designerModel, wizardState, state, deferred);
                        deferred.done(reportModel => {
                            reportWizard.events.call('afterFinish', { state: wizardState, wizardResult: reportModel });
                        }).fail(error => {
                            designerModel.isLoading(false);
                        });
                    }
                });
                actions.push(this._createNewViaWizardAction(reportWizard, designerModel, state));
                actions.push({
                    id: ActionId.OpenReport,
                    container: 'menu',
                    text: 'Open',
                    displayText: () => getLocalization('Open', StringId.Open),
                    imageClassName: 'dxrd-image-open',
                    imageTemplateName: 'dxrd-svg-menu-open',
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 'O'.charCodeAt(0) },
                    clickAction: () => {
                        designerModel.openReportDialog.show(designerModel.navigateByReports.currentTab());
                    }
                });
            }
            if (reportWizard) {
                actions.push(this._createDesignInReportWizardAction(reportWizard, designerModel, state));
            }
            actions.push({
                id: ActionId.ValidateBindings,
                text: 'Validate Bindings',
                displayText: () => getLocalization('Validate Bindings', 'ASPxReportsStringId.ReportDesigner_ToolBarItemText_ValidateBindings'),
                imageClassName: 'dxrd-image-validateBindingMode',
                imageTemplateName: 'dxrd-svg-toolbar-validateBindingMode',
                disabled: ko.pureComputed(() => { return !report(); }),
                selected: designerModel.validationMode,
                visible: true,
                hasSeparator: true,
                isContextMenuAction: false,
                clickAction: () => {
                    designerModel.validationMode(!designerModel.validationMode());
                },
            });
            const fullScreenAction = new FullScreenActionBase(designerModel.fullScreen, {
                id: ActionId.FullScreen,
                isContextMenuAction: false,
            });
            actions.push(fullScreenAction);
            this._addDisposable(fullScreenAction);
            if (scriptsEditor) {
                actions.push({
                    id: ActionId.Scripts,
                    text: 'Scripts',
                    displayText: () => getLocalization('Scripts', 'ReportStringId.RepTabCtl_Scripts'),
                    imageClassName: 'dxrd-image-scripts',
                    imageTemplateName: 'dxrd-svg-toolbar-scripts',
                    disabled: ko.pureComputed(() => { return !report(); }),
                    visible: ko.pureComputed(() => { return !scriptsEditor.editorVisible(); }),
                    hotKey: { ctrlKey: true, keyCode: 'R'.charCodeAt(0) },
                    clickAction: () => {
                        scriptsEditor.initialize();
                        scriptsEditor.editorVisible(true);
                    },
                    hasSeparator: true,
                    isContextMenuAction: false,
                });
            }
            if (reportPreview) {
                class PreviewAction extends BaseAction {
                    constructor(reportPreview, model) {
                        super(model);
                        this.visible = !reportPreview.previewVisible;
                        this.addDisposable(reportPreview.events.on('previewVisibleChanged', () => this.visible = !reportPreview.previewVisible));
                    }
                }
                const previewAction = new PreviewAction(reportPreview, {
                    id: ActionId.Preview,
                    text: 'Preview',
                    displayText: () => getLocalization('Preview', 'ASPxReportsStringId.ToolBarItemText_Preview'),
                    imageClassName: 'dxrd-image-preview',
                    imageTemplateName: 'dxrd-svg-preview-print_preview',
                    templateName: reportPreview.canSwitchToDesigner ? 'dxrd-toolbar-two-way-switch' : undefined,
                    disabled: ko.pureComputed(() => { return !report(); }),
                    hotKey: { ctrlKey: true, keyCode: 'P'.charCodeAt(0) },
                    isContextMenuAction: false,
                    clickAction: () => {
                        reportPreview.previewVisible = true;
                        reportPreview._breadcrumb.reset();
                        reportPreview.initialize(ReportPreviewService.initializePreview(report()));
                    },
                    hasSeparator: true
                });
                previewAction.contentData = {
                    items: [
                        { getDisplayText: () => getLocalization('Design', 'ASPxReportsStringId.ToolBarItemText_Design'), active: true },
                        { itemData: previewAction, active: false }
                    ]
                };
                actions.push(previewAction);
                this._addDisposable(previewAction);
            }
            if (dataSourceWizard && ((_c = (_b = (_a = this.options.data) === null || _a === void 0 ? void 0 : _a.dataSourceSettings) === null || _b === void 0 ? void 0 : _b.allowAddDataSource) !== null && _c !== void 0 ? _c : true)) {
                actions.push({
                    id: ActionId.AddSqlDataSource,
                    container: 'menu',
                    text: 'Add Data Source...',
                    displayText: () => getLocalization('Add Data Source...', 'ASPxReportsStringId.ReportDesigner_Wizard_AddDataSource'),
                    imageClassName: 'dxrd-image-add-datasource',
                    imageTemplateName: 'dxrd-svg-menu-add_datasource',
                    disabled: ko.pureComputed(() => { return !report(); }),
                    visible: false,
                    isContextMenuAction: false,
                    clickAction: () => {
                        dataSourceWizard.initialize(_createDefaultDataSourceWizardState());
                        dataSourceWizard.start();
                        dataSourceWizard.isVisible(true);
                    }
                });
            }
            if (multiQueryDataSourceWizard && ((_f = (_e = (_d = this.options.data) === null || _d === void 0 ? void 0 : _d.dataSourceSettings) === null || _e === void 0 ? void 0 : _e.allowAddDataSource) !== null && _f !== void 0 ? _f : true)) {
                actions.push(this._createMultiQueryDataSourceWizardAction(multiQueryDataSourceWizard, designerModel));
            }
            if (localizationEditor)
                actions.push(this._createLocalizationModeAction(localizationEditor, report, designerModel));
            const tab = designerModel.navigateByReports.currentTab;
            actions.push({
                id: ActionId.Save,
                container: 'menu',
                text: 'Save',
                displayText: () => getLocalization('Save', StringId.Save),
                imageClassName: 'dxrd-image-save',
                imageTemplateName: 'dxrd-svg-menu-save',
                disabled: ko.pureComputed(() => { return !report() || (tab() && !tab().isDirty()); }),
                visible: true,
                hotKey: { ctrlKey: true, keyCode: 'S'.charCodeAt(0) },
                clickAction: () => {
                    if (reportStorageWebIsRegister()) {
                        const currentTab = designerModel.navigateByReports.currentTab();
                        if (!currentTab.isDirty()) {
                            return;
                        }
                        if (!currentTab.context().url()) {
                            designerModel.saveReportDialog.show(currentTab);
                        }
                        else {
                            const args = { report: currentTab.context().report, url: currentTab.context().url(), cancel: false };
                            callbacks.reportSaving && callbacks.reportSaving(args);
                            if (args.cancel)
                                return;
                            ReportStorageWeb.setData(currentTab.context().report.serialize(), currentTab.context().url())
                                .done((result) => {
                                currentTab.isDirty(false);
                                callbacks.reportSaved && callbacks.reportSaved({ report: currentTab.context().report, url: currentTab.context().url() });
                                ShowMessage(getLocalization('The report has been successfully saved.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Message_OK'), NotifyType.success);
                            }).fail(() => {
                                callbacks.onServerError && callbacks.onServerError({ state: 'save', model: { report: currentTab.context().report, url: currentTab.context().url() } });
                            });
                        }
                    }
                    else {
                        report().save();
                    }
                }
            });
            if (reportStorageWebIsRegister()) {
                actions.push({
                    id: ActionId.SaveAs,
                    container: 'menu',
                    text: 'Save As',
                    displayText: () => getLocalization('Save As', StringId.SaveAs),
                    imageClassName: 'dxrd-image-saveas',
                    imageTemplateName: 'dxrd-svg-menu-saveas',
                    disabled: ko.pureComputed(() => { return !report(); }),
                    visible: true,
                    clickAction: () => {
                        designerModel.saveReportDialog.show(designerModel.navigateByReports.currentTab());
                    }
                });
            }
            actions.push({
                id: ActionId.Exit,
                container: 'menu',
                text: 'Exit',
                displayText: () => getLocalization('Exit', 'ReportStringId.UD_Capt_Exit'),
                imageClassName: 'dxrd-image-exit',
                imageTemplateName: 'dxrd-svg-menu-exit',
                disabled: ko.observable(false),
                visible: true,
                clickAction: () => {
                    designerModel.navigateByReports.closeAll().done(() => {
                        exitDesigner && exitDesigner();
                    });
                }
            });
            nextCustomizer && nextCustomizer(actions);
        });
    }
    _patchReportBeforeRedesign(reportViewModel, state) {
        var _a;
        let useInitialDataSource = false;
        if (!state.newDataSource && state.dataSource) {
            const stateDsInfo = _restoreDataSourceFromState(state.dataSource);
            const dataSourceInfo = reportViewModel.dataSourceHelper().findDataSourceInfoByName(stateDsInfo.name);
            if (dataSourceInfo) {
                useInitialDataSource = true;
                if (((_a = reportViewModel.dataSource()) === null || _a === void 0 ? void 0 : _a.name()) !== stateDsInfo.name) {
                    reportViewModel.dataSource(dataSourceInfo.data);
                }
            }
        }
        const reportJson = reportViewModel.serialize();
        delete reportJson.LocalizationItems;
        return {
            json: JSON.stringify({ 'XtraReportsLayoutSerializer': reportJson }),
            useInitialDataSource: useInitialDataSource
        };
    }
    addContextActions(func = (settings) => {
        const isDisabled = () => this.buildingModel.model() && this.buildingModel.model().language() !== defaultCulture;
        const disposableProviders = [
            new ReportElementActions(this.buildingModel.surface, this.buildingModel.selection),
            new ElementsGroupActions(this.buildingModel.surface, this.buildingModel.selection),
            new ReportActions(this._designerCallbacks.componentAdded, this.buildingModel),
            new TableRowActions(this.buildingModel.selection, this._designerCallbacks.componentAdded, isDisabled),
            new TableCellActions(this.buildingModel.selection, this._designerCallbacks.componentAdded, isDisabled),
            new TextElementAction(this.buildingModel.selection),
            new TableCellGroupActions(this.buildingModel.selection),
            new PdfContentActions(this.buildingModel.selection, isDisabled),
            new CrossTabActions(this._converters, isDisabled),
            new PivotGridActions(this._converters, isDisabled),
            new ChartActions(this.buildingModel),
        ];
        this._disposables.push(...disposableProviders);
        settings.actionProviders = disposableProviders;
        settings.createDefaultGroupAction(this.buildingModel.editableObject, this.buildingModel.undoEngine);
        settings.createDefaultContextMenuActions(this.buildingModel.editableObject, this.buildingModel.undoEngine);
    }) {
        super.addContextActions(func);
        return this;
    }
    addActionList(actionListFunc = () => {
        const designerShortcutsEnabled = ko.computed(() => {
            const isDesignMode = this.buildingModel.designMode();
            const isWizardVisible = this.buildingModel.wizard && this.buildingModel.wizard.isVisible();
            const isDataSourceWizardVisible = this.buildingModel.dataSourceWizard && this.buildingModel.dataSourceWizard.isVisible();
            const isMultiQueryDataSourceWizardVisible = this.buildingModel.multiQueryDataSourceWizard && this.buildingModel.multiQueryDataSourceWizard.isVisible();
            const isLocalizationModeVisible = this.buildingModel.localizationMode && this.buildingModel.localizationMode();
            return isDesignMode && !isWizardVisible && !isDataSourceWizardVisible && !isMultiQueryDataSourceWizardVisible && !isLocalizationModeVisible;
        });
        this._addDisposable(designerShortcutsEnabled);
        const actions = new ActionLists(this.buildingModel.surface, this.buildingModel.selection, this.buildingModel.undoEngine, this._customizeDesignerActions(this.buildingModel, this._designerCallbacks.customizeActions, this._designerCallbacks.exitDesigner, () => this._reportcontext() && this._reportcontext().state() || this.buildingModel.state, this._designerCallbacks), designerShortcutsEnabled, reportCopyPasteStrategy(this._designerCallbacks.componentAdded), this.buildingModel.zoomStep, _ => !this.buildingModel.canAddItems());
        this.addElement('actionStorage', () => $.extend({}, this._createActionsStorage(actions.menuItems), this._createActionsStorage(actions.toolbarItems)));
        return actions;
    }) {
        super.addActionList(actionListFunc);
        return this;
    }
    _createChartDesignerPart(context) {
        const chartValueBindingProvider = ko.computed(() => context() && context().chartValueBindingProvider);
        this._addDisposable(chartValueBindingProvider);
        const chartDesignerOptions = createChartDesignerOptions(this.buildingModel, this.buildingModel.dataSourceHelper, this.buildingModel.model, this.buildingModel.parameters, chartValueBindingProvider, this._accessibilityProvider);
        this.addElement('runChartDesigner', () => (chart) => {
            chartDesignerOptions.run(chart);
        });
        this.addElement('chartDataSources', () => ko.computed(() => {
            const pivotGrids = this.buildingModel.controlsHelper.allControls().filter(item => { return item instanceof XRPivotGridViewModel; }).map(item => { return { displayName: item.name, value: item }; });
            const usedDataSources = this.buildingModel.dataSourceHelper() && this.buildingModel.dataSourceHelper().usedDataSources() && this.buildingModel.dataSourceHelper().usedDataSources().map(item => { return { displayName: item.name, value: item.data }; }), result = [].concat(pivotGrids, usedDataSources);
            return result;
        }));
        this._addDisposable(this.buildingModel.controlsHelper.allControls.subscribe((newArr) => {
            newArr.filter(item => { return item instanceof XRChartViewModel; }).forEach((chart) => {
                if (chart.isPivotGridDataSource() && newArr.indexOf(chart.dataSource()) === -1)
                    chart.dataSource(null);
            });
        }));
        this._addDisposable(chartDesignerOptions);
        return { id: null, templateName: ReportDesignerElements.ChartDialog, model: chartDesignerOptions };
    }
    _createWizardPart(wizardName, model) {
        if (model instanceof FullscreenWizard) {
            return { id: ReportDesignerAddOns[wizardName + 'Fullscreen'], templateName: ReportDesignerAddOns[wizardName + 'Fullscreen'].split('#')[0], model: model };
        }
        return { id: ReportDesignerAddOns[wizardName], templateName: ReportDesignerAddOns[wizardName].split('#')[0], model: model };
    }
    addActivatedExpressionEditor() {
        const editor = ko.observable(null);
        this.addElement('activatedExpressionEditor', () => editor);
        this.addElement('activateExpressionEditor', () => (action) => {
            action.action('');
            editor(action.innerTemplate.data);
        });
        this._addDisposable({ dispose: () => editor(null) });
        return this;
    }
    addParts(func = (parts) => {
        const reportConverter = new ReportConverter(this.buildingModel.controlsHelper, this.buildingModel.undoEngine, this._dataBiningMode);
        if (this._defaultCrossTabControl === 'XRCrossTab') {
            this._converters.push(new CrossTabConverter(this.buildingModel.selection, this._reportcontext), new PivotGridConverter(this.buildingModel.selection));
        }
        this._converters.push(reportConverter);
        this._addDisposable(this._reportcontext.subscribe((newVal) => {
            if (newVal)
                reportConverter.convert(newVal.report, this._convertBindingsToExpressions);
        }));
        [DesignerBaseElements.MenuButton, DesignerBaseElements.Toolbox].forEach((item) => {
            const oldItem = parts.filter(part => part.id === item)[0];
            const index = parts.indexOf(oldItem);
            parts.splice(index, 1);
        });
        parts.push({ id: DesignerBaseElements.GroupedToolbox, templateName: DesignerBaseElements.GroupedToolbox, model: this.buildingModel }, { id: ReportDesignerElements.NavigationPanel, templateName: ReportDesignerElements.NavigationPanel, model: this.buildingModel.navigateByReports }, { id: null, templateName: ReportDesignerElements.ReportDialog, model: this.buildingModel.saveReportDialog }, { id: null, templateName: ReportDesignerElements.ReportDialog, model: this.buildingModel.saveReportDialogLight }, { id: null, templateName: ReportDesignerElements.ReportDialog, model: this.buildingModel.openReportDialog }, { id: ReportDesignerElements.MenuButton, templateName: ReportDesignerElements.MenuButton, model: this.buildingModel }, this._createChartDesignerPart(this._reportcontext), { id: null, templateName: ReportDesignerElements.Parameters, model: this.buildingModel.parameters }, ...this._converters.map(model => { return { id: null, templateName: ReportDesignerElements.ReportConverterDialog, model: model }; }));
        parts.push({ id: ReportDesignerElements.ContextMenu, templateName: ReportDesignerElements.ContextMenu, model: this.buildingModel });
        ContextMenusEnabled.subscribe(newValue => {
            this.getModel().ContextMenusEnabled(newValue);
        });
        return parts;
    }) {
        if (!this.getModel().ContextMenusEnabled)
            this.getModel().ContextMenusEnabled = ko.observable(ContextMenusEnabled());
        else
            this.getModel().ContextMenusEnabled(ContextMenusEnabled());
        super.addParts(func);
        this._designerCallbacks.customizeParts && this._designerCallbacks.customizeParts(this.buildingModel.parts);
        return this;
    }
    addDefaultAddons(addons = [
        { id: ReportDesignerAddOns.Preview, templateName: ReportDesignerAddOns.Preview, model: this.buildingModel.reportPreviewModel.getViewModel() },
        this._createWizardPart('ReportWizard', this.buildingModel.wizard),
        { id: ReportDesignerAddOns.DataSourceWizard, templateName: ReportDesignerAddOns.DataSourceWizard.split('#')[0], model: this.buildingModel.dataSourceWizard },
        this._createWizardPart('MultiQueryDataSourceWizard', this.buildingModel.multiQueryDataSourceWizard),
        { id: ReportDesignerAddOns.LocalizationEditor, templateName: ReportDesignerAddOns.LocalizationEditor.split('#')[0], model: this.buildingModel.localizationEditor },
        { id: ReportDesignerAddOns.ErrorPanel, templateName: ReportDesignerAddOns.ErrorPanel, model: this.buildingModel.errorPanelViewModel },
        { id: ReportDesignerAddOns.ExpressionEditor, templateName: ReportDesignerAddOns.ExpressionEditor, model: this.buildingModel.activatedExpressionEditor }
    ]) {
        this.addElement('addOns', () => ko.observableArray(addons));
        return this;
    }
    tryAddSqlDataSourceEditorAddon(relationsEditor = this._sqlDataSourceEditor.relationsEditor) {
        if (relationsEditor)
            this.buildingModel.addOns.push({ id: ReportDesignerAddOns.MasterDetailEditor, templateName: ReportDesignerAddOns.MasterDetailEditor, model: relationsEditor });
        return this;
    }
    tryAddFederationDataSourceEditorAddon(relationsEditor = this._federationDataSourceEditor.relationsEditor, manageQueriesEditor = this._federationDataSourceEditor.manageQueriesEditor, queriesPopupHelper = this._federationDataSourceEditor.queriesPopupHelper) {
        if (relationsEditor)
            this.buildingModel.addOns.push({ id: ReportDesignerAddOns.MasterDetailEditor, templateName: ReportDesignerAddOns.MasterDetailEditor, model: relationsEditor });
        if (manageQueriesEditor)
            this.buildingModel.addOns.push({ id: ReportDesignerAddOns.FederatedManageQueriesEditor, templateName: ReportDesignerAddOns.FederatedManageQueriesEditor, model: manageQueriesEditor });
        if (queriesPopupHelper)
            this.buildingModel.addOns.push({ id: ReportDesignerAddOns.FederatedQueriesPopups, templateName: ReportDesignerAddOns.FederatedQueriesPopups, model: queriesPopupHelper });
        return this;
    }
    tryAddScriptEditorAddon(isScriptsDisabled) {
        if (this._tryAddScriptEditor(isScriptsDisabled))
            this.buildingModel.addOns.push({ id: ReportDesignerAddOns.ScriptEditor, templateName: ReportDesignerAddOns.ScriptEditor, model: this.buildingModel.scriptsEditor });
        return this;
    }
    tryAddInlineRichTextEdit() {
        const inlineRichEdit = registerRichEditInline()(this._selection);
        if (inlineRichEdit) {
            this.addElement('richInlineControl', () => inlineRichEdit);
        }
        return this;
    }
    onContextChanged(subreports, func = (context) => {
        if (context) {
            this.buildingModel.selectedPath(null);
            if (this.buildingModel.toolboxItems) {
                this.buildingModel.toolboxItems.forEach((item) => { item.disabled(!this.buildingModel.canAddItems()); });
            }
        }
        else {
            if (this.buildingModel.selection) {
                this.buildingModel.selection.clear();
                this.buildingModel.selection.focused(this.buildingModel.surface());
            }
            this.buildingModel.editableObject && this.buildingModel.editableObject(null);
            this.buildingModel.toolboxItems && this.buildingModel.toolboxItems.forEach((item) => { item.disabled(true); });
            this.buildingModel.popularProperties && this.buildingModel.popularProperties.cleanEditors();
        }
    }) {
        func(this._reportcontext());
        this._addDisposable(this._reportcontext.subscribe((newVal) => func(newVal)));
        return this;
    }
    configurateRtl(rtl) {
        this.rtl = !!rtl;
        config({ rtlEnabled: !!this.rtl });
        return this;
    }
    configureReportStorageRegistration(reportStorageIsRegister, allowMDI) {
        reportStorageWebIsRegister(reportStorageIsRegister === undefined ? reportStorageWebIsRegister() : reportStorageIsRegister);
        this._allowMDI = reportStorageWebIsRegister() ? allowMDI : false;
        return this;
    }
    applyUri(uriSettings) {
        UtilsHandlerUri(uriSettings.reportDesignerUri || UtilsHandlerUri());
        ChartInternalHandlerUri(uriSettings.reportDesignerUri);
        this._previewUri = uriSettings.previewUri;
        return this;
    }
    initBindingMode(dataBiningMode, convertBindingsToExpressions) {
        this._dataBiningMode = dataBiningMode;
        this._convertBindingsToExpressions = convertBindingsToExpressions;
        return this;
    }
    initDefaultCrossTabControl(defaultCrossTabControl) {
        this._defaultCrossTabControl = defaultCrossTabControl;
        DefaultCrossTabControl(defaultCrossTabControl || 'XRCrossTab');
        return this;
    }
    registerControls(dataBindingMode, reportItemsProvider) {
        UtilsDataBindingMode(dataBindingMode || 'Expressions');
        registerControls(reportItemsProvider);
        return this;
    }
    registerCustomControls(controls) {
        registerCustomControls(controls);
        return this;
    }
    registerCustomExpressions(globalExpressions, reportExpressions) {
        registerCustomGlobalExpressions(globalExpressions);
        registerCustomReportExpressions(reportExpressions);
        return this;
    }
    addCallbacks(callbacks) {
        this._callbacks = callbacks;
        if (!this._callbacks.designer)
            this._callbacks.designer = {};
        if (!this._callbacks.preview)
            this._callbacks.preview = {};
        this._callbacks.designer.fieldLists = this._callbacks.designer.fieldLists || ReportDataSourceService.fieldListCallback;
        return this;
    }
    addProcessErrorCallback(processError = this._designerCallbacks && this._designerCallbacks.onServerError) {
        this._disposables.push(processErrorEvent(processError));
        return this;
    }
    runCustomizeToolboxEvent(customizeToolbox = this._designerCallbacks && this._designerCallbacks.customizeToolbox) {
        customizeToolbox && customizeToolbox(controlsFactory());
        return this;
    }
    initCultureInfo(cultureInfoList) {
        $.extend(true, cultureInfo, cultureInfoList);
        return this;
    }
    updateFont(fontSet) {
        if (fontSet) {
            let fonts = {};
            if (fontSet instanceof Array)
                fontSet.forEach(fontName => fonts[fontName] = fontName);
            else
                fonts = fontSet;
            this.buildingModel.updateFont(fonts);
            this.buildingModel.sortFont();
        }
        return this;
    }
    initFormatStringPatterns(formatStringData) {
        if (formatStringData) {
            formatStringData.standardPatterns && Object.keys(formatStringData.standardPatterns).forEach((propName) => {
                if (!formatStringStandardPatterns[propName])
                    formatStringStandardPatterns[propName] = formatStringData.standardPatterns[propName];
                else
                    formatStringStandardPatterns[propName].patterns = formatStringData.standardPatterns[propName].patterns;
            });
            formatStringData.customPatterns && Object.keys(formatStringData.customPatterns).forEach((propName) => {
                formatStringEditorCustomSet()[propName] = formatStringData.customPatterns[propName];
            });
        }
        return this;
    }
    addPopularProperties(controlsFactory, accessibilityProvider) {
        super.addPopularProperties(controlsFactory, this._accessibilityProvider);
        this.addElement('popularVisible', () => ko.pureComputed(() => {
            if (!PropertyGrid.TaskGroupVisible())
                return false;
            return this.buildingModel.popularProperties._get('_editors').some((editor) => editor._get('visible')) ||
                this.buildingModel.contextActions && this.buildingModel.contextActions().length > 0
                    && this.buildingModel.contextActions().some(action => !action.isContextMenuAction);
        }));
        const groupActionsVisible = ko.observable(PropertyGrid.QuickActionsVisible());
        PropertyGrid.QuickActionsVisible.subscribe((newValue) => groupActionsVisible(newValue !== null && newValue !== void 0 ? newValue : false));
        this.addElement('groupActionsVisible', () => groupActionsVisible);
        return this;
    }
    addInlineTextEdit(func) {
        this.addElement('inlineTextEdit', func ? func : () => new InlineTextEdit(this._selection));
        return this;
    }
    addStylesProjection(styles = ko.pureComputed(() => { return this.buildingModel.model() && this.buildingModel.model().styles; })) {
        this.addElement('styles', () => styles);
        return this;
    }
    addFormattingRulesProjection(rules = ko.pureComputed(() => { return this.buildingModel.model() && this.buildingModel.model().formattingRuleSheet; })) {
        this.addElement('formattingRuleSheet', () => rules);
        return this;
    }
    addReportExplorerProvider(reportExplorerProvider = new ObjectExplorerProvider([{ model: this.buildingModel.model, name: 'Report', className: 'master_report' }], ['bands', 'controls', 'rows', 'cells'], ko.observable(null))) {
        this.addElement('reportExplorerProvider', () => reportExplorerProvider);
        return this;
    }
    addControlsProjection(controlsHelper = this.buildingModel.controlsHelper) {
        this.addElement('getControls', () => (target) => {
            return ko.pureComputed(() => {
                return this._getControls(controlsHelper.getControls(ko.unwrap(target)), (item) => {
                    return !(item instanceof BandViewModel || item instanceof ReportViewModel);
                });
            });
        });
        this.addElement('controls', () => this._getControls(controlsHelper.allControls, (item) => { return !(item instanceof BandViewModel || item instanceof ReportViewModel); }));
        return this;
    }
    addBandsProjection(controlsHelper = this.buildingModel.controlsHelper) {
        this.addElement('bands', () => (filter, IsNoneNeaded) => {
            return this._getControls(controlsHelper.allControls, (item) => {
                return item instanceof BandViewModel && (filter ? filter(item) : true);
            }, IsNoneNeaded);
        });
        return this;
    }
    addWizardRunner() {
        this.addElement('_wizardRunner', () => new WizardRunner({
            visible: this.getModel().appMenuVisible,
            collapsed: this.getModel().isMenuCollapsed
        }));
        return this;
    }
    addWizards(connectionStrings, wizardSettings, cusomizeSettingsFunc) {
        const usedDataSources = ko.pureComputed(() => {
            const dataSources = this.buildingModel.dataSourceHelper() && this.buildingModel.dataSourceHelper().usedDataSources();
            return dataSources && dataSources.filter(x => !!x.data);
        });
        const predefinedDataSources = ko.pureComputed(() => { var _a; return ((_a = this.buildingModel.dataSourceHelper()) === null || _a === void 0 ? void 0 : _a.availableDataSources) || []; });
        this._disposables.push(usedDataSources, predefinedDataSources);
        const initializerSettings = new WizardsInitializerSettings(connectionStrings, wizardSettings, this._designerCallbacks, this.rtl, usedDataSources, predefinedDataSources);
        this.addElement('connections', () => connectionStrings);
        cusomizeSettingsFunc(initializerSettings);
        if (initializerSettings.reportWizard) {
            this.addElement('registerReportWizardPages', () => initializerSettings.registerReportWizardPages);
            this.addElement('wizard', () => initializerSettings.reportWizard);
        }
        if (initializerSettings.dataSourceWizard) {
            this.addElement('dataSourceWizard', () => initializerSettings.dataSourceWizard);
        }
        if (initializerSettings.multiQueryDataSourceWizard) {
            this.addElement('registerMultiQueryDataSourceWizardPages', () => initializerSettings.registerMultiQueryDataSourceWizardPages);
            this.addElement('multiQueryDataSourceWizard', () => initializerSettings.multiQueryDataSourceWizard);
        }
        this._federationDataSourceEditor = initializerSettings.federationDataSourceEditor;
        this._sqlDataSourceEditor = initializerSettings.sqlDataSourceEditor;
        this._jsonDataSourceEditor = initializerSettings.jsonDataSourceEditor;
        this._objectDataSourceEditor = initializerSettings.objectDataSourceEditor;
        this._dataSourceActionProvider = initializerSettings.dataSourceActionProvider;
        return this;
    }
    addLocalizationEditor() {
        this.addElement('localizationEditor', () => new LocalizationEditor({
            controlScrollingTool: this.buildingModel.controlScrollingTool,
            report: () => this.buildingModel.model(),
            selection: this.buildingModel.selection
        }));
        this.addElement('localizationMode', () => ko.observable(false));
        this.addElement('isLocalized', () => (item) => this.buildingModel.model() && this.buildingModel.model()._localization.hasCulture(item));
        return this;
    }
    addStaticContext() {
        appendStaticContextToRootViewModel(this.buildingModel, {
            config: config,
            _static: Object.assign(Object.assign({}, staticContext._static), { PivotGridFieldViewModel: PivotGridFieldViewModel, SortBySummaryInfoCondition: SortBySummaryInfoCondition, LookUpValue: LookUpValue, DragDropHandler: DragDropHandler, getControlFullName: getControlFullName, editorTemplates: editorTemplates, formattingRuleSerializationsInfo: formattingRuleSerializationsInfo, StylesEditorHeaderModel: StylesEditorHeaderModel, TreeListController: TreeListController, TableOfContentsLevel: TableOfContentsLevel, propertiesGridEditorsPaddingLeft: propertiesGridEditorsPaddingLeft, CustomizeLabelPage: CustomizeLabelPage, formatSearchResult: formatSearchResult })
        });
        return this;
    }
    tryApplyBindings(applyBindings, element) {
        if (applyBindings) {
            this._designerCallbacks.beforeRender && this._designerCallbacks.beforeRender(this);
            $.fn.constructor(element).children().remove();
            ko.applyBindings(this.buildingModel, element);
            this.buildingModel.afterRender();
            const dispose = () => {
                this.buildingModel.dispose();
            };
            addDisposeCallback(element, dispose);
        }
        return this;
    }
    dispose() {
        window.removeEventListener('resize', this._updateCallback);
        window.removeEventListener('resize', this.buildingModel.reportPreviewModel.resizeCallback);
        super.dispose();
        controlsFactory().dispose();
        this.removeProperties();
    }
}
