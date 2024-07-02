﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchResultNavigator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
export class SearchResultNavigator extends Disposable {
    constructor(searchModel, reportPreview) {
        super();
        const goToMatchedResult = (foundResult) => {
            if (!foundResult) {
                return;
            }
            reportPreview.goToPage && reportPreview.goToPage(foundResult.pageIndex);
            const page = reportPreview.pages[foundResult.pageIndex];
            page && page.selectBrick(foundResult.indexes);
        };
        this.getFirstMatchFromPage = (pageIndex, up, thisPageOnly) => {
            if (!searchModel.searchResult || searchModel.searchResult.length === 0) {
                return null;
            }
            let firstMatch;
            const sortOutResult = (index) => {
                searchModel.searchResult.forEach((m) => {
                    if (thisPageOnly && m.pageIndex === index) {
                        if (!firstMatch || (m.id < firstMatch.id && !up || m.id > firstMatch.id && up)) {
                            firstMatch = m;
                        }
                    }
                    else {
                        if (m.pageIndex >= index && !up && (!firstMatch || m.id < firstMatch.id) || m.pageIndex <= index && up && (!firstMatch || m.id > firstMatch.id)) {
                            firstMatch = m;
                        }
                    }
                });
            };
            sortOutResult(pageIndex);
            !firstMatch && sortOutResult(up ? reportPreview.pages.length : 0);
            return firstMatch;
        };
        const _setCurrentResult = (highlight, resultId, thisPageOnly) => {
            if (searchModel.searchResult && searchModel.searchResult.length !== 0) {
                const currentResult = (resultId >= 0 && searchModel.searchResult.length > resultId) ?
                    searchModel.searchResult[resultId] :
                    this.getFirstMatchFromPage(reportPreview.pageIndex, searchModel.searchUp, thisPageOnly);
                this.currentResult = currentResult;
                highlight && goToMatchedResult(this.currentResult);
            }
            else {
                reportPreview.pages && reportPreview.pages[reportPreview.pageIndex] && reportPreview.pages[reportPreview.pageIndex].selectBrick('');
            }
        };
        this.goToResult = (id) => {
            if (id !== 0 && !id) {
                return null;
            }
            _setCurrentResult(true, id);
        };
        this.addDisposable(searchModel.events.on('searchResultChanged', (args) => {
            if (!this.currentResult)
                _setCurrentResult(true);
        }), reportPreview.events.on('pageIndexChanged', (args) => {
            if (!this.currentResult || args.newValue !== this.currentResult.pageIndex)
                this.currentResult = null;
        }));
        this.next = (up) => {
            if (!searchModel.searchResult) {
                return false;
            }
            if (!this.currentResult) {
                const prevPageIndex = (reportPreview.pageIndex === 0 ? reportPreview.pages.length : reportPreview.pageIndex) - 1;
                const pageIndexToSearchFrom = up ? prevPageIndex : reportPreview.pageIndex;
                const firstResult = this.getFirstMatchFromPage(pageIndexToSearchFrom, up);
                this.currentResult = firstResult;
                if (firstResult) {
                    goToMatchedResult(firstResult);
                    return true;
                }
                else {
                    return false;
                }
            }
            let id;
            const currentId = this.currentResult.id;
            if (up) {
                id = (currentId === 0) ? searchModel.searchResult.length - 1 : (currentId - 1);
            }
            else {
                id = (currentId === searchModel.searchResult.length - 1) ? 0 : (currentId + 1);
            }
            this.currentResult = searchModel.searchResult[id];
            goToMatchedResult(this.currentResult);
            return true;
        };
    }
}
