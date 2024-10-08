﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenMultiQueryDataSourceWizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _DataSourceWizardOptions } from '../dataSourceWizard';
import { IDataSourceWizardState } from '../dataSourceWizardState';
import { _MultiQueryDataSourceWizardOptions } from '../multiQueryDataSourceWizard';
import { PageFactory } from '../pageFactory';
import { PageIterator } from '../pageIterator';
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
import { StateManager } from '../stateManager';
import { FullscreenWizard } from './fullscreenWizard';
import { FullscreenWizardPageFactory } from './fullscreenWizardPageFactory';
export declare class FullscreenDataSourceWizard extends FullscreenWizard {
    private _dataSourceWizardOptions;
    constructor(factory: FullscreenWizardPageFactory, _dataSourceWizardOptions: _DataSourceWizardOptions);
    initialize(state: IDataSourceWizardState, createIterator?: (pageFactory: PageFactory, stateManager: StateManager) => PageIterator): void;
    canRunWizard(): boolean;
    _description(): string;
}
export declare class FullscreenDataSourceWizardPageIterator extends PageIterator {
    private _dataSourceOptions;
    constructor(factory: PageFactory, stateManager: StateManager, _dataSourceOptions: _DataSourceWizardOptions, onResetPage: (page: _WrappedWizardPage) => void);
    private _shouldSelectDataSource;
    getNextPageId(pageId?: string): string;
}
export declare function _createDataSourceFullscreenWizard(dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): FullscreenDataSourceWizard;
