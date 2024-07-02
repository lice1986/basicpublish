﻿/**
* DevExpress Analytics (accessibility\_listKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ControlElementWithParentHighlight } from './_controlElementWithParentHighlight';
import { KeyboardHelperWithArrowButtonBase } from './_keyboardHelperWithArrowButtonBase';
export class ListKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    constructor() {
        super(...arguments);
        this.controlElementClassName = 'dx-accessibility-list-item';
    }
    createControlElement(element, index) {
        return new ControlElementWithParentHighlight(element, this.getContainer());
    }
    itemHandleUpArrowKey(e, index) {
        this.startIndex = this.setFocusToPrevious(index, false);
        return true;
    }
    itemHandleDownArrowKey(e, index) {
        this.startIndex = this.setFocusToNext(index, false);
        return true;
    }
}