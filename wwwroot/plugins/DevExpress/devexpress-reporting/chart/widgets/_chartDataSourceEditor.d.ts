﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ChartDataSourceEditor extends Editor {
    generateOptions(dataSources: ko.Computed<Array<{
        displayName: string;
        value: any;
    }>>, popupContainer: string): any;
    options: any;
}