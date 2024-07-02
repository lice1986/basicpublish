﻿/**
* DevExpress Analytics (diagram\elements\diagramElementBaseSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { extend } from '../../serializer/_utils';
export class DiagramElementBaseSurface extends SurfaceElementBase {
    constructor(control, context, unitProperties) {
        super(control, context, extend({}, DiagramElementBaseSurface._unitProperties, unitProperties));
        this.template = 'dx-diagram-element';
        this.selectiontemplate = 'dx-diagram-element-selection';
        this.contenttemplate = 'dx-diagram-element-content';
        this.margin = ko.observable(0);
        this._disposables.push(this.positionWidthWithoutMargins = ko.pureComputed(() => {
            return this['position'].width() - this.margin() * 2;
        }));
        this._disposables.push(this.positionLineHeightWithoutMargins = ko.pureComputed(() => {
            return this['position'].lineHeight() - this.margin() * 2;
        }));
    }
}
DiagramElementBaseSurface._unitProperties = {
    _height: (o) => {
        return o.size.height;
    },
    _width: (o) => {
        return o.size.width;
    },
    _x: (o) => {
        return o.location.x;
    },
    _y: (o) => {
        return o.location.y;
    }
};