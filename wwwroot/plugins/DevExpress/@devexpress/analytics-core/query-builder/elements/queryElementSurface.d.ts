﻿/**
* DevExpress Analytics (query-builder\elements\queryElementSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { QueryElementBaseViewModel } from './queryElementModel';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { IUnitProperties } from '../../core/utils/_units';
export declare class QueryElementBaseSurface<M extends QueryElementBaseViewModel> extends SurfaceElementBase<M> {
    static _unitProperties: IUnitProperties<QueryElementBaseViewModel>;
    constructor(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>);
    template: string;
    selectiontemplate: string;
    contenttemplate: string;
    margin: ko.Observable<number>;
}
