﻿/**
* DevExpress Analytics (query-builder\wizard\multiQueryDataSourceWizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _DataSourceWizardOptionsBase } from './dataSourceWizard';
import { IDataSourceWizardState } from './dataSourceWizardState';
import { IMultiQueryDataSourceWizardCallbacks } from './internal/_utils';
import { PageFactory } from './pageFactory';
import { PageIterator } from './pageIterator';
import { PopupWizard } from './popupWizard';
import { StateManager } from './stateManager';
export declare class _MultiQueryDataSourceWizardOptions extends _DataSourceWizardOptionsBase<IMultiQueryDataSourceWizardCallbacks> {
}
export declare class MultiQueryDataSourceWizard extends PopupWizard {
    private _wizardOptions;
    constructor(pageFactory: PageFactory, _wizardOptions: _MultiQueryDataSourceWizardOptions);
    canRunWizard(): boolean;
    initialize(state: IDataSourceWizardState, createIterator?: (pageFactory: PageFactory, stateManager: StateManager) => PageIterator): void;
    title: any;
    _extendCssClass: string;
}
export declare class MultiQueryDataSourceWizardPageIterator<T extends IDataSourceWizardState = IDataSourceWizardState> extends PageIterator<T> {
    private _wizardOptions;
    constructor(pagesFactory: PageFactory, stateManager: StateManager, _wizardOptions: _MultiQueryDataSourceWizardOptions);
    getNextPageId(pageId?: string): string;
}
export declare function _registerMultiQueryDataSourcePages(factory: PageFactory, dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): PageFactory;
export declare function _createMultiQueryDataSourceWizard(factory: PageFactory, dataSourceWizardOptions: _MultiQueryDataSourceWizardOptions): MultiQueryDataSourceWizard;
