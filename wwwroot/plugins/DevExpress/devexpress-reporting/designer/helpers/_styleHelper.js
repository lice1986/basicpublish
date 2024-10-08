﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_styleHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { StyleModel } from '../controls/properties/style';
export const stylesProperties = ['foreColor', 'borderColor', 'borderWidth', 'backColor', 'borders', 'borderDashStyle', 'padding', 'textAlignment', 'font'];
export class StylesHelper extends Disposable {
    constructor(_report, _controlsHelper) {
        super();
        this._report = _report;
        this._controlsHelper = _controlsHelper;
    }
    static styleEqualityComparer(x, y) {
        return stylesProperties.every(property => x[property]() === y[property]() || x[property]() === undefined && y[property]() === undefined);
    }
    static generateStyle(element, parent) {
        const newStyle = new StyleModel({}, parent);
        stylesProperties.forEach(property => {
            if (element[property] && element[property]())
                newStyle[property](element[property]());
        });
        return newStyle;
    }
    removeUnusedStyle(styleName) {
        const targetStyle = this._report.findStyle(styleName);
        if (targetStyle && !this._controlsHelper.allControls().some(control => control['styleName'] && control['styleName']() === styleName)) {
            this._report.styles.remove(targetStyle);
            return targetStyle;
        }
    }
}
