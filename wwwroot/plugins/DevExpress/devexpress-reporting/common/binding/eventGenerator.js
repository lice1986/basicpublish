﻿/**
* DevExpress HTML/JS Reporting (common\binding\eventGenerator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal-native';
import { loadMessages as analyticLoadMessages } from '@devexpress/analytics-core/analytics-localization-native';
import * as localization from 'devextreme/localization';
import { availableCultures, defaultCulture } from '../defaultCulture';
import { CustomizeExportOptionsEventArgs } from './exportOptionsEventArgs';
export class EventGenerator {
    static generateCustomizeLocalizationCallback(fireEvent) {
        return function (localizationCallbacks) {
            fireEvent('CustomizeLocalization', {
                LoadMessages: (messages) => {
                    if (!messages)
                        return;
                    if (typeof messages.then === 'function') {
                        localizationCallbacks.push(messages);
                    }
                    else {
                        analyticLoadMessages(messages);
                    }
                },
                SetAvailableCultures: (customCultures) => {
                    const newCultures = {};
                    newCultures[defaultCulture] = availableCultures()[defaultCulture];
                    extend(newCultures, customCultures);
                    availableCultures(newCultures);
                },
                WidgetLocalization: localization
            });
        };
    }
    static generateDesignerEvents(fireEvent) {
        const customizeActionsEvent = { publicName: 'CustomizeMenuActions', privateName: 'customizeActions' };
        const reportTabClosingEvent = { publicName: 'ReportTabClosing', privateName: 'reportTabClosing' };
        const reportTabClosedEvent = { publicName: 'ReportTabClosed', privateName: 'reportTabClosed' };
        const customizeParameterEditorsEvent = { publicName: 'CustomizeParameterEditors', privateName: 'customizeParameterEditors' };
        const customizeParameterLookUpSourceEvent = { publicName: 'CustomizeParameterLookUpSource', privateName: 'customizeParameterLookUpSource' };
        const exitDesignerEvent = { publicName: 'ExitDesigner', privateName: 'exitDesigner' };
        const reportSavingEvent = { publicName: 'ReportSaving', privateName: 'reportSaving' };
        const reportSavedEvent = { publicName: 'ReportSaved', privateName: 'reportSaved' };
        const reportOpeningEvent = { publicName: 'ReportOpening', privateName: 'reportOpening' };
        const reportOpenedEvent = { publicName: 'ReportOpened', privateName: 'reportOpened' };
        const tabChangedEvent = { publicName: 'TabChanged', privateName: 'tabChanged' };
        const onServerErrorEvent = { publicName: 'OnServerError', privateName: 'onServerError' };
        const customizePartsEvent = { publicName: 'CustomizeElements', privateName: 'customizeParts' };
        const componentAddedEvent = { publicName: 'ComponentAdded', privateName: 'componentAdded' };
        const customizeSaveDialogEvent = { publicName: 'CustomizeSaveDialog', privateName: 'customizeSaveDialog' };
        const customizeSaveAsDialogEvent = { publicName: 'CustomizeSaveAsDialog', privateName: 'customizeSaveAsDialog' };
        const customizeOpenDialogEvent = { publicName: 'CustomizeOpenDialog', privateName: 'customizeOpenDialog' };
        const customizeToolboxEvent = { publicName: 'CustomizeToolbox', privateName: 'customizeToolbox' };
        const customizeLocalizationEvent = { publicName: 'CustomizeLocalization', privateName: 'customizeLocalization' };
        const customizeFieldListActionsEvent = { publicName: 'CustomizeFieldListActions', privateName: 'customizeFieldListActions' };
        const onInitializingEvent = { publicName: 'OnInitializing', privateName: 'onInitializing' };
        const beforeRenderEvent = { publicName: 'BeforeRender', privateName: 'beforeRender' };
        const customizeWizardEvent = { publicName: 'CustomizeWizard', privateName: 'customizeWizard' };
        onInitializingEvent['callback'] = function onInitializing() {
            fireEvent(onInitializingEvent.publicName);
        };
        customizeLocalizationEvent['callback'] = EventGenerator.generateCustomizeLocalizationCallback(fireEvent);
        customizeActionsEvent['callback'] = function customizeActions(actions) {
            fireEvent(customizeActionsEvent.publicName, {
                Actions: actions,
                GetById: (actionId) => {
                    return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                }
            });
        };
        beforeRenderEvent['callback'] = function beforeRender(designerModel) {
            fireEvent(beforeRenderEvent.publicName, designerModel);
        };
        customizeParameterEditorsEvent['callback'] = function customizeParameterEditors(parameter, info) {
            fireEvent(customizeParameterEditorsEvent.publicName, {
                parameter: parameter,
                info: info
            });
        };
        customizeParameterLookUpSourceEvent['callback'] = function customizeParameterLookUpSource(parameter, items) {
            const arg = {
                parameter,
                items,
                dataSource: null
            };
            fireEvent(customizeParameterLookUpSourceEvent.publicName, arg);
            return arg.dataSource;
        };
        exitDesignerEvent['callback'] = function exitDesigner() {
            fireEvent(exitDesignerEvent.publicName);
        };
        reportSavingEvent['callback'] = function reportSaving(args) {
            const arg = {
                Url: args.url,
                Report: args.report,
                Cancel: args.cancel
            };
            fireEvent(reportSavingEvent.publicName, arg);
            args.cancel = arg.Cancel;
        };
        reportSavedEvent['callback'] = function reportSaved(args) {
            const arg = {
                Url: args.url,
                Report: args.report
            };
            fireEvent(reportSavedEvent.publicName, arg);
        };
        reportOpenedEvent['callback'] = function reportOpened(args) {
            const arg = {
                Url: args.url,
                Report: args.report
            };
            fireEvent(reportOpenedEvent.publicName, arg);
        };
        reportOpeningEvent['callback'] = function reportOpening(args) {
            const arg = {
                Url: args.url,
                Report: args.report,
                Cancel: args.cancel
            };
            fireEvent(reportOpeningEvent.publicName, arg);
            args.cancel = arg.Cancel;
        };
        tabChangedEvent['callback'] = function tabChanged(tab) {
            fireEvent(tabChangedEvent.publicName, {
                Tab: tab
            });
        };
        onServerErrorEvent['callback'] = function onServerError(args) {
            fireEvent(onServerErrorEvent.publicName, { Error: args });
        };
        componentAddedEvent['callback'] = function componentAdded(args) {
            fireEvent(componentAddedEvent.publicName, { Model: args.model, Parent: args.parent });
        };
        customizePartsEvent['callback'] = function customizeParts(parts) {
            fireEvent(customizePartsEvent.publicName, {
                Elements: parts,
                GetById: id => {
                    return id
                        ? parts.filter(item => id === item.id)[0]
                        : null;
                }
            });
        };
        customizeSaveDialogEvent['callback'] = function customizeSaveDialog(popup) {
            fireEvent(customizeSaveDialogEvent.publicName, {
                Popup: popup,
                Customize: (template, model) => {
                    popup.customize(template, model);
                }
            });
        };
        customizeSaveAsDialogEvent['callback'] = function customizeSaveAsDialog(popup) {
            fireEvent(customizeSaveAsDialogEvent.publicName, {
                Popup: popup,
                Customize: (template, model) => {
                    popup.customize(template, model);
                }
            });
        };
        customizeOpenDialogEvent['callback'] = function customizeOpenDialog(popup) {
            fireEvent(customizeOpenDialogEvent.publicName, {
                Popup: popup,
                Customize: (template, model) => {
                    popup.customize(template, model);
                }
            });
        };
        customizeToolboxEvent['callback'] = function customizeToolbox(controlsFactory) {
            fireEvent(customizeToolboxEvent.publicName, {
                ControlsFactory: controlsFactory
            });
        };
        customizeFieldListActionsEvent['callback'] = function customizeFieldListActions(item, actions) {
            fireEvent(customizeFieldListActionsEvent.publicName, {
                Item: item,
                Actions: actions
            });
        };
        customizeWizardEvent['callback'] = function customizeWizard(type, wizard) {
            fireEvent(customizeWizardEvent.publicName, {
                Type: type,
                Wizard: wizard
            });
        };
        reportTabClosingEvent['callback'] = function reportTabClosing(tab, deffered) {
            const args = {
                Tab: tab,
                ReadyToClose: deffered,
                Handled: false
            };
            fireEvent(reportTabClosingEvent.publicName, args);
            return args.Handled;
        };
        reportTabClosedEvent['callback'] = function reportTabClosed(tab) {
            fireEvent(reportTabClosedEvent.publicName, {
                Tab: tab
            });
        };
        return [
            customizeActionsEvent,
            reportTabClosingEvent,
            reportTabClosedEvent,
            customizeParameterEditorsEvent,
            customizeParameterLookUpSourceEvent,
            exitDesignerEvent,
            reportSavingEvent,
            reportSavedEvent,
            reportOpeningEvent,
            reportOpenedEvent,
            tabChangedEvent,
            onServerErrorEvent,
            customizePartsEvent,
            componentAddedEvent,
            customizeSaveDialogEvent,
            customizeSaveAsDialogEvent,
            customizeOpenDialogEvent,
            customizeToolboxEvent,
            customizeLocalizationEvent,
            customizeFieldListActionsEvent,
            onInitializingEvent,
            beforeRenderEvent,
            customizeWizardEvent
        ];
    }
    static generatePreviewEvents(fireEvent, prefix) {
        function generateBrickMethods(brick) {
            return {
                GetBrickText: function () { return brick() && brick().text(); },
                GetBrickValue: function (key = 'value') {
                    const contentValue = brick() && brick().content && brick().content.filter(function (x) { return x.Key === key; })[0];
                    return contentValue && contentValue.Value;
                },
            };
        }
        const previewClickEvent = { publicName: 'PreviewClick', privateName: 'previewClick' };
        const documentReadyEvent = { publicName: [prefix, 'DocumentReady'].join(''), privateName: 'documentReady' };
        const editingFieldChangedEvent = { publicName: [prefix, 'EditingFieldChanged'].join(''), privateName: 'editingFieldChanged' };
        const parametersSubmittedEvent = { publicName: [prefix, 'ParametersSubmitted'].join(''), privateName: 'parametersSubmitted' };
        const parametersInitializedEvent = { publicName: [prefix, 'ParametersInitialized'].join(''), privateName: 'parametersInitialized' };
        const parametersResetEvent = { publicName: [prefix, 'ParametersReset'].join(''), privateName: 'parametersReset' };
        const customizeParameterLookUpSourceEvent = { publicName: 'CustomizeParameterLookUpSource', privateName: 'customizeParameterLookUpSource' };
        const customizeParameterEditorsEvent = { publicName: 'CustomizeParameterEditors', privateName: 'customizeParameterEditors' };
        const customizeActionsEvent = { publicName: [prefix, 'CustomizeMenuActions'].join(''), privateName: 'customizeActions' };
        const customizePartsEvent = { publicName: [prefix, 'CustomizeElements'].join(''), privateName: 'customizeParts' };
        const customizeExportOptionsEvent = { publicName: [prefix, 'CustomizeExportOptions'].join(''), privateName: 'customizeExportOptions' };
        const onServerErrorEvent = { publicName: 'OnServerError', privateName: 'onServerError' };
        const onExportEvent = { publicName: [prefix, 'OnExport'].join(''), privateName: 'onExport' };
        customizeParameterEditorsEvent['callback'] = function customizeParameterEditors(parameter, info) {
            fireEvent(customizeParameterEditorsEvent.publicName, { parameter, info });
        };
        customizePartsEvent['callback'] = function customizeParts(parts) {
            fireEvent(customizePartsEvent.publicName, {
                Elements: parts,
                GetById: (templateId) => {
                    return templateId ? parts.filter(function (item) { return templateId === item.templateName; })[0] : null;
                }
            });
        };
        customizeActionsEvent['callback'] = function customizeActions(actions) {
            fireEvent(customizeActionsEvent.publicName, {
                Actions: actions,
                GetById: (actionId) => {
                    return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                }
            });
        };
        customizeParameterLookUpSourceEvent['callback'] = function customizeParameterLookUpSource(parameter, items) {
            const arg = {
                parameter,
                items,
                dataSource: null
            };
            fireEvent(customizeParameterLookUpSourceEvent.publicName, arg);
            return arg.dataSource;
        };
        previewClickEvent['callback'] = function previewClick(pageIndex, brick, defaultHandler) {
            const arg = Object.assign(Object.assign({ PageIndex: pageIndex, Brick: brick, DefaultHandler: defaultHandler }, generateBrickMethods(() => brick)), { Handled: false });
            fireEvent(previewClickEvent.publicName, arg);
            return arg.Handled;
        };
        parametersResetEvent['callback'] = function parametersReset(model, parameters) {
            fireEvent(parametersResetEvent.publicName, {
                ParametersViewModel: model,
                Parameters: parameters
            });
        };
        parametersSubmittedEvent['callback'] = function parametersSubmitted(model, parameters) {
            fireEvent(parametersSubmittedEvent.publicName, {
                ParametersViewModel: model,
                Parameters: parameters
            });
        };
        parametersInitializedEvent['callback'] = function parametersInitialized(model, info, submit, shouldRequestParameters) {
            fireEvent(parametersInitializedEvent.publicName, {
                ParametersModel: model,
                ActualParametersInfo: info,
                Submit: submit,
                ShouldRequestParameters: shouldRequestParameters
            });
        };
        editingFieldChangedEvent['callback'] = function editingFieldChanged(field, oldValue, newValue) {
            const arg = Object.assign({ Field: field, OldValue: oldValue, NewValue: newValue }, generateBrickMethods(() => field.brick));
            fireEvent(editingFieldChangedEvent.publicName, arg);
            return arg.NewValue;
        };
        documentReadyEvent['callback'] = function documentReady(documentId, reportId, pageCount) {
            fireEvent(documentReadyEvent.publicName, {
                ReportId: reportId,
                DocumentId: documentId,
                PageCount: pageCount
            });
        };
        onServerErrorEvent['callback'] = function onServerError(args) {
            fireEvent(onServerErrorEvent.publicName, { Error: args });
        };
        onExportEvent['callback'] = function onExport(args) {
            fireEvent(onExportEvent.publicName, args);
        };
        customizeExportOptionsEvent['callback'] = function customizeExportOptions(options) {
            const arg = new CustomizeExportOptionsEventArgs(options);
            fireEvent(customizeExportOptionsEvent.publicName, arg);
        };
        const result = [
            previewClickEvent,
            documentReadyEvent,
            editingFieldChangedEvent,
            parametersSubmittedEvent,
            parametersInitializedEvent,
            parametersResetEvent,
            customizeParameterLookUpSourceEvent,
            customizeParameterEditorsEvent,
            customizeActionsEvent,
            customizePartsEvent,
            customizeExportOptionsEvent,
            onServerErrorEvent,
            onExportEvent,
        ];
        if (!prefix) {
            const onInitializingEvent = { publicName: 'OnInitializing', privateName: 'onInitializing' };
            onInitializingEvent['callback'] = function onInitializing() {
                fireEvent(onInitializingEvent.publicName);
            };
            result.push(onInitializingEvent);
            const beforeRenderEvent = { publicName: 'BeforeRender', privateName: 'beforeRender' };
            beforeRenderEvent['callback'] = function beforeRender(designerModel) {
                fireEvent(beforeRenderEvent.publicName, designerModel);
            };
            result.push(beforeRenderEvent);
            const customizeLocalizationEvent = { publicName: 'CustomizeLocalization', privateName: 'customizeLocalization' };
            customizeLocalizationEvent['callback'] = EventGenerator.generateCustomizeLocalizationCallback(fireEvent);
            result.push(customizeLocalizationEvent);
        }
        return result;
    }
}
