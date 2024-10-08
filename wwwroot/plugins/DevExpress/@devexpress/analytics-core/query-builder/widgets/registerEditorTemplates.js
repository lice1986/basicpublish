﻿/**
* DevExpress Analytics (query-builder\widgets\registerEditorTemplates.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEditor } from './_undoEditor';
import { editorTemplates } from './editorTemplates';
export function registerEditorTemplates() {
    editorTemplates.registerEditors({
        bool: { header: 'dx-boolean-select', custom: 'dxqb-property-editor' },
        combobox: { header: 'dx-combobox', custom: 'dxqb-property-editor' },
        comboboxUndo: { header: 'dx-combobox-undo', custom: 'dxqb-property-editor', editorType: UndoEditor },
        text: { header: 'dx-text', custom: 'dxqb-property-editor' },
        filterEditor: { header: 'dxrd-filterstring', custom: 'dxqb-property-editor' },
        filterGroupEditor: { header: 'dxrd-filterstringgroup', custom: 'dxqb-property-editor' },
        numeric: { header: 'dx-numeric', custom: 'dxqb-property-editor' }
    });
}
