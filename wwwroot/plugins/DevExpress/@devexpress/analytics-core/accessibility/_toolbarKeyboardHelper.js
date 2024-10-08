﻿/**
* DevExpress Analytics (accessibility\_toolbarKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxSelectBox from 'devextreme/ui/select_box';
import dxMenu from 'devextreme/ui/menu';
import { KeyboardHelperWithArrowButtonBase } from './_keyboardHelperWithArrowButtonBase';
import { ControlElementWithParentHighlight } from './_controlElementWithParentHighlight';
import { getLocalization } from '../property-grid/localization/localization_utils';
import { koUtils } from '../core/utils/_koUtils';
export class ToolbarKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    constructor(_buttonModels) {
        super();
        this._buttonModels = _buttonModels;
        this.controlElementClassName = 'dx-accessibility-toolbar-item';
        this.liveRegionId = 'dxrd-preview-toolbar-live-region';
        this._buttonsSubscriptions = [];
        this._initializationTimeout = null;
        this._subscribeButtonsAndInitialize(this.buttonModels);
        if (koUtils.isSubscribable(this._buttonModels)) {
            this.addDisposable(this._buttonModels.subscribe((newVal) => {
                this._buttonsSubscriptions.forEach((x) => x.dispose());
                this._buttonsSubscriptions = [];
                this._subscribeButtonsAndInitialize(newVal);
            }));
        }
    }
    _subscribeButtonsAndInitialize(buttons) {
        buttons.forEach(button => {
            if (koUtils.isSubscribable(button.visible)) {
                this._buttonsSubscriptions.push(button.visible.subscribe(() => this._initialize()));
            }
        });
        this._initialize();
    }
    _initialize() {
        this._initializationTimeout && clearTimeout(this._initializationTimeout);
        this._initializationTimeout = setTimeout(() => this.initialize(), 100);
    }
    createControlElement(element, index) {
        const action = this.buttonModels[index];
        if (action.getVisible && action.getVisible() || koUtils.unwrap(action.visible))
            return new ToolbarItemElement(element, this.getContainer(), action, this.liveRegion.bind(this));
    }
    itemHandleEnterKey(e, index) {
        const item = this.controlElements[index];
        item.actionExecute();
        return true;
    }
    itemHandleSpaceKey(e, index) {
        const item = this.controlElements[index];
        item.actionExecute();
        return true;
    }
    itemHandleLeftArrowKey(e, index) {
        this.setFocusToPrevious(index);
        return true;
    }
    itemHandleRightArrowKey(e, index) {
        this.setFocusToNext(index);
        return true;
    }
    get buttonModels() {
        return koUtils.unwrap(this._buttonModels);
    }
}
class ToolbarItemElement extends ControlElementWithParentHighlight {
    constructor(element, _toolbarElement, _toolbarItemModel, _liveRegion) {
        super(element, _toolbarElement);
        this.element = element;
        this._toolbarItemModel = _toolbarItemModel;
        this._liveRegion = _liveRegion;
        this._selectBox = dxSelectBox.getInstance(element.children[0]);
        this._menu = dxMenu.getInstance(element.children[0]);
    }
    _complexItem() {
        if (this._selectBox || this._menu)
            return true;
        return false;
    }
    dispose() {
        super.dispose();
        this._menu = null;
        this._selectBox = null;
    }
    setFocus() {
        if (this._complexItem() && this.element.getAttribute('aria-disabled') !== 'true')
            this._liveRegion().changeText(getLocalization('press Enter or Space to activate the editor', 'ASPxReportsStringId.WebDocumentViewer_AriaActivateEditor'), 200);
        else
            this._liveRegion().changeText('');
        return super.setFocus();
    }
    actionExecute() {
        if (this._complexItem()) {
            this._liveRegion().changeText(getLocalization('Press Alt ↓ or Alt  ↑ to navigate the editor. Press Shift Tab to exit navigation mode.', 'ASPxReportsStringId.WebDocumentViewer_AriaEditorKeyboardNavigation'), 500);
        }
        if (this._selectBox) {
            this._selectBox.focus();
            return;
        }
        if (this._menu) {
            this._menu.focus();
            return;
        }
        if (!koUtils.unwrap(this._toolbarItemModel.disabled))
            this._toolbarItemModel.clickAction();
    }
}
