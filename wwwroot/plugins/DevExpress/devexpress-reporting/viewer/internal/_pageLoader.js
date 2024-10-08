﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_pageLoader.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { PreloadedPagesOffset } from '../settings';
export class PageLoader {
    constructor(_preview) {
        this._preview = _preview;
        this._defaultResolution = 0.25;
        this._requestCyclesLimit = 5;
        this._currentPrefetchCycle = 0;
        this._disabled = true;
    }
    get pages() {
        return this._preview.pages || [];
    }
    _getNextStartingIndex(currentIndex) {
        var _a;
        return (_a = this.pages.find(page => (page === null || page === void 0 ? void 0 : page.pageIndex) > currentIndex && !page.imageSrc)) === null || _a === void 0 ? void 0 : _a.pageIndex;
    }
    _getPagesToUpdate(startIndex, endIndex, currentPageIndex) {
        return this.pages.slice(startIndex, endIndex).filter(page => {
            if (currentPageIndex !== undefined) {
                return page.pageIndex !== currentPageIndex;
            }
            return !page.imageSrc;
        });
    }
    _performPrefetch(pagesToUpdate, resolution) {
        pagesToUpdate.forEach(page => this._preview.updatePage(page, resolution));
    }
    _scheduleNextPrefetch(currentIndex, pendingPages) {
        this._loadTimeout = setTimeout(() => {
            const startIndex = this._getNextStartingIndex(currentIndex);
            if (!startIndex) {
                this.reset();
                return;
            }
            const promises = pendingPages.map(page => { var _a; return (_a = page.lastGetPageDeferred) === null || _a === void 0 ? void 0 : _a.promise(); }).filter(x => !!x);
            $.when(...promises).done(() => {
                !this._disabled && this.prefetchPages(startIndex, startIndex + PreloadedPagesOffset(), undefined);
            });
        }, 700);
    }
    prefetchPages(startIndex, endIndex, currentPageIndex) {
        this._disabled = false;
        let zoom = this._preview.originalZoom;
        if (currentPageIndex === undefined) {
            zoom = this._defaultResolution;
            this._currentPrefetchCycle++;
        }
        if (startIndex > this.pages.length - 1 || this._currentPrefetchCycle >= this._requestCyclesLimit) {
            this.reset();
            return;
        }
        const pendingPages = this._getPagesToUpdate(startIndex, endIndex, currentPageIndex);
        this._performPrefetch(pendingPages, zoom);
        this._scheduleNextPrefetch(endIndex, pendingPages);
    }
    reset() {
        this._loadTimeout && clearTimeout(this._loadTimeout);
        this._loadTimeout = null;
        this._disabled = true;
        this._currentPrefetchCycle = 0;
    }
    isActive() {
        return !!this._loadTimeout;
    }
}
