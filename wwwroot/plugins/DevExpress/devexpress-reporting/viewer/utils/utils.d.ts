﻿/**
* DevExpress HTML/JS Reporting (viewer\utils\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IKeyValuePair } from '../../common/types';
import { IBounds } from '../editing/editingField';
import { ColumnSortOrder } from '../internal/_previewRequestWrapper';
export interface IBrickNode {
    top: number;
    topP: string;
    left: number;
    leftP?: string;
    rightP?: string;
    height: number;
    heightP: string;
    width: number;
    widthP: string;
    bricks: IBrickNode[];
    content: Array<IKeyValuePair<any>>;
    indexes: string;
    row: number;
    col: number;
    genlIndex: number;
    active: boolean;
    navigation?: IBrickNodeNavigation;
    rtl: boolean;
    efIndex?: number;
    absoluteBounds?: IBounds;
    text: () => string;
    accessibleDescription: string;
    onClick?: (args?: any) => void;
}
export interface IBrickNodeNavigation {
    url?: string;
    target?: string;
    indexes?: string;
    pageIndex?: number;
    drillDownKey?: string;
    drillThroughData?: string;
    sortData?: ISortingData;
}
export interface ISortingData {
    target: string;
    field: string;
    order: ColumnSortOrder;
}
export interface IDocumentOperationResult {
    documentId: string;
    succeeded: boolean;
    message?: string;
    customData?: string;
}
