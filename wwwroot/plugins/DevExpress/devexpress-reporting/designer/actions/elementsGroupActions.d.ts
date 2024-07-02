﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementsGroupActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { IActionKO } from '@devexpress/analytics-core/analytics-utils';
export declare class ElementsGroupActions extends BaseActionsProvider {
    private _selectionProvider;
    actions: IActionKO[];
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selectionProvider: ISelectionProvider);
    condition(context: any): boolean;
}
