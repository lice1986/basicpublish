﻿/**
* DevExpress Analytics (core\internal\_globalize.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface ILocalizationSettings extends IGlobalizeSettings {
    localization?: {
        [stringId: string]: string;
    };
}
export interface IGlobalizeSettings {
    currentCulture?: string;
    cldrData?: string;
    cldrSupplemental?: string;
}
export declare function initGlobalize(settings: IGlobalizeSettings): void;