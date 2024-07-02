﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateByReports.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUniqueName } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { reportStorageWebIsRegister } from '../../internal/_settings';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
import { ReportDesignerContext } from '../generator/reportDesignerContext';
import { NavigateTab } from './navigateTab';
export class NavigateByReports extends Disposable {
    constructor(options) {
        super();
        this._isReportLoading = ko.observable(false);
        this.save = (tab) => void 0;
        this.height = ko.observable(0);
        this.tabs = ko.observableArray([]);
        this._selectedIndex = ko.observable(-1);
        this.selectedIndex = ko.computed({
            read: () => { return this._selectedIndex(); },
            write: value => { if (value != -1)
                this._selectedIndex(value); }
        });
        this.allowMDI = options.allowMDI != undefined ? options.allowMDI : true;
        this.knownEnums = options.knownEnums;
        this._callbacks = options.callbacks || {};
        this._selection = options.selection;
        this._initializeOptions = options.initOptions;
        let currentTab = null;
        this._disposables.push(this.selectedIndex);
        this._disposables.push(this.currentTab = ko.pureComputed(() => {
            if (this.selectedIndex() !== -1) {
                const oldValue = currentTab;
                currentTab = this.tabs.peek()[this.selectedIndex()];
                if (currentTab !== oldValue)
                    this._isReportLoading(true);
                return currentTab;
            }
            else {
                return null;
            }
        }));
        if (options.report)
            this.addTab(options.report, options.reportUrl || ko.observable(null));
        this._disposables.push(this.currentTab.subscribe((newVal) => {
            setTimeout(() => {
                this._isReportLoading(false);
                this.height.notifySubscribers();
                this.checkHeight();
                this._callbacks.tabChanged && this._callbacks.tabChanged(newVal);
            }, 1);
        }));
    }
    _removeTab(tab) {
        const removingDeferred = $.Deferred();
        if (!this._callbacks.reportTabClosing || !this._callbacks.reportTabClosing(tab, removingDeferred)) {
            removingDeferred.resolve();
        }
        removingDeferred.done(() => {
            const currentIndex = this._selectedIndex(), closingIndex = this.tabs().indexOf(tab), newIndex = (currentIndex < closingIndex || currentIndex === closingIndex && currentIndex < this.tabs().length - 1)
                ? currentIndex
                : currentIndex - 1;
            this.tabs.remove(tab);
            this._selectedIndex(newIndex);
            if (newIndex === currentIndex)
                this.selectedIndex.notifySubscribers();
            this._callbacks.reportTabClosed && this._callbacks.reportTabClosed(tab);
            tab.dispose();
        });
        return removingDeferred.promise();
    }
    dispose() {
        super.dispose();
        this._selectedIndex(-1);
        this.disposeObservableArray(this.tabs);
        this.resetObservableArray(this.tabs);
    }
    _closeTab(deletedTab) {
        const closingDeferred = $.Deferred();
        deletedTab.close = closingDeferred;
        if (deletedTab.isDirty()) {
            this.save(deletedTab);
        }
        else {
            closingDeferred.resolve();
        }
        return closingDeferred.promise();
    }
    _closeAll(deferred) {
        if (this.tabs().length === 0) {
            deferred.resolve();
            return;
        }
        const tab = this.tabs()[this.tabs().length - 1];
        this._closeTab(tab).done(() => {
            this._removeTab(tab)
                .done(() => this._closeAll(deferred))
                .fail(() => deferred.reject());
        });
    }
    _getTabByControl(report, reportUrl) {
        return this.tabs().filter((tab) => { return reportUrl ? tab.context().url() === reportUrl : tab.context().report === report; })[0];
    }
    _addTab(report, url, newReportName) {
        const newTab = new NavigateTab({
            report: report,
            url: url,
            isReportLoading: this._isReportLoading,
            callbacks: {
                afterInititalize: (tab) => {
                    tab._disposables.push(tab.displayName.subscribe(() => this.checkHeight()));
                    tab.icon = !this.allowMDI && this.tabs().length === 0 ? undefined : 'dx-icon-close';
                    if (newReportName) {
                        newReportName = getUniqueName(this.tabs().map((t) => t.displayName()), newReportName, false);
                        tab.context().report.displayNameObject(newReportName);
                        tab.undoEngine.clearHistory();
                    }
                    else if (!tab.displayName()) {
                        tab.context().report.name(getUniqueName(this.tabs().map((t) => { return t.displayName(); }), 'Report'));
                        tab.undoEngine.clearHistory();
                    }
                    tab._disposables.push(tab.context.subscribe(() => this.height.notifySubscribers()));
                },
                createContext: (report, url) => {
                    return new ReportDesignerContext({
                        report: report,
                        selection: this._selection,
                        designerCallbacks: this._callbacks,
                        knownEnums: report.knownEnums,
                        initializeOptions: this._initializeOptions,
                        url: url
                    });
                }
            }
        });
        this.tabs.push(newTab);
        this.switch(newTab);
        newTab.undoEngine.clearHistory();
    }
    changeContext(report, reportUrl) {
        if (!this.currentTab())
            this.addTab(report, reportUrl);
        else {
            this.currentTab().changeContext(report, ko.unwrap(reportUrl || this.currentTab().url));
        }
    }
    init(isLoading) {
        this._isReportLoading = isLoading;
    }
    removeTab(tab, force = false) {
        if (force)
            return this._removeTab(tab);
        this._closeTab(tab).done(() => {
            this._removeTab(tab);
        });
    }
    closeAll() {
        const deferred = $.Deferred();
        this._closeAll(deferred);
        return deferred.promise();
    }
    switch(tab) {
        this._selectedIndex(this.tabs().indexOf(tab));
    }
    _createNewTab(report, url = ko.observable(''), newReportName) {
        this._addTab(report, url, newReportName);
        const onOpened = this._callbacks.reportOpened;
        onOpened && setTimeout(() => {
            onOpened && onOpened({ report, url: ko.unwrap(url) });
        }, 10);
    }
    goToSubreport(subreportSurface) {
        if (reportStorageWebIsRegister()) {
            const subreportControl = subreportSurface.getControlModel();
            let currentReport = null;
            if (!subreportControl.reportSourceUrl())
                currentReport = subreportControl.cloneReportSource();
            this.addTab(currentReport, subreportControl.reportSourceUrl);
        }
    }
    addTab(report, url = ko.observable(''), onCancel = () => void 0, newReportName) {
        const $deferred = $.Deferred();
        const tab = this._getTabByControl(report, url());
        if (!tab) {
            if ((args => void (this._callbacks.reportOpening && this._callbacks.reportOpening(args)) || args)({ url: url(), cancel: false }).cancel) {
                onCancel();
                return $deferred.reject().promise();
            }
            if (url() && !report) {
                ReportStorageWeb.getReportByUrl(url()).done((result) => {
                    $deferred.resolve();
                    this._createNewTab(result, url, newReportName);
                }).fail(() => $deferred.reject());
            }
            else {
                $deferred.resolve();
                this._createNewTab(report, url, newReportName);
            }
        }
        else {
            $deferred.resolve();
            this.switch(tab);
        }
        return $deferred.promise();
    }
    checkHeight() {
        const currentHeight = $.fn.constructor('.dxrd-navigation-panel-wrapper').outerHeight();
        if (this.height() !== currentHeight) {
            this.height(currentHeight);
        }
    }
}