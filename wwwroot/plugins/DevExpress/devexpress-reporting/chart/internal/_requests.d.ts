﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_requests.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartRequests {
    static getChartImage(uri: string, chartLayout: any, width: number, height: number): any;
    static fieldListCallback(request: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
}
