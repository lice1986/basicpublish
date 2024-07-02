﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_textElementSizeHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
export class TextElementSizeHelper {
    constructor() {
        this._spaceSymbol = '&nbsp';
    }
    _$createElement(options, processElement) {
        return processElement($.fn.constructor('<div>').css(options)).appendTo($.fn.constructor('body'));
    }
    $createTextElement(text, options) {
        return this._$createElement(options, ($element) => { return $element.text(text); });
    }
    $createSpaceElement(options) {
        return this._$createElement(options, ($element) => { return $element.html(this._spaceSymbol); });
    }
    getTextContainerSize(text, options, increaseHeight = 2) {
        const $div = text !== this._spaceSymbol ? this.$createTextElement(text, options) : this.$createSpaceElement(options);
        $div.height($div.height() + increaseHeight);
        const rect = $div[0].getBoundingClientRect();
        const height = Math.ceil(rect.height);
        const width = Math.ceil(rect.width);
        $div.remove();
        return { width, height };
    }
}
