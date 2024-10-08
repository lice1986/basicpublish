﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_htmlMarkUpConverter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
import { colorFromString } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
class TextTag {
    constructor(node, inheritValues) {
        this.node = node;
        this.inheritValues = inheritValues;
        this.value = null;
        this.element = null;
        this.hasChildNodes = false;
        this.value = this.node.getAttribute && this.node.getAttribute(ValueConverter.ValueAttrName);
        if (this.value)
            this.value = this.value.trim();
    }
    createElement() {
        this.element = document.createTextNode(this.node.outerHTML || this.node.textContent || this.node['data']);
    }
    setProperties(parameters, inheritValues) { }
    appendTo(el) {
        el.appendChild(this.element);
    }
}
class SpanTag extends TextTag {
    constructor() {
        super(...arguments);
        this.hasChildNodes = true;
    }
    createElement() {
        this.element = document.createElement('span');
        if (this.inheritValues.backcolor) {
            this.element.style.backgroundColor = 'inherit';
        }
    }
}
class AnchorTag extends TextTag {
    constructor() {
        super(...arguments);
        this.hasChildNodes = true;
    }
    createElement() {
        this.element = document.createElement('a');
    }
    setProperties() {
        this.element.href = 'javascript:void(0);';
    }
}
class ImageTag extends TextTag {
    appendTo(el) { }
}
class SimpleTag extends SpanTag {
    createElement() {
        this.element = document.createElement(this.node.nodeName);
    }
}
class ColorTag extends SpanTag {
    setProperties() {
        this.element.style.color = currentMultiPlatformEngine.unwrap(colorFromString(this.value));
    }
}
class BackColorTag extends SpanTag {
    setProperties() {
        this.element.style.backgroundColor = currentMultiPlatformEngine.unwrap(colorFromString(this.value));
        this.inheritValues.backcolor = true;
    }
}
class SizeTag extends SpanTag {
    setProperties(parameters) {
        let sizeValue;
        const textValue = this.value;
        if (textValue && (textValue[0] === '+' || textValue[0] === '-')) {
            const _val = parseFloat(textValue.substr(1));
            sizeValue = this.inheritValues.fontSize + (textValue[0] === '+' ? _val : _val * (-1));
        }
        else {
            sizeValue = parseFloat(textValue);
        }
        if (!isNaN(sizeValue))
            this.element.style.fontSize = sizeValue + (parameters.fontUnit || 'pt');
        else
            sizeValue = this.inheritValues.fontSize;
        this.inheritValues.fontSize = sizeValue;
    }
}
export class ValueConverter {
    constructor(_displayNameParameters) {
        this._displayNameParameters = _displayNameParameters;
        this._regExp = /<(<*)(\/?)(\s*\w+\s*)(=(\s*.+?\s*)|\b[^>]*)?>/gm;
    }
    _createTag(node, inheritValues) {
        if (!this._checkValidTag(node.nodeName) || node.nodeName === '#text') {
            return new TextTag(node, inheritValues);
        }
        else if (node.nodeName === 'COLOR') {
            return new ColorTag(node, inheritValues);
        }
        else if (node.nodeName === 'BACKCOLOR') {
            return new BackColorTag(node, inheritValues);
        }
        else if (node.nodeName === 'HREF') {
            return new AnchorTag(node, inheritValues);
        }
        else if (node.nodeName === 'SIZE') {
            return new SizeTag(node, inheritValues);
        }
        else if (node.nodeName === 'IMG') {
            return new ImageTag(node, inheritValues);
        }
        else if (node.nodeName !== '#text') {
            return new SimpleTag(node, inheritValues);
        }
    }
    _parceToXml(str) {
        let matches;
        while ((matches = this._regExp.exec(str)) !== null) {
            if (matches.index === this._regExp.lastIndex) {
                this._regExp.lastIndex++;
            }
            const fullmatch = matches[0];
            const escapeTag = matches[1];
            const closingTag = matches[2] === '/' ? '/' : '';
            const tag = matches[3];
            const value = matches[5];
            let replacedStr = '';
            if (this._checkValidTag(tag) && !escapeTag) {
                if (value) {
                    replacedStr = '<' + tag + ' ' + ValueConverter.ValueAttrName + "='" + value + "'>";
                }
                else {
                    replacedStr = '<' + closingTag + tag + '>';
                }
            }
            else {
                let _fullmatch = fullmatch;
                if (!!escapeTag) {
                    _fullmatch = _fullmatch.slice(escapeTag.length);
                }
                const $spanEscape = $.fn.constructor('<span>');
                replacedStr = $spanEscape.text(_fullmatch)[0].innerHTML;
            }
            str = str.replace(fullmatch, replacedStr);
        }
        str = str.replace(/<nbsp>/g, '&nbsp;');
        str = str.replace(/<br>/g, this._displayNameParameters.wordWrap ? '<br>' : '');
        return str;
    }
    _checkValidTag(tag) {
        switch (tag.toLocaleLowerCase()) {
            case 'href':
            case 'color':
            case 'backcolor':
            case 'size':
            case 'img':
            case 'image':
            case 'br':
            case 'b':
            case 'i':
            case 'u':
            case 'nbsp':
            case 's': return true;
        }
        return false;
    }
    _createTree(treeElement, writeTo, inheritValues = { fontSize: this._displayNameParameters.fontSize || 0 }) {
        if (treeElement.childNodes.length > 0) {
            const childNodes = Array.prototype.slice.call(treeElement.childNodes);
            childNodes.forEach((node) => {
                const tag = this._createTag(node, { fontSize: inheritValues.fontSize, backcolor: inheritValues.backcolor });
                tag.createElement();
                tag.setProperties(this._displayNameParameters);
                tag.appendTo(writeTo);
                if (tag.hasChildNodes)
                    this._createTree(node, tag.element, tag.inheritValues);
            });
        }
    }
    appendTo(element) {
        if (!element)
            return;
        const fragment = document.createDocumentFragment();
        const temp = document.createElement('div');
        fragment.appendChild(temp);
        ko.utils.setHtml(element, '');
        ko.utils.setHtml(temp, this._parceToXml(this._displayNameParameters.text));
        this._createTree(temp, element);
        fragment.removeChild(temp);
    }
}
ValueConverter.ValueAttrName = 'value';
