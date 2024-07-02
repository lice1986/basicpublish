﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_chartTreeListDragDropHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReorderTreeListDragDropHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ObservableArray } from 'knockout';
export declare class ChartTreeListDragDropHelper extends ReorderTreeListDragDropHelper {
    getSiblings(): ObservableArray<any>;
    stop(): void;
}