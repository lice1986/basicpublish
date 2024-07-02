﻿/**
* DevExpress Analytics (diagram\elements\connectingPointModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Point } from '../../core/elements/point';
import { PointSide } from '../utils';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
import { Size } from '../../core/elements/size';
import { floatFromModel } from '../../core/utils/parsers';
import { extend } from '../../serializer/_utils';
export class ConnectingPointViewModel extends DiagramElementBaseViewModel {
    constructor(control, parent, serializer) {
        super(extend({ '@ControlType': 'ConnectingPoint' }, control), parent, serializer);
        this.side = ko.pureComputed(() => {
            if (this.percentOffsetY() >= this.percentOffsetX()) {
                if (this.percentOffsetY() > 1 - this.percentOffsetX()) {
                    return PointSide.South;
                }
                else {
                    return PointSide.West;
                }
            }
            else {
                if (this.percentOffsetY() > 1 - this.percentOffsetX()) {
                    return PointSide.East;
                }
                else {
                    return PointSide.North;
                }
            }
        });
        this.size = new Size(7, 7);
        this.location = new Point(0, 0);
        this.location.x = ko.pureComputed(() => {
            const parentModel = this.parentModel();
            return parentModel.location.x() + parentModel.size.width() * this.percentOffsetX();
        });
        this.location.y = ko.pureComputed(() => {
            const parentModel = this.parentModel();
            return parentModel.location.y() + parentModel.size.height() * this.percentOffsetY();
        });
    }
}
export const connectingPointSerializationInfo = [
    { propertyName: 'percentOffsetX', modelName: '@PercentOffsetX', defaultVal: 0.5, from: floatFromModel },
    { propertyName: 'percentOffsetY', modelName: '@PercentOffsetY', defaultVal: 0.5, from: floatFromModel }
];
