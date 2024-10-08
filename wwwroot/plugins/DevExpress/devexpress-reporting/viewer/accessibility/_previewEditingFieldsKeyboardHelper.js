﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewEditingFieldsKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase, AccessibilityKeyboardHelperBase } from '@devexpress/analytics-core/analytics-internal-native';
export class PreviewEditingFieldsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor(_page) {
        super();
        this._page = _page;
        this.controlElementClassName = 'dx-accessibility-editing-field-item';
        this.accessibilityCompliantEnabled = true;
    }
    initialize() {
        super.initialize();
        this.setTabIndexes(0);
    }
    clickHandler() { }
    itemHandleEnterKey(e, index) {
        const item = this.controlElements[index];
        item.actionExecute(e);
        return true;
    }
    itemHandleSpaceKey(e, index) {
        return this.itemHandleEnterKey(e, index);
    }
    createControlElement(element, index) {
        return new PreviewEditingFieldsElement(element, this._page.editingFields[index]);
    }
}
class PreviewEditingFieldsElement extends AccessibilityControlElementBase {
    constructor(element, model) {
        super(element);
        this.element = element;
        this.model = model;
        this._processFocus = true;
        this._isClick = (e) => this._processFocus = false;
        this._activateHandler = (e) => {
            if (this.model.canActivateEditor && this._processFocus) {
                this.model.activateEditor(this.model, { target: this.element, currentTarget: this.element });
                this.element.setAttribute('tabindex', '-1');
                const subscriptionDispose = this.model.events.on('activeChanged', (args) => {
                    if (!args.newValue) {
                        this.element.setAttribute('tabindex', '0');
                        if (document.activeElement === document.body) {
                            this._processFocus = false;
                            this.element.focus();
                        }
                        subscriptionDispose();
                    }
                });
                this._disposables.push({ dispose: subscriptionDispose });
            }
        };
        this._blur = (e) => {
            this._processFocus = true;
        };
        element.addEventListener('mousedown', this._isClick);
        element.addEventListener('focus', this._activateHandler);
        element.addEventListener('blur', this._blur);
    }
    dispose() {
        this.element.removeEventListener('mousedown', this._isClick);
        this.element.removeEventListener('focus', this._activateHandler);
        this.element.removeEventListener('blur', this._blur);
        super.dispose();
    }
    actionExecute(e) {
        if (this.model.canActivateEditor)
            this._activateHandler(e);
        else if (this.model.onClick)
            this.model.onClick(this.model, e);
    }
}
