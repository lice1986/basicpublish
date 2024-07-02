﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTextControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { FitBoundsToTextAction } from '../actions/fitBoundsToTextAction';
import { FitTextToBoundsAction } from '../actions/fitTextToBoundsAction';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
import { XRControlSurface, XRControlSurfaceBase } from './xrControl';
export class XRTextControlSurfaceBase extends XRControlSurfaceBase {
    constructor(control, context, units = XRControlSurface._unitProperties) {
        super(control, context, units);
        this._$element = ko.observable(null);
        this._font = null;
        this.contenttemplate = 'dxrd-textcontrol-content';
        this['multiline'] = control['multiline'] || false;
        this._disposables.push(this._font = new FontModel(control['font']));
        const canGrow = () => { return control['canGrow'] && control['canGrow'](); };
        const textElementSizeHelper = new TextElementSizeHelper();
        this.fitTextToBoundsAction = new FitTextToBoundsAction(this, textElementSizeHelper);
        this.fitBoundsToTextAction = new FitBoundsToTextAction(this, textElementSizeHelper);
        this._disposables.push(this.characterHeight = ko.computed(() => {
            return textElementSizeHelper.getTextContainerSize('a', {
                'font-size': this._font.size() + this._font.unit(),
                'font-family': this._font.family(),
                'height': 'auto',
                'width': 'auto'
            }).height;
        }));
        this._disposables.push(ko.computed(() => {
            if (this._$element()) {
                this._$element().height('auto');
                const text = this._control['text']();
                const characterHeight = this.characterHeight();
                const contentHeight = this._$element().height();
                if (contentHeight > this.rect().height && !canGrow()) {
                    const visibleHeight = Math.floor(this.rect().height / characterHeight) * characterHeight;
                    if (visibleHeight)
                        this._$element().height(visibleHeight + 'px');
                }
            }
        }));
    }
    getAlignments() {
        const textAlignment = this._control['textAlignment']();
        let vertical = '';
        let horizontal = '';
        for (let i = 0; i < textAlignment.length; i++) {
            if (textAlignment[i] === textAlignment[i].toLocaleUpperCase()) {
                if (vertical === '') {
                    vertical += textAlignment[i];
                }
                else if (vertical !== '') {
                    horizontal += textAlignment[i];
                }
            }
            else {
                if (horizontal !== '') {
                    horizontal += textAlignment[i];
                }
                else {
                    vertical += textAlignment[i];
                }
            }
        }
        return {
            vertical: vertical,
            horizontal: horizontal
        };
    }
    getWordWrap() {
        return this._control['wordWrap'] && this._control['wordWrap']();
    }
    getCssContent(content = {}) {
        return extend({}, this.contentCss(), {
            'box-sizing': 'border-box',
            'height': 'auto',
            'display': 'inline-block',
            'width': 'auto',
            'transform': 'scale(' + this._context.zoom() + ')'
        }, content);
    }
    getContentSize() {
        return this.contentSizes();
    }
    getText() {
        return this.displayText();
    }
    getFontModel() {
        return this._font;
    }
    setFontSize(size) {
        this._font.size(size);
    }
    cacheElementContent($element) {
        this._$element(null);
        this._$element($element);
    }
    fitTextToBounds() {
        this.fitTextToBoundsAction.fit();
    }
    fitWidthToText() {
        this.fitBoundsToTextAction.fitWidth();
    }
    fitHeightToText() {
        this.fitBoundsToTextAction.fitHeight();
    }
    fitBoundsToText() {
        this.fitBoundsToTextAction.fitBounds();
    }
}
