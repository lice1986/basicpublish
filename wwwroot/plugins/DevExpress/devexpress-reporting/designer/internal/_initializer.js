﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_initializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getToolboxItems, initGlobalize, resolveFromPromises, SurfaceSelection, troubleshootingPageWrapper } from '@devexpress/analytics-core/analytics-internal';
import { addCultureInfo } from '@devexpress/analytics-core/analytics-utils';
import { maxSearchLevel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { HandlerUri as QBHandlerUri } from '@devexpress/analytics-core/queryBuilder-utils';
import * as ko from 'knockout';
import { _setChartLimitation } from '../../chart/_initializer';
import { availableCultures } from '../../common/defaultCulture';
import { stylesObj } from '../controls/metadata/properties/style';
import { ComponentsModel } from '../controls/properties/components';
import { SubreportViewModel } from '../controls/subreportViewModel';
import { ReportDesignerInitializer } from '../tools/generator/_inititalizer';
import { ReportWizardSettings } from '../utils/inititalizer';
import { controlsFactory } from '../utils/settings';
import { groups } from '../widgets/groups';
import { maxNestingLevelUpdate } from './fieldlist/_fieldListDataSourcesHelper';
import { limitation } from './_settings';
import { isNotParameter, PromptBoolean } from './_utils';
function _createReportDesigner(element, data, callbacks, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings = true) {
    var _a, _b, _c;
    const selection = new SurfaceSelection();
    const initializer = new ReportDesignerInitializer({
        allowMDI: data.allowMDI,
        reportStorageWebIsRegister: data.reportStorageWebIsRegister,
        callbacks: callbacks,
        rtl: rtl,
        selection: selection,
        availableDataSources: data.availableDataSources,
        knownEnums: knownEnums,
        reportUrl: data.reportUrl,
        state: data.state,
        reportPreviewSettings: data.reportPreviewSettings,
        data: data
    });
    data.wizardSettings = ReportWizardSettings.prototype.createDefault(data.wizardSettings);
    return initializer
        .applyUri({ reportDesignerUri: designerHandlerUri, previewUri: previewHandlerUri })
        .initBindingMode(data.dataBindingMode, data.convertBindingsToExpressions)
        .initDefaultCrossTabControl(data.defaultCrossTabControl)
        .subscribeIncomeReport(data.report, data.reportUrl, data.dataSourceRefs, knownEnums)
        .addFlagsAndInitProperties(element)
        .addReportUrls(data.subreports)
        .addPreview({
        callbacks: callbacks.preview,
        element: element,
        handlerUri: previewHandlerUri,
        parametersInfo: { knownEnums },
        rtl: rtl,
        progressBarSettings: (_a = data.reportPreviewSettings) === null || _a === void 0 ? void 0 : _a.progressBarSettings,
        exportSettings: (_b = data.reportPreviewSettings) === null || _b === void 0 ? void 0 : _b.exportSettings,
        searchSettings: (_c = data.reportPreviewSettings) === null || _c === void 0 ? void 0 : _c.searchSettings
    })
        .initializeCalculatedFieldsSource()
        .initializeFieldListItemsExtenders()
        .initializeParameters()
        .initializeWatermarks()
        .initializeFieldListProvider()
        .initializeReportItemsProvider()
        .initializeDataBindingsProvider()
        .initializeDisplayNameProvider()
        .initializeExpressionDisplayNameProvider()
        .initializeDataSourceHelper()
        .registerCustomExpressions(data.customGlobalExpressions, data.customReportExpressions)
        .registerControls(data.dataBindingMode, initializer.buildingModel.reportItemsProvider)
        .registerCustomControls(data.customControls)
        .runCustomizeToolboxEvent()
        .addSelection()
        .addToolboxItems(() => getToolboxItems(controlsFactory().controlsMap, 'misc'))
        .addGroupedToolboxItems()
        .addControlProperties(Object.keys(groups).reduce((editors, groupName) => {
        if (groupName !== 'Styles')
            editors = editors.concat(groups[groupName].info);
        else
            editors.push(stylesObj);
        return editors;
    }, []), groups)
        .addStaticContext()
        .addContextActions()
        .addPopularProperties(controlsFactory())
        .addControlsHelper()
        .setControlsHelperFilter((control) => {
        var _a, _b;
        if (!isNotParameter(control))
            return false;
        if (!((_b = (_a = data === null || data === void 0 ? void 0 : data.dataSourceSettings) === null || _a === void 0 ? void 0 : _a.allowEditDataSource) !== null && _b !== void 0 ? _b : true)) {
            return !(control instanceof ComponentsModel);
        }
        return true;
    })
        .addProcessErrorCallback()
        .initCultureInfo(data.cultureInfoList)
        .updateFont(data.cultureInfoList && data.cultureInfoList.fontSet)
        .initFormatStringPatterns(data.formatStringData)
        .onContextChanged(data.subreports)
        .addMenu()
        .addInlineTextEdit()
        .addNavigateToControl(element)
        .addLocalizationEditor()
        .tryAddInlineRichTextEdit()
        .addReportDialogs((settings) => {
        const reportUrls = initializer.buildingModel.reportUrls;
        settings.createOpenReportDialog(reportUrls, initializer.buildingModel.navigateByReports);
        settings.createSaveReportDialog(reportUrls);
        settings.createSaveReportDialogLight();
    })
        .addWizardRunner()
        .addWizards({
        sql: ko.observableArray(data.wizardConnections && data.wizardConnections.sql),
        json: ko.observableArray(data.wizardConnections && data.wizardConnections.json)
    }, data.wizardSettings, (settings) => {
        var _a, _b, _c, _d;
        const model = initializer.buildingModel;
        const state = () => initializer.reportContext() && initializer.reportContext().state() || initializer.buildingModel.state;
        settings.createMultipleQueriesWizardCallbacks(initializer.buildingModel.dataBindingsProvider, model.model, state);
        settings.createSqlDataSourceWizard(data.disableCustomSql, initializer.buildingModel.dataBindingsProvider, model.model);
        settings.createMultiQueryDataSourceWizard(data.disableCustomSql, undefined, data.allowCreateNewJsonConnection);
        settings.createSqlDataSourceEditor({
            dataSourceHelper: model.dataSourceHelper,
            fieldListProvider: model.fieldListProvider,
            model: model.model,
            dataSourceWizard: settings.dataSourceWizard,
            undoEngine: model.undoEngine,
            rtl: model.rtl,
            allowEditDataSource: (_b = (_a = data === null || data === void 0 ? void 0 : data.dataSourceSettings) === null || _a === void 0 ? void 0 : _a.allowEditDataSource) !== null && _b !== void 0 ? _b : true,
            allowRemoveDataSource: (_d = (_c = data === null || data === void 0 ? void 0 : data.dataSourceSettings) === null || _c === void 0 ? void 0 : _c.allowRemoveDataSource) !== null && _d !== void 0 ? _d : true
        });
        settings.createReportWizard({
            data: data,
            dataSourceHelper: model.dataSourceHelper,
            fieldListProvider: model.fieldListProvider,
            isDirty: model.isDirty,
            isLoading: model.isLoading,
            model: model.model,
            navigation: model.navigateByReports,
            state: state,
            undoEngine: model.undoEngine
        });
    })
        .initializeFieldListActionProviders()
        .addTabPanel()
        .addErrorPanelViewModel(element, data.errorPanelSettings || {})
        .addActivatedExpressionEditor()
        .addDefaultAddons()
        .tryAddSqlDataSourceEditorAddon()
        .tryAddFederationDataSourceEditorAddon()
        .tryAddScriptEditorAddon(data.isScriptsDisabled)
        .addActionList()
        .addStylesProjection()
        .addFormattingRulesProjection()
        .addReportExplorerProvider()
        .addControlsProjection()
        .addBandsProjection()
        .addParts()
        .tryApplyBindings(applyBindings, element)
        .initializeUIEffects(applyBindings, element)
        .addSmartTagModel()
        .addShowPreviewMethod()
        .addOpenReportMethod()
        .getModel();
}
export function createReportDesigner(element, data, callbacks, localizationSettings, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings = true) {
    const localizationPromises = [];
    if (localizationSettings && localizationSettings.localization) {
        addCultureInfo({ messages: localizationSettings.localization });
    }
    callbacks && callbacks.designer && callbacks.designer.customizeLocalization && callbacks.designer.customizeLocalization(localizationPromises);
    return resolveFromPromises(localizationPromises, () => {
        return troubleshootingPageWrapper(() => {
            return _createReportDesigner(element, data, callbacks, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings);
        }, data.developmentMode, element);
    }).done((designerModel) => {
        if (callbacks && callbacks.designer && callbacks.designer.customizeWizard) {
            callbacks.designer.customizeWizard('ReportWizard', designerModel.wizard);
            callbacks.designer.customizeWizard('SingleQueryDataSourceWizard', designerModel.dataSourceWizard);
            if (designerModel.multiQueryDataSourceWizard) {
                callbacks.designer.customizeWizard('DataSourceWizard', designerModel.multiQueryDataSourceWizard);
            }
        }
    });
}
export function createReportDesignerFromModel(model, element, callbacks, applyBindings) {
    if (!model)
        return;
    limitation(!!model.limitation);
    _setChartLimitation(limitation());
    if (model.availableCultures) {
        availableCultures(model.availableCultures.reduce((result, val) => {
            return Object.assign(Object.assign({}, result), { [val.Name]: val.DisplayName });
        }, {}));
    }
    if (model.dataSources && model.dataSourcesData) {
        for (let i = 0; i < model.dataSources.length; i++) {
            const dataSource = model.dataSources[i];
            dataSource.data = model.dataSourcesData[i];
        }
    }
    if (!model.reportModel) {
        model.reportModel = SubreportViewModel.defaultReport;
    }
    else {
        model.reportModel = JSON.parse(model.reportModel);
    }
    const getRootKeyName = (obj) => {
        if (!obj['@ControlType']) {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return prop;
                }
            }
        }
        return 'XtraReportsLayoutSerializer';
    };
    initGlobalize(model);
    model.reportModelRootName = getRootKeyName(model.reportModel);
    const formatStringData = { customPatterns: {}, standardPatterns: {} };
    if (model.formatStringData) {
        model.formatStringData.customPatterns.forEach(function (item) {
            formatStringData.customPatterns[item.Key] = item.Value;
        });
        model.formatStringData.standardPatterns.forEach(function (item) {
            formatStringData.standardPatterns[item.Key] = item.Value;
        });
    }
    if (!!model.fieldListMaxNestingLevelUpdate) {
        maxNestingLevelUpdate(model.fieldListMaxNestingLevelUpdate);
        maxSearchLevel(model.fieldListMaxNestingLevelUpdate);
    }
    const data = {
        report: ko.observable({}),
        errorPanelSettings: model.errorPanelSettings,
        reportUrl: ko.observable(model.reportUrl),
        availableDataSources: model.dataSources,
        allowMDI: model.allowMDI,
        dataSourceRefs: model.dataSourceRefs,
        dataSourceSettings: model.dataSourceSettings,
        dataBindingMode: model.dataBindingMode || 'Expressions',
        defaultCrossTabControl: model.defaultCrossTabControl || 'XRCrossTab',
        convertBindingsToExpressions: model.convertBindingsToExpressions || PromptBoolean.Prompt,
        subreports: model.subreports,
        cultureInfoList: model.cultureInfoList,
        formatStringData: formatStringData,
        state: {
            reportExtensions: model.reportExtensions
        },
        isReportServer: model.internalSettings && model.internalSettings.isReportServer,
        wizardSettings: model.wizardSettings,
        wizardConnections: model.wizardConnections,
        disableCustomSql: model.disableCustomSql,
        isScriptsDisabled: !model.scriptsEnabled,
        allowCreateNewJsonConnection: model.allowCreateNewJsonConnection,
        reportStorageWebIsRegister: model.reportStorageWebIsRegister,
        reportPreviewSettings: model.reportPreviewSettings,
        reportWizardTemplates: model.reportWizardTemplates,
        customControls: model.customControls,
        customGlobalExpressions: model.customGlobalExpressions,
        customReportExpressions: model.customReportExpressions,
        developmentMode: model.developmentMode,
    };
    if (model.queryBuilderHandlerUri)
        QBHandlerUri(model.queryBuilderHandlerUri);
    return createReportDesigner(element, data, callbacks || {}, model, model.knownEnums, model.handlerUri, model.viewerHandlerUri, model.rtl, applyBindings)
        .done((designerModel) => {
        setTimeout(() => {
            data.report(model.reportModel);
            designerModel.isLoading && designerModel.isLoading(false);
        }, 1);
    });
}