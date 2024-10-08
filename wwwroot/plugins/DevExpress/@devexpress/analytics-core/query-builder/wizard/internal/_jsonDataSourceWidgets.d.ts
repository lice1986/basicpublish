﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonDataSourceWidgets.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../../property-grid/widgets/editor';
import { ISerializationInfo } from '../../../serializer/serializationInfo';
export declare function getLocalizedValidationErrorMessage(emptyValueErrorMessage: string, localizedPropertyName?: string, subProperty?: string): any;
export declare class JsonStringEditor extends Editor {
    constructor(modelPropertyInfo: ISerializationInfo, level: any, parentDisabled: any, textToSearch: any);
    b64DecodeUnicode(base64string: any): string;
    uploadFile(e: any): void;
    getUploadTitle(): any;
    aceEditorHasErrors: ko.Observable<boolean>;
    aceAvailable: any;
    editorContainer: ko.Observable<any>;
    _model: ko.Observable<any>;
    languageHelper: {
        getLanguageMode: () => string;
        createCompleters: () => any[];
    };
    aceOptions: {
        showLineNumbers: boolean;
        highlightActiveLine: boolean;
        showPrintMargin: boolean;
        enableBasicAutocompletion: boolean;
        enableLiveAutocompletion: boolean;
    };
    isValid: ko.Computed<any>;
    additionalOptions: {
        onChangeAnnotation: (session: any) => void;
        onBlur: () => void;
    };
    jsonStringValidationRules: Array<any>;
}
