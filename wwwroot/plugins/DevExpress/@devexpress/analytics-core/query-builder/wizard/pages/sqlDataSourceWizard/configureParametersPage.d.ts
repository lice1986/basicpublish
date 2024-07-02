﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\configureParametersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import { ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { IParametersViewModelConverter } from '../../internal/_utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
import { IKoCollectionEditorOptions } from '../../../../property-grid/widgets/collectioneditor/_bindings';
export declare class ConfigureQueryParametersPage extends WizardPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private parametersConverter;
    private _requestWrapper;
    private _sqlDataSourceWrapper;
    private _isParametersValid;
    constructor(parametersConverter: IParametersViewModelConverter, _requestWrapper: RequestWrapper);
    canNext(): boolean;
    canFinish(): boolean;
    getParameters(): any[];
    initialize(data: ISqlDataSourceWizardState): JQueryPromise<any>;
    commit(): JQuery.Promise<ISqlDataSourceWizardState, any, any>;
    removeButtonTitle: any;
    parametersEditorOptions: IKoCollectionEditorOptions;
}
export declare function _registerConfigureParametersPage(factory: PageFactory, requestWrapper?: RequestWrapper, parametersConverter?: IParametersViewModelConverter): void;
