﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPivotgrid.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { PivotGridFieldSurface, PivotGridFieldViewModel } from './pivotgrid/pivotgridfield';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRPivotGridViewModel extends XRControlViewModel {
    dispose(): void;
    private _initCriteriaString;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    removeChild(selectedField: PivotGridFieldViewModel): void;
    getFieldsFromArea(area: string): PivotGridFieldViewModel[];
    getPath(propertyName: any): string;
    fields: ko.ObservableArray<PivotGridFieldViewModel>;
    dataSource: ko.Observable<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    addFieldToArea: any;
    prefilter: {
        parent: XRPivotGridViewModel;
        _criteriaString: ko.Observable<string> | ko.Computed<string>;
        criteriaString: FilterStringOptions;
    };
}
export declare class XRPivotGridSurface extends XRControlSurface {
    constructor(control: XRPivotGridViewModel, context: ISurfaceContext);
    _getChildrenHolderName(): string;
    getAreaFields(area: string): PivotGridFieldSurface[];
    getTotalsAreaFieldWidth(area: string, zoom: number): number;
    getAdornTemplate(): "" | "dxrd-intersect";
    isThereIntersectionWithChildCollection(): boolean;
    filterFields: ko.Computed<PivotGridFieldSurface[]>;
    dataFields: ko.Computed<PivotGridFieldSurface[]>;
    columnFields: ko.Computed<PivotGridFieldSurface[]>;
    rowFields: ko.Computed<PivotGridFieldSurface[]>;
    totalsHeight: ko.Computed<number>;
    rowHeaderHeight: ko.Computed<number>;
    totalsDataFieldWidth: ko.Computed<number>;
    totalsRowFieldWidth: ko.Computed<number>;
    fields: ko.ObservableArray<PivotGridFieldSurface>;
}