﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportLayoutPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFirstItemByPropertyValue } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { LayoutTypeItem, PageOrientation, PageOrientationItem, ReportLayout } from '../../internal/layoutPageUtils';
import { LegacyReportWizardPageId } from '../../pageId';
export class LegacyChooseReportLayoutPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this._isGroupedReport = ko.observable(false);
        this._reportLayoutTypes = [
            new LayoutTypeItem('Columnar', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Columnar', ReportLayout.columnar, 18),
            new LayoutTypeItem('Tabular', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Tabular', ReportLayout.tabular, 18),
            new LayoutTypeItem('Justified', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Justified', ReportLayout.justified, 18)
        ];
        this._groupedReportLayoutsTypes = [
            new LayoutTypeItem('Stepped', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Stepped', ReportLayout.stepped, 1),
            new LayoutTypeItem('Outline 1', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline1', ReportLayout.outline1, 1),
            new LayoutTypeItem('Outline 2', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline2', ReportLayout.outline2, 1),
            new LayoutTypeItem('Align Left 1', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft1', ReportLayout.alignLeft1, 1),
            new LayoutTypeItem('Align Left 2', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft2', ReportLayout.alignLeft2, 1)
        ];
        this.toggleFitFieldsToPage = () => {
            this.fitFieldsToPage(!this.fitFieldsToPage());
        };
        this.selectedLayoutType = ko.observable(null);
        this.fitFieldsToPage = ko.observable(true);
        this.pageOrientationItems = [
            new PageOrientationItem('Portrait', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Portrait', PageOrientation.Portrait),
            new PageOrientationItem('Landscape', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Landscape', PageOrientation.Landscape)
        ];
        this.selectedPageOrientation = ko.observable(this.pageOrientationItems[0]);
        this.layoutTypeItems = ko.pureComputed(() => {
            const items = this._isGroupedReport() ? this._groupedReportLayoutsTypes : this._reportLayoutTypes;
            this.selectedLayoutType(items[0]);
            return items;
        });
        this.layoutTypeItemClick = (item) => {
            this.selectedLayoutType(item);
        };
        this.isSelected = (item) => {
            return this.selectedLayoutType() === item;
        };
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        this._isGroupedReport(state.groups.length > 0);
        let selectedLayoutType = getFirstItemByPropertyValue(this.layoutTypeItems(), 'layoutType', state.layout);
        if (!selectedLayoutType) {
            selectedLayoutType = getFirstItemByPropertyValue(this.layoutTypeItems(), 'layoutType', this._isGroupedReport() ? ReportLayout.stepped : ReportLayout.columnar);
        }
        this.selectedLayoutType(selectedLayoutType);
        this.fitFieldsToPage(state.fitFieldsToPage === undefined ? true : state.fitFieldsToPage);
        this.selectedPageOrientation((state.portrait === undefined || state.portrait) ? this.pageOrientationItems[0] : this.pageOrientationItems[1]);
        return $.Deferred().resolve().promise();
    }
    commit() {
        return $.Deferred().resolve({
            layout: this.selectedLayoutType().layoutType,
            fitFieldsToPage: this.fitFieldsToPage(),
            portrait: this.selectedPageOrientation().orientation === PageOrientation.Portrait
        }).promise();
    }
}
export function _registerLegacyChooseReportLayoutPage(factory) {
    factory.registerMetadata(LegacyReportWizardPageId.ChooseReportLayoutPage, {
        setState: (data, state) => {
            state.fitFieldsToPage = data.fitFieldsToPage;
            state.layout = data.layout;
            state.portrait = data.portrait;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.fitFieldsToPage = defaultState.fitFieldsToPage;
            state.layout = defaultState.layout;
            state.portrait = defaultState.portrait;
        },
        create: () => {
            return new LegacyChooseReportLayoutPage();
        },
        template: 'dxrd-page-reportLayoutType',
        description: getLocalization('The report layout specifies the manner in which selected data fields are arranged on individual pages.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout')
    });
}
