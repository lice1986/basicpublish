﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectionPointModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from '../diagramElementBaseViewModel';
import { ConnectorViewModel } from './connectorModel';
import { ModelSerializer } from '../../../serializer/serializer';
import { Point } from '../../../core/elements/point';
import { IConnectingPoint } from '../connectingPointModel';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
export declare class ConnectionPointViewModel extends DiagramElementBaseViewModel {
    constructor(control: any, parent: ConnectorViewModel, serializer?: ModelSerializer);
    location: Point;
    connectingPoint: ko.Observable<IConnectingPoint>;
}
export declare const connectionPointSerializationInfo: ISerializationInfoArray;
