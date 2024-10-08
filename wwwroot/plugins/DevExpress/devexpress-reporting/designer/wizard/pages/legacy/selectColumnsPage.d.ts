﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectColumnsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { IReportWizardFieldsCallback } from '../../internal/_utils';
import { ILegacyReportWizardState } from '../../reportWizardState';
import { ListViewModel } from '../../_utils';
export declare class LegacySelectColumnsPage extends WizardPageBase {
    private _fieldListsCallback;
    private _selectedPath;
    private _fields;
    constructor(getFieldListItems: IReportWizardFieldsCallback);
    canFinish(): boolean;
    canNext(): boolean;
    selectedPath(): any;
    reset(): void;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        fields?: Array<IDataMemberInfo>;
    }, any, any>;
    isSelectEnable(): boolean;
    isUnselectEnable(): boolean;
    select: () => void;
    selectAll: () => void;
    unselect: () => void;
    unselectAll: () => void;
    availableFieldDblClick: (field: any) => void;
    availableFieldClick: (e: {
        itemData: any;
    }) => void;
    selectedFieldDblClick: (field: any) => void;
    selectedFieldClick: (e: {
        itemData: any;
    }) => void;
    availableFields: ListViewModel<IDataMemberInfo>;
    selectedFields: ListViewModel<IDataMemberInfo>;
}
export declare function _registerLegacySelectColumnsPage(factory: PageFactory, fieldListItemsCallback: IReportWizardFieldsCallback): void;
