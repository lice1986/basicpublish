﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreport.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { pixelToUnits } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { Locker } from '../../common/utils/_locker';
import { collectAvailableParameters } from '../dataObjects/metadata/_parameterUtils';
import { ReportStorageWeb } from '../services/reportStorageWeb';
import { SubreportViewModel } from './subreportViewModel';
import { patchSubreport } from './utils/_modelPatch';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ReportViewModel } from './xrReport';
import { ParameterBinding } from './xrSubreportParameterBinding';
export class XRSubreportViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(patchSubreport(model), parent, serializer);
        this.needProcessLocation = false;
        this.subreportParameters = ko.observableArray();
        const _width = ko.observable(this.size.width());
        this.size['_width'] = _width;
        this._disposables.push(this.key = ko.pureComputed(() => {
            const key = this.parentModel() && this.parentModel().root && this.parentModel().root['key'];
            return (key ? (key() + '.') : '') + (this.name() ? this.name() : '');
        }));
        this._generateOwnPages = ko.observable(this.generateOwnPages());
        let oldgenerateOwnPagesIsActive = this._generateOwnPages();
        this._disposables.push(this.generateOwnPages = ko.pureComputed({
            read: () => {
                return this._generateOwnPages();
            },
            write: (newVal) => {
                if (this.isPropertyDisabled('generateOwnPages'))
                    return;
                const undo = UndoEngine.tryGetUndoEngine(this.parentModel());
                undo && undo.start();
                this._generateOwnPages(newVal);
                undo && undo.end();
                oldgenerateOwnPagesIsActive = this._getCurrentGenerateOwnPagesIsActive();
            }
        }), this.generateOwnPagesIsActive = ko.computed(() => {
            return this._getCurrentGenerateOwnPagesIsActive();
        }), this.generateOwnPagesIsActive.subscribe((newVal) => {
            this._calculateSubreportPosition(newVal);
        }), this.size.width = ko.computed({
            read: () => {
                if (this.generateOwnPagesIsActive())
                    return this.parentModel()['size'].width();
                return _width();
            },
            write: (newVal) => {
                _width(newVal);
            }
        }));
        this._disposables.push(this.parentModel.subscribe((newVal) => {
            this.needProcessLocation = oldgenerateOwnPagesIsActive !== this._getCurrentGenerateOwnPagesIsActive() || (oldgenerateOwnPagesIsActive && this._getCurrentGenerateOwnPagesIsActive());
            oldgenerateOwnPagesIsActive = this._getCurrentGenerateOwnPagesIsActive();
        }));
        this.size.isPropertyDisabled = (propertyName) => {
            if (propertyName === 'width')
                return this.generateOwnPagesIsActive();
            return false;
        };
        let storageSubscription = null;
        if (this.reportSource) {
            this.reportSource.key = this.key;
            if (parent) {
                if (this.reportSource['objectStorageIsEmpty']()) {
                    parent.root['objectStorage']([
                        ...parent.root['objectStorage'](),
                        ...this.reportSource.objectStorage()
                    ]);
                    this.reportSource.objectStorage([...parent.root['objectStorage']()]);
                    storageSubscription = this._subscribeStorages(this.reportSource.objectStorage, parent.root['objectStorage']);
                    this._disposables.push(storageSubscription);
                }
            }
        }
        this.parameterBindings = deserializeArray(model.ParameterBindings, (item) => {
            const binding = new ParameterBinding(item, this, serializer);
            this._initParameter(binding);
            return binding;
        });
        this.updateParameters();
        this._disposables.push(this.parameterBindings.subscribe((changes) => {
            for (let index = 0; index < changes.length; index++) {
                if (changes[index].status === 'added') {
                    this._initParameter(changes[index].value);
                }
            }
        }, null, 'arrayChange'));
        if ('parameters' in this.root) {
            this._disposables.push(this.root['parameters'].subscribe((newParameters) => {
                this.parameterBindings().forEach((param) => {
                    if (!collectAvailableParameters(newParameters).some((parameter) => { return parameter === param.parameter(); })) {
                        param.parameter(null);
                    }
                });
            }));
        }
        this._disposables.push(this.reportSourceUrl.subscribe((newVal) => {
            storageSubscription && storageSubscription.dispose();
            this.reportSource && this.reportSource.dispose();
            if (!newVal)
                this.reportSource = new SubreportViewModel(SubreportViewModel.defaultReport, serializer);
            this.updateParameters();
        }));
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.parameterBindings);
        this.reportSource && this.reportSource.dispose();
        this.resetObservableArray(this.parameterBindings);
    }
    getInfo() {
        const serializationInfo = $.extend(true, [], super.getInfo());
        if (this.reportSourceUrl && this.reportSourceUrl()) {
            const property = serializationInfo.filter((item) => { return item.propertyName === 'reportSource'; })[0];
            serializationInfo.splice(serializationInfo.indexOf(property), 1);
        }
        return serializationInfo;
    }
    _getCurrentGenerateOwnPagesIsActive() {
        return this.generateOwnPages() && !this.isPropertyDisabled('generateOwnPages');
    }
    _clearReportModel(reportModel) {
        const ignoreProperties = ['Parameters', 'ObjectStorage', 'ComponentStorage'];
        Object.keys(reportModel).forEach(x => {
            if (ignoreProperties.indexOf(x) === -1)
                delete reportModel[x];
        });
    }
    _assignParameters(parameters) {
        this.subreportParameters(collectAvailableParameters(parameters).map(x => x.name));
        this.refreshParameterBindings();
    }
    _calculateSubreportPosition(generateOwnPagesIsActive) {
        const offset = generateOwnPagesIsActive ? 0 : pixelToUnits(5, this.root.measureUnit(), 1);
        this.size.width(this.parentModel()['size'].width() - offset * 2);
        this.location.x(offset);
    }
    _subscribeStorages(objectStorage1, objectStorage2) {
        const locker = new Locker();
        const subscriptions = [
            objectStorage1.subscribe((newVal) => locker.lock(() => objectStorage2(newVal))),
            objectStorage2.subscribe((newVal) => locker.lock(() => objectStorage1(newVal)))
        ];
        return { dispose: () => subscriptions.forEach(x => x.dispose()) };
    }
    _initParameter(parameter) {
        parameter.initReportDataSource(() => this.root['dataSource'] && this.root['dataSource']() || null);
        parameter.initSubreportParameters(() => this.subreportParameters());
    }
    refreshParameterBindings() {
        this.parameterBindings().forEach((x) => x.refresh());
    }
    isPropertyDisabled(propertyName) {
        if (propertyName === 'generateOwnPages')
            return this.parentModel()
                && ['ReportHeaderBand', 'ReportFooterBand', 'GroupHeaderBand', 'GroupFooterBand', 'DetailBand'].indexOf(this.parentModel().controlType) === -1;
        return super.isPropertyDisabled(propertyName);
    }
    updateParameters() {
        if (this.reportSourceUrl()) {
            ReportStorageWeb.getData(this.reportSourceUrl()).done((result) => {
                const reportJSONModel = JSON.parse(result.reportLayout);
                this._clearReportModel(reportJSONModel.XtraReportsLayoutSerializer);
                const report = new ReportViewModel(reportJSONModel);
                this._assignParameters(report.parameters());
            });
        }
        else if (this.reportSource) {
            this._assignParameters(this.reportSource.parameters());
        }
    }
    cloneReportSource() {
        var _a;
        if (this.reportSource) {
            const dataSourceRefFromParent = (_a = this.root) === null || _a === void 0 ? void 0 : _a.dataSourceRefs;
            return this.reportSource.clone(dataSourceRefFromParent);
        }
    }
    get root() {
        return this._getRoot();
    }
}
export class XRSubreportSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.template = 'dxrd-subreport';
        this.selectiontemplate = 'dxrd-subreport-selection';
        this.displayText = () => { return control.name(); };
    }
    getAdornTemplate() {
        let result = '';
        result = XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']());
        result = XRControlSurface._appendValue(result, 'dxrd-intersect', this.isIntersect());
        return result;
    }
    getResizableOptions(resizeHandler) {
        return $.extend(true, {}, resizeHandler, {
            handles: ko.pureComputed(() => {
                return this._control.generateOwnPagesIsActive() ? 's,n' : 'all';
            }),
        });
    }
    processLocation(location) {
        if (this._control.needProcessLocation) {
            this._control.needProcessLocation = false;
            return { top: location.top };
        }
        return location;
    }
}
