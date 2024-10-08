﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_pageLoader.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { PreviewPage } from './_page';
export declare class PageLoader {
    private _preview;
    private _defaultResolution;
    private _requestCyclesLimit;
    private _currentPrefetchCycle;
    private _disabled;
    private _loadTimeout;
    get pages(): PreviewPage[];
    private _getNextStartingIndex;
    private _getPagesToUpdate;
    private _performPrefetch;
    private _scheduleNextPrefetch;
    constructor(_preview: ReportPreview);
    prefetchPages(startIndex: number, endIndex: number, currentPageIndex: number): void;
    reset(): void;
    isActive(): boolean;
}
