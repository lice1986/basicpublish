﻿/**
* DevExpress Analytics (query-builder\wizard\pages\chooseDataSourceTypePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { _DataSourceWizardOptions } from '../dataSourceWizard';
import { IDataSourceWizardState } from '../dataSourceWizardState';
import { PageFactory } from '../pageFactory';
import { WizardPageBase } from './wizardPageBase';
export interface ITypeItem {
    text: string;
    imageClassName: string;
    imageTemplateName: string;
    type?: number;
}
export declare enum DataSourceType {
    NoData = 0,
    Sql = 1,
    Json = 2,
    Object = 3,
    Federation = 4
}
export declare class TypeItem implements ITypeItem {
    constructor(textDefault: string, textID: string, imageClassName: string, imageTemplateName: string, type: number);
    text: string;
    imageClassName: string;
    imageTemplateName: string;
    type: number;
}
export declare class ChooseDataSourceTypePage extends WizardPageBase<IDataSourceWizardState, IDataSourceWizardState> {
    protected _dataSourceTypeOptions: _DataSourceWizardOptions;
    constructor(_dataSourceTypeOptions: _DataSourceWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    _itemClick: (item: ITypeItem) => void;
    _IsSelected: (item: ITypeItem) => boolean;
    _goToNextPage(): void;
    commit(): JQueryPromise<IDataSourceWizardState>;
    protected _createTypeItems(): ITypeItem[];
    initialize(state: IDataSourceWizardState): JQueryPromise<any>;
    typeItems: ITypeItem[];
    selectedItem: ko.Observable<ITypeItem>;
    _extendCssClass: (rightPath: string) => string;
}
export declare function _registerChooseDataSourceTypePage(factory: PageFactory, dataSourceTypeOptions: _DataSourceWizardOptions): void;
