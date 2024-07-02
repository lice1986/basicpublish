﻿/**
* DevExpress Analytics (accessibility\_rightPanelKeyboardHelperNative.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export class RightPanelKeyboardHelperNative extends AccessibilityKeyboardHelperBase {
    constructor(_tabPanel) {
        super();
        this._tabPanel = _tabPanel;
        this.controlElementClassName = 'dx-accessibility-rightpanel-button';
    }
    _initialize() {
        this._initTimeout && clearTimeout(this._initTimeout);
        this._initTimeout = setTimeout(() => {
            this.initialize();
        }, 1);
    }
    bindHandler(el) {
        super.bindHandler(el);
        this.addDisposable(...this._tabPanel.tabs.map(tab => tab.events.on('visibleChanged', args => {
            this._initialize();
        })));
        this._initialize();
    }
    initialize() {
        super.initialize();
        this.setTabIndexes(0);
    }
    createControlElement(element, index) {
        if (this._tabPanel.tabs[index].visible)
            return new AccessibilityControlElementBase(element);
    }
    itemHandleDownArrowKey(e, index) {
        this.setFocusToNext(index, true);
        return true;
    }
    itemHandleUpArrowKey(e, index) {
        this.setFocusToPrevious(index, true);
        return true;
    }
}
