﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsSection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ISummaryDataMemberInfo, SummaryInfoFieldlist } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
export declare class AddSummaryFieldsPage extends WizardPageBase {
    dispose(): void;
    private _fillTreeQueries;
    private _createSummaryInfo;
    private _createNewItemIfNeed;
    private _getParentName;
    private _flat;
    _removeSummaryInfo(info: SummaryInfoFieldlist): void;
    canFinish(): boolean;
    _toggleIgnoreNullValues: () => void;
    _updateSummaries(flatlist: ISummaryDataMemberInfo[]): void;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _fieldListProvider: ko.Observable<IItemsProvider>;
    ignoreNullValues: ko.Observable<boolean>;
    _template: string;
    _reportTree: ko.ObservableArray<ISummaryDataMemberInfo>;
    _availableFieldsCount: ko.Observable<number>;
    _summaryInfos: ko.ObservableArray<SummaryInfoFieldlist>;
    _selectFieldToSummaryCaption: any;
    _fieldsCaption: any;
    _summaryFunctionCaption: any;
    _ignoreNullValuesCaption: any;
}
export declare function _registerAddSummaryFieldsPage(factory: PageFactory): void;
