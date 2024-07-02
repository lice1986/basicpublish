﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrZipcode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { XRControlSurface } from './xrControl';
export class XRZipCodeSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.displayText = () => {
            let text = control.text();
            text = text && text.replace(/[^\d]/g, '_') || '0'.replace(/[^\d]/g, '_');
            return text;
        };
        this.fontSize = ko.pureComputed(() => {
            return unitsToPixel(control['size']['height'](), context.measureUnit());
        });
        this.letterSpacing = ko.pureComputed(() => {
            return Math.ceil(this.fontSize() / 10);
        });
        this.css = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.zipCodeFontCss(this.fontSize()), this.cssCalculator.backGroundCss(), this.cssCalculator.zipCodeAlignment(), this.cssCalculator.foreColorCss());
        });
        this.contentCss = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.zipCodeAlignment(), this.cssCalculator.paddingsCss(), { 'letterSpacing': this.letterSpacing() + 'px' }, { 'lineHeight': 'inherit' });
        });
    }
}