﻿/**
* DevExpress Analytics (property-grid\widgets\registerBaseEdtior.native.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from './editorsInfo';
import { PropertyGridEditor } from '../propertygrid';
import { BooleanEditor } from '../../core/widgets/booleanEditor';
let isRegistered = false;
export function registerBaseEditorsNative() {
    if (!isRegistered) {
        isRegistered = true;
        editorTemplates.registerEditors({
            'bool': { header: 'dx-boolean', editorType: BooleanEditor },
            'boolSelect': { header: 'dx-boolean-select' },
            'numeric': { header: 'dx-numeric' },
            'modificators': { custom: 'dx-modificators' },
            'combobox': { header: 'dx-combobox' },
            'text': { header: 'dx-text' },
            'commonCollection': { custom: 'dx-commonCollection' },
            'objecteditor': { header: 'dx-emptyHeader', content: 'dx-objectEditorContent', editorType: PropertyGridEditor },
        });
    }
}