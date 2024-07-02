﻿/**
* DevExpress Analytics (widgets\ace\_ace-mode-doc-comment.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function defineAceDocComments(ace) {
    ace.define('ace/mode/doc_comment_highlight_rules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function (require, exports, module) {
        'use strict';
        const oop = ace.require('ace/lib/oop');
        const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules;
        const DocCommentHighlightRules = function () {
            this.$rules = {
                'start': [{
                        token: 'comment.doc.tag',
                        regex: '@[\\w\\d_]+'
                    },
                    DocCommentHighlightRules['getTagRule'](),
                    {
                        defaultToken: 'comment.doc',
                        caseInsensitive: true
                    }]
            };
        };
        oop.inherits(DocCommentHighlightRules, TextHighlightRules);
        DocCommentHighlightRules['getTagRule'] = function () {
            return {
                token: 'comment.doc.tag.storage.type',
                regex: '\\b(?:TODO|FIXME|XXX|HACK)\\b'
            };
        };
        DocCommentHighlightRules['getStartRule'] = function (start) {
            return {
                token: 'comment.doc',
                regex: '\\/\\*(?=\\*)',
                next: start
            };
        };
        DocCommentHighlightRules['getEndRule'] = function (start) {
            return {
                token: 'comment.doc',
                regex: '\\*\\/',
                next: start
            };
        };
        exports.DocCommentHighlightRules = DocCommentHighlightRules;
    });
}
