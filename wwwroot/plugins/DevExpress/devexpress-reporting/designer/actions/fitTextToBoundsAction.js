﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitTextToBoundsAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
export class FitTextToBoundsAction {
    constructor(_control, textElementHelper = new TextElementSizeHelper()) {
        this._control = _control;
        this.textElementHelper = textElementHelper;
    }
    _getTextSide($div, fontProperties, controlSize, getSide) {
        const currentSide = getSide($div);
        let sizeFounded = false;
        const inc = controlSize / currentSide;
        let currentFontSize = Math.ceil(fontProperties.size * inc);
        while (!sizeFounded) {
            $div.css({ 'font-size': currentFontSize + fontProperties.unit });
            if (getSide($div) > controlSize) {
                currentFontSize -= 1;
            }
            else {
                sizeFounded = true;
            }
        }
        return currentFontSize;
    }
    _calculateFont($div, fontProperties, maxHeight) {
        let sizeFounded = false;
        let font = fontProperties.size;
        const height = $div[0].getBoundingClientRect().height;
        if (height === maxHeight)
            return font;
        const inc = height > maxHeight ? -1 : 1;
        while (!sizeFounded) {
            font += inc;
            $div.css({ 'font-size': font + fontProperties.unit });
            const height = $div[0].getBoundingClientRect().height;
            if (height < maxHeight && inc === -1) {
                sizeFounded = true;
            }
            else if (inc === 1 && height > maxHeight) {
                font -= inc;
                sizeFounded = true;
            }
        }
        return font;
    }
    _getAvailableFont() {
        const fontModel = this._control.getFontModel();
        const containerSize = this._control.getContentSize();
        const zoom = this._control._context.zoom();
        let font = fontModel.size();
        if (!this._control.getWordWrap()) {
            const $div = this.textElementHelper.$createTextElement(this._control.getText(), this._control.getCssContent());
            const fontByHeight = this._getTextSide($div, { size: font, unit: fontModel.unit() }, containerSize.height, ($div) => $div[0].getBoundingClientRect().height);
            const fontByWidth = this._getTextSide($div, { size: fontByHeight, unit: fontModel.unit() }, containerSize.width, ($div) => $div[0].getBoundingClientRect().width);
            $div.remove();
            font = Math.min(fontByHeight, fontByWidth);
        }
        else {
            const $div = this.textElementHelper.$createTextElement(this._control.getText(), this._control.getCssContent({ width: containerSize.width / zoom }));
            font = this._calculateFont($div, { size: font, unit: fontModel.unit() }, containerSize.height - 2 * zoom);
            $div.remove();
        }
        return font;
    }
    fit() {
        this._control.setFontSize(this._getAvailableFont());
    }
}