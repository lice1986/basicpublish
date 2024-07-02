﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\configureQueryPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { QueryBuilderPopup } from '../../internal/_queryBuilderPopup';
import { ISqlQueryControl } from '../../internal/_selectStatementQueryControl';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
export declare class ConfigureQueryPage extends WizardPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private _options;
    static QUERY_TEXT: string;
    static SP_TEXT: string;
    private _proceduresList;
    private _selectStatementControl;
    private _dataSourceWrapper;
    private _connection;
    private _dataSource;
    constructor(_options: _DataSourceWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    runQueryBuilder(): void;
    localizeQueryType(queryTypeString: string): string;
    initialize(state: ISqlDataSourceWizardState): JQueryPromise<any>;
    commit(): JQueryPromise<ISqlDataSourceWizardState>;
    queryNameCaption: () => string;
    queryControl: ko.Observable<ISqlQueryControl>;
    runQueryBuilderBtnText: ko.PureComputed<any>;
    placeholder: () => string;
    popupQueryBuilder: QueryBuilderPopup;
    queryName: ko.Observable<string>;
    queryTypeItems: string[];
    selectedQueryType: ko.Observable<string>;
    initialName: string;
}
export declare function _registerConfigureQueryPage(factory: PageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): void;
