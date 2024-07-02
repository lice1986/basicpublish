﻿/**
* DevExpress HTML/JS Reporting (designer\utils\base64ImageParser.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class Base64ImageParser {
    static getImageRatio(data: string, format: string): {
        x: number;
        y: number;
    };
    private static _getDataChunks;
    private static _countDpiFromBytes;
    private static _pngHasDpiChunks;
    static getMonitorPPI(): number;
}
