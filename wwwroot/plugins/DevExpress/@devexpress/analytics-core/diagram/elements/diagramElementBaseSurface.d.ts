﻿/**
* DevExpress Analytics (diagram\elements\diagramElementBaseSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { IUnitProperties } from '../../core/utils/_units';
export declare class DiagramElementBaseSurface<M extends DiagramElementBaseViewModel = DiagramElementBaseViewModel> extends SurfaceElementBase<M> {
    static _unitProperties: IUnitProperties<DiagramElementBaseViewModel>;
    constructor(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>);
    template: string;
    selectiontemplate: string;
    contenttemplate: string;
    margin: ko.Observable<number>;
    positionWidthWithoutMargins: ko.Computed<number>;
    positionLineHeightWithoutMargins: ko.Computed<number>;
}
