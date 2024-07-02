﻿/**
* DevExpress Analytics (query-builder\wizard\pageIterator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable } from '../../serializer/disposable';
import { PageFactory } from './pageFactory';
import { _WrappedWizardPage } from './pages/__wrappedWizardPage';
import { StateManager } from './stateManager';
export declare class PageIterator<T = any> extends Disposable {
    pageFactory: PageFactory;
    stateManager: StateManager;
    private _onResetPage;
    dispose(): void;
    private _pages;
    private _currentIndex;
    private __resetPages;
    private _nextPage;
    private _getNextExistingPage;
    _resetPages(): void;
    private _getNextNewPage;
    constructor(pageFactory: PageFactory, stateManager: StateManager, _onResetPage?: (page: _WrappedWizardPage) => void);
    _getStartPage(pageId?: string): _WrappedWizardPage;
    _getNextPage(): JQueryPromise<_WrappedWizardPage>;
    _getPreviousPage(): JQueryPromise<_WrappedWizardPage>;
    _goToPage(pageId: string): JQueryPromise<_WrappedWizardPage>;
    _getCurrentPage(): _WrappedWizardPage;
    _getCurrentState(): T;
    getNextPageId(pageId?: string): string;
}
