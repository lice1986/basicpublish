﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonSchemaPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IJsonDataSourceWizardState } from '../../dataSourceWizardState';
import { IPathRequest } from '../../../../widgets/common/pathRequest';
import { JsonSchemaRootNode } from '../../../dataSource/json/jsonSchemaNode';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { IJsonDataSourceWizardCallbacks } from '../../internal/_utils';
import { ITreeListOptions } from '../../../../widgets/treelist/_treelistItem';
import { PageFactory } from '../../pageFactory';
import { WizardPageBase } from '../wizardPageBase';
export declare class ChooseJsonSchemaPage extends WizardPageBase<IJsonDataSourceWizardState, IJsonDataSourceWizardState> {
    private _requestWrapper;
    private _allowObjectRootElements;
    private _callbacks?;
    private _rootItems;
    private _fieldListItemsProvider;
    private _fieldSelectedPath;
    private _dataSource;
    private _cachedState;
    private _clear;
    private _createFieldListCallback;
    private _getSchemaToDataMemberInfo;
    private _mapJsonNodesToTreelistItems;
    private _getNodesByPath;
    private _getInnerItemsByPath;
    private _beginInternal;
    private _updatePage;
    private _createTreeNode;
    private _createLeafTreeNode;
    private _resetSelectionRecursive;
    private _mapJsonSchema;
    protected _filterRootElementList(rootElementList: IPathRequest[], jsonSchema: JsonSchemaRootNode): IPathRequest[];
    canNext(): boolean;
    canFinish(): boolean;
    constructor(_requestWrapper?: RequestWrapper, _allowObjectRootElements?: boolean, _callbacks?: IJsonDataSourceWizardCallbacks);
    commit(): JQuery.Promise<IJsonDataSourceWizardState, any, any>;
    initialize(state: IJsonDataSourceWizardState): JQuery.Promise<any, any, any>;
    reset(): void;
    _rootElementTitle: any;
    _rootElementList: ko.Observable<IPathRequest[]>;
    _selectedRootElement: ko.Observable<IPathRequest>;
    _fieldListModel: ITreeListOptions;
}
export declare function _registerChooseJsonSchemaPage(factory: PageFactory, requestWrapper?: RequestWrapper, callbacks?: IJsonDataSourceWizardCallbacks): void;
