﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrUnknownControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotifyAboutWarning, isFunction } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportRenderingService } from '../services/_reportRenderingService';
import { HandlerUri } from '../utils/settings';
import { XRControlSurface } from './xrControl';
import { ReportViewModel } from './xrReport';
import { SubreportViewModel } from './subreportViewModel';
export class XRUnknownControlSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.isLoading = ko.observable(false);
        this.imageSrc = ko.observable('');
        this.error = ko.observable('');
        this.template = 'dxrd-unknown-control';
        this.contenttemplate = 'dxrd-server-rendered-control-content';
        let fetchTimeout = null;
        let lastFetch = null;
        this._disposables.push(ko.computed(() => {
            const _self = this;
            if (HandlerUri()) {
                fetchTimeout && clearTimeout(fetchTimeout);
                const zoomValue = _self._context.zoom();
                const measureUnit = _self._control.root.measureUnit();
                const parentStyles = _self._getParentStyles();
                const serializedControl = new ModelSerializer().serialize(_self._control);
                fetchTimeout = setTimeout(() => {
                    _self.isLoading(true);
                    const report = new ReportViewModel(Object.assign(Object.assign({}, SubreportViewModel.defaultReport), { measureUnit }));
                    const detailBand = report.bands()[1];
                    _self._applyParentStyles(parentStyles, detailBand);
                    detailBand.createChild(serializedControl);
                    const serializedReport = report.serialize();
                    report.dispose();
                    const deferred = ReportRenderingService.getUnknownControlImage(serializedReport, zoomValue);
                    lastFetch = deferred;
                    deferred.done(function (result) {
                        if (lastFetch === deferred) {
                            _self.isLoading(false);
                            _self.imageSrc('data:image/x;base64,' + result.Img);
                        }
                    }).fail(function (jqXHR) {
                        if (lastFetch === deferred) {
                            _self.isLoading(false);
                            NotifyAboutWarning('Impossible to get control image.');
                            _self.error('An error occurred during an attempt to load data');
                        }
                    });
                }, 200);
            }
        }));
    }
    getValue(getter) {
        return getter && (isFunction(getter) ? getter() : getter);
    }
    _getParentStyles() {
        const root = this._control.root;
        const parentModel = this._control.parentModel();
        return {
            measureUnit: root.measureUnit(),
            backColor: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.backColor),
            borderColor: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.borderColor),
            borderDashStyle: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.borderDashStyle),
            borders: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.borders),
            borderWidth: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.borderWidth),
            font: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.font),
            foreColor: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.foreColor),
            padding: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.padding),
            textAlignment: this.getValue(parentModel === null || parentModel === void 0 ? void 0 : parentModel.textAlignment),
        };
    }
    _applyParentStyles(parentStyles, detailsBand) {
        Object.getOwnPropertyNames(parentStyles)
            .forEach((prop) => {
            if (parentStyles[prop] && detailsBand[prop] && isFunction(detailsBand[prop])) {
                detailsBand[prop](parentStyles[prop]);
            }
        });
    }
}
