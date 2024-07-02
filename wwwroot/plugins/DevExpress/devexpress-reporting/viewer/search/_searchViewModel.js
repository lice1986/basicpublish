﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { formatUnicorn, guid, KeyboardEnum, generateIconTemplate } from '@devexpress/analytics-core/analytics-internal-native';
import { getLocalization, TabInfo } from '@devexpress/analytics-core/analytics-utils-native';
import DataSource from 'devextreme/data/data_source';
import * as $ from 'jquery';
import { SearchKeyboardHelper } from '../accessibility/_searchKeyboardHelper';
import { ActionId } from '../constants';
import { SearchAvailable } from '../settings';
import { SearchResultNavigator } from './_searchResultNavigator';
import CustomStore from 'devextreme/data/custom_store';
import { BaseRenderingModel, createViewModelGenerator, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
import { formatSearchResult } from './_utils';
import { ViewerAction } from '../internal/_actions';
export class SearchViewModel extends BaseRenderingModel {
    constructor(reportPreview, searchSettings, enableKeyboardSupport) {
        var _a, _b;
        super();
        this.reportPreview = reportPreview;
        this._searchIgnoreObs = false;
        this.actions = [];
        this.searchUp = false;
        this.searchResultCount = 0;
        this.searchResultPageCount = 0;
        this.stopSearchDisabled = false;
        this.searchCompleted = false;
        this._renderedSearchResult = [];
        this.useAsyncSearch = true;
        this.searchRequestDeferred = $.Deferred();
        this.startSearchDeferred = $.Deferred();
        this.fetchLimit = 1000;
        this.pageSize = 30;
        this.resetSearchResult();
        this.useAsyncSearch = (_a = searchSettings === null || searchSettings === void 0 ? void 0 : searchSettings.useAsyncSearch) !== null && _a !== void 0 ? _a : true;
        const searchEnabled = (_b = searchSettings === null || searchSettings === void 0 ? void 0 : searchSettings.searchEnabled) !== null && _b !== void 0 ? _b : true;
        if (!searchEnabled && SearchAvailable()) {
            SearchAvailable(false);
        }
        this._resultNavigator = SearchViewModel.createResultNavigator(this, reportPreview);
        const getDisabled = () => reportPreview.documentBuilding || !reportPreview.documentId || reportPreview.pageIndex === -1;
        this.addDisposable(reportPreview.events.on('documentIdChanged', (args) => {
            this.resetSearchResult();
            this.tabInfo.visible = tabInfoVisible();
        }), reportPreview.events.on('pageIndexChanged', (args) => {
            this.tabInfo.visible = tabInfoVisible();
        }), reportPreview.events.on('documentBuildingChanged', (args) => {
            this.tabInfo.visible = tabInfoVisible();
        }), reportPreview.events.on('reportIdChanged', (args) => {
            this.resetSearchResult();
        }));
        const tabInfoVisible = () => !getDisabled() && SearchAvailable();
        this.tabInfo = new TabInfo({
            text: 'Search',
            template: 'dxrd-preview-search',
            model: this,
            keyboardHelper: enableKeyboardSupport ? new SearchKeyboardHelper(this) : undefined,
            localizationId: 'ASPxReportsStringId.SearchDialog_Header',
            imageClassName: 'search',
            imageTemplateName: 'dxrd-svg-preview-search',
            visible: tabInfoVisible()
        });
        const searchAction = new SearchAction(this.tabInfo, reportPreview);
        this.addDisposable(searchAction);
        this.actions.push(searchAction);
        this.addDisposable(SearchAvailable.subscribe(() => {
            this.tabInfo.visible = tabInfoVisible();
        }));
        this._disposables.push(this.tabInfo);
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.buttons.searchButton.text = this.loading ? getLocalization('Stop', 'ASPxReportsStringId.SearchDialog_StopButton') :
            getLocalization('Search', 'ASPxReportsStringId.SearchDialog_SearchButton');
        viewModel.buttons.searchButton.disabled = this.loading && !this.useAsyncSearch;
        viewModel.buttons.searchButton.text = this.getSearchButtonText();
        viewModel.searchCompleted = this.searchCompleted;
        viewModel.searchResultCount = this.searchResultCount;
        viewModel.searchResultPageCount = this.searchResultPageCount;
        viewModel.noResultText = this.noResultText();
        if (args.propertyName === 'searchResultDataSource')
            viewModel.searchResultDataSource = this.searchResultDataSource;
        if (args.propertyName === 'loading')
            viewModel.loading = this.loading;
    }
    createViewModel() {
        const searchViewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('buttons', createViewModelGenerator()
            .generateProperty('searchButton', createViewModelGenerator()
            .generateProperty('text', this.getSearchButtonText())
            .generateProperty('disabled', this.loading && !this.useAsyncSearch)
            .generateProperty('onClick', () => this.searchButtonClick())
            .getViewModel())
            .generateProperty('upButton', createViewModelGenerator()
            .generateProperty('template', generateIconTemplate(''))
            .generateProperty('icon', 'dxrd-svg-operations-arrowup')
            .generateProperty('onClick', () => this.findNext(true))
            .getViewModel())
            .generateProperty('downButton', createViewModelGenerator()
            .generateProperty('template', generateIconTemplate(''))
            .generateProperty('icon', 'dxrd-svg-operations-arrowdown')
            .generateProperty('onClick', () => this.findNext(false))
            .getViewModel())
            .getViewModel())
            .generateProperty('searchEditor', createViewModelGenerator()
            .generateProperty('onKeyDown', (e) => {
            const findNext = (searchUp, text) => {
                if (this.searchText !== text) {
                    this.searchText = text;
                }
                else {
                    this.findNext(searchUp);
                    return true;
                }
            };
            if (e.event.key === KeyboardEnum.Enter) {
                e.event.stopPropagation();
                e.event.preventDefault();
                findNext(e.event.shiftKey, e.component.option('text'));
            }
            if (e.event.key == 'ArrowUp')
                findNext(true, e.component.option('text')) && e.event.stopPropagation();
            if (e.event.key == 'ArrowDown')
                findNext(false, e.component.option('text')) && e.event.stopPropagation();
        })
            .generateProperty('onFocusOut', (e) => this.onSearchTextChanged(e))
            .generateProperty('inputAttr', {
            type: 'search',
            title: getLocalization('Search', 'ASPxReportsStringId.SearchDialog_Header')
        })
            .getViewModel())
            .generateProperty('matchCaseEditor', createViewModelGenerator()
            .generateProperty('text', getLocalization('Match case', 'ASPxReportsStringId.SearchDialog_Case'))
            .generateProperty('value', this.matchCase)
            .generateProperty('onValueChanged', (event) => {
            this.matchCase = event.value;
        })
            .getViewModel())
            .generateProperty('matchWholeWordEditor', createViewModelGenerator()
            .generateProperty('text', getLocalization('Match whole word only', 'ASPxReportsStringId.SearchDialog_WholeWord'))
            .generateProperty('value', this.matchWholeWord)
            .generateProperty('onValueChanged', (event) => {
            this.matchWholeWord = event.value;
        })
            .getViewModel())
            .generateProperty('loading', this.loading)
            .generateProperty('searchCompleted', this.searchCompleted)
            .generateProperty('headerText', getLocalization('Search', 'ASPxReportsStringId.SearchDialog_Header'))
            .generateProperty('noResultText', this.noResultText())
            .generateProperty('searchResultCount', this.searchResultCount)
            .generateProperty('searchResultPageCount', this.searchResultPageCount)
            .generateProperty('resultsInText', getLocalization('results in', 'ASPxReportsStringId.SearchDialog_Results_In'))
            .generateProperty('resultsPagesText', getLocalization('pages', 'ASPxReportsStringId.SearchDialog_Results_Pages'))
            .generateProperty('searchResultHeaderId', `dxrd-${guid()}`)
            .generateProperty('searchResultDataSource', this.searchResultDataSource)
            .generateProperty('doSearch', (searchUp) => this.findNext(searchUp))
            .generateProperty('onItemRendered', (event) => this.onItemRendered())
            .getViewModel();
        return searchViewModel;
    }
    resetSearchResult() {
        this._cachedRequests = {};
        this._cachedWholeWordRequests = {};
        this._cachedCaseSensitiveRequests = {};
        this._cachedWholeWordWithCaseRequests = {};
        this.searchResult = [];
        this.searchText = '';
        this.resetSearchResultDataSource();
    }
    findTextRequestDone(result, cache) {
        this.loading = false;
        if (!result) {
            this.searchResult = [];
            return;
        }
        cache = (result.success ? result.matches : []) || [];
        this.searchResult = cache;
    }
    appentSearchResult(result) {
        if (result && result.matches && result.matches.length) {
            this.searchResult = [...this.searchResult, ...result.matches];
        }
    }
    performSearchAsync(text, reportPreview, ignore = true) {
        this.searchRequestDeferred.reject();
        const getResult = (searchOperationId, startIndex, fetchLimit, ignore) => {
            this.searchRequestDeferred = $.Deferred();
            reportPreview.requestWrapper.getSearchStatus(searchOperationId, startIndex, fetchLimit, ignore)
                .done(result => this.searchRequestDeferred.resolve(result))
                .fail(fail => this.failRequestHandler(ignore));
            this.searchRequestDeferred.done(result => {
                if (result.faultMessage) {
                    this.loading = false;
                    return;
                }
                this.appentSearchResult(result);
                if (result.completed) {
                    this.loading = false;
                    this.searchCompleted = true;
                    return;
                }
                if (result.requestAgain) {
                    setTimeout(() => {
                        getResult(searchOperationId, this.searchResult.length, fetchLimit, ignore);
                    }, 100);
                }
            });
        };
        this.resetDeffereds();
        reportPreview.requestWrapper.startSearch(text, ignore)
            .done(result => this.startSearchDeferred.resolve(result))
            .fail(fail => this.failRequestHandler(ignore));
        this.startSearchDeferred.done(result => {
            if (result.success) {
                if (result.faultMessage) {
                    this.failRequestHandler(ignore);
                    return;
                }
                if (result.completed) {
                    this.appentSearchResult(result);
                    this.loading = false;
                    this.searchCompleted = true;
                    return;
                }
                this.searchOperationId = result.searchOperationId;
                getResult(this.searchOperationId, 0, this.fetchLimit, ignore);
            }
            else {
                this.failRequestHandler(ignore);
            }
        });
    }
    performSearch(text, reportPreview, cache, ignore = true) {
        this.resetDeffereds();
        reportPreview.requestWrapper.findTextRequest(text, ignore)
            .done(result => this.searchRequestDeferred.resolve(result))
            .fail(fail => this.failRequestHandler(ignore));
        this.searchRequestDeferred.done((result) => {
            if (!ignore)
                this.findTextRequestDone(result, cache[text]);
            this.searchCompleted = true;
        });
    }
    mapSearchResultsToViewModels(results) {
        return results.map(item => createViewModelGenerator()
            .createDefaultModel(item)
            .generateProperty('data', item.data)
            .generateProperty('itemClickAction', (data) => this.goToResult(data))
            .generateProperty('attr', {
            'aria-label': item.data.text + ', ' + formatSearchResult(item.data) + ', ' + (this.searchResult.indexOf(item.data) + 1) + ' of ' + this.searchResult.length
        })
            .generateProperty('info', formatSearchResult(item.data))
            .getViewModel());
    }
    resetSearchResultDataSource() {
        if (this.searchResultDataSource) {
            this.searchResultDataSource.reload();
            this.searchResultDataSource.dispose();
        }
        this.searchResultDataSource = new DataSource({
            store: new CustomStore({
                load: (loadOptions) => {
                    let resultData = [];
                    if (loadOptions.take) {
                        resultData = this._renderedSearchResult.slice(loadOptions.skip, (loadOptions.skip + loadOptions.take));
                    }
                    else
                        resultData = this._renderedSearchResult;
                    const totalCount = this.fetchLimit > this.searchResult.length ? this.fetchLimit : this.searchResult.length;
                    const resultViewModels = this.mapSearchResultsToViewModels(resultData);
                    return $.Deferred().resolve(resultViewModels, { totalCount: totalCount });
                }
            }),
            paginate: true,
            pageSize: this.pageSize
        });
    }
    resetDeffereds() {
        this.startSearchDeferred.reject();
        this.startSearchDeferred = $.Deferred();
        this.searchRequestDeferred.reject();
        this.searchRequestDeferred = $.Deferred();
    }
    failRequestHandler(ignore) {
        if (!ignore) {
            this.searchResult = [];
            this.loading = false;
        }
    }
    onPropertyChanged(args) {
        var _a;
        if (args.propertyName === 'matchCase' || args.propertyName === 'matchWholeWord') {
            this.updateSearch(100);
        }
        if (args.propertyName === 'searchText') {
            this.updateSearch(200);
        }
        if (args.propertyName === 'searchResult') {
            if (this.searchResult) {
                this._renderedSearchResult = this.searchResult.map((item) => { return { data: item }; });
                if (this.searchResultDataSource.items().length < this.pageSize)
                    this.searchResultDataSource.reload();
            }
            if ((_a = this.searchResult) === null || _a === void 0 ? void 0 : _a.length) {
                this.searchResultPageCount = new Set((this.searchResult.map(result => result.pageIndex))).size;
                this.searchResultCount = this.searchResult.length;
            }
            else {
                this.searchResultPageCount = this.searchResultCount = 0;
            }
        }
    }
    goToResult(result) {
        this._resultNavigator.goToResult(result.id);
    }
    newSearch(text, matchCase, matchWholeWord) {
        this._searchTimeout && clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            this._resultNavigator.currentResult = null;
            const mCase = this.matchCase;
            text = mCase ? this.searchText : this.searchText.toLocaleLowerCase();
            const cache = this.matchWholeWord
                ? mCase ? this._cachedWholeWordWithCaseRequests : this._cachedWholeWordRequests
                : mCase ? this._cachedCaseSensitiveRequests : this._cachedRequests;
            if (cache[text]) {
                this.loading = false;
                this.searchResult = cache[text];
                return;
            }
            this._searchIgnoreObs = true;
            this._searchIgnoreObs = false;
            ((ignore) => {
                if (this.useAsyncSearch)
                    this.performSearchAsync(text, this.reportPreview, ignore);
                else
                    this.performSearch(text, this.reportPreview, cache, ignore);
            })(this._searchIgnoreObs);
        }, 100);
    }
    stopSearchProcess() {
        this.resetDeffereds();
        if (this.searchOperationId && this.searchOperationId.length) {
            this.reportPreview.requestWrapper.stopSearch(this.searchOperationId, false);
        }
        this.loading = false;
        this.searchCompleted = false;
    }
    startSearchProcess() {
        var _a;
        this.resetDeffereds();
        this.searchCompleted = false;
        this.searchResult = [];
        this.resetSearchResultDataSource();
        if (this.searchText) {
            this.loading = true;
            this.newSearch(this.searchText, this.matchCase, this.matchWholeWord);
        }
        else {
            (_a = this.reportPreview.currentPage) === null || _a === void 0 ? void 0 : _a.selectBrick('');
        }
    }
    searchButtonClick() {
        if (this.loading) {
            this.stopSearchProcess();
        }
        else {
            this.startSearchProcess();
        }
    }
    updateSearch(timeout) {
        if (!this.useAsyncSearch) {
            setTimeout(() => {
                this.startSearchProcess();
            }, timeout);
            return;
        }
        if (this.loading)
            this.stopSearchProcess();
        setTimeout(() => {
            if (!this.loading)
                this.startSearchProcess();
        }, timeout);
    }
    findNext(searchUp) {
        if (searchUp != undefined)
            this.searchUp = searchUp;
        if (this.loading && !this.useAsyncSearch) {
            return;
        }
        this._resultNavigator.next(this.searchUp);
    }
    dispose() {
        this._searchTimeout && clearTimeout(this._searchTimeout);
        super.dispose();
    }
    onItemRendered() {
        this._timeoutItemRendered && clearTimeout(this._timeoutItemRendered);
        this._timeoutItemRendered = setTimeout(() => {
            this.tabInfo.keyboardHelper && this.tabInfo.keyboardHelper.initialize();
        }, 100);
    }
    getActions(context) {
        return this.actions;
    }
    noResultText() {
        return formatUnicorn(getLocalization('No results found for {0}', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchNoResults'), '"' + this.searchText + '"');
    }
    getSearchButtonText() {
        return this.loading ? getLocalization('Stop', 'ASPxReportsStringId.SearchDialog_StopButton') : getLocalization('Search', 'ASPxReportsStringId.SearchDialog_SearchButton');
    }
    onSearchTextChanged(e) {
        this.searchText = e.component.option('text');
    }
}
SearchViewModel.createResultNavigator = (seacrhModel, reportPreview) => {
    return new SearchResultNavigator(seacrhModel, reportPreview);
};
__decorate([
    mutable(false)
], SearchViewModel.prototype, "matchWholeWord", void 0);
__decorate([
    mutable(false)
], SearchViewModel.prototype, "matchCase", void 0);
__decorate([
    mutable('')
], SearchViewModel.prototype, "searchText", void 0);
__decorate([
    mutableArray(() => [])
], SearchViewModel.prototype, "searchResult", void 0);
__decorate([
    mutable(false)
], SearchViewModel.prototype, "loading", void 0);
__decorate([
    mutable(() => new DataSource([]))
], SearchViewModel.prototype, "searchResultDataSource", void 0);
class SearchAction extends ViewerAction {
    constructor(tabInfo, reportPreview) {
        super(reportPreview, undefined, ['documentId', 'pageIndex', 'documentBuilding']);
        this.id = ActionId.Search;
        this.text = getLocalization('Search', 'ASPxReportsStringId.SearchDialog_Header');
        this.imageClassName = 'dxrd-image-search';
        this.imageTemplateName = 'dxrd-svg-preview-search';
        this.addDisposable(SearchAvailable.subscribe(() => this.visible = this.isVisible()));
        this.hasSeparator = true;
        this.hotKey = { ctrlKey: false, keyCode: 70 };
        this.clickAction = () => {
            tabInfo.active = true;
            tabInfo.collapsed = false;
        };
    }
    isVisible() {
        return SearchAvailable();
    }
    isDisabled() {
        return this.reportPreview.documentBuilding || !this.reportPreview.documentId || this.reportPreview.pageIndex === -1;
    }
}
