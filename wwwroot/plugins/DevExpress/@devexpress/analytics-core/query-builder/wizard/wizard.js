﻿/**
* DevExpress Analytics (query-builder\wizard\wizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { StateManager } from './stateManager';
import { PageIterator } from './pageIterator';
import { EventManager } from '../../serializer/eventManager';
import { _createBeforeInitializePageEventArgs, _createPageEventArgs } from './internal/_utils';
import { __loadingStateFunctionName, __nextActionFunctionName } from './internal/_constants';
export class BaseWizard extends Disposable {
    constructor(pageFactory, finishCallback) {
        super();
        this.pageFactory = pageFactory;
        this.events = new EventManager();
        this._loadingTimeout = null;
        this._currentActivateCount = 0;
        this.isLoading = ko.observable(false);
        this._currentPage = ko.observable();
        this.isVisible = ko.observable(false);
        this._finishCallback = finishCallback;
        this._disposables.push(this.events);
    }
    _createLoadingState(page) {
        if (!page[__loadingStateFunctionName]) {
            page[__loadingStateFunctionName] = (newVal) => this._loadingState(newVal);
        }
    }
    _createNextAction(page) {
        if (!page[__nextActionFunctionName]) {
            page[__nextActionFunctionName] = () => this.nextAction();
        }
    }
    _loadingState(active) {
        if (active) {
            if (!this._currentActivateCount) {
                this._loadingTimeout && clearTimeout(this._loadingTimeout);
                this._loadingTimeout = setTimeout(() => {
                    if (this._currentActivateCount)
                        this.isLoading(true);
                }, 100);
            }
            this._currentActivateCount++;
        }
        else {
            this._currentActivateCount--;
            if (!this._currentActivateCount) {
                this._loadingTimeout && clearTimeout(this._loadingTimeout);
                this.isLoading(false);
            }
        }
    }
    _callBeforeFinishHandler(state, wizardModel) {
        this.events.call('beforeFinish', { state: state });
    }
    _callAfterFinishHandler(state, result) {
        this.events.call('afterFinish', { state: state });
    }
    onFinish() {
        this._currentPage(null);
        this.iterator.dispose();
    }
    initialize(state = {}, createIterator = (pageFactory, stateManager) => new PageIterator(pageFactory, stateManager)) {
        this.events.call('beforeInitialize', { wizard: this, state: state });
        this.stateManager = new StateManager(state, this.pageFactory);
        this.iterator = createIterator(this.pageFactory, this.stateManager);
        this.events.call('afterInitialize', { wizard: this });
    }
    isFirstPage() {
        return this._currentPage() && this._currentPage().pageId == this.iterator.getNextPageId();
    }
    canNext() {
        return !this.isLoading() && this._currentPage() && this.pageFactory.getMetadata(this._currentPage().pageId).canNext(this._currentPage().page);
    }
    canFinish() {
        return !this.isLoading() && this._currentPage() && this.pageFactory.getMetadata(this._currentPage().pageId).canFinish(this._currentPage().page);
    }
    _initPage(page) {
        this.events.call('beforePageInitialize', _createBeforeInitializePageEventArgs(page, this));
        this._createLoadingState(page.page);
        this._createNextAction(page.page);
        return page.initialize(this.stateManager.getPageState(page.pageId));
    }
    start() {
        this.events.call('beforeStart', { wizard: this });
        this._loadingState(true);
        const startPage = this.iterator._getStartPage();
        this._initPage(startPage).done(() => {
            this._currentPage(startPage);
            this.events.call('afterPageInitialize', _createPageEventArgs(startPage, this));
        }).always(() => this._loadingState(false)).fail(() => {
            this.isVisible(false);
        });
    }
    canRunWizard() {
        return true;
    }
    nextAction() {
        if (!this.canNext())
            return;
        const currentPage = this.iterator._getCurrentPage();
        this._loadingState(true);
        const revertPreviosPage = () => this.iterator._getPreviousPage().always(() => {
            this.iterator._resetPages();
            this._loadingState(false);
        });
        currentPage.commit().done((result) => {
            if (currentPage.isChanged)
                this.stateManager.setPageState(currentPage.pageId, result);
            this.iterator._getNextPage().done(page => {
                if (page) {
                    this._initPage(page).done(() => {
                        this._currentPage(page);
                        this.events.call('afterPageInitialize', _createPageEventArgs(page, this));
                        this._loadingState(false);
                    }).fail(() => revertPreviosPage());
                }
                else
                    revertPreviosPage();
            }).fail(() => this._loadingState(false));
        }).fail(() => this._loadingState(false));
    }
    previousAction() {
        if (this.isFirstPage())
            return;
        this._loadingState(true);
        this.iterator._getPreviousPage().done((page) => {
            if (page) {
                this._currentPage(page);
            }
        }).always(() => this._loadingState(false));
    }
    goToPage(pageId) {
        this._loadingState(true);
        this.iterator._goToPage(pageId).done((page) => {
            if (page) {
                this._currentPage(page);
            }
        }).always(() => this._loadingState(false));
    }
    finishAction() {
        if (!this.canFinish())
            return;
        this._loadingState(true);
        const currentPage = this.iterator._getCurrentPage();
        currentPage.commit().done((result) => {
            this.stateManager.setPageState(currentPage.pageId, result);
            this.iterator._resetPages();
            if (this._finishCallback) {
                const currentState = this.stateManager.getCurrentState();
                this._callBeforeFinishHandler(currentState);
                this._finishCallback(currentState)
                    .done((result) => {
                    this.onFinish();
                    this._callAfterFinishHandler(currentState, result);
                    this.isVisible(false);
                })
                    .always(() => {
                    this._loadingState(false);
                });
            }
            else {
                this._loadingState(false);
                this.isVisible(false);
            }
        });
    }
}
