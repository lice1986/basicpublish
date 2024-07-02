﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_searchKeyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { SearchViewModel } from '../search/_searchViewModel';
export declare class SearchKeyboardHelper extends ListKeyboardHelper {
    liveRegionId: string;
    constructor(searchModel: SearchViewModel);
}
