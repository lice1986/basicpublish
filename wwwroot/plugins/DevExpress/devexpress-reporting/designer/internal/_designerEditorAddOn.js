﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_designerEditorAddOn.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditorAddOn } from '@devexpress/analytics-core/analytics-internal';
import { expressionEditorActionId } from './_expressionEditorAction';
export class DesignerEditorAddOn extends EditorAddOn {
    constructor(editor, popupService, imageTemplateName = '') {
        super(editor, popupService);
        this._set('imageTemplateName', imageTemplateName);
    }
    onPopupShown(popupService) { }
    showPopup(_, element) {
        super.showPopup(_, element);
        const popupService = this['_popupService'];
        this.onPopupShown(popupService);
        popupService.target(element);
    }
}
export class ExpressionEditorAddOn extends DesignerEditorAddOn {
    constructor() {
        super(...arguments);
        this.activateExpressionEditorFunc = (expressionEditor) => void 0;
        this.templateName = 'dxrd-expression-editor-addon';
    }
    dispose() {
        super.dispose();
        this.activateExpressionEditorFunc = null;
    }
    actionFilter(action) {
        return super.actionFilter(action) && action.id === expressionEditorActionId;
    }
    onPopupShown(popupService) {
        popupService.disabled(false);
        const actions = popupService.actions();
        if (actions.length == 1) {
            const items = actions[0].items;
            if (items && !!items.length) {
                popupService.actions(items);
                popupService.title(actions[0].title);
            }
            else {
                actions[0].action(this['_editor'].name);
                this.activateExpressionEditorFunc(actions[0]);
            }
        }
    }
    cacheFunction(callback) {
        this.activateExpressionEditorFunc = callback;
    }
}
export class ValueEditorAddOn extends DesignerEditorAddOn {
    onPopupShown(popupService) {
        popupService.disabled(this['_editor']._get('disabled'));
    }
    actionFilter(action) {
        return super.actionFilter(action) && action.id !== expressionEditorActionId;
    }
}
