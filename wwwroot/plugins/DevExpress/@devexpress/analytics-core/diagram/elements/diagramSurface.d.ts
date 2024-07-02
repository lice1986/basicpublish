﻿/**
* DevExpress Analytics (diagram\elements\diagramSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { DiagramViewModel } from './diagramModel';
import { ISelectionTarget } from '../../core/selection/_selection';
import { IUnitProperties } from '../../core/utils/_units';
import { IHoverInfo } from '../../core/internal/_hoverInfo';
import { IMargins } from '../../core/elements/margins';
import { DiagramElementBaseSurface } from './diagramElementBaseSurface';
import { MeasureUnit } from '../../core/internal/_papperKindMapper';
export declare class DiagramSurface extends SurfaceElementBase<DiagramViewModel> implements ISelectionTarget, ISurfaceContext {
    static _unitProperties: IUnitProperties<DiagramViewModel>;
    constructor(diagram: DiagramViewModel, zoom?: ko.Observable<number>);
    measureUnit: ko.Observable<MeasureUnit>;
    dpi: ko.Observable<number>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    controls: ko.ObservableArray<DiagramElementBaseSurface<import("./diagramElementBaseViewModel").DiagramElementBaseViewModel>>;
    allowMultiselect: boolean;
    focused: ko.Observable<boolean>;
    selected: ko.Observable<boolean>;
    underCursor: ko.Observable<IHoverInfo>;
    checkParent(surfaceParent: ISelectionTarget): boolean;
    _parent: ISelectionTarget;
    get parent(): ISelectionTarget;
    set parent(newVal: ISelectionTarget);
    templateName: string;
    getChildrenCollection(): ko.ObservableArray<any>;
    margins: IMargins;
}