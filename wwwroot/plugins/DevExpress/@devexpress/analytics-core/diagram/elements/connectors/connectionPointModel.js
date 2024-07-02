﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectionPointModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from '../diagramElementBaseViewModel';
import { location } from '../../metadata';
import { extend } from '../../../serializer/_utils';
export class ConnectionPointViewModel extends DiagramElementBaseViewModel {
    constructor(control, parent, serializer) {
        super(extend(control, { '@ControlType': 'ConnectionPoint' }), parent, serializer);
        const _x = this.location.x, _y = this.location.y;
        this.location.x = ko.pureComputed({
            read: () => {
                return this.connectingPoint() && this.connectingPoint().location.x() || _x();
            },
            write: (value) => {
                this.connectingPoint(null);
                _x(value);
            }
        });
        this.location.y = ko.pureComputed({
            read: () => {
                return this.connectingPoint() && this.connectingPoint().location.y() || _y();
            },
            write: (value) => {
                this.connectingPoint(null);
                _y(value);
            }
        });
    }
}
export const connectionPointSerializationInfo = [
    location,
    { propertyName: 'connectingPoint', modelName: '@ConnectingPoint', link: true }
];