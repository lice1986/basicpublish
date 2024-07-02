﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectionPointSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../../core/elements/baseSurface';
export class ConnectionPointSurface extends SurfaceElementBase {
    constructor(control, context) {
        super(control, context, ConnectionPointSurface._unitProperties);
        this.template = 'dx-diagram-connection-point';
        this.selectiontemplate = 'dx-diagram-connection-point';
        this.relativeX = ko.pureComputed(() => {
            return this.rect().left - this.parent.rect().left;
        });
        this.relativeY = ko.pureComputed(() => {
            return this.rect().top - this.parent.rect().top;
        });
    }
    container() {
        return this.getRoot();
    }
}
ConnectionPointSurface._unitProperties = {
    _x: (o) => {
        return o.location.x;
    },
    _y: (o) => {
        return o.location.y;
    }
};