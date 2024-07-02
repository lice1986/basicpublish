﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\richTextFileEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dxFileImagePicker } from '@devexpress/analytics-core/analytics-widgets-internal';
import registerComponent from 'devextreme/core/component_registrator';
export class dxRichTextFileEditor extends dxFileImagePicker {
    constructor(element, options) {
        super(element, options);
    }
    _handleResult(result) {
        this.option('value', result);
    }
}
registerComponent('dxRichTextFileEditor', dxRichTextFileEditor);