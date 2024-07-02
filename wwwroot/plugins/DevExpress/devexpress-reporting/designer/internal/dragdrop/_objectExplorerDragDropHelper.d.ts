﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_objectExplorerDragDropHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReorderTreeListDragDropHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare abstract class ObjectExplorerDragDropHelper extends ReorderTreeListDragDropHelper {
    private _orderingAreaHeight;
    protected _isInTopOrderArea(targetElement: JQuery<HTMLElement>, mouseLocationY?: number): boolean;
    protected _isInBottomOrderArea(targetElement: JQuery<HTMLElement>, mouseLocationY?: number): boolean;
    protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
    protected _shouldCheckAreas(): boolean;
    setNewDropTarget(elementModel: any, element: HTMLElement, mouseLocationY?: number): void;
}
