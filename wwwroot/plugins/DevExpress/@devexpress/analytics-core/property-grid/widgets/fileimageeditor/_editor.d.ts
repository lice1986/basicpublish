﻿/**
* DevExpress Analytics (property-grid\widgets\fileimageeditor\_editor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dxEllipsisEditor } from '../ellipsiseditor/_editor';
import { IFileUploadResult } from '../internal/_utils';
export declare class dxFileImagePicker extends dxEllipsisEditor {
    constructor(element: any, options?: any);
    _getDisplayValue(): any;
    _handleResult(result: IFileUploadResult): void;
    _renderInput(inputContainer: any): void;
    _attachButtonEvents(): void;
    _renderValue(): void;
}
