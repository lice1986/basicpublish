﻿/**
* DevExpress Analytics (diagram\elements\connectors\routedConnectorSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IPoint } from '../../../core/elements/point';
import { DiagramElementBaseSurface } from '../diagramElementBaseSurface';
import { RoutedConnectorViewModel } from './routedConnectorModel';
import { ISurfaceContext } from '../../../core/elements/baseSurface';
import { ConnectionPointSurface } from './connectionPointSurface';
export interface IRoutePoint {
    x: ko.Observable<number> | ko.Computed<number>;
    y: ko.Observable<number> | ko.Computed<number>;
    modelPoint: IPoint;
}
export declare class RoutedConnectorSurface extends DiagramElementBaseSurface<RoutedConnectorViewModel> {
    private static _connectorsCount;
    private _connectorID;
    private _createRoutePoint;
    private _createRouteLineWrapper;
    private _updateRoutePoints;
    constructor(control: RoutedConnectorViewModel, context: ISurfaceContext);
    template: string;
    selectiontemplate: string;
    startPoint: ko.Observable<ConnectionPointSurface> | ko.Computed<ConnectionPointSurface>;
    endPoint: ko.Observable<ConnectionPointSurface> | ko.Computed<ConnectionPointSurface>;
    showArrow: ko.Observable<boolean> | ko.Computed<boolean>;
    showRightArrow: ko.Observable<boolean> | ko.Computed<boolean>;
    isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    routePoints: ko.ObservableArray<IRoutePoint>;
    routePointsSet: ko.PureComputed<string>;
    routeLineWrappers: ko.PureComputed<any[]>;
    connectorID: () => number;
}
