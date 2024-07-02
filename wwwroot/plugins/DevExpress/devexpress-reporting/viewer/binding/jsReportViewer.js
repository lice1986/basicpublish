﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { koUtils } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseModel, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { updateLocalization } from '@devexpress/analytics-core/analytics-utils-native';
export class JSReportViewer extends BaseModel {
    constructor(_previewModel) {
        super();
        this.previewModel = koUtils.unwrap(_previewModel);
        if (koUtils.isSubscribable(_previewModel)) {
            let inUpdate = false;
            const lock = (callback) => {
                if (!inUpdate) {
                    inUpdate = true;
                    callback();
                    inUpdate = false;
                }
            };
            this.addDisposable(_previewModel.subscribe((newVal) => {
                lock(() => this.previewModel = newVal);
            }), this.events.on('propertyChanged', (args) => {
                if (args.propertyName === 'previewModel') {
                    lock(() => _previewModel(args.newValue));
                }
            }));
        }
    }
    onPropertyChanged(args) {
        var _a;
        if (args.propertyName === 'previewModel') {
            (_a = args.oldValue) === null || _a === void 0 ? void 0 : _a.dispose();
        }
    }
    dispose() {
        const previewModel = this.GetPreviewModel();
        if (previewModel)
            previewModel.dispose();
    }
    previewExists() {
        return this.previewModel && this.previewModel.reportPreview;
    }
    GetReportPreview() {
        return this.previewExists();
    }
    GetPreviewModel() {
        return this.previewModel;
    }
    GetParametersModel() {
        return this.previewModel && this.previewModel.GetParametersModel();
    }
    PerformCustomDocumentOperation(customData, hideMessageFromUser) {
        return this.previewExists() && this.previewModel.PerformCustomDocumentOperation(customData, hideMessageFromUser);
    }
    OpenReport(reportName) {
        return this.previewExists() && this.previewModel.OpenReport(reportName);
    }
    Print(pageIndex) {
        return this.previewExists() && this.previewModel.Print(pageIndex);
    }
    ExportTo(format, inlineResult) {
        this.previewExists() && this.previewModel.ExportTo(format, inlineResult);
    }
    GetCurrentPageIndex() {
        return this.previewExists() && this.previewModel.GetCurrentPageIndex();
    }
    GoToPage(pageIndex) {
        this.previewExists() && this.previewModel.GoToPage(pageIndex);
    }
    Close() {
        this.previewExists() && this.previewModel.Close();
    }
    ResetParameters() {
        this.previewModel && this.previewModel.ResetParameters();
    }
    StartBuild() {
        return this.previewModel && this.previewModel.StartBuild();
    }
    UpdateLocalization(localization) {
        updateLocalization(localization);
    }
    AdjustControlCore() {
        this.previewModel && this.previewModel.updateSurfaceSize && this.previewModel.updateSurfaceSize();
    }
}
__decorate([
    mutable(null)
], JSReportViewer.prototype, "previewModel", void 0);
