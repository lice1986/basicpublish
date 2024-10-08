﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { editor_template, IActionsProvider } from '@devexpress/analytics-core/analytics-internal-native';
import { IAction, TabInfo } from '@devexpress/analytics-core/analytics-utils-native';
import DataSource from 'devextreme/data/data_source';
import { ReportPreview } from '../reportPreview';
import { SearchResultNavigator } from './_searchResultNavigator';
import { ISearchSettings } from '../utils/initializer';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { FocusOutEvent, KeyDownEvent, ValueChangedEvent as TextChangedEvent } from 'devextreme/ui/text_box';
import { ClickEvent } from 'devextreme/ui/button';
import { ValueChangedEvent } from 'devextreme/ui/check_box';
import { ItemRenderedEvent } from 'devextreme/ui/list';
export interface IFoundText {
    pageIndex: number;
    indexes: string;
    id: number;
    text: string;
}
export interface ISearchResult {
    matches: Array<IFoundText>;
    success: boolean;
    faultMessage: string;
}
export interface ISearchResultItemViewModel extends IViewModel {
    itemClickAction: (e: any) => void;
    data: IFoundText;
    attr: {
        'aria-label': string;
    };
    info: string;
}
interface ISearchEditorCheckBox {
    text: string;
    value: boolean;
    onValueChanged: (event: ValueChangedEvent) => void;
}
interface ISearchEditorArrowButton {
    template: typeof editor_template;
    icon: string;
    onClick: (event: ClickEvent) => void;
}
export interface ISearchViewModel extends IViewModel {
    buttons: {
        searchButton: {
            text: string;
            disabled: boolean;
            onClick: (e: ClickEvent) => void;
        };
        upButton: ISearchEditorArrowButton;
        downButton: ISearchEditorArrowButton;
    };
    searchEditor: {
        onKeyDown: (e: KeyDownEvent) => void;
        onFocusOut: (e: FocusOutEvent) => void;
        inputAttr: {
            type: string;
            title: string;
        };
    };
    matchCaseEditor: ISearchEditorCheckBox;
    matchWholeWordEditor: ISearchEditorCheckBox;
    loading: boolean;
    headerText: string;
    noResultText: string;
    resultsInText: string;
    searchCompleted: boolean;
    resultsPagesText: string;
    searchResultCount: number;
    searchResultHeaderId: string;
    searchResultPageCount: number;
    searchResultDataSource: DataSource;
    doSearch: (searchUp: boolean) => void;
    onItemRendered: (event: ItemRenderedEvent) => void;
}
export declare class SearchViewModel extends BaseRenderingModel<ISearchViewModel> implements IActionsProvider {
    reportPreview: ReportPreview;
    private _cachedRequests;
    private _cachedWholeWordRequests;
    private _cachedCaseSensitiveRequests;
    private _cachedWholeWordWithCaseRequests;
    private _resultNavigator;
    private _timeoutItemRendered;
    private _searchTimeout;
    private _searchIgnoreObs;
    static createResultNavigator: (seacrhModel: SearchViewModel, reportPreview: ReportPreview) => SearchResultNavigator;
    updateViewModel(args: PropertyChangedEventArgs<SearchViewModel> | ArrayPropertyChangedEventArgs<SearchViewModel>): void;
    createViewModel(): ISearchViewModel;
    resetSearchResult(): void;
    findTextRequestDone(result: ISearchResult, cache: IFoundText[]): void;
    appentSearchResult(result: ISearchResult): void;
    performSearchAsync(text: string, reportPreview: ReportPreview, ignore?: boolean): void;
    performSearch(text: string, reportPreview: ReportPreview, cache: {
        [key: string]: IFoundText[];
    }, ignore?: boolean): void;
    mapSearchResultsToViewModels(results: {
        data: IFoundText;
    }[]): ISearchResultItemViewModel[];
    resetSearchResultDataSource(): void;
    resetDeffereds(): void;
    failRequestHandler(ignore: boolean): void;
    onPropertyChanged(args: PropertyChangedEventArgs<SearchViewModel> | ArrayPropertyChangedEventArgs<SearchViewModel>): void;
    constructor(reportPreview: ReportPreview, searchSettings?: ISearchSettings, enableKeyboardSupport?: boolean);
    goToResult(result: IFoundText): void;
    newSearch(text: string, matchCase: boolean, matchWholeWord: boolean): void;
    stopSearchProcess(): void;
    startSearchProcess(): void;
    searchButtonClick(): void;
    updateSearch(timeout: number): void;
    findNext(searchUp?: boolean): void;
    dispose(): void;
    onItemRendered(): void;
    getActions(context: object): IAction[];
    noResultText(): string;
    getSearchButtonText(): string;
    onSearchTextChanged(e: FocusOutEvent | TextChangedEvent): void;
    tabInfo: TabInfo;
    actions: IAction[];
    matchWholeWord: boolean;
    matchCase: boolean;
    searchUp: boolean;
    searchText: string;
    searchResult: IFoundText[];
    searchOperationId: string;
    loading: boolean;
    searchResultCount: number;
    searchResultPageCount: number;
    stopSearchDisabled: boolean;
    searchCompleted: boolean;
    _renderedSearchResult: {
        data: IFoundText;
    }[];
    searchResultDataSource: DataSource;
    useAsyncSearch: boolean;
    searchRequestDeferred: JQuery.Deferred<any, any, any>;
    startSearchDeferred: JQuery.Deferred<any, any, any>;
    fetchLimit: number;
    pageSize: number;
}
export {};
