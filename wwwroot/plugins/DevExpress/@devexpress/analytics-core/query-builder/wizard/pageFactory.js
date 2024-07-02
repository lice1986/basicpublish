﻿/**
* DevExpress Analytics (query-builder\wizard\pageFactory.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class PageFactory {
    constructor() {
        this.metadata = {};
    }
    registerMetadata(pageId, metadata) {
        if (!metadata.canFinish)
            metadata.canFinish = (page) => page.canFinish();
        if (!metadata.canNext)
            metadata.canNext = (page) => page.canNext();
        this.metadata[pageId] = metadata;
    }
    getMetadata(pageId) {
        return this.metadata[pageId];
    }
    unregisterMetadata(pageId) {
        delete this.metadata[pageId];
    }
    reset() {
        this.metadata = {};
    }
}