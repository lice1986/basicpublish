﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IArea, IElementViewModel, ISurfaceContext, Size, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType, ReportBandsType } from '../controls/utils/_controlTypes';
import { XRControlSurface, XRControlSurfaceBase, XRControlViewModel } from '../controls/xrControl';
import { ReportSurface, ReportViewModel } from '../controls/xrReport';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { MultiColumnSurface } from './multiColumn';
import { BandsHolder } from './_bandHolder';
import { PrintAcrossBandsPlaceHolder } from './_printAcrossBandsPlaceHolder';
export declare class BandViewModel extends XRReportElementViewModel {
    static unitProperties: string[];
    dispose(): void;
    createChildsArray(band: any, serializer: ModelSerializer): void;
    initHeight(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    private _getMaxLevel;
    constructor(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    addChild(control: ElementViewModel<ControlType>): void;
    getPath(propertyName: any): any;
    initSize(): void;
    initialize(): void;
    removeChild(control: ElementViewModel<ControlType>): void;
    static isReorderingBand(control: ElementViewModel): boolean;
    isAllowedParent(target: IElementViewModel): boolean;
    private _isHeaderBandTypeOrThemSubBands;
    isPropertyVisible(name: string): any;
    isPropertyDisabled(name: string): any;
    level: ko.Observable<number> | ko.Computed<number>;
    _level: ko.Observable<number> | ko.Computed<number>;
    size: Size;
    name: ko.Observable<string> | ko.Computed<string>;
    height: ko.Observable<number> | ko.Computed<number>;
    bands: ko.ObservableArray<BandViewModel>;
    controls: ko.ObservableArray<XRControlViewModel>;
    heightFromControls: ko.Computed<number>;
    expanded: ko.Observable<boolean> | ko.Computed<boolean>;
    parentModel: ko.Observable<BandViewModel | ReportViewModel>;
    controlType: ReportBandsType;
    maxLevel: ko.PureComputed;
}
export declare class BandSurface extends SurfaceElementBase<BandViewModel, ControlType> {
    private _getMarginWidth;
    coordinateGridOptions: any;
    dispose(): void;
    static _unitProperties: IUnitProperties<BandViewModel>;
    isSomeParentCollapsed: ko.Observable<boolean>;
    private _resize;
    private _isHeaderBandTypeOrThemSubBands;
    private _getUnitPositionInParent;
    private get _unitAbsoluteRect();
    private _getGrayArea;
    createChildCollection(band: BandViewModel): void;
    createUnderCursor(): void;
    getTotalHeight(): number;
    getHeight(): number;
    getHasOwnRuler(): boolean;
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    protected _initMultiColumn(): void;
    constructor(band: BandViewModel, context: ISurfaceContext, unitProperties?: IUnitProperties<BandViewModel>);
    getAbsolutePositionY(): number;
    updateAbsolutePosition(): void;
    markerClick(selection: SurfaceSelection, changeCollapsed?: boolean): void;
    showMarker: boolean;
    templateName: string;
    selectionTemplate: string;
    vrulerTemplate: string;
    contentSelectionTemplate: string;
    leftMarginTemplate: string;
    leftMarginSelectionTemplate: string;
    canDrop(): boolean;
    minHeight: ko.Computed<number>;
    allowMultiselect: boolean;
    heightFromControls: ko.Computed<number>;
    subBandsHeight: ko.Computed<number>;
    heightWithoutSubBands: ko.Computed<number>;
    hasOwnRuler: ko.Computed<boolean>;
    rulerHeight: ko.Computed<number>;
    height: ko.Computed<number>;
    markerWidth: ko.Observable<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    get parent(): ReportSurface | BandSurface;
    bandsHolder: BandsHolder;
    controls: ko.ObservableArray<XRControlSurface>;
    get zoom(): ko.Observable<number> | ko.Computed<number>;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    checkParent(surfaceParent: XRControlSurfaceBase<any>): boolean;
    canResize: ko.Computed<boolean>;
    backgroundRect: ko.Computed<IArea>;
    _totalHeight: ko.Computed<number>;
    multiColumn: ko.Computed<MultiColumnSurface>;
    printAcrossBandsPlaceHolder: PrintAcrossBandsPlaceHolder;
    printAcrossBands: ko.Observable<boolean>;
}
