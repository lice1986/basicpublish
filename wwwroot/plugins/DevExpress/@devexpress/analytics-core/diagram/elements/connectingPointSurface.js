﻿/**
* DevExpress Analytics (diagram\elements\connectingPointSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseSurface } from './diagramElementBaseSurface';
export class ConnectingPointSurface extends DiagramElementBaseSurface {
    constructor(control, context) {
        super(control, context, ConnectingPointSurface._unitProperties);
        this.template = 'dxdd-connecting-point';
        this.selectiontemplate = 'dxdd-connection-point-selection';
        this.contenttemplate = '';
    }
}
ConnectingPointSurface._unitProperties = {
    _x: (o) => {
        return ko.pureComputed(() => { return o.location.x() - o.parentModel().location.x(); });
    },
    _y: (o) => {
        return ko.pureComputed(() => { return o.location.y() - o.parentModel().location.y(); });
    }
};
