﻿/**
* DevExpress Analytics (core\widgets\registerDesignerEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
import { PropertyGridEditor } from '../../property-grid/propertygrid';
import { FieldListEditor } from './fieldListEditor';
import { DataMemberEditor } from './dataMemberEditor';
import { registerNativeDesignerEditors } from './registerDesignerEditors.native';
export function registerDesignerEditors() {
    registerNativeDesignerEditors();
    editorTemplates.registerEditors({
        borders: { header: 'dxrd-borders' },
        textAlignment: { header: 'dxrd-textalignment' },
        objecteditorCustom: { custom: 'dxrd-objectEditorContent', editorType: PropertyGridEditor },
        field: { header: 'dxrd-field', editorType: FieldListEditor },
        dataMember: { header: 'dxrd-field', editorType: DataMemberEditor },
        filterEditor: { header: 'dxrd-filterstring' },
        formatEditor: { header: 'dxrd-formatstring' },
        expressionEditor: { header: 'dxrd-expressionstring' }
    });
}
