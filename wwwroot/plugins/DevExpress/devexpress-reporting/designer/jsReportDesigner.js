﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesigner.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTypeMapper } from '@devexpress/analytics-core/analytics-internal';
import { updateLocalization } from '@devexpress/analytics-core/analytics-utils';
import { parameterTypeValues } from './dataObjects/parameters/parameterSettings';
import { ReportStorageWeb } from './services/reportStorageWeb';
import { controlsFactory } from './utils/settings';
import { groups } from './widgets/groups';
export class JSReportDesigner {
    constructor(_designerModel) {
        this._designerModel = _designerModel;
    }
    get designerModel() {
        return this._designerModel();
    }
    set designerModel(newVal) {
        this._designerModel(newVal);
    }
    UpdateLocalization(localization) {
        updateLocalization(localization);
    }
    GetDesignerModel() {
        return this.designerModel;
    }
    GetPreviewModel() {
        return this.designerModel.reportPreviewModel;
    }
    GetPropertyInfo(controlType, path) {
        return controlsFactory().getPropertyInfo(controlType, path);
    }
    GetButtonStorage() {
        return this.designerModel.actionStorage;
    }
    RunWizard(wizardType) {
        this.designerModel._wizardRunner.run(wizardType);
    }
    GetJsonReportModel() {
        return this.designerModel.model().serialize();
    }
    IsModified() {
        return this.designerModel && this.designerModel.isDirty();
    }
    ResetIsModified() {
        if (this.designerModel) {
            this.designerModel.isDirty(false);
            this.designerModel.undoEngine && this.designerModel.undoEngine().clearHistory();
        }
    }
    AddToPropertyGrid(groupName, property) {
        const group = groups[groupName];
        if (group) {
            group.info.push(property);
        }
        else {
            groups[groupName] = { info: [property] };
        }
    }
    AddParameterType(parameterInfo, editorInfo) {
        parameterTypeValues.push(parameterInfo);
        editorTypeMapper[parameterInfo.value] = editorInfo;
    }
    RemoveParameterType(parameterType) {
        const position = parameterTypeValues.indexOf(this.GetParameterInfo(parameterType));
        if (position !== -1) {
            parameterTypeValues.splice(position, 1);
        }
    }
    GetParameterInfo(parameterType) {
        return parameterTypeValues.filter(function (val) { return val.value === parameterType; })[0];
    }
    GetParameterEditor(valueType) {
        return editorTypeMapper[valueType];
    }
    ReportStorageGetData(url) {
        return ReportStorageWeb.getData(url);
    }
    ReportStorageSetData(reportLayout, url) {
        return ReportStorageWeb.setData(reportLayout, url);
    }
    ReportStorageSetNewData(reportLayout, url) {
        return ReportStorageWeb.setNewData(reportLayout, url);
    }
    SaveReport() {
        const navigateByReports = this.designerModel.navigateByReports;
        return this.ReportStorageSetData(navigateByReports.currentTab().context().report.serialize(), navigateByReports.currentTab().context().url());
    }
    GetTabs() {
        return this.designerModel.getTabs();
    }
    GetCurrentTab() {
        return this.designerModel.navigateByReports.currentTab();
    }
    CloseTab(tab, force = false) {
        this.designerModel.closeTab(tab, force);
    }
    CloseCurrentTab() {
        this.designerModel.navigateByReports.removeTab(this.designerModel.navigateByReports.currentTab());
    }
    AdjustControlCore() {
        this.designerModel && this.designerModel.updateSurfaceSize();
    }
    SaveNewReport(reportName) {
        const navigateByReports = this.designerModel.navigateByReports;
        return this.ReportStorageSetNewData(navigateByReports.currentTab().context().report.serialize(), reportName);
    }
    ReportStorageGetUrls() {
        return ReportStorageWeb.getUrls();
    }
    OpenReport(url) {
        this.designerModel.openReport(url);
    }
    ShowPreview() {
        this.designerModel.showPreview();
    }
}
