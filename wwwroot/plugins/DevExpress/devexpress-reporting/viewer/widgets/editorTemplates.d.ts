﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\editorTemplates.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParametersGroupEditor } from './_groupEditor';
import { MultiValueEditor } from './_multiValueEditor';
export declare const viewerEditorTemplates: {
    multiValue: {
        header: string;
        editorType: typeof MultiValueEditor;
    };
    groupEditor: {
        header: string;
        custom: string;
        content: string;
        editorType: typeof ParametersGroupEditor;
    };
    rangeEditor: {
        header: string;
    };
    multiValueEditable: {
        custom: string;
    };
    selectBox: {
        header: string;
    };
    separatorEditor: {
        header: string;
        custom: string;
    };
    signatures: {
        header: string;
    };
};
