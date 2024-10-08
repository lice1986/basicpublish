﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTab.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext, SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionEditorCategory, Tools } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { CellCreator, CrossTabCellInfo, ICrossTabCell } from './crossTab/cellCreator';
import { CrossTabColumnDefinitionsModel, CrossTabRowDefinitionsModel, DefenitionUpdater } from './crossTab/defenitions';
import { DataFieldLayout } from './crossTab/enums';
import { ControlParameter } from './properties/controlParameter';
import { StyleModel } from './properties/style';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRCellsurface, XRCrossTabCellViewModel } from './xrCrossTabCell';
import { XRReportElementViewModel } from './xrReportelement';
export declare class XRCrossTabViewModel extends XRControlViewModel {
    private _getCreator;
    private _getArray;
    private _initStyles;
    private _calcSize;
    constructor(model: object, parent: XRReportElementViewModel, serializer?: ModelSerializer);
    removeChild(cell: XRCrossTabCellViewModel): void;
    removeField(dataLevel: number, columnLevel: number, rowLevel: number): void;
    initialize(): void;
    updateLayout(): void;
    getFields(): CrossTabFieldModel[];
    getNames(): {
        columnFields: string;
        rowFields: string;
        dataFields: string;
    };
    onDelete(): void;
    preInitProperties(): void;
    isPropertyDisabled(propertyName: string): boolean;
    applyCells(cellsInfo: CrossTabCellInfo[], initOnly?: boolean): XRCrossTabCellViewModel[];
    applyCell(from: CrossTabCellInfo, to: ICrossTabCell): void;
    insertNewField(collectionName: string, insertPosition: number, fieldName: string, dataFieldLayout?: DataFieldLayout): void;
    customizeExpressionCategories(tools: Tools, categories: IExpressionEditorCategory[]): void;
    getPath: (propertyName: string) => string;
    dependentStyles: StyleModel[];
    dataSource: ko.Observable;
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    _cells: ko.ObservableArray<XRCrossTabCellViewModel>;
    cells: ko.ObservableArray<XRCrossTabCellViewModel>;
    rowFields: ko.ObservableArray<CrossTabFieldModel>;
    columnFields: ko.ObservableArray<CrossTabFieldModel>;
    dataFields: ko.ObservableArray<CrossTabDataFieldModel>;
    _rowDefinitions: ko.ObservableArray<CrossTabRowDefinitionsModel>;
    _columnDefinitions: ko.ObservableArray<CrossTabColumnDefinitionsModel>;
    layoutOptions: CrossTabLayoutOptionsModel;
    cellCreator: CellCreator;
    defenitionUpdater: DefenitionUpdater;
    isModelReady: ko.Computed<boolean>;
    originalPivotGridLayout: ko.Observable<string>;
    controlParameters: ko.ObservableArray<ControlParameter>;
    filterString: any;
    _filterString: any;
}
export declare class CrossTabLayoutOptionsModel extends SerializableModel {
    parent: XRCrossTabViewModel;
    constructor(model: object, parent: XRCrossTabViewModel, serializer: ModelSerializer);
    isPropertyDisabled(name: string): boolean;
    getInfo(): ISerializationInfoArray;
    cornerHeaderDisplayMode: ko.Observable<string>;
    dataFieldLayout: ko.Observable<string>;
    columnTotalsPosition: ko.Observable<string>;
    rowTotalsPosition: ko.Observable<string>;
    columnTotalHeaderPosition: ko.Observable<string>;
    rowTotalHeaderPosition: ko.Observable<string>;
    hierarchicalRowLayout: ko.Observable<boolean>;
}
export declare class CrossTabFieldModel extends SerializableModel {
    constructor(model: object, parent: XRCrossTabViewModel, serializer: ModelSerializer, name: string);
    setFieldName(fullPath: string): void;
    getInfo(): ISerializationInfoArray;
    getPath: (propertyName: string) => string;
    isPropertyDisabled: (propertyName: string) => boolean;
    parent: XRCrossTabViewModel;
    name: ko.Computed<string>;
    fieldName: ko.Observable<string>;
    crossTabSortBySummaryInfo: any;
}
export declare class CrossTabDataFieldModel extends CrossTabFieldModel {
    getInfo(): ISerializationInfoArray;
}
export declare class XRCrossTabSurface extends XRControlSurface {
    constructor(control: XRCrossTabViewModel, context: ISurfaceContext);
    selectLine(selection: ISelectionProvider<ControlType>, cell: XRCrossTabCellViewModel, isMultiSelect: boolean, isRow: boolean): void;
    controls: ko.ObservableArray<XRCellsurface>;
}
