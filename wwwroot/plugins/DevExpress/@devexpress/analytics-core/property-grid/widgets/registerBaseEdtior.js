﻿/**
* DevExpress Analytics (property-grid\widgets\registerBaseEdtior.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from './editorsInfo';
import { FontEditor } from './fonteditor/editor';
import { PropertyGridEditorFlat } from '../propertygrid';
import { registerBaseEditorsNative } from './registerBaseEdtior.native';
export function registerBaseEditors() {
    registerBaseEditorsNative();
    editorTemplates.registerEditors({
        'comboboxEditable': { header: 'dx-combobox-editable' },
        'image': { header: 'dx-image' },
        'file': { header: 'dx-file' },
        'stringArray': { header: 'dx-emptyHeader', content: 'dx-string-array' },
        'font': { header: 'dx-emptyHeader', content: 'dx-objectEditorContent', editorType: FontEditor },
        'inplaceObjectEditor': { custom: 'dx-objectEditorContent', editorType: PropertyGridEditorFlat }
    });
}