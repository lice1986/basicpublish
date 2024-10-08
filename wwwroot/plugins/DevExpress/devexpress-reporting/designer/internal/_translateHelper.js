﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_translateHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { convertMapToKeyValuePair } from '../../common/types';
export class TranslateHelper extends Disposable {
    constructor() {
        super(...arguments);
        this._maxInterval = 1000;
        this._restoreDictionary = {};
        this._timeouts = {};
    }
    _getElement(name) {
        return $.fn.constructor('.dx-designer .' + name)[0];
    }
    dispose() {
        convertMapToKeyValuePair(this._timeouts).forEach(item => clearTimeout(item.Value));
        super.dispose();
    }
    move(elementClassName, sign = '-', transform = 'translateY', transition = '0.35s transform ease-in-out') {
        clearTimeout(this._timeouts[elementClassName]);
        const element = this._getElement(elementClassName);
        if (element) {
            const result = transform === 'translateY' ? element.clientHeight : element.clientWidth;
            const _transform = transform + '(' + sign + result + 'px)';
            const currentTransition = element.style.transition || 'transform 0s ease 0s';
            const currentVisible = element.style.visibility || 'visible';
            const currentTransform = element.style.transform || 'none';
            this._restoreDictionary[elementClassName] = (element) => {
                element.style.visibility = currentVisible;
                element.style.transform = currentTransform;
                element.style['-webkit-transform'] = currentTransform;
                this._timeouts[elementClassName] = setTimeout(() => {
                    element.style.transition = currentTransition;
                }, this._maxInterval);
            };
            element.style.transition = transition;
            element.style.transform = _transform;
            element.style['-webkit-transform'] = _transform;
            this._timeouts[elementClassName] = setTimeout(() => {
                element.style.visibility = 'hidden';
            }, this._maxInterval);
        }
    }
    reset(elementClassName) {
        clearTimeout(this._timeouts[elementClassName]);
        const element = this._getElement(elementClassName);
        if (element && this._restoreDictionary[elementClassName]) {
            this._restoreDictionary[elementClassName](element);
            delete this._restoreDictionary[elementClassName];
        }
    }
}
