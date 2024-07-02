﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_errorPanelViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { convertFromCssPixelUnits, formatUnicorn, getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization, _LatestChangeSet } from '@devexpress/analytics-core/analytics-utils';
import DataSource from 'devextreme/data/data_source';
import ButtonGroup from 'devextreme/ui/button_group';
import DataGrid from 'devextreme/ui/data_grid';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { BandSurface } from '../../bands/xrBand';
import { XRCrossBandSurface } from '../../controls/xrCrossband';
import { ErrorSource, ErrorType } from './_types';
export class ErrorPanelViewModel extends Disposable {
    constructor(options) {
        super();
        this._offset = 20;
        this._height = ko.observable(210);
        this._errorSource = ko.observableArray([]);
        this._choosenTypes = ko.observableArray([]);
        this._filterValue = ko.observable();
        this._getUndoEngine = null;
        this._onClick = () => void 0;
        this._latestChangeSet = ko.observable(_LatestChangeSet.Empty());
        this._openErrorPanelIconHeight = 42;
        this.collapsed = ko.observable(true);
        this.position = ko.observable(null);
        this._suppressedErrorCodes = ko.observableArray();
        this._errorList = ko.observableArray([]);
        this._providers = [];
        this._subscriptions = [];
        this.panelTitle = getLocalization('Report Design Analyzer', 'ASPxReportsStringId.ReportDesigner_ErrorPanel_Title');
        this._initOptions = options || {};
        this._editableObject = options.editableObject;
        this._resizableOptions = {
            starting: $.noop,
            handles: 'n',
            start: (e, element) => {
            },
            stop: () => { },
            resize: (e, element) => {
                const originalHeight = convertFromCssPixelUnits(element.dataset.originalHeight);
                const sizeDiff = e.pageY - convertFromCssPixelUnits(element.dataset.originalTopMousePosition);
                this._height(originalHeight - sizeDiff);
            },
            disabled: this.collapsed,
            zoom: 1,
            minimumHeight: ko.computed(() => this.collapsed() ? this._openErrorPanelIconHeight : 210),
            maxHeight: 420
        };
        this._getUndoEngine = () => options.undoEngine && options.undoEngine();
        this._onClick = options.onClick;
        this._disposables.push(this._resizableOptions.minimumHeight);
        this._disposables.push({
            dispose: () => {
                this._getUndoEngine = null;
                this._latestChangeSet(_LatestChangeSet.Empty());
            }
        });
        DataGrid.length;
        ButtonGroup.length;
        if (options.position) {
            this._disposables.push(this._position = ko.computed(() => {
                const left = this.collapsed() ? 'auto' : (options.position.left() + this._offset);
                const right = options.position.right() + this._offset;
                return {
                    left: options.rtl ? right : left,
                    right: options.rtl ? left : right,
                    height: (!this.collapsed() ? this._height() : 42),
                };
            }));
        }
        this._disposables.push(this._collectErrorButtonDisabled = ko.computed(() => {
            return options.undoEngine && options.undoEngine() && options.undoEngine().getCurrentChangeSet().equal(this._latestChangeSet());
        }));
        this._selection = options.selection;
        this._controlsHelper = options.controlsHelper;
        this._controlScrollingTool = options.controlScrollingTool;
        this.createDataGridOptions(options.undoEngine);
        this._initDefaultFilter();
        this._assignFilter();
        this._disposables.push(this._errorMessage, this._warningMessage, this._informationMessage);
        this._disposables.push(...([this._errorSource, this._choosenTypes].map(x => x.subscribe(() => this._assignFilter(), undefined, undefined))));
        this._disposables.push(this._filteredErrorList = ko.computed(() => this._errorList().filter(x => {
            return this._errorSource().indexOf(x.errorSource) !== -1 &&
                (this._suppressedErrorCodes() || []).indexOf(x.code) === -1;
        })), this._errorMessage = ko.computed(() => this._createMessage(this._filteredErrorList().filter(x => x.errorType == ErrorType.Error).length, getLocalization('{0} Error|{0} Errors', 'ReportStringId.ReportDesignAnalyzer_Error'))), this._warningMessage = ko.computed(() => this._createMessage(this._filteredErrorList().filter(x => x.errorType == ErrorType.Warning).length, getLocalization('{0} Warning|{0} Warnings', 'ReportStringId.ReportDesignAnalyzer_Warning'))), this._informationMessage = ko.computed(() => this._createMessage(this._filteredErrorList().filter(x => x.errorType == ErrorType.Information).length, getLocalization('{0} Message|{0} Messages', 'ReportStringId.ReportDesignAnalyzer_Message'))));
    }
    static get allErrorSources() {
        return Object.keys(ErrorSource).filter(key => isNaN(parseFloat(key)));
    }
    static get allErrorTypes() {
        return Object.keys(ErrorType).filter(key => isNaN(parseFloat(key)));
    }
    _createMessage(count, localizationFormat) {
        const formats = localizationFormat.split('|');
        if (count === 1)
            return formatUnicorn(formats[0], count);
        return formatUnicorn(formats[1], count);
    }
    _createAvailableSourcesArray() {
        var _a, _b, _c, _d;
        const dataSource = [];
        if ((_a = this._initOptions) === null || _a === void 0 ? void 0 : _a.showReportCreationErrorSource)
            dataSource.push({ value: ErrorSource.ReportCreation, displayValue: getLocalization('Report Creation', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Creation') });
        if ((_b = this._initOptions) === null || _b === void 0 ? void 0 : _b.showReportLayoutErrorSource)
            dataSource.push({ value: ErrorSource.ReportLayout, displayValue: getLocalization('Report Layout', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Layout') });
        if ((_c = this._initOptions) === null || _c === void 0 ? void 0 : _c.showReportScriptsErrorSource)
            dataSource.push({ value: ErrorSource.ReportScripts, displayValue: getLocalization('Report Scripts', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Scripts') });
        if ((_d = this._initOptions) === null || _d === void 0 ? void 0 : _d.showReportExportErrorSource)
            dataSource.push({ value: ErrorSource.ReportExport, displayValue: getLocalization('Report Export', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Export') });
        return dataSource;
    }
    _expandParentBands(root) {
        while (root) {
            const surface = root.surface;
            if (surface instanceof BandSurface) {
                surface.collapsed(false);
            }
            else if (surface instanceof XRCrossBandSurface) {
                const rect = surface['_unitAbsoluteRect'];
                const expandedBands = [];
                surface.parent.getChildrenCollection()().forEach(band => {
                    if (surface.isThereIntersection(rect, band.absoluteRect())) {
                        band.collapsed(false);
                        expandedBands.push(band);
                    }
                });
                const expandChildBands = (bands) => {
                    bands && bands.forEach(band => {
                        band.collapsed(false);
                        expandChildBands(band.bandsHolder.bands());
                    });
                };
                expandChildBands(expandedBands);
                return;
            }
            root = root.parentModel();
        }
    }
    clear() {
        this._providers = [];
        this._subscriptions.forEach(x => x.dispose());
        this._subscriptions = [];
        this._errorList([]);
    }
    navigateToItem(name) {
        this._onClick && this._onClick();
        const control = this._controlsHelper.getControlByName(name);
        if (!control)
            return;
        if (control['surface']) {
            this._expandParentBands(control);
            this._selection.focused(control['surface']);
            this._controlScrollingTool.scrollToControl(control['surface']);
        }
        else {
            this._editableObject(control);
        }
    }
    getNotificationTemplate() {
        return this._errorList().length > 0 ? 'dxrd-svg-errorPanel-notification' : 'dxrd-svg-errorPanel-notification_empty';
    }
    getTitleMessage() {
        return [this._errorMessage(), this._warningMessage(), this._informationMessage()].join('\n');
    }
    assignErrors() {
        const errors = this._errorList();
        errors.splice(0);
        for (let i = 0; i < this._providers.length; i++) {
            this._providers[i].errors().forEach(x => {
                var _a;
                x.link = 'https://docs.devexpress.com/XtraReports/403060#' + x.code.toLowerCase();
                x.showLink = (_a = this._initOptions) === null || _a === void 0 ? void 0 : _a.enableErrorCodeLinks;
            });
            errors.push(...this._providers[i].errors());
        }
        this._errorList.valueHasMutated();
    }
    subscribeProvider(provider) {
        this._providers.push(provider);
        this._subscriptions.push(provider.errors.subscribe((errors) => {
            this.assignErrors();
        }));
        this.assignErrors();
    }
    collectErrors() {
        const undo = this._getUndoEngine();
        const latestChanges = undo && undo.getCurrentChangeSet();
        if (!undo || !latestChanges.equal(this._latestChangeSet())) {
            this._latestChangeSet(latestChanges);
            for (let i = 0; i < this._providers.length; i++) {
                this._providers[i].collectErrors();
            }
        }
    }
    toggleCollapsed() {
        if (this.collapsed())
            this.collectErrors();
        this.collapsed(!this.collapsed());
    }
    createDataGridOptions(undoEngine) {
        const ds = ko.observable(new DataSource(this._errorList()));
        this._disposables.push(this._errorList.subscribe((newVal) => {
            ds().dispose();
            ds(new DataSource(this._errorList()));
        }));
        this._suppressedErrorCodes(this._initOptions.suppressedErrorCodes || []);
        this._dataGridOptions = {
            dataSource: ds,
            showColumnLines: false,
            showRowLines: true,
            showBorders: false,
            headerFilter: {
                visible: true
            },
            filterValue: this._filterValue,
            noDataText: getLocalization('No errors', 'ASPxReportsStringId.ReportDesigner_ErrorPanel_NoErrors'),
            columns: [{
                    caption: ' ',
                    width: '30px',
                    dataField: 'errorType',
                    alignment: 'left',
                    allowHeaderFiltering: false,
                    cellTemplate: 'dxrd-errorType-column',
                    dataType: 'number'
                }, {
                    dataField: 'code',
                    caption: getLocalization('Code', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Code'),
                    cellTemplate: 'dxrd-code-column',
                    filterType: 'exclude',
                    filterValues: this._suppressedErrorCodes(),
                    dataType: 'string'
                }, {
                    dataField: 'errorSource',
                    visible: false,
                    dataType: 'number'
                }, {
                    dataField: 'description',
                    visible: false,
                    dataType: 'string'
                },
                {
                    dataField: 'message',
                    allowFiltering: false,
                    caption: getLocalization('Description', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Description'),
                    dataType: 'string'
                },
                {
                    dataField: 'controlName',
                    allowFiltering: false,
                    caption: getLocalization('Source', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Source'),
                    cellTemplate: 'dxrd-source-column',
                    dataType: 'string'
                }],
            searchPanel: {
                visible: true
            },
            masterDetail: {
                enabled: true,
                template: 'detail'
            },
            onOptionChanged: (e) => {
                if (/columns\[[0-9]+\].filterValues/i.test(e.fullName)) {
                    this._suppressedErrorCodes(e.value || []);
                }
            },
            toolbar: {
                items: [
                    {
                        template: 'dxrd-error-source-filter',
                        data: {
                            value: this._errorSource,
                            dataSource: this._createAvailableSourcesArray(),
                            getContainer: getParentContainer
                        },
                        location: 'before'
                    }, {
                        template: 'dxrd-error-type-filter',
                        data: {
                            selectedItemKeys: this._choosenTypes,
                            items: [
                                { template: 'dxrd-error-type-filter-item', text: () => this._errorMessage(), icon: ErrorType.Error },
                                { template: 'dxrd-error-type-filter-item', text: () => this._warningMessage(), icon: ErrorType.Warning },
                                { template: 'dxrd-error-type-filter-item', text: () => this._informationMessage(), icon: ErrorType.Information }
                            ], keyExpr: 'icon', selectionMode: 'multiple', stylingMode: 'outlined'
                        },
                        location: 'before'
                    }, {
                        widget: 'dxButtonWithTemplate',
                        cssClass: 'dxrd-collect-errors-button',
                        options: {
                            icon: 'dxrd-svg-errorPanel-collectErrors',
                            text: getLocalization('Collect Errors', 'ASPxReportsStringId.ReportDesigner_Analyzer_CollectErrors'),
                            onClick: () => this.collectErrors(),
                            disabled: this._collectErrorButtonDisabled
                        },
                        location: 'before'
                    }, 'searchPanel'
                ]
            }
        };
    }
    _initDefaultFilter() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (((_a = this._initOptions) === null || _a === void 0 ? void 0 : _a.enableReportCreationErrorSource) && ((_b = this._initOptions) === null || _b === void 0 ? void 0 : _b.showReportCreationErrorSource))
            this._errorSource.push(ErrorSource.ReportCreation);
        if (((_c = this._initOptions) === null || _c === void 0 ? void 0 : _c.enableReportLayoutErrorSource) && ((_d = this._initOptions) === null || _d === void 0 ? void 0 : _d.showReportLayoutErrorSource))
            this._errorSource.push(ErrorSource.ReportLayout);
        if (((_e = this._initOptions) === null || _e === void 0 ? void 0 : _e.enableReportScriptsErrorSource) && ((_f = this._initOptions) === null || _f === void 0 ? void 0 : _f.showReportScriptsErrorSource))
            this._errorSource.push(ErrorSource.ReportScripts);
        if (((_g = this._initOptions) === null || _g === void 0 ? void 0 : _g.enableReportExportErrorSource) && ((_h = this._initOptions) === null || _h === void 0 ? void 0 : _h.showReportExportErrorSource))
            this._errorSource.push(ErrorSource.ReportExport);
        if ((_j = this._initOptions) === null || _j === void 0 ? void 0 : _j.showErrors)
            this._choosenTypes.push(ErrorType.Error);
        if ((_k = this._initOptions) === null || _k === void 0 ? void 0 : _k.showWarnings)
            this._choosenTypes.push(ErrorType.Warning);
        if ((_l = this._initOptions) === null || _l === void 0 ? void 0 : _l.showInformation)
            this._choosenTypes.push(ErrorType.Information);
    }
    _assignFilter() {
        const filter = [];
        const uncheckedTypes = ErrorPanelViewModel.allErrorTypes.map(x => ErrorType[x]).filter(x => this._choosenTypes().indexOf(x) === -1);
        const uncheckedSources = ErrorPanelViewModel.allErrorSources.map(x => ErrorSource[x]).filter(x => this._errorSource().indexOf(x) === -1);
        if (uncheckedTypes.length) {
            filter.push(['errorType', 'noneof', uncheckedTypes]);
        }
        if (uncheckedSources.length) {
            filter.push(['errorSource', 'noneof', uncheckedSources]);
        }
        this._filterValue(filter.reduce((res, val) => {
            if (!res.length)
                res.push(val);
            else
                res.push('and', val);
            return res;
        }, []));
    }
    getIconTemplateName(errorType) {
        return 'dxrd-svg-errorPanel-' + ErrorType[errorType].toLowerCase();
    }
}