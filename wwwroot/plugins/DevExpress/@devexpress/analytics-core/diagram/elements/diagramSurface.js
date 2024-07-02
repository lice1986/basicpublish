﻿/**
* DevExpress Analytics (diagram\elements\diagramSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { createObservableArrayMapCollection } from '../../core/utils/_arrayutils';
import { HoverInfo } from '../../core/internal/_hoverInfo';
export class DiagramSurface extends SurfaceElementBase {
    constructor(diagram, zoom = ko.observable(1)) {
        super(diagram, {
            measureUnit: ko.observable('Pixels'),
            zoom: zoom,
            dpi: ko.observable(100)
        }, DiagramSurface._unitProperties);
        this.measureUnit = ko.observable('Pixels');
        this.dpi = ko.observable(100);
        this.controls = ko.observableArray();
        this.allowMultiselect = false;
        this.focused = ko.observable(false);
        this.selected = ko.observable(false);
        this.underCursor = ko.observable(new HoverInfo());
        this.templateName = 'dx-diagram-surface';
        this.margins = { bottom: this['_bottom'], left: this['_left'], right: this['_right'], top: this['_top'] };
        this.zoom = zoom;
        this._context = this;
        createObservableArrayMapCollection(diagram.controls, this.controls, this._createSurface);
    }
    checkParent(surfaceParent) { return false; }
    get parent() {
        return this._parent;
    }
    set parent(newVal) {
        this._parent = newVal;
    }
    getChildrenCollection() {
        return ko.observableArray([]);
    }
}
DiagramSurface._unitProperties = {
    _width: (o) => { return o.pageWidth; },
    _height: (o) => { return o.pageWidth; },
    pageWidth: (o) => { return o.pageWidth; },
    pageHeight: (o) => { return o.pageHeight; },
    _bottom: (o) => { return o.margins.bottom; },
    _left: (o) => { return o.margins.left; },
    _right: (o) => { return o.margins.right; },
    _top: (o) => { return o.margins.top; }
};