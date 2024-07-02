﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossband.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IArea, IElementViewModel, ISurfaceContext, Point, SurfaceElementArea } from '@devexpress/analytics-core/analytics-elements';
import { IHoverInfo, IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BandViewModel } from '../bands/xrBand';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurfaceBase } from './xrControl';
import { ReportSurface, ReportViewModel } from './xrReport';
import { XRReportElementViewModel } from './xrReportelement';
export declare class XRCrossBandControlViewModel extends XRReportElementViewModel {
    static unitProperties: string[];
    constructor(control: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    private _subscribeBands;
    getNearestParent(target: IElementViewModel<ControlType>): IElementViewModel<string>;
    isResettableProperty(propertyName: string): boolean;
    isPropertyVisible(name: any): boolean;
    getControlContainerName(): string;
    name: ko.Observable<string> | ko.Computed<string>;
    isCrossbandShow: ko.Computed<boolean>;
    endPoint: Point;
    startPoint: Point;
    locationF: Point;
    startBand: ko.Observable<BandViewModel>;
    endBand: ko.Observable<BandViewModel>;
    width: ko.Observable<number> | ko.Computed<number>;
    surface: XRCrossBandSurface;
    parentModel: ko.Observable<ReportViewModel>;
}
export declare class XRCrossBandSurface extends XRControlSurfaceBase<XRCrossBandControlViewModel> {
    static _unitProperties: IUnitProperties<XRCrossBandControlViewModel>;
    private _isBandCollapsed;
    private _updateEndPoint;
    private _getAllBands;
    private _getIntersectionBands;
    private _getCrossBandBoxSides;
    protected get _unitAbsoluteRect(): IArea;
    constructor(control: XRCrossBandControlViewModel, context: ISurfaceContext);
    canSetRect(rect: IArea): boolean;
    isThereIntersectionWithControls(): boolean;
    updateAbsolutePosition(): void;
    isThereIntersectionWithCrossBandControls(): boolean;
    edgeUnderCursor: ko.Observable<IHoverInfo> | ko.Computed<IHoverInfo>;
    underCursor: ko.Observable<IHoverInfo> | ko.Computed<IHoverInfo>;
    leftCss: ko.Observable | ko.Computed;
    visible: ko.Computed<boolean>;
    rightCss: ko.Observable | ko.Computed;
    bottomCss: ko.Observable | ko.Computed;
    topCss: ko.Observable | ko.Computed;
    lineCss: ko.Observable | ko.Computed;
    get parent(): ReportSurface;
    lineWidthCss: ko.Observable | ko.Computed;
    borderWidth: ko.Computed<number>;
    container(): SurfaceElementArea<ElementViewModel>;
    _getChildrenHolderName(): any;
}