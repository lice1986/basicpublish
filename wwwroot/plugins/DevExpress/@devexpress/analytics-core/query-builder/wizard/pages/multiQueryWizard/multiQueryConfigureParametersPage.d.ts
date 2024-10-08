﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\multiQueryConfigureParametersPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ISqlQueryViewModel } from '../../../dataSource/utils';
import { ISqlDataSourceWizardState } from '../../dataSourceWizardState';
import { IParametersViewModelConverter } from '../../internal/_utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ITreeListOptions } from '../../../../widgets/treelist/_treelistItem';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
import { IKoCollectionEditorOptions } from '../../../../property-grid/widgets/collectioneditor/_bindings';
export declare function _canEditQueryParameters(query: ISqlQueryViewModel, customQueries: ISqlQueryViewModel[]): boolean;
export declare class MultiQueryConfigureParametersPage extends WizardPageBase<ISqlDataSourceWizardState, ISqlDataSourceWizardState> {
    private parametersConverter;
    private _requestWrapper;
    private _sqlDataSourceWrapper;
    private _selectedPath;
    private _isParametersValid;
    private _rootItems;
    private _createNewParameter;
    canNext(): boolean;
    canFinish(): boolean;
    constructor(parametersConverter: IParametersViewModelConverter, _requestWrapper: RequestWrapper);
    _getParameters(): any;
    initialize(state: ISqlDataSourceWizardState): JQueryPromise<any>;
    commit(): JQueryPromise<ISqlDataSourceWizardState>;
    _scrollViewHeight: string;
    _fieldListModel: ko.Observable<ITreeListOptions>;
    _removeButtonTitle: any;
    _parametersEditorOptions: IKoCollectionEditorOptions;
}
export declare function _registerMultiQueryConfigureParametersPage(factory: PageFactory, requestWrapper?: RequestWrapper, parametersConverter?: IParametersViewModelConverter): void;
