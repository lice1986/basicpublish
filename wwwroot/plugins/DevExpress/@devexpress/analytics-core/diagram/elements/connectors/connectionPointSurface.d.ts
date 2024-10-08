﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectionPointSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../../core/elements/baseSurface';
import { ConnectionPointViewModel } from './connectionPointModel';
import { IUnitProperties } from '../../../core/utils/_units';
import { DiagramSurface } from '../diagramSurface';
export declare class ConnectionPointSurface extends SurfaceElementBase<ConnectionPointViewModel> {
    static _unitProperties: IUnitProperties<ConnectionPointViewModel>;
    constructor(control: ConnectionPointViewModel, context: ISurfaceContext);
    template: string;
    selectiontemplate: string;
    relativeX: ko.Observable<number> | ko.Computed<number>;
    relativeY: ko.Observable<number> | ko.Computed<number>;
    container(): DiagramSurface;
}
