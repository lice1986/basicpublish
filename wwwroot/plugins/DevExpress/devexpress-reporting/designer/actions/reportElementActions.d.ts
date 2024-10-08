﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportElementActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { ElementActions } from './elementActions';
export declare class ReportElementActions extends ElementActions {
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selection: ISelectionProvider);
    getActions(context: any): import("@devexpress/analytics-core/analytics-utils").IAction[];
}
