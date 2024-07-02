﻿/**
* DevExpress Analytics (accessibility\_accordionKeyboardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export class AccordionKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor(_editorViewModelsAccessor, _onToggleCollapsed = () => void 0) {
        super();
        this._editorViewModelsAccessor = _editorViewModelsAccessor;
        this._onToggleCollapsed = _onToggleCollapsed;
        this.controlElementClassName = 'dxrd-accessibility-accordion-trigger';
    }
    _collapseItem(item) {
        const editorViewModel = this._editorViewModelsAccessor();
        if (editorViewModel) {
            const collapsed = editorViewModel.getCollapsed();
            const alwaysShow = editorViewModel.alwaysShow;
            editorViewModel.setCollapsed(alwaysShow ? false : !collapsed);
            this._onToggleCollapsed();
        }
    }
    itemHandleEnterKey(e, index) {
        this._collapseItem(e.target);
        return true;
    }
    itemHandleSpaceKey(e, index) {
        this._collapseItem(e.target);
        return true;
    }
    clickHandler(e, index) {
        this._onToggleCollapsed();
        super.clickHandler(e, index);
    }
}
export class PropertyGridKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor(_editorsViewModelsAccessor) {
        super();
        this._editorsViewModelsAccessor = _editorsViewModelsAccessor;
        this.controlElementClassName = 'dxrd-accessibility-accordion-trigger';
        this.focusFirstFocusableDescendant = true;
        this._complexEditorMap = {};
        this._triggersParentToChildMap = {};
    }
    _getElementsCount() {
        return Array
            .from(this.getContainer().querySelectorAll('.' + this.controlElementClassName))
            .filter(elt => this._filterPredicate(elt))
            .length;
    }
    _defferedInit() {
        setTimeout(() => {
            if (this.controlElements.length !== this._getElementsCount()) {
                this.initialize();
            }
        }, 20);
    }
    _getComplexEditors() {
        const editorsMap = {};
        const getComplexEditorsRecursive = (editors, editorsMap) => {
            editors && editors
                .filter(e => e.isComplexEditor)
                .forEach(e => {
                editorsMap[e.headerId] = { editor: e, isInitialized: false };
                getComplexEditorsRecursive(e.viewmodel.editors, editorsMap);
            });
        };
        getComplexEditorsRecursive(this._editorsViewModelsAccessor(), editorsMap);
        return editorsMap;
    }
    _getComplexEditorsHierarchy() {
        const map = {};
        const getComplexEditorsHierarchyRecursive = (parentEditor, map) => {
            const complexChildrenEditors = parentEditor.viewmodel.editors.filter(e => e.isComplexEditor);
            complexChildrenEditors.forEach(complexEditor => {
                map[complexEditor.headerId] = parentEditor.headerId;
                getComplexEditorsHierarchyRecursive(complexEditor, map);
            });
        };
        this._editorsViewModelsAccessor().filter(e => e.isComplexEditor).forEach(editor => {
            getComplexEditorsHierarchyRecursive(editor, map);
        });
        return map;
    }
    _filterPredicate(elt) {
        var _a, _b;
        let curEltId = elt.id;
        while (this._triggersParentToChildMap && this._triggersParentToChildMap[curEltId]) {
            if ((_b = (_a = this._complexEditorMap[this._triggersParentToChildMap[curEltId]]) === null || _a === void 0 ? void 0 : _a.editor) === null || _b === void 0 ? void 0 : _b.getCollapsed())
                return false;
            curEltId = this._triggersParentToChildMap[curEltId];
        }
        return true;
    }
    initialize() {
        if (!Object.keys(this._complexEditorMap).length)
            this._complexEditorMap = this._getComplexEditors();
        if (!Object.keys(this._triggersParentToChildMap).length)
            this._triggersParentToChildMap = this._getComplexEditorsHierarchy();
        Object.keys(this._complexEditorMap).forEach(headerId => {
            if (!this._complexEditorMap[headerId].isInitialized) {
                const elt = document.getElementById(headerId);
                if (elt) {
                    const helper = new AccordionKeyboardHelper(() => this._complexEditorMap[headerId].editor, () => this._defferedInit());
                    helper.bindHandler(elt);
                    this.addDisposable(helper);
                    this._complexEditorMap[headerId].isInitialized = true;
                }
            }
        });
        super.initialize(elt => this._filterPredicate(elt));
        this.setTabIndexes(0);
    }
    itemHandleUpArrowKey(e, index) {
        this.setFocusToPrevious(index);
        return true;
    }
    itemHandleDownArrowKey(e, index) {
        this.setFocusToNext(index);
        return true;
    }
}