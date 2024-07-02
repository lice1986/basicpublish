﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrLine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { XRControlSurface } from './xrControl';
export class XRLineSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this['lineWidth'] = control['lineWidth'];
        this['lineStyle'] = control['lineStyle'];
        this['lineDirection'] = control['lineDirection'];
        this.selectiontemplate = 'dxrd-control-selection';
        this.contenttemplate = 'dxrd-line-content';
        this._disposables.push(this.linePosition = ko.pureComputed(() => {
            const result = {}, rect = this.rect();
            if (this['lineDirection']() === 'Horizontal') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = rect.height / 2;
                result['y2'] = rect.height / 2;
            }
            if (this['lineDirection']() === 'Vertical') {
                result['x1'] = rect.width / 2;
                result['x2'] = rect.width / 2;
                result['y1'] = 0;
                result['y2'] = rect.height;
            }
            if (this['lineDirection']() === 'BackSlant') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = 0;
                result['y2'] = rect.height;
            }
            if (this['lineDirection']() === 'Slant') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = rect.height;
                result['y2'] = 0;
            }
            return result;
        }));
        this._disposables.push(this.contentCss = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.stroke(), this.cssCalculator.strokeDashArray(), this.cssCalculator.strokeWidth());
        }));
    }
}
