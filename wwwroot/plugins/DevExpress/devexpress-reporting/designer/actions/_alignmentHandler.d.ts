﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_alignmentHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class AlignmentHandler {
    private _selectionProvider;
    private _surfaceContext;
    constructor(selectionProvider: ISelectionProvider, surfaceContext: ko.Observable<ISurfaceContext>);
    private _getFocusedItem;
    private _getFocusedParent;
    private _getPositionFromBand;
    private _visitAllSelectedItemsInSameContainerWithFocused;
    private _centerByBand;
    private _roundingValue;
    alignLeft(): void;
    alignTop(): void;
    alignRight(): void;
    alignBottom(): void;
    alignVerticalCenters(): void;
    alignHorizontalCenters(): void;
    sizeToControlWidth(): void;
    sizeToControlHeight(): void;
    sizeToControl(): void;
    centerHorizontally(): void;
    centerVertically(): void;
    alignToGrid(): void;
    sizeToGrid(): void;
    sendToBack(): void;
    bringToFront(): void;
    canChangeZOrder(): boolean;
}
