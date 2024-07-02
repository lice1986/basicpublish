﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_expressionEditorAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const expressionEditorActionId = 'dxrd-expression';
export function createExpressionEditorAction({ expressionEditor, hasInnerItems, title, hint }) {
    return {
        id: expressionEditorActionId,
        action: hasInnerItems ?
            (propertyName) => { } :
            (propertyName) => {
                expressionEditor.popupVisible(true);
            },
        title: title,
        itemTemplate: 'dxrd-expression-action',
        hint: hint,
        weight: 50,
        innerTemplate: hasInnerItems ? null : {
            name: 'dxrd-expressioneditor-popup',
            data: expressionEditor
        },
        visible: (name) => true
    };
}
