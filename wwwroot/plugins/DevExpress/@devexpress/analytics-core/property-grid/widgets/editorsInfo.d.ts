﻿/**
* DevExpress Analytics (property-grid\widgets\editorsInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditorInfo } from '../../serializer/serializationInfo';
export declare type BaseEditors = 'bool' | 'boolSelect' | 'numeric' | 'modificators' | 'combobox' | 'comboboxEditable' | 'text' | 'image' | 'file' | 'commonCollection' | 'font' | 'stringArray' | 'guid' | 'date' | 'borders' | 'textAlignment' | 'objecteditorCustom' | 'objecteditor' | 'inplaceObjectEditor' | 'field' | 'dataMember' | 'filterEditor' | 'formatEditor' | 'expressionEditor' | 'customColorEditor' | 'sbyte' | 'decimal' | 'int64' | 'int32' | 'int16' | 'single' | 'double' | 'byte' | 'uint16' | 'uint32' | 'uint64';
export declare class EditorTemplates<T extends string> {
    private _useDeferredRegistration;
    private _editorTemplates;
    constructor(_useDeferredRegistration?: boolean);
    register(name: T, editorInfo: IEditorInfo): void;
    unregister(name: T): void;
    registerEditors(editors: {
        [K in T]?: IEditorInfo;
    }): void;
    getEditor(name: T): IEditorInfo;
}
export declare const editorTemplates: EditorTemplates<BaseEditors>;
