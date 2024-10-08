﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sortingProcessor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IKeyValuePair } from '../../common/types';
import { ISortingFieldInfo } from './_previewRequestWrapper';
import { ISortingData } from '../utils/utils';
export declare class SortingProcessor {
    private _getSortingStage;
    constructor(_getSortingStage: () => Array<IKeyValuePair<Array<ISortingFieldInfo>>>);
    doSorting(sortData: ISortingData, shiftKey?: boolean, ctrlKey?: boolean): boolean;
    private _applySorting;
    private _appendSorting;
    private _detachSorting;
    private _changeSortOrder;
}
