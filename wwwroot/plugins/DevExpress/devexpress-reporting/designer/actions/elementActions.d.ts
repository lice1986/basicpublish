﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export declare class ElementActions extends BaseActionsProvider {
    private _selectionProvider;
    private _generalDisabled;
    private _isMultiSelect;
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selectionProvider: ISelectionProvider);
    condition(context: any): boolean;
}
