﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewModel.js)
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
import { appendStaticContextToRootViewModel, staticContext, ToolbarKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { formatSearchResult } from '../search/_utils';
export class PreviewDisposableModel extends BaseRenderingModel {
    constructor(options) {
        super();
        this.rootStyle = options.rootStyle;
        this.reportPreview = options.reportPreview;
        this.parametersModel = options.parametersModel;
        this.exportModel = options.exportModel;
        this.searchModel = options.searchModel;
        this.rtl = options.rtl;
        this._disposables.push(options.reportPreview);
        this._disposables.push(options.parametersModel);
        this._disposables.push(options.exportModel);
        this._disposables.push(options.searchModel);
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('parts', this.parts)
            .generateProperty('reportPreview', this.reportPreview.getViewModel())
            .generateProperty('exportHandler', this.reportPreview.exportHandler.getViewModel())
            .generateProperty('rootStyle', this.rootStyle)
            .generateProperty('rtl', this.rtl)
            .getViewModel();
        appendStaticContextToRootViewModel(viewModel, {
            _static: Object.assign(Object.assign({}, staticContext._static), { formatSearchResult: formatSearchResult })
        }, 'dx-report-viewer');
        return viewModel;
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'parts')
            viewModel.parts = this.parts;
    }
    onPropertyChanged(args) { }
    _addDisposable(object) {
        this._disposables.push(object);
    }
    dispose() {
        super.dispose();
        this.removeProperties();
    }
    GetParametersModel() {
        return this.parametersModel;
    }
    OpenReport(reportName) {
        this.reportPreview.openReport(reportName);
    }
    Print(pageIndex) {
        this.reportPreview.printDocument(pageIndex);
    }
    ExportTo(format, inlineResult) {
        if (!this.reportPreview.exportDisabled) {
            this.reportPreview.exportDocumentTo(format || 'pdf', inlineResult);
        }
    }
    GetCurrentPageIndex() {
        return this.reportPreview.pageIndex;
    }
    GoToPage(pageIndex) {
        this.reportPreview.goToPage(pageIndex);
    }
    Close() {
        this.reportPreview.deactivate();
    }
    ResetParameters() {
        this.parametersModel && this.parametersModel.restore();
    }
    StartBuild() {
        this.parametersModel && this.parametersModel.submit();
    }
    PerformCustomDocumentOperation(customData, hideMessageFromUser) {
        return this.reportPreview.customDocumentOperation(customData, hideMessageFromUser);
    }
}
__decorate([
    mutable(() => [])
], PreviewDisposableModel.prototype, "parts", void 0);
export class PreviewModel extends PreviewDisposableModel {
    constructor(options) {
        super(options);
        this.documentMapModel = options.documentMapModel;
        this.tabPanel = options.tabPanel;
        this.actionLists = options.actionLists;
        this.accessibilityCompliant = options.accessibilityCompliant;
        this.breadcrumb = options.breadcrumb;
        this._disposables.push(options.documentMapModel);
        this._disposables.push(options.tabPanel);
        this._disposables.push(options.actionLists);
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('accessibilityCompliant', this.accessibilityCompliant)
            .generateProperty('toolBar', createViewModelGenerator()
            .generateProperty('actionLists', this.actionLists.getViewModel())
            .generateProperty('canSwitchToDesigner', this.reportPreview.canSwitchToDesigner)
            .generateProperty('keyboardHelper', new ToolbarKeyboardHelper(this.actionLists.toolbarItems))
            .getViewModel())
            .generateProperty('breadcrumb', this.breadcrumb.getViewModel())
            .generateProperty('tabPanel', this.tabPanel.getViewModel())
            .getViewModel();
    }
}