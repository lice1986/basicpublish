﻿/**
* DevExpress Analytics (query-builder\wizard\pageIterator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { _WrappedWizardPage } from './pages/__wrappedWizardPage';
export class PageIterator extends Disposable {
    constructor(pageFactory, stateManager, _onResetPage = () => void 0) {
        super();
        this.pageFactory = pageFactory;
        this.stateManager = stateManager;
        this._onResetPage = _onResetPage;
        this._pages = [];
        this._currentIndex = 0;
    }
    dispose() {
        this._pages.forEach(x => x.dispose());
        this._pages = [];
    }
    __resetPages(fromIndex) {
        if (fromIndex < this._pages.length) {
            for (let index = this._pages.length - 1; index >= fromIndex; index--) {
                this.stateManager.resetPageState(this._pages[index].pageId);
                this._onResetPage(this._pages[index]);
                this._pages[index].dispose();
                this._pages.splice(index, 1);
            }
        }
    }
    _nextPage() {
        return this._pages[this._currentIndex + 1];
    }
    _getNextExistingPage() {
        this._currentIndex += 1;
        const deferred = $.Deferred();
        deferred.resolve(this._pages[this._currentIndex]);
        return deferred.promise();
    }
    _resetPages() {
        this.__resetPages(this._currentIndex + 1);
    }
    _getNextNewPage(nextPageId) {
        this._currentIndex += 1;
        const deferred = $.Deferred();
        this.__resetPages(this._currentIndex);
        const pageMetadata = this.pageFactory.getMetadata(nextPageId);
        const newPage = new _WrappedWizardPage(nextPageId, pageMetadata.create(), pageMetadata.template, pageMetadata.description);
        this._pages.push(newPage);
        deferred.resolve(newPage);
        return deferred.promise();
    }
    _getStartPage(pageId) {
        pageId = pageId || this.getNextPageId();
        const pageMetadata = this.pageFactory.getMetadata(pageId);
        const startPage = new _WrappedWizardPage(pageId, pageMetadata.create(), pageMetadata.template, pageMetadata.description);
        this._pages.push(startPage);
        return startPage;
    }
    _getNextPage() {
        const currentPage = this._getCurrentPage();
        if (currentPage.isChanged || !this._nextPage()) {
            const nextPageId = this.getNextPageId(this._getCurrentPage().pageId);
            if (!nextPageId)
                return $.Deferred().reject().promise();
            currentPage.isChanged = false;
            return this._getNextNewPage(nextPageId);
        }
        else
            return this._getNextExistingPage();
    }
    _getPreviousPage() {
        const deferred = $.Deferred();
        if (this._currentIndex - 1 < 0) {
            deferred.reject(null);
        }
        else {
            this._currentIndex -= 1;
            deferred.resolve(this._pages[this._currentIndex]);
        }
        return deferred.promise();
    }
    _goToPage(pageId) {
        const deferred = $.Deferred();
        const page = this._pages.filter(page => page.pageId === pageId)[0];
        if (page) {
            this._currentIndex = this._pages.indexOf(page);
            deferred.resolve(page);
        }
        else {
            deferred.reject(null);
        }
        return deferred.promise();
    }
    _getCurrentPage() {
        return this._pages[this._currentIndex];
    }
    _getCurrentState() {
        return this.stateManager.getCurrentState();
    }
    getNextPageId(pageId) {
        return '';
    }
}
