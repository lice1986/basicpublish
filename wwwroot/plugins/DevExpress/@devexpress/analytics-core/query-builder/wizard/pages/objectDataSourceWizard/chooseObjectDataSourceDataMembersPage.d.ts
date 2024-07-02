﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\chooseObjectDataSourceDataMembersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IObjectDataSourceWizardState } from '../../dataSourceWizardState';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ChooseObjectDataMembers } from '../../internal/objectDataSource/_chooseObjectDataMembers';
import { FullscreenWizardPageFactory } from '../../fullscreen/fullscreenWizardPageFactory';
import { _DataSourceWizardOptions } from '../../dataSourceWizard';
import { WizardPageBase } from '../wizardPageBase';
export declare class ChooseObjectDataSourceDataMembersPage extends WizardPageBase<IObjectDataSourceWizardState, IObjectDataSourceWizardState> {
    private _requestWrapper;
    constructor(_requestWrapper?: RequestWrapper);
    private _objectDataSource;
    private _type;
    private _ctor;
    _chooseObjectDataMember: ChooseObjectDataMembers;
    initialize(state: IObjectDataSourceWizardState): JQueryPromise<any>;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQueryPromise<IObjectDataSourceWizardState>;
    private get _selectedDataMember();
    private get _needParametersPage();
}
export declare function _registerChooseObjectDataSourceDataMembersPage(factory: FullscreenWizardPageFactory, dataSourceWizardOptions: _DataSourceWizardOptions): void;
