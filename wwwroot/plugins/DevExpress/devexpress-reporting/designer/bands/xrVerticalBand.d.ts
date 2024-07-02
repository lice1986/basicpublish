﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IArea, ISurfaceContext, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from '../controls/utils/_controlTypes';
import { XRControlViewModel } from '../controls/xrControl';
import { ReportSurface } from '../controls/xrReport';
import { BandViewModel } from './xrBand';
import { DetailReportBandSurface } from './xrDetailReportBand';
export declare class VerticalBandViewModel extends BandViewModel {
    static unitProperties: any[];
    dispose(): void;
    initSize(): void;
    preInit(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer): void;
    constructor(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    surface: VerticalBandSurface;
    controls: ko.ObservableArray<XRControlViewModel>;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
    widthFromControls: ko.Computed<number>;
}
export declare class VerticalBandSurface extends SurfaceElementBase<VerticalBandViewModel> {
    static _unitProperties: IUnitProperties<VerticalBandViewModel>;
    isSomeParentCollapsed: ko.Observable<boolean>;
    private _resize;
    private _getRtlAbsolutePositionX;
    private _getGrayArea;
    private _getUnitPositionInParent;
    private get _unitAbsoluteRect();
    constructor(band: VerticalBandViewModel, context: ISurfaceContext, unitProperties?: IUnitProperties<VerticalBandViewModel>);
    getAbsolutePositionX(): number;
    updateAbsolutePosition(): void;
    minimumHeight(): number;
    minimumWidth(): number;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    resizeHandles: ko.Computed<string>;
    templateName: string;
    selectiontemplate: string;
    contentSelectionTemplate: string;
    backgroundRect: ko.Computed<IArea>;
    get parent(): ReportSurface | DetailReportBandSurface;
    get verticalBandsContainer(): import("./_vericalBandContainer").VerticalBandsContainerSurface;
    height: ko.Observable<number> | ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    coordinateGridOptions: any;
    canResize: ko.Computed<boolean>;
    heightFromControls: ko.Computed<number>;
    widthFromControls: ko.Computed<number>;
}
