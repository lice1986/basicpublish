﻿/**
* DevExpress Analytics (query-builder\widgets\ace\_options.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import './_ace-mode-sql';
export declare function createDefaultSQLAceOptions(readOnly?: boolean): {
    showLineNumbers: boolean;
    showPrintMargin: boolean;
    enableBasicAutocompletion: boolean;
    enableLiveAutocompletion: boolean;
    readOnly: boolean;
    highlightSelectedWord: boolean;
    showGutter: boolean;
    highlightActiveLine: boolean;
};
export declare function createDefaultSQLAdditionalOptions(value: any): {
    onChange: (session: any) => void;
    onValueChange: (editor: any) => void;
    changeTimeout: number;
    overrideEditorFocus: boolean;
    setUseWrapMode: boolean;
};
export declare function createDefaultSQLLanguageHelper(): {
    getLanguageMode: () => string;
    createCompleters: () => any[];
};