﻿/**
* DevExpress HTML/JS Reporting (chart\_IChartControlCallbacks.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
export interface IChartControlCallbacks {
    fieldLists?: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    customizeActions?: (actions: IAction[]) => void;
    init?: (designerModel: any) => void;
}