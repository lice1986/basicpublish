﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewParameterHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewParameterHelper } from '../../parameters/previewParameterHelper';
import { editorTemplates } from './_editorTemplates';
export class MobilePreviewParameterHelper extends PreviewParameterHelper {
    getRangeEditor() {
        return editorTemplates.rangeEditor;
    }
}