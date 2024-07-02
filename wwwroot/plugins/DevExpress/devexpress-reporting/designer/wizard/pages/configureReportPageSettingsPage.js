﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getPaperSize } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { subscribeProperties } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { paperKind } from '../../controls/metadata/xrReport';
import { PageSetupHelper } from '../internal/_pageSetupUtils';
import { ReportWizardPageId } from '../pageId';
import { defaultPageSetupState, GraphicsUnit } from '../reportWizardState';
export class PreviewPageHelper extends Disposable {
    constructor(settings) {
        super();
        this.width = ko.observable(0);
        this.height = ko.observable(0);
        this.marginLeft = ko.observable(0);
        this.marginRight = ko.observable(0);
        this.marginTop = ko.observable(0);
        this.marginBottom = ko.observable(0);
        this.pagePreviewElement = ko.observable(null);
        if (settings) {
            this.width = settings.width;
            this.height = settings.height;
            this.marginLeft = settings.marginLeft;
            this.marginRight = settings.marginRight;
            this.marginTop = settings.marginTop;
            this.marginBottom = settings.marginBottom;
        }
        const elementWidth = ko.computed(() => this.pagePreviewElement() && this.pagePreviewElement().width() || 200).extend({ throttle: 100 });
        const elementHeight = ko.computed(() => this.pagePreviewElement() && this.pagePreviewElement().height() || 292).extend({ throttle: 100 });
        const previewRatio = ko.computed(() => Math.min(elementWidth() / this.width(), elementHeight() / this.height()));
        const resizeHandler = () => {
            this.pagePreviewElement.valueHasMutated();
        };
        window.addEventListener('resize', resizeHandler);
        this._disposables.push({
            dispose: () => {
                this.pagePreviewElement(null);
                window.removeEventListener('resize', resizeHandler);
            }
        }, elementWidth, elementHeight, previewRatio, this.previewPageHeight = ko.pureComputed(() => this.height() * previewRatio()), this.previewPageWidth = ko.pureComputed(() => Math.round(this.width() * previewRatio())), this.previewTopMargin = ko.pureComputed(() => Math.round(this.marginTop() * previewRatio())), this.previewRightMargin = ko.pureComputed(() => Math.round(this.marginRight() * previewRatio())), this.previewBottomMargin = ko.pureComputed(() => Math.round(this.marginBottom() * previewRatio())), this.previewLeftMargin = ko.pureComputed(() => Math.round(this.marginLeft() * previewRatio())));
    }
    cachePagePreviewElement($element) {
        setTimeout(() => {
            this.pagePreviewElement($element);
        }, 100);
    }
    updatePageSettings(pageSetup) {
        this.width(pageSetup.width);
        this.height(pageSetup.height);
        this.marginTop(pageSetup.marginTop);
        this.marginRight(pageSetup.marginRight);
        this.marginBottom(pageSetup.marginBottom);
        this.marginLeft(pageSetup.marginLeft);
    }
}
export class ConfigureReportPageSettingsPage extends WizardPageBase {
    constructor() {
        super();
        this.lookupData = {
            paperKind: paperKind.valuesArray
                .map(x => { return { value: x.value, displayName: getLocalization(x.displayValue, x.localizationId) }; })
                .sort((a, b) => a.value === 'Custom' ? 1 : b.value === 'Custom' ? -1 : a.displayName.localeCompare(b.displayName)),
            unit: [
                { value: GraphicsUnit.Inch, displayName: getLocalization('Inch', 'AnalyticsCoreStringId.Wizard_Inch') },
                { value: GraphicsUnit.Millimeter, displayName: getLocalization('Millimeter', 'AnalyticsCoreStringId.Wizard_Millimeter') },
                { value: GraphicsUnit.Pixel, displayName: getLocalization('Pixel', 'ASPxReportsStringId.ReportDesigner_Wizard_Pixel') }
            ]
        };
        this.paperKind = ko.observable(defaultPageSetupState.paperKind);
        this.landscape = ko.observable(defaultPageSetupState.landscape);
        this.width = ko.observable(defaultPageSetupState.width);
        this.height = ko.observable(defaultPageSetupState.height);
        this._disposables.push(this.fixedSize = ko.computed(() => this.paperKind() !== 'Custom'));
        this.marginTop = ko.observable(defaultPageSetupState.marginTop);
        this.marginRight = ko.observable(defaultPageSetupState.marginRight);
        this.marginBottom = ko.observable(defaultPageSetupState.marginBottom);
        this.marginLeft = ko.observable(defaultPageSetupState.marginLeft);
        this._disposables.push(this.previewPageHelper = new PreviewPageHelper({
            height: this.height,
            width: this.width,
            marginTop: this.marginTop,
            marginRight: this.marginRight,
            marginBottom: this.marginBottom,
            marginLeft: this.marginLeft
        }));
        this._unit = ko.observable(defaultPageSetupState.unit);
        this._disposables.push(this.unit = ko.computed({
            read: () => this._unit(),
            write: (newVal) => {
                const converter = PageSetupHelper.getConverter(this._unit(), newVal);
                [this.width, this.height, this.marginTop, this.marginRight, this.marginBottom, this.marginLeft].forEach(x => { x(converter(x())); });
                this._unit(newVal);
            }
        }));
        this._disposables.push(this.paperKind.subscribe(newVal => {
            if (newVal !== 'Custom') {
                const convert = PageSetupHelper.getConverter(GraphicsUnit.Inch, this._unit());
                const size = getPaperSize(newVal, 0);
                let width = convert(size.width / 100);
                let height = convert(size.height / 100);
                if (this.landscape())
                    [width, height] = [height, width];
                this.width(width);
                this.height(height);
            }
        }));
        this._disposables.push(this.landscape.subscribe((newVal) => {
            const width = this.height();
            const height = this.width();
            this.width(width);
            this.height(height);
            let t = this.marginTop(), r = this.marginRight(), b = this.marginBottom(), l = this.marginLeft();
            [t, r, b, l] = newVal
                ? [l, t, r, b]
                : [r, b, l, t];
            this.marginTop(t);
            this.marginRight(r);
            this.marginBottom(b);
            this.marginLeft(l);
        }));
        this._disposables.push(this.valueFormat = ko.pureComputed(() => {
            switch (this._unit()) {
                case GraphicsUnit.Inch:
                    return '#0.00 "';
                case GraphicsUnit.Millimeter:
                    return '#0.0 mm';
                case GraphicsUnit.Pixel:
                    return '#0 px';
            }
        }));
        this._disposables.push(...subscribeProperties([
            this.paperKind,
            this.landscape,
            this.width,
            this.height,
            this.marginTop,
            this.marginLeft,
            this.marginRight,
            this.marginBottom,
            this.unit
        ], () => this._onChange()));
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        this.paperKind(state.paperKind);
        this.landscape(state.landscape);
        this.unit(state.unit);
        if (state.paperKind === 'Custom') {
            this.width(state.width);
            this.height(state.height);
        }
        this.marginLeft(state.marginLeft);
        this.marginRight(state.marginRight);
        this.marginTop(state.marginTop);
        this.marginBottom(state.marginBottom);
        return $.Deferred().resolve().promise();
    }
    commit() {
        return $.Deferred().resolve({
            paperKind: this.paperKind(),
            unit: this.unit(),
            width: this.width(),
            height: this.height(),
            marginLeft: this.marginLeft(),
            marginRight: this.marginRight(),
            marginTop: this.marginTop(),
            marginBottom: this.marginBottom(),
            landscape: this.landscape()
        }).promise();
    }
}
export function _applyPageSetting(data, state) {
    state.height = data.height;
    state.landscape = data.landscape;
    state.marginBottom = data.marginBottom;
    state.marginLeft = data.marginLeft;
    state.marginRight = data.marginRight;
    state.marginTop = data.marginTop;
    state.paperKind = data.paperKind;
    state.unit = data.unit;
    state.width = data.width;
}
export function _registerConfigureReportPageSettingsPage(factory) {
    factory.registerMetadata(ReportWizardPageId.ConfigureReportPageSettingsPage, {
        create: () => new ConfigureReportPageSettingsPage(),
        getState: (state) => state.pageSetup,
        setState: (data, state) => {
            _applyPageSetting(data, state);
        },
        resetState: (state, defaultState) => {
            _applyPageSetting(defaultState, state);
        },
        template: 'dxrd-page-pageSetup',
        description: getLocalization('Specify report page settings.', 'ASPxReportsStringId.ReportDesigner_Wizard_PageSetup_Description')
    });
}