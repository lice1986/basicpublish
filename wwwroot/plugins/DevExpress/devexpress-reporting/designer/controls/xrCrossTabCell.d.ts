﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTabCell.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext, Rectangle } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionEditorCategory, ITreeListItemViewModel, Tools } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ICrossTabCell } from './crossTab/cellCreator';
import { CellKind, DataFieldLayout } from './crossTab/enums';
import { XRControlViewModel } from './xrControl';
import { CrossTabFieldModel, XRCrossTabSurface, XRCrossTabViewModel } from './xrCrossTab';
import { XRTextControlSurfaceBase } from './xrTextControl';
export declare function kindToString(kind: CellKind): string;
export declare class XRCrossTabCellViewModel extends XRControlViewModel implements ICrossTabCell {
    private parent;
    get namePrefix(): string;
    static cellKinds: {
        Header: CellKind[];
        Total: CellKind[];
        Data: CellKind[];
    };
    private get _width();
    private get _height();
    private get _left();
    private get _top();
    private _text;
    private _textFormatString;
    private _showCellCode;
    private _oldFieldName;
    private _getDefaultName;
    private _testFieldName;
    private _createParametersExpressionCategory;
    constructor(model: object, parent: XRCrossTabViewModel, serializer?: ModelSerializer);
    getPath: (propertyName: string) => string;
    reset(): void;
    canRemove(): boolean;
    canDropDown(): boolean;
    canDropRight(): boolean;
    canDropUp(): boolean;
    canDropLeft(): boolean;
    getExpressionBinding(property: string, event: string): string;
    isPropertyVisible(name: string, isPopularProperty?: boolean): boolean;
    isPropertyModified(name: string): boolean;
    isPropertyDisabled(name: string): boolean;
    isBindable(): boolean;
    isIndependant(): boolean;
    isEditable(): boolean;
    createAndAssignNewField(fieldName: string, insertBefore: boolean, dataFieldLayout?: DataFieldLayout): void;
    customizeExpressionCategories(tools: Tools, categories: IExpressionEditorCategory[]): void;
    fieldName: ko.Observable<string> | ko.Computed<string>;
    summaryType: any;
    summaryDisplayType: any;
    sortOrder: any;
    crossTabGroupInterval: any;
    crossTabGroupIntervalNumericRange: any;
    crossTabSortBySummaryInfo: any;
    _columnIndex: ko.Observable<number>;
    _rowIndex: ko.Observable<number>;
    _columnSpan: ko.Observable<number>;
    _rowSpan: ko.Observable<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    dataLevel?: number;
    rowLevel?: number;
    columnLevel?: number;
    kind: ko.Observable<CellKind>;
    field: ko.Observable<CrossTabFieldModel>;
    dependentFields: CrossTabFieldModel[];
    textFormatString: ko.Observable<string> | ko.Computed<string>;
    rowVisible: ko.Computed<boolean>;
    columnVisible: ko.Computed<boolean>;
    rowAutoHeightMode: ko.Observable<string>;
    columnAutoWidthMode: ko.Observable<string>;
    fieldNameAreValid: ko.Observable<boolean>;
}
export declare class XRCellsurface extends XRTextControlSurfaceBase<XRControlViewModel> {
    constructor(control: XRCrossTabCellViewModel, context: ISurfaceContext);
    checkParent(surfaceParent: ISelectionTarget): boolean;
    selectLine(selection: ISelectionProvider, event?: {
        ctrlKey: boolean;
        metaKey: boolean;
    }, isRow?: boolean): void;
    cellClick(): void;
    isEditable(): boolean;
    private _getDropCallback;
    private _canSetFieldName;
    getAdornTemplate(): string;
    dragCallback(item: ITreeListItemViewModel): void;
    findNextSelection(): XRCrossTabSurface;
    controls: any;
    contenttemplate: string;
    showDropSurface: ko.Computed<boolean>;
    dropRect: Rectangle;
    isDropTarget: ko.Observable<boolean>;
    dragCss: ko.Observable<string>;
    dropCallback: (treeListItem: ITreeListItemViewModel) => void;
}
