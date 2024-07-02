﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageSectionIterator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
import { IWizardPageSectionMetadata } from './wizardPageSectionMetadata';
import { WrappedWizardPageSection } from './_wrappedWizardPageSection';
import { WizardPageSectionFactory } from './_wizardPageSectionFactory';
import { StateManager } from '../stateManager';
import { IWizardPage } from '../pages/IWizardPage';
export declare class WizardPageSection {
    pageId: string;
    metadata: IWizardPageSectionMetadata<IWizardPage>;
    resetPage(): void;
    setPage(page: _WrappedWizardPage): void;
    constructor(pageId: string, metadata: IWizardPageSectionMetadata<IWizardPage>);
    page: ko.Observable<_WrappedWizardPage>;
}
export declare class WizardPageSectionIterator {
    pageFactory: WizardPageSectionFactory;
    stateManager: StateManager;
    private _resetPageCallback;
    private _pagesIds;
    private _pages;
    private _resetPages;
    private _tryResetPageByMetadata;
    private _resetPage;
    private _createNewPage;
    private _getPage;
    private _getNextPage;
    private _getPageIndex;
    resetNextPages(pageId: string): void;
    constructor(pageFactory: WizardPageSectionFactory, stateManager: StateManager, _resetPageCallback: (pageId: string) => void);
    getStartPage(): WrappedWizardPageSection;
    getNextPage(currentPageId: string): JQuery.Promise<WrappedWizardPageSection[], any, any>;
    getCurrentState(): any;
    getNextPageId(pageId?: string): string | string[];
}
