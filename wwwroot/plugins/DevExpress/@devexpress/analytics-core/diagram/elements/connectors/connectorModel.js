﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectorModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from '../diagramElementBaseViewModel';
import { ConnectionPointViewModel } from './connectionPointModel';
import { Point } from '../../../core/elements/point';
import { Size } from '../../../core/elements/size';
import { extend } from '../../../serializer/_utils';
export class ConnectorViewModel extends DiagramElementBaseViewModel {
    constructor(control, parent, serializer) {
        super(extend({ '@ControlType': 'Connector' }, control), parent, serializer);
        this.startPoint(this.startPoint() || new ConnectionPointViewModel({ '@Location': '0, 0' }, this, serializer));
        this.endPoint(this.endPoint() || new ConnectionPointViewModel({ '@Location': '150, 75' }, this, serializer));
        this.location = new Point(0, 0);
        this._disposables.push(this.location.x = ko.pureComputed({
            read: () => {
                return this.getX();
            },
            write: (value) => {
                const oldValue = this.startPoint().location.x() < this.endPoint().location.x() ? this.startPoint().location.x() : this.endPoint().location.x();
                const delta = value - oldValue;
                this.startPoint().location.x(this.startPoint().location.x() + delta);
                this.endPoint().location.x(this.endPoint().location.x() + delta);
            }
        }));
        this._disposables.push(this.location.y = ko.pureComputed({
            read: () => {
                return this.getY();
            },
            write: (value) => {
                const oldValue = this.startPoint().location.y() < this.endPoint().location.y() ? this.startPoint().location.y() : this.endPoint().location.y();
                const delta = value - oldValue;
                this.startPoint().location.y(this.startPoint().location.y() + delta);
                this.endPoint().location.y(this.endPoint().location.y() + delta);
            }
        }));
        this.size = new Size(0, 0);
        this._disposables.push(this.size.width = ko.pureComputed({
            read: () => {
                return this.getWidth();
            },
            write: (value) => {
                if (this.startPoint().location.x() < this.endPoint().location.x()) {
                    this.endPoint().location.x(this.startPoint().location.x() + value);
                }
                else {
                    this.startPoint().location.x(this.endPoint().location.x() + value);
                }
            }
        }));
        this._disposables.push(this.size.height = ko.pureComputed({
            read: () => {
                return this.getHeight();
            },
            write: (value) => {
                if (this.startPoint().location.y() < this.endPoint().location.y()) {
                    this.endPoint().location.y(this.startPoint().location.y() + value);
                }
                else {
                    this.startPoint().location.y(this.endPoint().location.y() + value);
                }
            }
        }));
    }
    getX() {
        return this.startPoint().location.x() < this.endPoint().location.x() ? this.startPoint().location.x() : this.endPoint().location.x();
    }
    getY() {
        return this.startPoint().location.y() < this.endPoint().location.y() ? this.startPoint().location.y() : this.endPoint().location.y();
    }
    getWidth() {
        return Math.abs(this.startPoint().location.x() - this.endPoint().location.x()) || ConnectorViewModel.MIN_LINE_THICKNESS;
    }
    getHeight() {
        return Math.abs(this.startPoint().location.y() - this.endPoint().location.y()) || ConnectorViewModel.MIN_LINE_THICKNESS;
    }
}
ConnectorViewModel.MIN_LINE_THICKNESS = 3;
