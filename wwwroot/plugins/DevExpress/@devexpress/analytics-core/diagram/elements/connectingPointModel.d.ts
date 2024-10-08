﻿/**
* DevExpress Analytics (diagram\elements\connectingPointModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IPoint } from '../../core/elements/point';
import { PointSide } from '../utils';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
import { ModelSerializer } from '../../serializer/serializer';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export interface IConnectingPoint {
    location: IPoint;
    side: ko.Observable<PointSide> | ko.Computed<PointSide>;
}
export declare class ConnectingPointViewModel extends DiagramElementBaseViewModel implements IConnectingPoint {
    constructor(control: any, parent: DiagramElementBaseViewModel, serializer?: ModelSerializer);
    percentOffsetX: ko.Observable<number> | ko.Computed<number>;
    percentOffsetY: ko.Observable<number> | ko.Computed<number>;
    side: ko.PureComputed<PointSide>;
}
export declare const connectingPointSerializationInfo: ISerializationInfoArray;
