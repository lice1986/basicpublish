﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\editorTemplates.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParametersGroupEditor } from './_groupEditor';
import { MultiValueEditor } from './_multiValueEditor';
export const viewerEditorTemplates = {
    multiValue: { header: 'dxrd-multivalue', editorType: MultiValueEditor },
    groupEditor: { header: 'dx-emptyHeader', custom: 'dxrd-parameters-property-editor', content: 'dxrd-parameters-editor-content', editorType: ParametersGroupEditor },
    rangeEditor: { header: 'dxrv-range-parameter' },
    multiValueEditable: { custom: 'dxrd-multivalue-editable' },
    selectBox: { header: 'dx-selectbox' },
    separatorEditor: { header: 'dx-emptyHeader', custom: 'dxrd-parameters-separator' },
    signatures: { header: 'dxrdv-signature' },
};
