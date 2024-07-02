﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportStylePage.js)
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
import { ReportStyle, ReportStyleItem } from '../../internal/reportStylePageUtils';
import { LegacyReportWizardPageId } from '../../pageId';
export class LegacyChooseReportStylePage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this.reportStyleItems = [
            new ReportStyleItem('Bold', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Bold', ReportStyle.Bold),
            new ReportStyleItem('Casual', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Casual', ReportStyle.Casual),
            new ReportStyleItem('Corporate', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Corporate', ReportStyle.Corporate),
            new ReportStyleItem('Compact', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Compact', ReportStyle.Compact),
            new ReportStyleItem('Formal', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Formal', ReportStyle.Formal)
        ];
        this.selectedReportStyle = ko.observable(this.reportStyleItems[0]);
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        this.selectedReportStyle(getFirstItemByPropertyValue(this.reportStyleItems, 'reportStyle', state.style || ReportStyle.Bold));
        return $.Deferred().resolve().promise();
    }
    commit() {
        return $.Deferred().resolve({
            style: this.selectedReportStyle().reportStyle
        }).promise();
    }
}
export function _registerLegacyChooseReportStylePage(factory) {
    factory.registerMetadata(LegacyReportWizardPageId.ChooseReportStylePage, {
        setState: (data, state) => {
            state.style = data.style;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.style = defaultState.style;
        },
        create: () => {
            return new LegacyChooseReportStylePage();
        },
        template: 'dxrd-page-reportStyle',
        description: getLocalization('The report style specifies the appearance of your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle')
    });
}
