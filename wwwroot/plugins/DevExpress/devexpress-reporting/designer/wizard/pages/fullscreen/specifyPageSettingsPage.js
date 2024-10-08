﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyPageSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FullscreenWizardPage, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { WizardSectionPosition } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId, ReportWizardPageId } from '../../pageId';
import { defaultPageSetupState } from '../../reportWizardState';
import { _registerConfigureReportPageSettingsSection } from '../configureReportPageSettingsAndColorSchemeSection';
import { PreviewPageHelper, _applyPageSetting } from '../configureReportPageSettingsPage';
export class SpecifyPageSettingsPage extends FullscreenWizardPage {
    constructor(_reportWizardOptions) {
        super();
        this._reportWizardOptions = _reportWizardOptions;
    }
    canNext() {
        return false;
    }
    canFinish() {
        return true;
    }
    registerSections() {
        _registerConfigureReportPageSettingsSection(this._factory);
        _registerSpecifyReportTitlePage(this._factory);
        let meta = this._factory.getMetadata(FullscreenReportWizardSectionId.ConfigurePageSettingsPage);
        meta['recreate'] = false;
        meta.description = getLocalization('Specify page settings and a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettingsColorScheme');
        meta = this._factory.getMetadata(FullscreenReportWizardSectionId.SpecifyReportTitlePage);
        meta['recreate'] = false;
        meta.description = getLocalization('Specify the report title.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyReportTitle');
        this._setSectionPosition(FullscreenReportWizardSectionId.ConfigurePageSettingsPage, this._reportWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
        this._setSectionPosition(FullscreenReportWizardSectionId.SpecifyReportTitlePage, this._reportWizardOptions.rtl ? WizardSectionPosition.Left : WizardSectionPosition.Right);
    }
    getNextSectionId(sectionId) {
        if (!sectionId)
            return FullscreenReportWizardSectionId.ConfigurePageSettingsPage;
        else if (sectionId === FullscreenReportWizardSectionId.ConfigurePageSettingsPage)
            return FullscreenReportWizardSectionId.SpecifyReportTitlePage;
    }
}
export function _registerSpecifyPageSettingsPage(factory, reportWizardOptions) {
    factory.registerMetadata(FullscreenReportWizardPageId.SpecifyPageSettingsPage, {
        getState: (state) => {
            return state;
        },
        setState: (data, state) => {
            state.colorScheme.baseColor = data.colorScheme.baseColor;
            state.colorScheme.name = data.colorScheme.name;
            state.reportTitle = data.reportTitle;
            _applyPageSetting(data.pageSetup, state.pageSetup);
        },
        resetState: (state, defaultState) => {
            state.colorScheme.baseColor = defaultState.colorScheme.baseColor;
            state.colorScheme.name = defaultState.colorScheme.name;
            state.reportTitle = defaultState.reportTitle;
            _applyPageSetting(defaultState.pageSetup, state.pageSetup);
        },
        create: () => {
            return new SpecifyPageSettingsPage(reportWizardOptions);
        },
        template: 'dx-wizard-fullscreen-page',
        description: getLocalization('Manage page and color settings.', 'TODO'),
        navigationPanelText: getLocalization('Specify Page Settings', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettings')
    });
}
export class SpecifyReportTitlePage extends WizardPageBase {
    constructor() {
        super();
        this._foreColor = ko.observable('white');
        this._masterDetailInfo = ko.observableArray();
        this.reportTitle = ko.observable('');
        this._color = ko.observable('rgba( 75, 75, 75, 1)');
        this._disposables.push(this.reportTitle.subscribe(() => this._onChange()));
        this._disposables.push(this._previewPageHelper = new PreviewPageHelper());
        this._previewPageHelper.updatePageSettings(defaultPageSetupState);
    }
    _getBrightness(r, g, b) {
        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return (max + min) / 2;
    }
    _fillTables(info) {
        info.forEach((item) => {
            const fields = item.fields.filter(x => x.checked);
            if (fields.length > 0) {
                this._masterDetailInfo.push({
                    fields: fields.slice(0, 4)
                });
            }
            if (item.relations.length > 0) {
                this._fillTables(item.relations);
            }
        });
    }
    initialize(state) {
        const deferred = $.Deferred();
        this._masterDetailInfo([]);
        if (state.colorScheme['baseColor']) {
            this._color(state.colorScheme['_color']);
            const color = state.colorScheme['baseColor'].split(',').map(x => parseInt(x));
            this._foreColor(this._getBrightness(color[1], color[2], color[3]) > 0.6 ? 'black' : 'white');
        }
        this.reportTitle(state.reportTitle ? state.reportTitle : '');
        this._fillTables(state.masterDetailInfoCollection);
        this._reportTitleVisible = !!(state.dataSource || state.newDataSource);
        this._previewPageHelper.updatePageSettings(state.pageSetup);
        super.initialize(state.pageSetup).done(() => {
            deferred.resolve();
        });
        return deferred.promise();
    }
    commit() {
        const deferred = $.Deferred();
        deferred.resolve({
            reportTitle: this.reportTitle()
        });
        return deferred.promise();
    }
    _reportTitlePlaceholder() {
        return getLocalization('Type title here...', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportTitle_Placeholder');
    }
}
export function _registerSpecifyReportTitlePage(factory) {
    factory.registerMetadata(ReportWizardPageId.SetReportTitlePage, {
        create: () => new SpecifyReportTitlePage(),
        getState: (state) => state,
        setState: (data, state) => {
            state.reportTitle = data.reportTitle;
        },
        resetState: (state, defaultState) => {
            state.reportTitle = defaultState.reportTitle;
        },
        template: 'dxrd-page-pageSetup-preview',
        description: getLocalization('Manage page and color settings.', 'TODO')
    });
}
