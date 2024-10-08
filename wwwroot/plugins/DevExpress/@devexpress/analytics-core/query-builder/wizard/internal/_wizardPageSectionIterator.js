﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageSectionIterator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { WrappedWizardPageSection } from './_wrappedWizardPageSection';
export class WizardPageSection {
    constructor(pageId, metadata) {
        this.pageId = pageId;
        this.metadata = metadata;
        this.page = ko.observable(null);
    }
    resetPage() {
        this.page() && this.page().dispose();
        this.page(null);
    }
    setPage(page) {
        if (this.page() !== page)
            this.page(page);
    }
}
export class WizardPageSectionIterator {
    constructor(pageFactory, stateManager, _resetPageCallback) {
        this.pageFactory = pageFactory;
        this.stateManager = stateManager;
        this._resetPageCallback = _resetPageCallback;
        this._pagesIds = [];
        this._pages = [];
    }
    _resetPages(fromIndex, resetPage = (pageId) => this._resetPage(pageId)) {
        if (fromIndex < this._pagesIds.length) {
            for (let index = this._pagesIds.length - 1; index >= fromIndex; index--) {
                this._pagesIds[index].forEach((pageId) => resetPage(pageId));
                this._pagesIds.splice(index, 1);
            }
        }
    }
    _tryResetPageByMetadata(pageId) {
        if (this.pageFactory.getMetadata(pageId)['recreate']) {
            this._resetPage(pageId);
            return true;
        }
        return false;
    }
    _resetPage(pageId) {
        this.stateManager.resetPageState(pageId);
        this._resetPageCallback(pageId);
        const page = this._getPage(pageId);
        if (page) {
            page.dispose();
            this._pages.splice(this._pages.indexOf(page), 1);
        }
    }
    _createNewPage(nextPageId) {
        const pageMetadata = this.pageFactory.getMetadata(nextPageId);
        return new WrappedWizardPageSection(nextPageId, pageMetadata.create(), pageMetadata);
    }
    _getPage(pageId) {
        return this._pages.filter(x => x.pageId === pageId)[0];
    }
    _getNextPage(nextPageIds) {
        return $.Deferred().resolve(nextPageIds.map((nextPageId) => {
            let page = this._getPage(nextPageId);
            if (!page || this._tryResetPageByMetadata(nextPageId)) {
                page = this._createNewPage(nextPageId);
                this._pages.push(page);
            }
            return page;
        })).promise();
    }
    _getPageIndex(pageId) {
        return this._pagesIds.indexOf(this._pagesIds.filter(x => x.some(y => y === pageId))[0]);
    }
    resetNextPages(pageId) {
        this._resetPages(this._getPageIndex(pageId) + 1);
    }
    getStartPage() {
        const startPageId = this.getNextPageId();
        const pageMetadata = this.pageFactory.getMetadata(startPageId);
        const page = new WrappedWizardPageSection(startPageId, pageMetadata.create(), pageMetadata);
        this._pagesIds.push([startPageId]);
        return page;
    }
    getNextPage(currentPageId) {
        const index = this._getPageIndex(currentPageId);
        let nextPageIds = this.getNextPageId(currentPageId);
        if (!nextPageIds) {
            this.resetNextPages(currentPageId);
            return $.Deferred().reject().promise();
        }
        if (!nextPageIds['push']) {
            nextPageIds = [nextPageIds];
        }
        if (JSON.stringify(this._pagesIds[index + 1]) !== JSON.stringify(nextPageIds)) {
            this._resetPages(index + 1, (pageId) => {
                if (nextPageIds.indexOf(pageId) === -1) {
                    this._resetPage(pageId);
                }
            });
            this._pagesIds.push(nextPageIds);
        }
        return this._getNextPage(nextPageIds);
    }
    getCurrentState() {
        return this.stateManager.getCurrentState();
    }
    getNextPageId(pageId) {
        return '';
    }
}
