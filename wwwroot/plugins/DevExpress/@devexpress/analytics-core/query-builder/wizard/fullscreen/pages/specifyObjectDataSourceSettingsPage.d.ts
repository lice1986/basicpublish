﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyObjectDataSourceSettingsPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataSourceWizardState, IObjectDataSourceWizardState } from '../../dataSourceWizardState';
import { _MultiQueryDataSourceWizardOptions } from '../../multiQueryDataSourceWizard';
import { FullscreenWizardPageFactory } from '../fullscreenWizardPageFactory';
import { WizardPageBase } from '../../pages/wizardPageBase';
export declare class SpecifyObjectDataSourceSettingsPage extends WizardPageBase<IDataSourceWizardState, IObjectDataSourceWizardState> {
    private _dataSourceWizardOptions;
    private _types;
    private _sections;
    private _objectDataSource;
    private _provider;
    private _chooseObjectType;
    private _chooseObjectDataMember;
    private _chooseObjectParameters;
    private _context;
    private _initSections;
    private showDescription;
    constructor(_dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<IObjectDataSourceWizardState, any, any>;
    initialize(state: IDataSourceWizardState): JQuery.Promise<any, any, any>;
}
export declare function _registerSpecifyObjectDataSourceSettingsPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): void;
