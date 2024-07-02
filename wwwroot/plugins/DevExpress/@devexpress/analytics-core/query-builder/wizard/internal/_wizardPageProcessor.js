﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageProcessor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { StateManager } from '../stateManager';
import { WizardPageSectionIterator, WizardPageSection } from './_wizardPageSectionIterator';
import { EventManager } from '../../../serializer/eventManager';
import { _createBeforeInitializePageEventArgs, _createPageEventArgs } from './_utils';
import { __nextActionFunctionName } from './_constants';
export class WizardPageProcessor extends Disposable {
    constructor(pageFactory, _loadingState, _nextAction) {
        super();
        this.pageFactory = pageFactory;
        this.events = new EventManager();
        this._loadingTimeout = null;
        this._changeTimeout = null;
        this.sections = [];
        this.isLoading = ko.observable(false);
        if (_loadingState)
            this._loadingState = _loadingState;
        if (_nextAction)
            this._extendedNextAction = _nextAction;
        this._disposables.push(this.events);
    }
    dispose() {
        super.dispose();
        this.sections.forEach(x => x.resetPage());
        this.sections = [];
    }
    _createLoadingState(page) {
        if (!page[WizardPageProcessor.__loadingStateFunctionName]) {
            page[WizardPageProcessor.__loadingStateFunctionName] = (newVal) => this._loadingState(newVal);
        }
    }
    _createNextAction(page) {
        if (!page[__nextActionFunctionName])
            page[__nextActionFunctionName] = () => this._extendedNextAction();
    }
    _loadingState(active) {
        if (active) {
            this._loadingTimeout && clearTimeout(this._loadingTimeout);
            this._loadingTimeout = setTimeout(() => {
                this.isLoading(true);
            }, 100);
        }
        else {
            this._loadingTimeout && clearTimeout(this._loadingTimeout);
            this.isLoading(false);
        }
    }
    _extendedNextAction() { }
    _resetPageById(pageId) {
        const page = this.getPageById(pageId);
        page.resetPage();
    }
    initialize(state, createIterator = (pageFactory, stateManager) => new WizardPageSectionIterator(pageFactory, stateManager, (pageId) => this._resetPageById(pageId))) {
        this.events.call('beforeInitialize', { wizard: this, state });
        this.stateManager = new StateManager(state, this.pageFactory);
        this.iterator = createIterator(this.pageFactory, this.stateManager);
        this.sections = [];
        Object.keys(this.pageFactory.metadata).forEach((key) => {
            this.sections.push(new WizardPageSection(key, this.pageFactory.metadata[key]));
        });
        this.sections = this.sections.sort((a, b) => a.metadata.position - b.metadata.position);
        this.events.call('afterInitialize', { wizard: this });
    }
    _canNext(currentPage) {
        const pageMetadata = !this.isLoading() && currentPage && currentPage.page && this.pageFactory.getMetadata(currentPage.pageId);
        return pageMetadata && pageMetadata.canNext(currentPage.page);
    }
    _canFinish(currentPage) {
        return !this.isLoading() && currentPage && this.pageFactory.getMetadata(currentPage.pageId).canFinish(currentPage.page);
    }
    _initPage(page, force = false, stateChanged = false) {
        this._createNextAction(page.page);
        if (page.onChange) {
            page.onChange(() => {
                this._changeTimeout && clearTimeout(this._changeTimeout);
                this._changeTimeout = setTimeout(() => {
                    this._nextAction(page);
                }, 100);
            });
        }
        else
            throw Error('Page with id ' + page.pageId + ' cannot be used in AutoNavigation, because it does not have method OnChange');
        return page.initialize(this.stateManager.getPageState(page.pageId), force, stateChanged).always(() => this._loadingState(false));
    }
    getPageById(pageId) {
        return this.sections.filter(x => x.pageId === pageId)[0];
    }
    start() {
        this.events.call('beforeStart', { wizard: this });
        this._loadingState(true);
        const page = this.iterator.getStartPage();
        this.events.call('beforePageInitialize', _createBeforeInitializePageEventArgs(page, this));
        this._initPage(page).done(() => {
            const pageSection = this.getPageById(page.pageId);
            if (pageSection) {
                pageSection.setPage(page);
                this.events.call('afterPageInitialize', _createPageEventArgs(page, this));
                this._nextAction(page);
            }
            else {
                throw Error('Page Section with id ' + page.pageId + ' is not found.');
            }
        });
    }
    finishAction() {
        const deferred = $.Deferred();
        let resolved = false;
        for (let i = this.sections.length - 1; i >= 0; i--) {
            if (this.sections[i].page()) {
                this.sections[i].page().commit().done((result) => {
                    if (this.sections[i].page().isChanged) {
                        this.events.call('beforeFinish', { wizardModel: this, state: this.stateManager.getCurrentState() });
                        this.stateManager.setPageState(this.sections[i].page().pageId, result);
                        this.events.call('afterFinish', { wizardResult: this, state: this.stateManager.getCurrentState() });
                    }
                }).always(() => deferred.resolve());
                resolved = true;
                break;
            }
        }
        if (!resolved)
            deferred.resolve();
        return deferred.promise();
    }
    _nextAction(currentPage, parentIsChanged = false) {
        if (!this._canNext(currentPage) && !this._canFinish(currentPage)) {
            currentPage.resetCommitedState();
            return this.iterator.resetNextPages(currentPage.pageId);
        }
        this._loadingState(true);
        currentPage.commit().done((result) => {
            if (currentPage.isChanged || parentIsChanged || currentPage.page && currentPage.page.changeAlways) {
                this.stateManager.setPageState(currentPage.pageId, result);
                this.iterator.getNextPage(currentPage.pageId).done(pages => {
                    if (pages && pages.length > 0) {
                        pages.forEach((_page) => {
                            const containedPage = this.getPageById(_page.pageId);
                            const page = containedPage && containedPage.page() || _page;
                            this.events.call('beforePageInitialize', _createBeforeInitializePageEventArgs(page, this));
                            this._initPage(page, !!containedPage.page(), currentPage.isChanged || parentIsChanged).done(() => {
                                this.getPageById(page.pageId).setPage(page);
                                this.events.call('afterPageInitialize', _createPageEventArgs(page, this));
                                this._nextAction(page, currentPage.isChanged);
                            });
                        });
                    }
                    else
                        this._loadingState(false);
                    currentPage.isChanged = false;
                }).fail(() => this._loadingState(false));
            }
            else
                this._loadingState(false);
        }).fail(() => this._loadingState(false));
    }
}
WizardPageProcessor.__loadingStateFunctionName = '__loadingState';