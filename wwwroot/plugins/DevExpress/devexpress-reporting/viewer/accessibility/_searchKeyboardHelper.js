﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_searchKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn, getLocalization, ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
export class SearchKeyboardHelper extends ListKeyboardHelper {
    constructor(searchModel) {
        super();
        this.liveRegionId = 'dxrd-preview-search-live-region';
        this.addDisposable(searchModel.events.on('searchResultChanged', (args) => {
            const result = searchModel.searchResult;
            if (result.length > 0)
                this.liveRegion().changeText(formatUnicorn(getLocalization('{0} results are available', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchResultsAvailable'), result.length));
            else if (!searchModel.loading && !!searchModel.searchText)
                this.liveRegion().changeText(searchModel.noResultText());
        }), searchModel.events.on('searchTextChanged', (args) => {
            if (!!searchModel.searchText)
                this.liveRegion().changeText(formatUnicorn(getLocalization('You searched for {0}', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchString'), '"' + searchModel.searchText + '"'));
        }));
    }
}
