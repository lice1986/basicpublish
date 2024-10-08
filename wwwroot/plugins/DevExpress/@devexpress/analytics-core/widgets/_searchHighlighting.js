﻿/**
* DevExpress Analytics (widgets\_searchHighlighting.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { findMatchesInString } from '../property-grid/widgets/internal/_utils';
import { Disposable } from '../serializer/disposable';
import { koUtils } from '../core/utils/_koUtils';
export class HighlightEngine extends Disposable {
    constructor(options) {
        super();
        this._$spanProtect = $.fn.constructor('<span>');
        this._$spanSearch = $.fn.constructor('<span>').addClass('dx-datagrid-search-text');
        this._options = options;
        ['text', 'textToSearch'].forEach(property => {
            if (koUtils.isSubscribable(this._options[property])) {
                this._disposables.push((this._options[property]).subscribe(() => {
                    this._update();
                }));
            }
        });
        this._update();
    }
    _update() {
        this.content = this._getHighlightContent(koUtils.unwrap(this._options.text), koUtils.unwrap(this._options.textToSearch), koUtils.unwrap(this._options.searchOptions));
    }
    update(options) {
        this._options = options;
        this._update();
    }
    _getHighlightContent(text, textToSearch, options) {
        const searchPattern = textToSearch;
        let result = text;
        if (searchPattern) {
            const match = findMatchesInString(result, searchPattern, options);
            if (match) {
                let newResult = '', curIndex = 0, subString = result;
                match.forEach((item, index) => {
                    const itemIndex = subString.indexOf(item);
                    const textBeforeMath = result.substr(curIndex, itemIndex);
                    subString = subString.substr(itemIndex + item.length);
                    if (textBeforeMath) {
                        this._$spanProtect.text(textBeforeMath);
                        newResult += this._$spanProtect[0].outerHTML;
                    }
                    this._$spanSearch.text(item);
                    newResult += this._$spanSearch[0].outerHTML;
                    curIndex = result.length - subString.length;
                    if (index === match.length - 1) {
                        if (subString) {
                            this._$spanProtect.text(subString);
                            newResult += this._$spanProtect[0].outerHTML;
                        }
                    }
                });
                return newResult;
            }
        }
        this._$spanProtect.text(result);
        result = this._$spanProtect[0].outerHTML;
        return result;
    }
}
