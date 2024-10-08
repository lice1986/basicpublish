﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\addGroupingLevelPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ILegacyReportWizardState } from '../../reportWizardState';
import { ListViewModel } from '../../_utils';
export declare class LegacyAddGroupingLevelPage extends WizardPageBase {
    private initialFields;
    fields: ListViewModel<string>;
    groups: ListViewModel<{
        fields: ko.ObservableArray<string>;
    }>;
    canFinish(): boolean;
    addNewGroup: () => void;
    appendFieldsToGroup: () => void;
    removeGroup: () => void;
    isCreateGroupEnabled(): boolean;
    isAppendToGroupEnabled(): boolean;
    isRemoveGroupEnabled(): boolean;
    moveUp: () => void;
    moveDown: () => void;
    isMoveUpEnabled(): boolean;
    isMoveDownEnabled(): boolean;
    fieldDblClick: (field: any) => void;
    fieldClick: (e: {
        itemData: any;
    }) => void;
    groupDblClick: (group: any) => void;
    groupClick: (e: {
        itemData: any;
    }) => void;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        groups?: string[][];
        summaryOptionsColumns?: Array<IDataMemberInfo>;
    }, any, any>;
}
export declare function _registerLegacyAddGroupingLevelPage(factory: PageFactory): void;
