﻿/**
* DevExpress Analytics (widgets\internal\_valueEditorHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { extend } from '../../serializer/_utils';
export class ValueEditorHelper {
    static _getCharFromKeyCode(e) {
        if (e.ctrlKey === false && e.key.length === 1)
            return e.key;
        return null;
    }
    static _getCaretPosition(el) {
        let start = -1, end = -1, normalizedValue, range, textInputRange, len, endRange;
        try {
            if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
                start = el.selectionStart;
                end = el.selectionEnd;
            }
            else if (document['selection']) {
                range = document['selection'].createRange();
                if (range && range.parentElement() == el) {
                    len = el.value.length;
                    normalizedValue = el.value.replace(/\r\n/g, '\n');
                    textInputRange = el.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());
                    endRange = el.createTextRange();
                    endRange.collapse(false);
                    if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                        start = end = len;
                    }
                    else {
                        start = -textInputRange.moveStart('character', -len);
                        start += normalizedValue.slice(0, start).split('\n').length - 1;
                        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
                            end = len;
                        }
                        else {
                            end = -textInputRange.moveEnd('character', -len);
                            end += normalizedValue.slice(0, end).split('\n').length - 1;
                        }
                    }
                }
            }
        }
        catch (e) {
        }
        return {
            start: start,
            end: end
        };
    }
    static _validate(value, minValue, maxValue) {
        if (!/^(0|(-?(([1-9]\d*)|(0\.\d+)|([1-9]\d*\.\d+)|(\d*\.\d+[eE][+\-]?\d+))))$/.test(value))
            return false;
        if (!maxValue)
            return true;
        const negative = value[0] === '-';
        const valModulo = negative ? value.substring(1) : value;
        if (negative && !minValue)
            return false;
        const boundModulo = negative ? minValue.substring(1) : maxValue;
        const [valMantissa, valExp] = valModulo.toLowerCase().split('e');
        const [boundMantissa, boundExp] = boundModulo.toLowerCase().split('e');
        let valIntPart, valFracPart, boundIntPart, boundFracPart;
        [valIntPart, valFracPart] = valMantissa.split('.');
        [boundIntPart, boundFracPart] = boundMantissa.split('.');
        valIntPart = (valIntPart || '').replace(/^0+/, '');
        boundIntPart = (boundIntPart || '').replace(/^0+/, '');
        let valOrder = valIntPart.length;
        if (valExp)
            valOrder += parseInt(valExp);
        let boundOrder = boundIntPart.length;
        if (boundExp)
            boundOrder += parseInt(boundExp);
        if (valOrder < boundOrder)
            return true;
        if (valOrder > boundOrder)
            return false;
        valFracPart = valFracPart || '0';
        boundFracPart = boundFracPart || '0';
        if (valIntPart + valFracPart > boundIntPart + boundFracPart)
            return false;
        return true;
    }
    static validateWidgetValue(e, validate, defaultVal) {
        const currentValue = e.component.option('value');
        if (!validate(currentValue)) {
            e.component.option('value', defaultVal);
        }
    }
    static getNumberEditorOptions(id, specifics, extendOptions = {}) {
        const editorOptions = ValueEditorHelper.editors[id] || ValueEditorHelper.editors[specifics];
        return editorOptions ? ValueEditorHelper.getValueEditorOptions(editorOptions.regExpEditing, (value) => {
            return ValueEditorHelper._validate(value, editorOptions.minValue, editorOptions.maxValue);
        }, '', extendOptions) : extendOptions;
    }
    static getValueEditorOptions(regExpEditing, validate, defaultVal, extendOptions = {}) {
        const options = {
            onFocusIn: e => {
                ValueEditorHelper.validateWidgetValue(e, validate, defaultVal);
                ValueEditorHelper._invokeStandardHandler(extendOptions, 'onFocusIn', e);
            },
            onKeyDown: e => {
                const char = ValueEditorHelper._getCharFromKeyCode(e.event);
                if (!char)
                    return;
                let $input = $.fn.constructor(e.element).find('input').eq(0);
                let caretPosition = ValueEditorHelper._getCaretPosition($input.get(0));
                const currentValue = $input.val();
                if (caretPosition.start < 0) {
                    caretPosition = currentValue ? currentValue.length : 0;
                }
                const result = [currentValue.slice(0, caretPosition.start), char, currentValue.slice(caretPosition.end)].join('');
                if (!regExpEditing.test(result))
                    e.event.preventDefault();
                $input = null;
                ValueEditorHelper._invokeStandardHandler(extendOptions, 'onKeyDown', e);
            },
            onPaste: e => {
                const clipboardData = e.event.originalEvent.clipboardData || window['clipboardData'] || {};
                const pastedData = clipboardData.getData && clipboardData.getData('Text');
                if (typeof pastedData !== 'string')
                    return;
                let $input = $.fn.constructor(e.element).find('input').eq(0);
                const caretPosition = ValueEditorHelper._getCaretPosition($input.get(0));
                const currentValue = $input.val();
                if (caretPosition.start < 0) {
                    caretPosition.end = caretPosition.start = currentValue ? currentValue.length : 0;
                }
                const result = [
                    currentValue.slice(0, caretPosition.start), pastedData, currentValue.slice(caretPosition.end)
                ].join('');
                if (!regExpEditing.test(result))
                    e.event.preventDefault();
                $input = null;
                ValueEditorHelper._invokeStandardHandler(extendOptions, 'onPaste', e);
            },
            onValueChanged: e => {
                if (e.value !== defaultVal)
                    this.validateWidgetValue(e, validate, e.previousValue);
                ValueEditorHelper._invokeStandardHandler(extendOptions, 'onValueChanged', e);
            }
        };
        return extend({}, extendOptions, options);
    }
    static isValid(id, specifics, value) {
        const editorOptions = ValueEditorHelper.editors[id] || ValueEditorHelper.editors[specifics];
        return editorOptions.regExpEditing.test(value) && ValueEditorHelper._validate(value, editorOptions.minValue, editorOptions.maxValue);
    }
    static _invokeStandardHandler(extendOptions, name, e) {
        if ($.isFunction(extendOptions[name]))
            extendOptions[name](e);
    }
}
ValueEditorHelper.editors = {
    'integer': {
        regExpEditing: /^-?\d*$/
    },
    'float': {
        regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d+)?$/
    },
    'System.Byte': {
        regExpEditing: /^\d*$/,
        minValue: null,
        maxValue: '255'
    },
    'System.SByte': {
        regExpEditing: /^-?\d*$/,
        minValue: '-128',
        maxValue: '127'
    },
    'System.Int16': {
        regExpEditing: /^-?\d*$/,
        minValue: '-32768',
        maxValue: '32767'
    },
    'System.UInt16': {
        regExpEditing: /^\d*$/,
        minValue: null,
        maxValue: '65535'
    },
    'System.Int32': {
        regExpEditing: /^-?\d*$/,
        minValue: '-2147483648',
        maxValue: '2147483647'
    },
    'System.UInt32': {
        regExpEditing: /^\d*$/,
        minValue: null,
        maxValue: '4294967295'
    },
    'System.Int64': {
        regExpEditing: /^-?\d*$/,
        minValue: '-9223372036854775808',
        maxValue: '9223372036854775807'
    },
    'System.UInt64': {
        regExpEditing: /^\d*$/,
        minValue: null,
        maxValue: '18446744073709551615'
    },
    'System.Single': {
        regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
        minValue: '-3.40282347e+38',
        maxValue: '3.40282347e+38'
    },
    'System.Double': {
        regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
        minValue: '-1.7976931348623157e+308',
        maxValue: '1.7976931348623157e+308'
    },
    'System.Decimal': {
        regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
        minValue: '-79228162514264337593543950335',
        maxValue: '79228162514264337593543950335'
    }
};
