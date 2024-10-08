﻿/**
* DevExpress Analytics (query-builder\widgets\ace\_options.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import './_ace-mode-sql';
export function createDefaultSQLAceOptions(readOnly = false) {
    return {
        showLineNumbers: false,
        showPrintMargin: false,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        readOnly: readOnly,
        highlightSelectedWord: readOnly,
        showGutter: false,
        highlightActiveLine: false
    };
}
export function createDefaultSQLAdditionalOptions(value) {
    return {
        onChange: (session) => {
            value(session.getValue());
        },
        onValueChange: (editor) => {
            editor.resize(true);
        },
        changeTimeout: 200,
        overrideEditorFocus: true,
        setUseWrapMode: true
    };
}
export function createDefaultSQLLanguageHelper() {
    return {
        getLanguageMode: () => 'ace/mode/sql',
        createCompleters: () => { return []; }
    };
}
