﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseSummaryOptionsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { SummaryOptionsWrapper } from '../../internal/_summaryOptionsPageUtils';
import { LegacyReportWizardPageId } from '../../pageId';
export class LegacyChooseSummaryOptionsPage extends WizardPageBase {
    constructor() {
        super(...arguments);
        this._columns = [];
        this.summaryOptions = ko.observableArray([]);
        this.ignoreNullValues = ko.observable(false);
        this.toggleIgnoreNullValues = () => {
            this.ignoreNullValues(!this.ignoreNullValues());
        };
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        const changes = ko.utils.compareArrays(state.summaryOptionsColumns || [], this._columns);
        const isColumnsChanged = changes.some((change, index, array) => { return change.status != 'retained'; });
        if (isColumnsChanged) {
            this._columns = state.summaryOptionsColumns || [];
            this.summaryOptions.removeAll();
            this._columns.forEach((column) => {
                this.summaryOptions.push(new SummaryOptionsWrapper(column.name, column.displayName));
            });
        }
        this.summaryOptions.notifySubscribers();
        return $.Deferred().resolve().promise();
    }
    commit() {
        return $.Deferred().resolve({
            ignoreNullValuesForSummary: this.ignoreNullValues(),
            summaryOptions: this.summaryOptions().map((value) => { return value.getOptions(); })
        }).promise();
    }
}
export function _registerLegacyChooseSummaryOptionsPage(factory) {
    factory.registerMetadata(LegacyReportWizardPageId.ChooseSummaryOptionsPage, {
        setState: (data, state) => {
            state.summaryOptions = data.summaryOptions;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.summaryOptions = defaultState.summaryOptions;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        },
        create: () => {
            return new LegacyChooseSummaryOptionsPage();
        },
        template: 'dxrd-page-summaryOptions',
        description: getLocalization('What summary function would you like to calculate?', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions')
    });
}
