﻿/**
* DevExpress HTML/JS Reporting (common\binding\exportOptionsEventArgs.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewExportOptionsCustomizationArgs } from '../../viewer/utils/initializer';
export declare class CustomizeExportOptionsEventArgs {
    constructor(options: IPreviewExportOptionsCustomizationArgs);
    HideExportOptionsPanel(): void;
    HideFormat(format: any): void;
    HideProperties(format: any, ...paths: (string | string[])[]): void;
    GetExportOptionsModel(format: any): any;
    _options: IPreviewExportOptionsCustomizationArgs;
}