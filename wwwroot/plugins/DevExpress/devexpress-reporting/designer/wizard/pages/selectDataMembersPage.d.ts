﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectDataMembersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { _ReportWizardOptions } from '../internal/utils';
import { IReportWizardFieldsCallback } from '../internal/_utils';
import { IReportWizardState } from '../reportWizardState';
export declare class SelectDataMembersPage extends WizardPageBase {
    private _fieldListCallBack;
    protected _hideDataMemberSubItems: boolean;
    protected _rootItems: ko.ObservableArray<IDataMemberInfo>;
    private _dataMemberSelectedPath;
    private _fieldSelectedPath;
    private _dataMemberItemsProvider;
    private _fieldMemberItemsProvider;
    private _availableFieldsController;
    private _dataSource;
    private _checkedDataMembers;
    private _checkedFields;
    private initialFullDataMember;
    protected _wrapFieldListCallback(itemsCallback: IReportWizardFieldsCallback): (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    protected get dataSourcePath(): string;
    private _showDataSource;
    private getDataMemberSelectedPath;
    private _beginInternal;
    private _afterCheckToggled;
    private _processFields;
    private _processNode;
    private _afterCheckToggledFields;
    private _createMasterDetailTreeNode;
    private _createMasterDetailFirstTabTreeNode;
    private _createMasterDetailLeafTreeNode;
    canNext(): boolean;
    canFinish(): boolean;
    constructor(_fieldListCallBack: IReportWizardFieldsCallback, _hideDataMemberSubItems?: boolean);
    selectDataMember(dataMemberPath: string): void;
    selectAllDataMembers(): void;
    selectDataField(dataFieldPath: string): void;
    selectDataFields(dataMemberPath: string): void;
    selectAllDataFields(): void;
    _dataMemberFieldListModel: ITreeListOptions;
    _fieldMemberFieldListModel: ITreeListOptions;
    initialize(state: IReportWizardState): JQueryPromise<any>;
    _haveCheckedFields(): boolean;
    commit(): JQuery.Promise<any, any, any>;
    _showFirstLevelDataMembers: ko.Observable<boolean>;
    _multiSelectMode: boolean;
    _selectDataMembersCaption: any;
    _selectDataFieldsCaption: any;
}
export declare function _registerSelectDataMembersPage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions, pageId?: string): void;
