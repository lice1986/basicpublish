﻿/**
* DevExpress Analytics (diagram\elements\connectors\routedConnectorModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ConnectorViewModel } from './connectorModel';
import { IPoint } from '../../../core/elements/point';
import { PointSide } from '../../utils';
import { ElementViewModel } from '../../../core/elements/elementViewModel';
import { ModelSerializer } from '../../../serializer/serializer';
export declare class RoutedConnectorViewModel extends ConnectorViewModel {
    private _isUpdating;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    _fixPoint(point: IPoint, side: PointSide): void;
    _getStartPointSide(): PointSide;
    _getEndPointSide(): PointSide;
    private _getPower;
    private _getRatio;
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    seriesNumber: ko.Observable<number>;
    routePoints: ko.Observable<IPoint[]>;
    freezeRoute: ko.Observable<boolean>;
    beginUpdate(): void;
    endUpdate(): void;
}
