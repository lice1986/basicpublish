﻿/**
* DevExpress Analytics (core\widgets\_requiredNullableEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '../../property-grid/widgets/editor';
export declare class RequiredNullableEditor extends Editor {
    _getEditorValidationRules(): any[];
}
export declare function createNumericEditor(dotNetTypeFullName: string, specifics: string): {
    header: string;
    editorType: any;
};