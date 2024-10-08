﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\chooseObjectDataSourceTypesPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IObjectDataSourceWizardState } from '../../dataSourceWizardState';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ChooseObjectTypes } from '../../internal/objectDataSource/_chooseObjectTypes';
import { FullscreenWizardPageFactory } from '../../fullscreen/fullscreenWizardPageFactory';
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { WizardPageBase } from '../wizardPageBase';
export declare class ChooseObjectDataSourceTypesPage extends WizardPageBase<IObjectDataSourceWizardState, IObjectDataSourceWizardState> {
    private _requestWrapper;
    constructor(_requestWrapper?: RequestWrapper);
    private _objectDataSource;
    private _types;
    private _provider;
    _chooseObjectType: ChooseObjectTypes;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQueryPromise<IObjectDataSourceWizardState>;
    initialize(state: IObjectDataSourceWizardState): JQueryPromise<any>;
    private get _selectedTypeName();
}
export declare function _registerChooseObjectDataSourceTypesPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): void;
