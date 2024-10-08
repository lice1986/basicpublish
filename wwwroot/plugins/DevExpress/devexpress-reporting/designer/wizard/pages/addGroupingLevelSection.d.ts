﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelSection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IMasterDetailReportTree } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
export interface IGroupFieldDataMemberInfo extends IDataMemberInfo {
    visible?: ko.Observable<boolean>;
}
export declare class _GroupsFieldStore extends Disposable {
    private _onChange;
    dispose(): void;
    dataSource: ko.ObservableArray<IGroupFieldDataMemberInfo>;
    constructor(query: IMasterDetailReportTree, _onChange: () => void);
    getSelectedFieldsFlat(): IGroupFieldDataMemberInfo[];
    getSelectedFields(): string[][];
    groups: ko.ObservableArray<_GroupField>;
    isCreateGroupEnabled(): boolean;
    path: string;
    addGroupText: () => any;
    displayName: string;
    add(): void;
    remove(index: any): void;
    moveUpDisabled(index: any): boolean;
    moveDownDisabled(index: any): boolean;
    moveup(index: any): void;
    movedown(index: any): void;
}
export declare class _GroupField extends Disposable {
    private _store;
    private _onChange;
    private _updateDataSource;
    constructor(_store: _GroupsFieldStore, _onChange: () => void);
    getOptions(options: any): any;
    value: any;
    fields: ko.ObservableArray<string>;
}
export declare class AddGroupFieldsPage extends WizardPageBase {
    dispose(): void;
    canFinish(): boolean;
    private _mergeGroups;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _reportTree: IMasterDetailReportTree[];
    _groupInfos: ko.ObservableArray<_GroupsFieldStore>;
}
export declare function _registerAddGroupFieldsPage(factory: PageFactory): void;
