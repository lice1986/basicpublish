﻿/**
* DevExpress Analytics (property-grid\localization\localization_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function addCultureInfo(json: {
    messages: any;
}): void;
export declare function getLocalization(text: string, id?: string, _removeWinSymblols?: boolean): any;
export declare function _stringEndsWith(value: string, searchString: string): boolean;
export declare function updateLocalization(object: {
    [key: string]: string;
}): void;
