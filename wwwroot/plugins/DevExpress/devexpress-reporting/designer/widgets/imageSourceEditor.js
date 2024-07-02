﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\imageSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import { dxFileImagePicker } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ImageSource } from '../../common/imageSource';
export class dxImageSourceEditor extends dxFileImagePicker {
    constructor(element, options) {
        options.placeholderId = options.placeholderId || 'Image';
        super(element, options);
    }
    _toggleReadOnlyState() {
        super['_toggleReadOnlyState'].apply(this);
        this['_input']().prop('readOnly', true);
    }
    _handleResult(result) {
        let format = result.format.toLowerCase();
        if (format !== 'svg' && format !== 'png' && format !== 'jpg' && format !== 'jpeg')
            format = 'img';
        this.option('value', new ImageSource(format, result.content));
    }
}
registerComponent('dxImageSourceEditor', dxImageSourceEditor);
