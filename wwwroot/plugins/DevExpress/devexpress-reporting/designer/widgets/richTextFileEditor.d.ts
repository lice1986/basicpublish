﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\richTextFileEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFileUploadResult } from '@devexpress/analytics-core/analytics-internal';
import { dxFileImagePicker } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class dxRichTextFileEditor extends dxFileImagePicker {
    constructor(element: any, options?: any);
    _handleResult(result: IFileUploadResult): void;
}
