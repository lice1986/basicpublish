﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.binding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxAnalyticsComponentCommon } from '@devexpress/analytics-core/analytics-internal-native';
import '@devexpress/analytics-core/analytics-internal';
import '@devexpress/analytics-core/analytics-widgets-internal';
import '@devexpress/analytics-core/analytics-utils';
import '@devexpress/analytics-core/analytics-elements';
import '@devexpress/analytics-core/analytics-widgets';
import { IReportViewerOptions } from './jsReportViewerBinding';
export declare class DxReportViewer extends DxAnalyticsComponentCommon<IReportViewerOptions> {
    constructor(_element: HTMLElement, _options: IReportViewerOptions);
    getBindingName(): string;
}
