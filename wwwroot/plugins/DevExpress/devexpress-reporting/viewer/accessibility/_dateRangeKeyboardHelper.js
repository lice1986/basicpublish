﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_dateRangeKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase, ControlElementWithParentHighlight, ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
export class DateRangeDialogElementWithHighlight extends ControlElementWithParentHighlight {
    constructor(element, _parentElement) {
        super(element, _parentElement);
        this.element = element;
        this.elementClassName = '.dx-calendar-views-wrapper';
        this.dateRangeItemHandleFocus = () => {
            const target = this._getTargetElement();
            target === null || target === void 0 ? void 0 : target.focus();
            if (!this._parentElement.classList.contains(this._borderCssClassName[1]))
                this._parentElement.classList.add(...this._borderCssClassName);
        };
        this.element.addEventListener('focus', this.dateRangeItemHandleFocus);
        const target = this._getTargetElement();
        target && target.addEventListener('blur', this.toolbarItemHandleBlur);
    }
    _getTargetElement() {
        return this.element.querySelector(this.elementClassName);
    }
    dispose() {
        this.element.removeEventListener('focus', this.dateRangeItemHandleFocus);
        const target = this._getTargetElement();
        target && target.removeEventListener('blur', this.toolbarItemHandleBlur);
        super.dispose();
    }
}
export class DateRangeDialogElementsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor(_dateRangeEditor) {
        super();
        this._dateRangeEditor = _dateRangeEditor;
        this.controlElementClassName = 'dx-accessibility-daterange-item';
        this._next = 1;
        this.predefinedDateRangesKeyboardHelper = new PredefinedDateRangesKeyboardHelper(this);
        this.addDisposable(this.predefinedDateRangesKeyboardHelper, this._dateRangeEditor.events.on('_popupVisibleChanged', (args) => {
            const timeout = setTimeout(() => { this._dateRangeEditor._popupVisible && this.predefinedDateRangesKeyboardHelper.focus(); }, 300);
            this._disposables.push({ dispose: () => clearTimeout(timeout) });
        }));
    }
    createControlElement(element, index) {
        return new DateRangeDialogElementWithHighlight(element, this.getContainer().getElementsByClassName('dxrv-daterange-editor-item')[index]);
    }
    itemHandleEscKey(e, index) {
        this._dateRangeEditor._hidePopup();
        return true;
    }
    itemHandleUpArrowKey(e, index) {
        if (!!(e && e.altKey)) {
            this._dateRangeEditor._hidePopup();
            return true;
        }
        return super.itemHandleUpArrowKey(e, index);
    }
    itemHandleTabKey(e, index) {
        const nextIndex = this.setFocusToNext(index);
        if (nextIndex == 0) {
            this.predefinedDateRangesKeyboardHelper.focus();
        }
        return true;
    }
    itemHandleShiftTabKey(e, index) {
        const nextIndex = this.setFocusToPrevious(index);
        if (nextIndex == 0) {
            this.predefinedDateRangesKeyboardHelper.focus();
        }
        return true;
    }
    handleTabKey(e) {
        const nextIndex = this.setFocusToNext(this._next, true);
        if (nextIndex == 0) {
            this.predefinedDateRangesKeyboardHelper.focus();
        }
        return true;
    }
    setFocusToNext(currentIndex, roundTrip) {
        this._next = currentIndex + 1;
        return super.setFocusToNext(currentIndex, roundTrip);
    }
}
export class PredefinedDateRangesKeyboardHelper extends ListKeyboardHelper {
    constructor(owner) {
        super();
        this.owner = owner;
    }
    itemHandleEscKey(e, index) {
        this.owner.itemHandleEscKey.call(this.owner, e, 0);
        return true;
    }
    itemHandleTabKey(e, index) {
        this.owner.setFocusToNext(0);
        return true;
    }
    itemHandleShiftTabKey(e, index) {
        this.owner.setFocusToPrevious(0);
        return true;
    }
    itemHandleUpArrowKey(e, index) {
        if (!!(e && e.altKey)) {
            return this.owner.itemHandleUpArrowKey.call(this.owner, e);
        }
        return super.itemHandleUpArrowKey(e, index);
    }
}
