﻿/**
* DevExpress Analytics (diagram\elements\connectingPointSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DiagramElementBaseSurface } from './diagramElementBaseSurface';
import { ConnectingPointViewModel } from './connectingPointModel';
import { IUnitProperties } from '../../core/utils/_units';
import { ISurfaceContext } from '../../core/elements/baseSurface';
export declare class ConnectingPointSurface extends DiagramElementBaseSurface<ConnectingPointViewModel> {
    static _unitProperties: IUnitProperties<ConnectingPointViewModel>;
    constructor(control: ConnectingPointViewModel, context: ISurfaceContext);
    template: string;
    selectiontemplate: string;
    contenttemplate: string;
}
