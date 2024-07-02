﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonSourcePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IJsonDataSourceWizardState } from '../../dataSourceWizardState';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { IItemsProvider } from '../../../../widgets/utils';
import { IJsonDataSourceType } from '../../internal/jsonSourceSettings';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
export declare class ChooseJsonSourcePage extends WizardPageBase<IJsonDataSourceWizardState, IJsonDataSourceWizardState> {
    private _requestWrapper;
    private _jsonStringSettings;
    private _jsonUriSetting;
    private __validationGroup;
    private __validationSummary;
    private _onValidationGroupInitialized;
    private _onValidationGroupDisposing;
    private _onValidationSummaryInitialized;
    private _onValidationSummaryDisposing;
    constructor(_requestWrapper?: RequestWrapper, itemsProvider?: IItemsProvider);
    canNext(): boolean;
    commit(): JQuery.Promise<IJsonDataSourceWizardState, any, any>;
    initialize(state: IJsonDataSourceWizardState): JQuery.Promise<any, any, any>;
    _jsonSourceTitle: any;
    _jsonConnectionTitle: any;
    _connectionNameValidationRules: {
        type: string;
        readonly message: any;
    }[];
    _connectionName: ko.Observable<string>;
    _validationGroup: {
        onInitialized: (args: any) => void;
        onDisposing: (args: any) => void;
    };
    _validationSummary: {
        onInitialized: (args: any) => void;
        onDisposing: (args: any) => void;
    };
    _sources: Array<IJsonDataSourceType>;
    _selectedSource: ko.PureComputed;
}
export declare function _registerChooseJsonSourcePage(factory: PageFactory, requestWrapper?: RequestWrapper, getItemsProviderCallback?: any): void;
