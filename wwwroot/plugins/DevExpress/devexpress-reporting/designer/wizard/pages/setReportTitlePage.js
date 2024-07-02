﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\setReportTitlePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportWizardPageId } from '../pageId';
export class SetReportTitlePage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this.reportTitle = ko.observable('');
    }
    initialize(data) {
        this.reportTitle(data.reportTitle ? data.reportTitle : '');
        return $.Deferred().resolve().promise();
    }
    canNext() {
        return false;
    }
    canFinish() {
        return true;
    }
    commit() {
        return $.Deferred().resolve({
            reportTitle: this.reportTitle()
        }).promise();
    }
}
export function _registerSetReportTitlePage(factory) {
    factory.registerMetadata(ReportWizardPageId.SetReportTitlePage, {
        create: () => new SetReportTitlePage(),
        getState: (state) => state,
        setState: (data, state) => state.reportTitle = data.reportTitle,
        resetState: (state, defaultState) => state.reportTitle = defaultState.reportTitle,
        template: 'dxrd-page-reportTitle',
        description: getLocalization('We have all the information needed to process the report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportComplete_Description')
    });
}