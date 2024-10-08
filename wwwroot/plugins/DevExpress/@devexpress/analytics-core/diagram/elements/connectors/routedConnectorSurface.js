﻿/**
* DevExpress Analytics (diagram\elements\connectors\routedConnectorSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseSurface } from '../diagramElementBaseSurface';
import { ConnectionPointSurface } from './connectionPointSurface';
export class RoutedConnectorSurface extends DiagramElementBaseSurface {
    constructor(control, context) {
        super(control, context, null);
        this.template = 'dxdd-routed-connector';
        this.selectiontemplate = 'dxdd-routed-connector-selection';
        this.showArrow = ko.observable(false);
        this.showRightArrow = ko.observable(false);
        this.isVisible = ko.observable(true);
        this.routePoints = ko.observableArray();
        this.routePointsSet = ko.pureComputed(() => {
            const points = [];
            this.routePoints().forEach((point) => {
                points.push(point.x() + ' ' + point.y());
            });
            return points.join(', ');
        });
        this.routeLineWrappers = ko.pureComputed(() => {
            const result = [];
            for (let i = 1; i < this.routePoints().length; i++) {
                result.push(this._createRouteLineWrapper(this.routePoints()[i - 1], this.routePoints()[i], i === 1 || i === this.routePoints().length - 1));
            }
            return result;
        });
        this.connectorID = () => this._connectorID;
        this._disposables.push(control);
        this._connectorID = RoutedConnectorSurface._connectorsCount++;
        this.startPoint = ko.pureComputed(() => {
            return new ConnectionPointSurface(control.startPoint(), context);
        });
        this.endPoint = ko.pureComputed(() => {
            return new ConnectionPointSurface(control.endPoint(), context);
        });
        this._disposables.push(control.routePoints.subscribe((routePoints) => {
            this._updateRoutePoints();
        }));
        this._updateRoutePoints();
    }
    _createRoutePoint(point, base) {
        return {
            x: ko.pureComputed(() => {
                if (this._context.rtl()) {
                    return Math.round(this.getControlModel().size.width() - (point.x() - base.x()));
                }
                else {
                    return Math.round(point.x() - base.x());
                }
            }),
            y: ko.pureComputed(() => { return Math.round(point.y() - base.y()); }),
            modelPoint: point
        };
    }
    _createRouteLineWrapper(point1, point2, isLocked = false) {
        const _self = this, isVerticalLine = Math.abs(point1.x.peek() - point2.x.peek()) < 1, absoluteTop = point1.modelPoint.y.peek(), absoluteLeft = point1.modelPoint.x.peek(), position = {
            top: Math.min(point1.y.peek(), point2.y.peek()) - 2,
            left: Math.min(point1.x.peek(), point2.x.peek()) - 2,
            width: Math.abs(point1.x.peek() - point2.x.peek()) + 6,
            height: Math.abs(point1.y.peek() - point2.y.peek()) + 6
        }, resizeHandler = (params) => {
            _self._control.freezeRoute(true);
            try {
                _self._control.beginUpdate();
                if (isVerticalLine) {
                    let newX = absoluteLeft + params.delta.dx;
                    if (this._context.rtl()) {
                        newX = absoluteLeft - params.delta.dx;
                    }
                    point1.modelPoint.x(newX);
                    point2.modelPoint.x(newX);
                }
                else {
                    const newY = absoluteTop + params.delta.dy;
                    point1.modelPoint.y(newY);
                    point2.modelPoint.y(newY);
                }
            }
            finally {
                _self._control.endUpdate();
            }
        };
        return {
            position: position,
            isVerticalLine: isVerticalLine,
            resizeHandler: resizeHandler,
            resizeStopped: () => {
                _self._control.routePoints.notifySubscribers(_self._control.routePoints());
            },
            isLocked: ko.observable(isLocked)
        };
    }
    _updateRoutePoints() {
        const points = [], control = this.getControlModel(), base = control.location;
        points.push(this._createRoutePoint(control.startPoint().location, base));
        control.routePoints().forEach((point) => {
            points.push(this._createRoutePoint(point, base));
        });
        points.push(this._createRoutePoint(control.endPoint().location, base));
        this.routePoints(points);
    }
}
RoutedConnectorSurface._connectorsCount = 0;
