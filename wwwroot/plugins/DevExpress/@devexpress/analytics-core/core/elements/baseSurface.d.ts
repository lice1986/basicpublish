﻿/**
* DevExpress Analytics (core\elements\baseSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IMargins } from './margins';
import { ISelectionTarget } from '../selection/_selection';
import { ElementViewModel } from './elementViewModel';
import { Disposable } from '../../serializer/disposable';
import { IUnitProperties } from '../utils/_units';
import { CssCalculator } from '../internal/_cssCalculator';
import { IHoverInfo } from '../internal/_hoverInfo';
import { Point } from './point';
import { MeasureUnit } from '../internal/_papperKindMapper';
import { IArea } from './area';
export interface ISurfaceContext {
    measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>;
    pageWidth?: ko.Observable<number> | ko.Computed<number>;
    pageHeight?: ko.Observable<number> | ko.Computed<number>;
    snapGridSize?: ko.Observable<number> | ko.Computed<number>;
    margins?: IMargins;
    zoom?: ko.Observable<number> | ko.Computed<number>;
    dpi?: ko.Observable<number> | ko.Computed<number>;
    isFit?: (dropTarget: ISelectionTarget) => boolean;
    rtl?: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class SurfaceElementArea<M extends ElementViewModel<T>, T extends string = string> extends Disposable {
    _control: M;
    _width: ko.Observable<number> | ko.Computed<number>;
    _height: ko.Observable<number> | ko.Computed<number>;
    _x: ko.Observable<number> | ko.Computed<number>;
    _y: ko.Observable<number> | ko.Computed<number>;
    _context: ISurfaceContext;
    _createSurface: (item: ElementViewModel) => any;
    private _container;
    private _getX;
    private _setX;
    getRoot(): ISurfaceContext;
    preInitProperties(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>): void;
    constructor(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>);
    rect: ko.Observable<IArea> | ko.Computed<IArea>;
    container(): SurfaceElementArea<ElementViewModel>;
    beforeRectUpdated(rect: any): any;
    rtlLayout(): boolean;
    getControlModel(): M;
}
export declare class SurfaceElementBase<M extends ElementViewModel<T>, T extends string = string> extends SurfaceElementArea<M> implements ISelectionTarget<T> {
    private _countSelectedChildren;
    context: ISurfaceContext;
    constructor(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>);
    focused: ko.Observable<boolean> | ko.Computed<boolean>;
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
    isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
    cssCalculator: CssCalculator;
    underCursor: ko.Observable<IHoverInfo> | ko.Computed<IHoverInfo>;
    _getParent(): any;
    get parent(): any;
    checkParent(surfaceParent: ISelectionTarget<T>): boolean;
    allowMultiselect: boolean;
    css: ko.Observable<any> | ko.Computed<any>;
    contentCss: ko.Observable<any> | ko.Computed<any>;
    _getChildrenHolderName(): string;
    getChildrenCollection(): ko.ObservableArray<any>;
    absolutePosition: Point;
    updateAbsolutePosition(): void;
    canDrop(): boolean;
    afterUpdateAbsolutePosition(): void;
    findNextSelection(): ISelectionTarget<T>;
    absoluteRect: ko.Computed<IArea>;
    getUsefulRect: () => IArea;
    locked: boolean;
}
