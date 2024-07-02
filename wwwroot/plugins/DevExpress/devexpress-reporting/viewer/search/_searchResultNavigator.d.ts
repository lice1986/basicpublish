﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchResultNavigator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFoundText, SearchViewModel } from './_searchViewModel';
import { ReportPreview } from '../reportPreview';
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
export interface ISearchResultNavigator {
    next: (up: boolean) => boolean;
    getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => IFoundText;
    currentResult: IFoundText;
    goToResult: (resultId: number) => void;
}
export declare class SearchResultNavigator extends Disposable implements ISearchResultNavigator {
    constructor(searchModel: SearchViewModel, reportPreview: ReportPreview);
    next: (up: boolean) => boolean;
    getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => IFoundText;
    currentResult: IFoundText;
    goToResult: (resultId: number) => void;
}
