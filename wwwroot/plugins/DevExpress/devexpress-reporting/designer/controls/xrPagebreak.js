﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPagebreak.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { XRControlSurfaceBase } from './xrControl';
export class XRPageBreakSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, XRPageBreakSurface._unitProperties);
        this._disposables.push(this._width);
        this.template = 'dxrd-pagebreak';
        this.contenttemplate = 'dxrd-line-content';
        this.selectiontemplate = 'dxrd-pagebreak-selection';
        this._disposables.push(this.linePosition = ko.pureComputed(() => {
            const rect = this.rect();
            return {
                'x1': 0,
                'x2': rect.width,
                'y1': rect.height / 2,
                'y2': rect.height / 2
            };
        }));
        this.contentCss = ko.observable({
            'stroke': 'black',
            'strokeWidth': 1,
            'strokeDasharray': '4px, 4px'
        });
        this._disposables.push(this.lineHeight = ko.pureComputed(() => {
            return this['position'].lineHeight() / this._context.zoom();
        }));
        this.css = ko.observable({});
        this._disposables.push(this.isIntersect = ko.pureComputed(() => { return false; }));
    }
    preInitProperties(control, context) {
        this._width = ko.pureComputed({
            read: () => {
                return context.pageWidth() - context.margins.right() - context.margins.left();
            },
            write: () => { }
        });
    }
    get isIntersectionDeny() { return true; }
}
XRPageBreakSurface._unitProperties = {
    _x: (o) => {
        return ko.observable(0);
    },
    _y: (o) => {
        return o.location.y;
    },
    _height: (o) => {
        return ko.observable(2);
    }
};
