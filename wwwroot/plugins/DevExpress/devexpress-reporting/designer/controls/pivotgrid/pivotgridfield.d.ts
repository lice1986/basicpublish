﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\pivotgridfield.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from '../utils/_controlTypes';
import { XRControlSurfaceBase } from '../xrControl';
import { SortBySummaryInfo } from './sortBySummary';
export interface IPivotGridFieldFormatInfo {
    formatString: ko.Observable<string>;
    formatType: ko.Observable<string>;
}
export interface IPivotGridField {
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
}
export declare class PivotGridFieldViewModel extends ElementViewModel<ControlType> implements IPivotGridField {
    static fieldHeight: number;
    static createNew(parent: any): () => PivotGridFieldViewModel;
    getFieldType(): string;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    getControlFactory(): import("../utils/controlsFactory").ControlsFactory;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    getPath(propertyName: any): string;
    getDisplayName(): any;
    controlType: ControlType;
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
    areaIndexEditable: ko.Observable<number> | ko.Computed<number>;
    index: ko.Observable<number> | ko.Computed<number>;
    fieldName: ko.Observable<string> | ko.Computed<string>;
    fieldNameEditable: any;
    caption: ko.Observable<string> | ko.Computed<string>;
    summaryType: ko.Observable<string>;
    summaryDisplayType: ko.Observable<string>;
    unboundType: ko.Observable<string>;
    groupInterval: ko.Observable<string>;
    unboundExpression: ko.Observable<string>;
    sortBySummaryInfo: SortBySummaryInfo;
    valueFormat: IPivotGridFieldFormatInfo;
    totalValueFormat: IPivotGridFieldFormatInfo;
    cellFormat: IPivotGridFieldFormatInfo;
    totalCellFormat: IPivotGridFieldFormatInfo;
    grandTotalCellFormat: IPivotGridFieldFormatInfo;
}
export declare class PivotGridFieldSurface extends XRControlSurfaceBase<PivotGridFieldViewModel> implements IPivotGridField {
    constructor(control: PivotGridFieldViewModel, context: ISurfaceContext);
    minWidth: ko.Computed<number>;
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
    positionWidthWithoutZoom: ko.Computed<number>;
}
