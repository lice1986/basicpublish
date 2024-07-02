﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectorSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseSurface } from '../diagramElementBaseSurface';
import { ConnectorViewModel } from './connectorModel';
import { ISurfaceContext } from '../../../core/elements/baseSurface';
import { ConnectionPointSurface } from './connectionPointSurface';
export declare class ConnectorSurface extends DiagramElementBaseSurface<ConnectorViewModel> {
    constructor(control: ConnectorViewModel, context: ISurfaceContext);
    template: string;
    selectiontemplate: string;
    startPoint: ko.Observable<ConnectionPointSurface> | ko.Computed<ConnectionPointSurface>;
    endPoint: ko.Observable<ConnectionPointSurface> | ko.Computed<ConnectionPointSurface>;
}
