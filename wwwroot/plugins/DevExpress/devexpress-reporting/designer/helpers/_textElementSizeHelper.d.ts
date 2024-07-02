﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_textElementSizeHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class TextElementSizeHelper {
    private _spaceSymbol;
    private _$createElement;
    $createTextElement(text: string, options: Object): JQuery<HTMLElement>;
    $createSpaceElement(options: Object): JQuery<HTMLElement>;
    getTextContainerSize(text: any, options: any, increaseHeight?: number): {
        width: number;
        height: number;
    };
}
