﻿/**
* DevExpress HTML/JS Reporting (designer\actions\chartActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { IReportDesignerRootContext } from '../tools/generator/reportDesignerContext';
export declare class ChartActions extends BaseActionsProvider {
    private _buildingModel?;
    private _context;
    constructor(_buildingModel?: IReportDesignerRootContext);
    condition(context: any): boolean;
}