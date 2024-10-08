﻿/**
* DevExpress Analytics (diagram\elements\connectors\routedConnectorModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ConnectorViewModel } from './connectorModel';
import { Point } from '../../../core/elements/point';
import { GRID_SIZE, PointSide } from '../../utils';
import { extend } from '../../../serializer/_utils';
export class RoutedConnectorViewModel extends ConnectorViewModel {
    constructor(control, parent, serializer) {
        super(extend({ '@ControlType': 'RoutedConnector' }, control), parent, serializer);
        this._isUpdating = false;
        this._getPower = function (_n) {
            for (let i = 0; i < 10; i++) {
                if (_n >= Math.pow(2, i) && _n < Math.pow(2, i + 1)) {
                    return i + 1;
                }
            }
            return 1;
        };
        this.seriesNumber = ko.observable(1);
        this.routePoints = ko.observable([]);
        this.freezeRoute = ko.observable(false);
        this._disposables.push(ko.computed(() => {
            const freezeRoute = !(1 + this.startPoint().location.x() + this.startPoint().location.y()
                + this.endPoint().location.x() + this.endPoint().location.y());
            if (!this._isUpdating) {
                this.freezeRoute(freezeRoute);
            }
        }));
        this._disposables.push(ko.computed(() => {
            if (!this.freezeRoute()) {
                const result = [];
                const startPointSide = this._getStartPointSide();
                const endPointSide = this._getEndPointSide();
                const startPoint = new Point(this.startPoint().location.x(), this.startPoint().location.y()), endPoint = new Point(this.endPoint().location.x(), this.endPoint().location.y());
                if (this.startPoint().connectingPoint()) {
                    this._fixPoint(startPoint, this.startPoint().connectingPoint().side());
                    result.push(startPoint);
                }
                if (this.endPoint().connectingPoint()) {
                    this._fixPoint(endPoint, this.endPoint().connectingPoint().side());
                }
                let baseX = Math.min(startPoint.x(), endPoint.x()), width = Math.abs(startPoint.x() - endPoint.x());
                const baseY = Math.min(startPoint.y(), endPoint.y()), height = Math.abs(startPoint.y() - endPoint.y());
                const number = this.seriesNumber();
                const ratio = this._getRatio(number);
                const indent = (number - 1) * GRID_SIZE;
                if (startPoint.y() - endPoint.y() > 0) {
                    if (startPoint.x() - endPoint.x() > 0) {
                        if (startPointSide === PointSide.North || startPointSide === PointSide.East) {
                            if (endPointSide === PointSide.North || endPointSide === PointSide.East) {
                                if (number !== 1) {
                                    width += indent;
                                    result.push(new Point(baseX + width, baseY + height));
                                }
                                result.push(new Point(baseX + width, baseY));
                            }
                            else {
                                result.push(new Point(baseX + width, baseY + height * ratio));
                                result.push(new Point(baseX, baseY + height * ratio));
                            }
                        }
                        else {
                            if (endPointSide === PointSide.South || endPointSide === PointSide.West) {
                                result.push(new Point(baseX, baseY + height));
                            }
                            else {
                                result.push(new Point(baseX + width * ratio, baseY + height));
                                result.push(new Point(baseX + width * ratio, baseY));
                            }
                        }
                    }
                    else {
                        if (startPointSide === PointSide.North || startPointSide === PointSide.West) {
                            if (endPointSide === PointSide.North || endPointSide === PointSide.West) {
                                if (number !== 1) {
                                    baseX -= indent;
                                    result.push(new Point(baseX, baseY + height));
                                }
                                result.push(new Point(baseX, baseY));
                            }
                            else {
                                result.push(new Point(baseX, baseY + height * ratio));
                                result.push(new Point(baseX + width, baseY + height * ratio));
                            }
                        }
                        else {
                            if (endPointSide === PointSide.South || endPointSide === PointSide.East) {
                                result.push(new Point(baseX + width, baseY + height));
                            }
                            else {
                                result.push(new Point(baseX + width * ratio, baseY + height));
                                result.push(new Point(baseX + width * ratio, baseY));
                            }
                        }
                    }
                }
                else {
                    if (startPoint.x() - endPoint.x() > 0) {
                        if (startPointSide === PointSide.South || startPointSide === PointSide.East) {
                            if (endPointSide === PointSide.South || endPointSide === PointSide.East) {
                                if (number !== 1) {
                                    width += indent;
                                    result.push(new Point(baseX + width, baseY));
                                }
                                result.push(new Point(baseX + width, baseY + height));
                            }
                            else {
                                result.push(new Point(baseX + width, baseY + height * ratio));
                                result.push(new Point(baseX, baseY + height * ratio));
                            }
                        }
                        else {
                            if (endPointSide === PointSide.North || endPointSide === PointSide.West) {
                                result.push(new Point(baseX, baseY));
                            }
                            else {
                                result.push(new Point(baseX + width * ratio, baseY));
                                result.push(new Point(baseX + width * ratio, baseY + height));
                            }
                        }
                    }
                    else {
                        if (startPointSide === PointSide.South || startPointSide === PointSide.West) {
                            if (endPointSide === PointSide.South || endPointSide === PointSide.West) {
                                if (number !== 1) {
                                    baseX -= indent;
                                    result.push(new Point(baseX, baseY));
                                }
                                result.push(new Point(baseX, baseY + height));
                            }
                            else {
                                result.push(new Point(baseX, baseY + height * ratio));
                                result.push(new Point(baseX + width, baseY + height * ratio));
                            }
                        }
                        else {
                            if (endPointSide === PointSide.North || endPointSide === PointSide.East) {
                                result.push(new Point(baseX + width, baseY));
                            }
                            else {
                                result.push(new Point(baseX + width * ratio, baseY));
                                result.push(new Point(baseX + width * ratio, baseY + height));
                            }
                        }
                    }
                }
                if (this.endPoint().connectingPoint()) {
                    result.push(endPoint);
                }
                this.routePoints(result);
            }
        }));
    }
    getX() {
        let result = super.getX();
        this.routePoints && this.routePoints().forEach((point) => {
            if (point.x() < result) {
                result = point.x();
            }
        });
        return result;
    }
    getY() {
        let result = super.getY();
        this.routePoints && this.routePoints().forEach((point) => {
            if (point.y() < result) {
                result = point.y();
            }
        });
        return result;
    }
    getWidth() {
        let result = super.getWidth();
        const baseX = this.getX();
        this.routePoints && [this.startPoint().location, this.endPoint().location].concat(this.routePoints()).forEach((point) => {
            if (point.x() - baseX > result) {
                result = point.x() - baseX;
            }
        });
        return result;
    }
    getHeight() {
        let result = super.getHeight();
        const baseY = this.getY();
        this.routePoints && [this.startPoint().location, this.endPoint().location].concat(this.routePoints()).forEach((point) => {
            if (point.y() - baseY > result) {
                result = point.y() - baseY;
            }
        });
        return Math.round(result);
    }
    _fixPoint(point, side) {
        switch (side) {
            case PointSide.North:
                point.y(point.y() - GRID_SIZE);
                break;
            case PointSide.East:
                point.x(point.x() + GRID_SIZE);
                break;
            case PointSide.West:
                point.x(point.x() - GRID_SIZE);
                break;
            case PointSide.South:
                point.y(point.y() + GRID_SIZE);
        }
    }
    _getStartPointSide() {
        if (this.startPoint().connectingPoint()) {
            return this.startPoint().connectingPoint().side();
        }
        if (this.startPoint().location.y() !== this.endPoint().location.y()) {
            if (this.startPoint().location.y() > this.endPoint().location.y()) {
                return PointSide.North;
            }
            else {
                return PointSide.South;
            }
        }
        else {
            if (this.startPoint().location.x() > this.endPoint().location.x()) {
                return PointSide.West;
            }
            else {
                return PointSide.East;
            }
        }
    }
    _getEndPointSide() {
        if (this.endPoint().connectingPoint()) {
            return this.endPoint().connectingPoint().side();
        }
        if (this.startPoint().location.y() !== this.endPoint().location.y()) {
            if (this.startPoint().location.y() > this.endPoint().location.y()) {
                return PointSide.South;
            }
            else {
                return PointSide.North;
            }
        }
        else {
            if (this.startPoint().location.x() > this.endPoint().location.x()) {
                return PointSide.East;
            }
            else {
                return PointSide.West;
            }
        }
    }
    _getRatio(n) {
        const pow2Delimiter = this._getPower(n);
        const delimiter = Math.pow(2, pow2Delimiter);
        const halfDelimeter = Math.pow(2, pow2Delimiter - 1);
        const arr = [];
        for (let i = 1; i < halfDelimeter; i++) {
            if (i % 2 == 0) {
                continue;
            }
            arr.push(delimiter - i);
            arr.push(i);
        }
        arr.reverse();
        const delta = n - halfDelimeter;
        const number = arr[delta] || 1;
        return number / delimiter;
    }
    beginUpdate() { this._isUpdating = true; }
    endUpdate() { this._isUpdating = false; }
}
