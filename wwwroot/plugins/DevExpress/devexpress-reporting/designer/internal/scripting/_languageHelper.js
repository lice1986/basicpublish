﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_languageHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { aceAvailable } from '@devexpress/analytics-core/analytics-widgets-internal';
import ace from 'ace-builds/src-noconflict/ace';
import modeCS from 'ace-builds/src-noconflict/mode-csharp';
import modevb from 'ace-builds/src-noconflict/mode-vbscript';
import { ReportCompleter } from './_reportCompleter';
aceAvailable(!!ace);
if (!window['ace'] && aceAvailable()) {
    ace.config.setModuleUrl('ace/mode/csharp', modeCS);
    ace.config.setModuleUrl('ace/mode/vbscript', modevb);
}
export class LanguageHelper {
    constructor(report) {
        this._report = report;
    }
    getLanguageMode() {
        if (this._report()) {
            const scriptLanguage = this._report().scriptLanguage();
            switch (scriptLanguage) {
                case 'CSharp':
                    return 'ace/mode/csharp';
                case 'VisualBasic':
                    return 'ace/mode/vbscript';
                default:
                    return 'ace/mode/text';
            }
        }
    }
    createNewHandler(eventName, eventArgsType) {
        if (this._report()) {
            const scriptLanguage = this._report().scriptLanguage();
            switch (scriptLanguage) {
                case 'CSharp':
                    return '\r\nprivate void ' + eventName + '(object sender, ' + eventArgsType + ' e) {\r\n\r\n}\r\n';
                case 'VisualBasic':
                    return '\r\nPrivate Sub ' + eventName + '(ByVal sender As Object, ByVal e As ' + eventArgsType + ')\r\n\r\nEnd Sub\r\n';
                case 'JScript':
                    return '\r\nprivate final function ' + eventName + '(sender : System.Object, e : ' + eventArgsType + ') {\r\n\r\n}\r\n';
            }
        }
    }
    getFunctionNamesFromScript(scripts) {
        if (this._report()) {
            const keyWords = { 'CSharp': 'void ', 'VisualBasic': 'Sub ', 'JScript': 'function ' };
            const scriptLanguage = this._report().scriptLanguage();
            const events = [];
            if (scripts) {
                const lines = scripts.match(new RegExp(keyWords[scriptLanguage] + '(([A-Z])|[a-z])\\w+\\(', 'g'));
                lines && lines.forEach((line) => {
                    events.push(line.substring(keyWords[scriptLanguage].length, line.length - 1));
                });
            }
            return events;
        }
    }
    createCompleters(editor, bindingContext, viewModel) {
        return [new ReportCompleter(bindingContext.$root.model, editor, viewModel.guid)];
    }
}
