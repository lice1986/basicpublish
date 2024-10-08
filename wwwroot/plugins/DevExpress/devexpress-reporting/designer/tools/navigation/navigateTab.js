﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateTab.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
export class NavigateTab extends Disposable {
    constructor(options) {
        super();
        this._isReportLoading = options.isReportLoading;
        this._callbacks = options.callbacks;
        this.context = ko.observable(this._callbacks.createContext(options.report, options.url));
        this._disposables.push(this.displayName = ko.computed(() => this._generateDisplayName(this.context().report)));
        this._disposables.push(this.undoEngine = new UndoEngine(this.context, ['surface', 'reportSource'], 'getInfo', ['objectStorage']));
        this.isDirty = this.undoEngine.isDirty;
        this.isModified = this.undoEngine.isDirty;
        this._disposables.push(this.report = this._createReport());
        this._disposables.push(this.url = this._createReportUrl());
        this._callbacks.afterInititalize(this);
    }
    dispose() {
        super.dispose();
        this.undoEngine['_callDisposeFunction'](this.context());
        this.context().dispose();
    }
    _generateDisplayName(model) {
        const name = model && (model.displayNameObject() || model.name());
        return name;
    }
    _createReport() {
        return ko.computed({
            read: () => this.context().report,
            write: (newVal) => this.changeContext(newVal, this.context().url())
        });
    }
    _createReportUrl() {
        return ko.computed({
            read: () => this.context().url(),
            write: (newVal) => this.context().url(newVal)
        });
    }
    changeContext(report, reportUrl) {
        this.context(this._callbacks.createContext(report, reportUrl));
        this._isReportLoading(false);
    }
    resetIsModified() {
        this.undoEngine.isDirty(false);
        this.undoEngine.clearHistory();
    }
    refresh(resetState) {
        this._isReportLoading(true);
        ReportStorageWeb.getReportByUrl((this.context().url())).done((result) => {
            this.report(result);
            if (resetState) {
                this.resetIsModified();
            }
        });
    }
}
