﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_reportCompleter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportScriptService } from '../../services/_reportScriptService';
import { ReportDummyCreator } from './_reportDummyCreator';
export class ReportCompleter {
    constructor(report, editorInstance, guid) {
        this.completions = [];
        this.report = report;
        this.editorInstance = editorInstance;
        this.guid = guid;
        this.oldPrefix = null;
    }
    __getCompletions(editor, session, pos, prefix, callback) {
        const self = this;
        ReportScriptService.getCompletions(editor, session, pos, prefix, callback, this.report(), this.editorInstance, this.guid())
            .done(function (result) {
            if (result) {
                if (result.State === 1) {
                    ReportScriptService.setCodeDom(self.guid(), JSON.stringify({
                        'XtraReportsLayoutSerializer': ReportDummyCreator._createDummy(self.report().serialize())
                    })).done((result) => {
                        self.guid(result.Guid);
                        self.__getCompletions(editor, session, pos, prefix, callback);
                    });
                }
                else {
                    const errors = [];
                    if (result.Errors.length > 0) {
                        const linesCount = editor.getSession().getLength();
                        result.Errors.forEach((error) => {
                            if (error.Line < linesCount && error.Line >= 0) {
                                errors.push({
                                    row: error.Line + 1,
                                    column: error.Column,
                                    text: error.ErrorNumber + ' - ' + error.ErrorText,
                                    type: error.IsWarning ? 'warning' : 'error'
                                });
                            }
                        });
                        editor.getSession().setAnnotations(errors);
                    }
                    self.completions = result.Completions;
                    callback(null, result.Completions);
                }
            }
        });
    }
    getCompletions(editor, session, pos, prefix, callback) {
        if (!this.oldPrefix || prefix[0] !== this.oldPrefix) {
            this.oldPrefix = prefix[0];
            this.__getCompletions(editor, session, pos, prefix, callback);
        }
        else if (this.oldPrefix == prefix[0] && this.completions.length > 0) {
            callback(null, this.completions);
        }
    }
}
