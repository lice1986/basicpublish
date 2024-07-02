﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewBricksKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase, getLocalization, KeyboardHelperWithArrowButtonBase } from '@devexpress/analytics-core/analytics-internal-native';
export class PreviewBricksKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    constructor(viewModel) {
        super();
        this.controlElementClassName = 'dx-accessibility-page-item';
        this.liveRegionId = 'dxrd-preview-bricks-live-region';
        this._needFocusNext = false;
        this._firstSelectedBrickIndex = 0;
        this._lastSelectedBrickIndex = 0;
        this._resetBricksIndexes = () => {
            this._firstSelectedBrickIndex = 0;
            this._lastSelectedBrickIndex = 0;
        };
        this._resetBricks = () => {
            return this._currentPage.selectBrick('');
        };
        this.delayedInit = () => {
            this._initTimeout && clearTimeout(this._initTimeout);
            this._initTimeout = setTimeout(() => {
                this.initialize();
            }, 20);
        };
        this.reset = () => {
            this._resetBricks();
            this._resetBricksIndexes();
        };
        this.active = false;
        this._getSelectedContent = viewModel.getSelectedContent;
        this._pages = () => viewModel.pages;
        this._goToPage = viewModel.goToPage.bind(viewModel);
        this._usePageKeyboardNavigation = () => viewModel.showMultipagePreview;
        this._disposables.push({
            dispose: viewModel.events.on('currentPageChanged', (args) => {
                const newPage = args.newValue;
                if (newPage) {
                    this._currentPage = newPage;
                    this.delayedInit();
                }
            })
        });
    }
    dispose() {
        this._activeBricksSubscription && this._activeBricksSubscription.dispose();
        this._afterInitializeCallback = null;
        this._initTimeout && clearTimeout(this._initTimeout);
        super.dispose();
    }
    initialize() {
        if (!this._currentPage)
            return;
        this._bricks = () => this._currentPage.bricks;
        if (this._usePageKeyboardNavigation()) {
            this.startIndex = this._pages().indexOf(this._currentPage);
        }
        else {
            this.startIndex = 0;
        }
        super.initialize();
        this._afterInitializeCallback && this._afterInitializeCallback();
        this._afterInitializeCallback = null;
        if (this._needFocusNext) {
            this.controlElements[this.startIndex].element.focus();
            this.lastFocusItem().setAttribute('tabindex', '-1');
            this._needFocusNext = false;
        }
        this._activeBricksSubscription && this._activeBricksSubscription.dispose();
        this._activeBricksSubscription = {
            dispose: this._currentPage.events.on('activeBricksChanged', (args) => {
                const activeBricks = this._currentPage.activeBricks;
                this._liveRegionTimeout && clearTimeout(this._liveRegionTimeout);
                if (!activeBricks.length)
                    return;
                this._liveRegionTimeout = this.liveRegion().changeText(this._getSelectedContent(','));
                const _bricks = this._bricks();
                for (let i = 0; i < _bricks.length; i++) {
                    const brick = _bricks[i];
                    if (brick === activeBricks[0])
                        this._firstSelectedBrickIndex = i;
                    if (brick === activeBricks[activeBricks.length - 1]) {
                        this._lastSelectedBrickIndex = i;
                        break;
                    }
                }
            })
        };
    }
    clickHandler() { }
    itemHandleEscKey(e, index) {
        if (!this.active)
            return false;
        this.controlElements[index].element.classList.remove('dx-accessibility-active-state');
        this.active = false;
        this._resetBricks();
        return true;
    }
    _actionExecute(brick, e) {
        if (brick.navigation) {
            brick.onClick(e);
        }
        else if (brick.efIndex) {
            const editField = this._currentPage.editingFields[brick.efIndex - 1];
            const efItems = Array.prototype.slice.call(e.target.querySelectorAll('.dx-accessibility-editing-field-item'));
            const efItem = efItems[brick.efIndex - 1];
            if (efItem && editField.canActivateEditor) {
                editField.activateEditor(editField, { target: efItem, currentTarget: efItem });
                const subscriptionDispose = editField.events.on('activeChanged', (args) => {
                    if (!args.newValue) {
                        if (document.activeElement === document.body) {
                            e.target.focus();
                        }
                        this._currentPage.activateBrick(brick);
                        this.active = true;
                        e.target.classList.add('dx-accessibility-active-state');
                        subscriptionDispose();
                    }
                });
                this._disposables.push({ dispose: subscriptionDispose });
            }
            else if (editField.onClick) {
                editField.onClick(editField, e);
            }
        }
    }
    _getNonEmptyBrick(index, reverse) {
        const nextIndex = index + (reverse ? -1 : 1);
        const _bricks = this._bricks();
        let brick = _bricks[nextIndex];
        if (reverse && nextIndex < 0 || nextIndex > _bricks.length - 1) {
            brick = this._getNonEmptyBrick(reverse ? _bricks.length : -1, reverse);
        }
        if (brick.efIndex && brick.efIndex > 0)
            return brick;
        else if (brick.accessibleDescription || brick.text() || brick.efIndex || brick.navigation)
            return brick;
        return this._getNonEmptyBrick(nextIndex, reverse);
    }
    _pageChangeHandle(action, newIndex, reverse = false) {
        this._needFocusNext = true;
        this.reset();
        if (!this.active) {
            if (this._usePageKeyboardNavigation())
                return action();
            else {
                const lastFocusItem = this.lastFocusItem();
                lastFocusItem.setAttribute('tabindex', '0');
                lastFocusItem.focus();
                return false;
            }
        }
        this._currentPage.activateBrick(this._getNonEmptyBrick(newIndex, reverse));
        return true;
    }
    _activatePage(e, index) {
        if (this._bricks().length) {
            const page = this.controlElements[index];
            this.active = true;
            page.element.classList.add('dx-accessibility-active-state');
            const lastBrick = this._getNonEmptyBrick(this._lastSelectedBrickIndex - 1, false);
            lastBrick && this._currentPage.activateBrick(lastBrick);
        }
    }
    itemHandleHomeKey(e, index) {
        return this._pageChangeHandle(() => super.itemHandleHomeKey(e, index), -1);
    }
    itemHandleEndKey(e, index) {
        return this._pageChangeHandle(() => super.itemHandleEndKey(e, index), this._bricks().length, true);
    }
    itemHandleLeftArrowKey(e, index) {
        return this._pageChangeHandle(() => {
            this.setFocusToPrevious(index);
            return true;
        }, this._firstSelectedBrickIndex, true);
    }
    itemHandleRightArrowKey(e, index) {
        return this._pageChangeHandle(() => {
            this.setFocusToNext(index);
            return true;
        }, this._lastSelectedBrickIndex);
    }
    itemHandleEnterKey(e, index) {
        if (this.active) {
            if (this._lastSelectedBrickIndex !== this._firstSelectedBrickIndex)
                return false;
            const brick = this._bricks()[this._lastSelectedBrickIndex];
            if (brick && brick.active) {
                this._actionExecute(brick, e);
            }
        }
        else if (this._usePageKeyboardNavigation() && this._currentPage !== this._pages()[index]) {
            this._goToPage(index);
            this._afterInitializeCallback = () => {
                this._activatePage(e, index);
            };
        }
        else {
            this._activatePage(e, index);
        }
        return true;
    }
    itemHandleSpaceKey(e, index) {
        return this.itemHandleEnterKey(e, index);
    }
    setFocusToPrevious(currentIndex) {
        return super.setFocusToPrevious(currentIndex);
    }
    setFocusToNext(currentIndex) {
        return super.setFocusToNext(currentIndex);
    }
    createControlElement(element, index) {
        return new PreviewPageControlsElement(element, this);
    }
}
class PreviewPageControlsElement extends AccessibilityControlElementBase {
    constructor(element, _keyboardHelper) {
        super(element);
        this.element = element;
        this._keyboardHelper = _keyboardHelper;
        this._focusHandler = () => {
            this._keyboardHelper.liveRegion().changeText(getLocalization('Press Enter or Space to switch to the document reading mode.', 'ASPxReportsStringId.WebDocumentViewer_AriaSwitchToDocumentReadingMode'));
            this.element.classList.remove('dx-accessibility-active-state');
            if (this._keyboardHelper.active) {
                this._keyboardHelper.reset();
            }
            this._keyboardHelper.active = false;
        };
        element.addEventListener('focus', this._focusHandler);
    }
    dispose() {
        this.element.removeEventListener('focus', this._focusHandler);
        super.dispose();
    }
}
