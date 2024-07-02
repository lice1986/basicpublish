﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IMasterDetailReportTree, SummaryInfo } from '../internal/_masterDetailWizardUtils';
import { SummaryOptionsWrapper } from '../internal/_summaryOptionsPageUtils';
import { IReportWizardState } from '../reportWizardState';
export declare class ChooseSummaryOptionsPage extends WizardPageBase {
    private _allColumns;
    private _masterDetailColumns;
    private _currentDataMember;
    private _createSummaryInfo;
    private _createNewItemIfNeed;
    private _changeQuery;
    constructor();
    _removeSummaryInfo(info: SummaryInfo): void;
    canFinish(): boolean;
    _toggleIgnoreNullValues: () => void;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _summaryOptions: ko.ObservableArray<SummaryOptionsWrapper>;
    ignoreNullValues: ko.Observable<boolean>;
    _template: string;
    _reportTree: ko.ObservableArray<IMasterDetailReportTree>;
    _currentPath: ko.Observable<string>;
    _availableFields: ko.ObservableArray<any>;
    _displayedFields: {
        [key: string]: ko.ObservableArray<any>;
    };
    _summaryInfos: ko.ObservableArray<SummaryInfo>;
    _summaryInfoMapByDataMember: {
        [key: string]: SummaryInfo[];
    };
    _selectFieldToSummaryCaption: any;
    _fieldsCaption: any;
    _summaryFunctionCaption: any;
    _ignoreNullValuesCaption: any;
}
export declare function _registerChooseSummaryOptionsPage(factory: PageFactory): void;
