﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressViewModel.js)
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
import { ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import * as $ from 'jquery';
export class ProgressViewModel extends BaseRenderingModel {
    constructor(enableKeyboardSupport) {
        super();
        this._cancelExportRequests = {};
        if (enableKeyboardSupport) {
            this.progressBarAccessibility = new ListKeyboardHelper();
            this._disposables.push(this.progressBarAccessibility);
        }
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.visible = !this._forceInvisible && this.inProgress;
        viewModel.text = this.text;
        viewModel.progress = this.progress;
        viewModel.cssClasses = this._cssClasses;
        viewModel.cancelButton.visible = this._operationId && !this._isCancelling;
        viewModel.cancelButton.text = this.cancelText;
        viewModel.cancelButton.action = this.cancelAction;
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('visible', this.visible)
            .generateProperty('text', this.text)
            .generateProperty('progress', this.progress)
            .generateProperty('cssClasses', this._cssClasses)
            .generateProperty('progressBarAccessibilityKeyboardHelper', this.progressBarAccessibility)
            .generateProperty('cancelButton', createViewModelGenerator()
            .generateProperty('visible', false)
            .generateProperty('text', this.cancelText)
            .generateProperty('action', this.cancelAction)
            .getViewModel())
            .getViewModel();
        return viewModel;
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'visible') {
            this._forceInvisible = !args['newValue'];
        }
    }
    _rejectLastOperationIdDeferred() {
        this._lastOperationIdDeferred && this._lastOperationIdDeferred.reject();
    }
    _rejectLastOperationDeferred() {
        this._lastOperationDeferred && this._lastOperationDeferred.reject();
    }
    startProgress(startOperationId, onStop, operationIdPromise) {
        if (this.inProgress) {
            this.cancelAction();
            this._rejectLastOperationDeferred();
            this._rejectLastOperationIdDeferred();
        }
        this._startOperationId = startOperationId;
        this.inProgress = true;
        this.progress = 0;
        const newOperationDeferred = $.Deferred();
        const newOperationIdDeferred = $.Deferred();
        this._lastOperationDeferred = newOperationDeferred;
        this._lastOperationIdDeferred = newOperationIdDeferred;
        operationIdPromise
            .done(operationId => {
            newOperationIdDeferred.resolve(operationId);
        }).fail(() => {
            newOperationIdDeferred.reject();
            newOperationDeferred.reject();
            this.complete(startOperationId);
        });
        newOperationIdDeferred.done(operationId => {
            this._operationId = operationId;
        });
        this.cancelAction = () => {
            this._isCancelling = true;
            this.text = getLocalization('Cancelling...', 'ASPxReportsStringId.WebDocumentViewer_Cancelling');
            const operationId = this._operationId;
            const finalizeId = operationId || this._startOperationId;
            try {
                $.isFunction(onStop) && onStop(finalizeId);
                if (operationId)
                    this._cancelExportRequests[operationId] = true;
                if (this._startOperationId)
                    this._cancelExportRequests[this._startOperationId] = true;
            }
            finally {
                this.complete(operationId);
            }
        };
        return this._lastOperationDeferred.promise();
    }
    complete(completeOperationId) {
        if (completeOperationId === this._operationId || this._startOperationId === completeOperationId || !completeOperationId) {
            this.inProgress = false;
            this.progress = 0;
            this._startOperationId = null;
            this._operationId = null;
            this._lastOperationDeferred && this._lastOperationDeferred.resolve(completeOperationId);
            this._rejectLastOperationIdDeferred();
            this._isCancelling = false;
        }
    }
    wasCancelRequested(id) {
        return !!(id && this._cancelExportRequests[id]);
    }
    setPosition(position) {
        const result = [];
        if (!position) {
            result.push('dxrd-align-default');
        }
        else {
            if (position.top)
                result.push('dxrd-align-top');
            if (position.right)
                result.push('dxrd-align-right');
            if (position.bottom)
                result.push('dxrd-align-bottom');
            if (position.left)
                result.push('dxrd-align-left');
        }
        this._cssClasses = result.join(' ');
    }
    dispose() {
        this._rejectLastOperationIdDeferred();
        super.dispose();
    }
}
__decorate([
    mutable(() => false)
], ProgressViewModel.prototype, "visible", void 0);
__decorate([
    mutable(() => '')
], ProgressViewModel.prototype, "text", void 0);
__decorate([
    mutable(() => 0)
], ProgressViewModel.prototype, "progress", void 0);
__decorate([
    mutable(() => getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'))
], ProgressViewModel.prototype, "cancelText", void 0);
__decorate([
    mutable(() => () => { })
], ProgressViewModel.prototype, "cancelAction", void 0);
__decorate([
    mutable(() => false)
], ProgressViewModel.prototype, "inProgress", void 0);
__decorate([
    mutable(() => '')
], ProgressViewModel.prototype, "_operationId", void 0);
__decorate([
    mutable(() => false)
], ProgressViewModel.prototype, "_isCancelling", void 0);
__decorate([
    mutable(() => false)
], ProgressViewModel.prototype, "_forceInvisible", void 0);
__decorate([
    mutable(() => '')
], ProgressViewModel.prototype, "_cssClasses", void 0);
