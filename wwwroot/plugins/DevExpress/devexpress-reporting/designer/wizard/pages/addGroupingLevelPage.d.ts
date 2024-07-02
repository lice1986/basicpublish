﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IMasterDetailQueryInfo, IMasterDetailReportTree } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
import { ListViewModel } from '../_utils';
export declare function _fillTreeQueries(reportTree: any, queries: IMasterDetailQueryInfo[], level: number, parentDisplayName?: string): any;
export declare class AddGroupingLevelPage extends WizardPageBase {
    private _availableColumns;
    private _groupingLevels;
    private _setData;
    private _masterDetailGroups;
    constructor();
    canFinish(): boolean;
    _addNewGroup: () => void;
    _appendFieldsToGroup: () => void;
    _removeGroup: () => void;
    _isCreateGroupEnabled(): boolean;
    _isAppendToGroupEnabled(): boolean;
    _isRemoveGroupEnabled(): boolean;
    _moveUp: () => void;
    _moveDown: () => void;
    _isMoveUpEnabled(): boolean;
    _isMoveDownEnabled(): boolean;
    _fieldDblClick: (field: any) => void;
    _fieldClick: (e: {
        itemData: any;
    }) => void;
    _groupDblClick: (group: any) => void;
    _groupClick: (e: {
        itemData: any;
    }) => void;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _currentPath: ko.Observable<string>;
    _currentFields: ko.Observable<ListViewModel<string>>;
    _currentGroups: ko.Observable<ListViewModel<{
        fields: ko.ObservableArray<string>;
    }>>;
    _fieldCaption: any;
    _groupCaption: any;
    _reportTree: ko.ObservableArray<IMasterDetailReportTree>;
}
export declare function _registerAddGroupingLevelPage(factory: PageFactory): void;