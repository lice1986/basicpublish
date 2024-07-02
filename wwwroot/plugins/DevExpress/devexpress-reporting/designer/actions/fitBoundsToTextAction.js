﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitBoundsToTextAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
export class FitBoundsToTextAction {
    constructor(_control, textElementHelper = new TextElementSizeHelper()) {
        this._control = _control;
        this.textElementHelper = textElementHelper;
    }
    _getNewRectForVetical(textHeight, alignment) {
        const contentSize = this._control.getContentSize();
        const controlRect = this._control.rect();
        const difference = contentSize.height - textHeight;
        if (alignment === 'Middle') {
            return { top: controlRect.top + difference / 2, height: controlRect.height - difference };
        }
        else if (alignment === 'Bottom') {
            return { top: controlRect.top + difference, height: controlRect.height - difference };
        }
        else {
            return { height: controlRect.height - difference };
        }
    }
    _findWidth(text, currentWidth) {
        const content = this._control.getCssContent();
        if (!this._control.getWordWrap()) {
            return this.textElementHelper.getTextContainerSize(text, content).width;
        }
        let horOffset = 0;
        ['Left', 'Right'].forEach(propertyName => {
            horOffset += (parseFloat(content['padding' + propertyName]) * this._control._context.zoom());
            delete content['padding' + propertyName];
        });
        const words = text.split(' ');
        const wordsWidths = words.map(line => this.textElementHelper.getTextContainerSize(line, content).width);
        if (wordsWidths.some(width => width + horOffset > currentWidth)) {
            return currentWidth;
        }
        const spaceWidth = this.textElementHelper.getTextContainerSize('&nbsp', content).width;
        return wordsWidths.reduce((accumulator, currentVal, index) => {
            if (index === 0)
                return accumulator;
            const newVal = spaceWidth + currentVal;
            accumulator.lineWidth += newVal;
            if (accumulator.lineWidth + horOffset > currentWidth) {
                accumulator.lineWidth = currentVal;
            }
            if (accumulator.max < accumulator.lineWidth) {
                accumulator.max = accumulator.lineWidth;
            }
            return accumulator;
        }, { lineWidth: wordsWidths[0], max: wordsWidths[0] }).max + horOffset;
    }
    _getNewRectForHorizontal(textWidth, alignment) {
        const contentSize = this._control.getContentSize();
        const controlRect = this._control.rect();
        const difference = contentSize.width - textWidth;
        if (alignment === 'Center') {
            return { left: controlRect.left + difference / 2, width: controlRect.width - difference };
        }
        else if (alignment === 'Right') {
            return { left: controlRect.left + difference, width: controlRect.width - difference };
        }
        else {
            return { width: controlRect.width - difference };
        }
    }
    _getTextContainerSize(content) {
        return this.textElementHelper.getTextContainerSize(this._control.getText(), this._control.getCssContent(content));
    }
    _getTextHeight() {
        const content = { width: this._control.getContentSize().width / this._control._context.zoom() };
        return this._getTextContainerSize(content).height;
    }
    fitWidth() {
        const width = this._findWidth(this._control.getText(), this._control.getContentSize().width);
        const horizontalAlignment = this._control.getAlignments().horizontal;
        this._control.rect(this._getNewRectForHorizontal(width, horizontalAlignment));
    }
    fitHeight() {
        const height = this._getTextHeight();
        const verticalAlignment = this._control.getAlignments().vertical;
        this._control.rect(this._getNewRectForVetical(height, verticalAlignment));
    }
    fitBounds() {
        const size = {
            width: this._findWidth(this._control.getText(), this._control.getContentSize().width),
            height: this._getTextHeight()
        };
        const alignment = this._control.getAlignments();
        this._control.rect(extend({}, this._getNewRectForHorizontal(size.width, alignment.horizontal), this._getNewRectForVetical(size.height, alignment.vertical)));
    }
}