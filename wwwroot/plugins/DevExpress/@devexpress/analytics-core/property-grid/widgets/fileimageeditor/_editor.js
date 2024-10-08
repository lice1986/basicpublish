﻿/**
* DevExpress Analytics (property-grid\widgets\fileimageeditor\_editor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import * as $ from 'jquery';
import { getLocalization } from '../../localization/localization_utils';
import { dxEllipsisEditor } from '../ellipsiseditor/_editor';
import { uploadFile } from '../internal/_utils';
const editor_prefix = 'dx-fileimage', EDITOR_INPUT_WRAPPER_CLASS = editor_prefix + '-input-wrapper';
export class dxFileImagePicker extends dxEllipsisEditor {
    constructor(element, options) {
        options.placeholder = options.placeholder || getLocalization('(none)', 'DxDesignerStringId.None');
        super(element, options);
    }
    _getDisplayValue() {
        const knownPlaceholders = {
            'Image': 'AnalyticsCoreStringId.ImagePicker_Placeholder',
            'File': 'AnalyticsCoreStringId.FilePicker_Placeholder'
        };
        const placeholderId = this.option('placeholderId');
        if (this.option('value') && placeholderId)
            return getLocalization(placeholderId, knownPlaceholders[placeholderId]);
        else
            return this.option('value');
    }
    _handleResult(result) {
        if (this.option('useFormat')) {
            this.option('format', result.format);
        }
        this.option('value', result.content);
    }
    _renderInput(inputContainer) {
        const $inputContainer = inputContainer && $.fn.constructor(inputContainer) || $.fn.constructor('<div />');
        $inputContainer.addClass(EDITOR_INPUT_WRAPPER_CLASS);
        this['_inputContainer'] = $inputContainer.get(0);
        $.fn.constructor(this.element()).append(this['_inputContainer']);
        super['_renderInput'].apply(this, [inputContainer]);
    }
    _attachButtonEvents() {
        this._$button.off('click');
        if (!this.option('disabled')) {
            this._$button.on('click', (e) => {
                var _a, _b;
                e.stopPropagation();
                e.preventDefault();
                uploadFile({
                    accept: ((_a = this.option('accept')) === null || _a === void 0 ? void 0 : _a.toString()) || 'image/*',
                    readMode: (_b = this.option('readMode')) === null || _b === void 0 ? void 0 : _b.toString()
                }).done((result) => {
                    this._handleResult(result);
                });
            });
        }
    }
    _renderValue() {
        this.option('text', this._getDisplayValue());
        super['_renderValue'].apply(this);
    }
}
registerComponent('dxFileImagePicker', dxFileImagePicker);
