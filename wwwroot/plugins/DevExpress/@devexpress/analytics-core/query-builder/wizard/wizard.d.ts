﻿/**
* DevExpress Analytics (query-builder\wizard\wizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { StateManager } from './stateManager';
import { PageIterator } from './pageIterator';
import { EventManager } from '../../serializer/eventManager';
import { IWizardEvents } from './wizardEventManager';
import { IDataSourceWizardState } from './dataSourceWizardState';
import { _WrappedWizardPage } from './pages/__wrappedWizardPage';
import { PageFactory } from './pageFactory';
import { IWizardPage } from './pages/IWizardPage';
export declare class BaseWizard extends Disposable {
    pageFactory: PageFactory;
    stateManager: StateManager;
    iterator: PageIterator;
    events: EventManager<BaseWizard, IWizardEvents<BaseWizard>>;
    private _finishCallback;
    protected _createLoadingState(page: IWizardPage): void;
    protected _createNextAction(page: IWizardPage): void;
    private _loadingTimeout;
    private _currentActivateCount;
    protected _loadingState(active: boolean): void;
    protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
    protected _callAfterFinishHandler(state: any, result: any): void;
    onFinish(): void;
    constructor(pageFactory: PageFactory, finishCallback?: (model: IDataSourceWizardState) => JQueryPromise<boolean>);
    initialize(state?: any, createIterator?: (pageFactory: PageFactory, stateManager: StateManager) => PageIterator): void;
    isFirstPage(): boolean;
    canNext(): boolean;
    canFinish(): boolean;
    _initPage(page: _WrappedWizardPage): JQueryPromise<any>;
    start(): void;
    canRunWizard(): boolean;
    nextAction(): void;
    previousAction(): void;
    goToPage(pageId: string): void;
    finishAction(): void;
    isLoading: ko.Observable<boolean>;
    _currentPage: ko.Observable<_WrappedWizardPage>;
    isVisible: ko.Observable<boolean>;
}