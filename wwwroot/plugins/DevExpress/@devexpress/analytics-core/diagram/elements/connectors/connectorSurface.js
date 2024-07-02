﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectorSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseSurface } from '../diagramElementBaseSurface';
import { ConnectionPointSurface } from './connectionPointSurface';
export class ConnectorSurface extends DiagramElementBaseSurface {
    constructor(control, context) {
        super(control, context, null);
        this.template = 'dxdd-connector';
        this.selectiontemplate = 'dxdd-connector-selection';
        this.startPoint = ko.pureComputed(() => {
            return new ConnectionPointSurface(control.startPoint(), context);
        });
        this.endPoint = ko.pureComputed(() => {
            return new ConnectionPointSurface(control.endPoint(), context);
        });
    }
}
