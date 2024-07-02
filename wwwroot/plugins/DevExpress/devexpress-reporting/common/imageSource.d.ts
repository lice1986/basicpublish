﻿/**
* DevExpress HTML/JS Reporting (common\imageSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class ImageSource {
    sourceType: string;
    data: string;
    constructor(sourceType: string, data: string);
    getDataUrl(): string;
    static parse(val: string): ImageSource;
    static toString(val: ImageSource): string;
}
