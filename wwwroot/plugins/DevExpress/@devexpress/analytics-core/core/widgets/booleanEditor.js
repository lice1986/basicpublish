﻿/**
* DevExpress Analytics (core\widgets\booleanEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '../../property-grid/widgets/editor';
import { addDisposeCallback } from '../../serializer/_internal';
import { extend } from 'jquery';
export class BooleanEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch, popupService, popover, engineType) {
        super(info, level, parentDisabled, textToSearch, popupService, popover, engineType);
    }
    _checkBoxInitializedHandler(element) {
        var _a;
        const checkBoxElement = (element.jquery || element.dxRenderer) ? element[0] : element;
        const labels = (_a = checkBoxElement === null || checkBoxElement === void 0 ? void 0 : checkBoxElement.closest('.dx-field')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('label');
        const labelElement = Array.from(labels).filter(elt => elt.getAttribute('for') === this.editorInputId)[0];
        if (labelElement) {
            const eventType = 'click';
            const eventListener = () => checkBoxElement.dispatchEvent(new Event(eventType));
            labelElement.addEventListener(eventType, eventListener);
            addDisposeCallback(labelElement, () => labelElement.removeEventListener(eventType, eventListener));
        }
    }
    getOptions(templateOptions) {
        const extendedOptions = this._get('info', 'peek').editor.extendedOptions;
        const editorCustomization = { onInitialized: e => this._checkBoxInitializedHandler(e.element) };
        return extend(true, {}, templateOptions, this.editorOptions, extendedOptions, editorCustomization);
    }
}
