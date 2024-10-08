﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\configureObjectDataSourceParametersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IObjectDataSourceWizardState } from '../../dataSourceWizardState';
import { ChooseObjectMemberParameters } from '../../internal/objectDataSource/_chooseObjectParameters';
import { IItemsProvider } from '../../../../widgets/utils';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
export declare class ConfigureObjectDataSourceParametersPage extends WizardPageBase<IObjectDataSourceWizardState, IObjectDataSourceWizardState> {
    private _objectDataSource;
    _chooseObjectParameters: ChooseObjectMemberParameters;
    constructor(itemsProvider: IItemsProvider);
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQueryPromise<IObjectDataSourceWizardState>;
    initialize(state: IObjectDataSourceWizardState): JQueryPromise<any>;
}
export declare function _registerConfigureObjectDataSourceParametersPage(factory: PageFactory, getItemsProviderCallback: () => IItemsProvider): void;
