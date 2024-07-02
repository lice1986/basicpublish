﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { formatDate } from '../../localization/_localization';
export var SearchMode;
(function (SearchMode) {
    SearchMode[SearchMode["contains"] = 0] = "contains";
    SearchMode[SearchMode["startWith"] = 1] = "startWith";
})(SearchMode || (SearchMode = {}));
export function _getFileContent(content, readMode) {
    return readMode !== 'text' ? (content).replace(/(^data:[^,]+,)|(^data:)/, '') : content;
}
function _uploadFile(filesHolder, deferred, options) {
    try {
        const files = filesHolder.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (options.type === 'img') {
                const imageType = /image.*/;
                if (!file.type.match(imageType)) {
                    continue;
                }
            }
            const fr = new FileReader();
            const format = file.name.split('.').pop();
            fr.onload = () => {
                try {
                    deferred.resolve({
                        format: format,
                        content: _getFileContent(fr.result, options.readMode)
                    });
                }
                catch (e) {
                    deferred.reject();
                }
            };
            options.readMode === 'text' || format === 'html' || format === 'htm' ? fr.readAsText(file) : fr.readAsDataURL(file);
        }
    }
    catch (e) {
        deferred.reject();
    }
}
const fileUploaderId = 'dxd-fileuploader-input';
function createFileUploaderElement() {
    const input = document.createElement('input');
    input.type = 'file';
    input.id = fileUploaderId;
    input.style.width = '0px';
    input.style.height = '0px';
    input.style.display = 'none';
    document.body.appendChild(input);
    return input;
}
export let uploadFile = (options) => {
    const deferred = $.Deferred();
    let element = document.getElementById(fileUploaderId);
    if (!element) {
        element = createFileUploaderElement();
    }
    element.accept = options.accept;
    element.onchange = () => {
        _uploadFile(element, deferred, options);
        element.value = '';
    };
    element.click();
    return deferred.promise();
};
export const _replaceUploadFile = (newFunc) => uploadFile = newFunc;
export function setUploadFile(newFunc) {
    uploadFile = newFunc;
}
export function compareEditorInfo(editor1, editor2) {
    return !!editor1 && !!editor2 &&
        editor1.header === editor2.header
        && editor1.content === editor2.content
        && editor1.editorType === editor2.editorType;
}
export function findMatchesInString(stringWhereSearch, searchPattern, options) {
    if (!options) {
        const searchExpr = escapeToRegExp(searchPattern);
        return !!stringWhereSearch && stringWhereSearch.match(new RegExp(searchExpr, 'gi'));
    }
    let searchExpr = !options.canUseRegex ? escapeToRegExp(searchPattern) : searchPattern;
    if (options.searchMode == SearchMode.startWith && !options.canUseRegex)
        searchExpr = '^' + searchExpr;
    let exprRule = '';
    if (!options.caseSensitive)
        exprRule = exprRule + 'i';
    if (options.globalMatch)
        exprRule = exprRule + 'g';
    return !!stringWhereSearch && stringWhereSearch.match(new RegExp(searchExpr, exprRule));
}
export function escapeToRegExp(value) {
    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
export function stringRemove(value, start, count) {
    count = count ? count : value.length - start;
    return value.slice(0, start) + value.slice(start + count, value.length);
}
export function stringReplace(value, start, count, newChar = '') {
    let temp = value;
    temp = stringRemove(temp, start, count);
    temp = stringInsert(temp, start, Array(count + 1).join(newChar));
    return temp;
}
export function stringInsert(value, pos, subStr) {
    return value.substring(0, pos) + subStr + value.substring(pos);
}
export function formatUnicorn(format, ...args) {
    return format.replace(/{(\d+)(:[^}]+)?}/g, (match, number, formatSpecifier) => {
        const value = args[parseInt(number)];
        if (value !== undefined && value !== null) {
            if (formatSpecifier) {
                switch (formatSpecifier.substring(1)) {
                    case 'd':
                        return formatDate(new Date(value));
                }
            }
            return value.toString();
        }
        else {
            return match;
        }
    });
}
export var KeyboardEnum;
(function (KeyboardEnum) {
    KeyboardEnum["Plus"] = "+";
    KeyboardEnum["Minus"] = "-";
    KeyboardEnum["Equal"] = "=";
    KeyboardEnum["Tab"] = "Tab";
    KeyboardEnum["Delete"] = "Delete";
    KeyboardEnum["Enter"] = "Enter";
    KeyboardEnum["Esc"] = "Escape";
    KeyboardEnum["Space"] = " ";
    KeyboardEnum["End"] = "End";
    KeyboardEnum["Home"] = "Home";
    KeyboardEnum["PageUp"] = "PageUp";
    KeyboardEnum["PageDown"] = "PageDown";
    KeyboardEnum["ArrowLeft"] = "ArrowLeft";
    KeyboardEnum["ArrowUp"] = "ArrowUp";
    KeyboardEnum["ArrowRight"] = "ArrowRight";
    KeyboardEnum["ArrowDown"] = "ArrowDown";
})(KeyboardEnum || (KeyboardEnum = {}));
export var KeyboardCodesEnum;
(function (KeyboardCodesEnum) {
    KeyboardCodesEnum[KeyboardCodesEnum["Tab"] = 9] = "Tab";
    KeyboardCodesEnum[KeyboardCodesEnum["Enter"] = 13] = "Enter";
    KeyboardCodesEnum[KeyboardCodesEnum["Esc"] = 27] = "Esc";
    KeyboardCodesEnum[KeyboardCodesEnum["Space"] = 32] = "Space";
    KeyboardCodesEnum[KeyboardCodesEnum["End"] = 35] = "End";
    KeyboardCodesEnum[KeyboardCodesEnum["Home"] = 36] = "Home";
    KeyboardCodesEnum[KeyboardCodesEnum["Left"] = 37] = "Left";
    KeyboardCodesEnum[KeyboardCodesEnum["Up"] = 38] = "Up";
    KeyboardCodesEnum[KeyboardCodesEnum["Right"] = 39] = "Right";
    KeyboardCodesEnum[KeyboardCodesEnum["Down"] = 40] = "Down";
})(KeyboardCodesEnum || (KeyboardCodesEnum = {}));
