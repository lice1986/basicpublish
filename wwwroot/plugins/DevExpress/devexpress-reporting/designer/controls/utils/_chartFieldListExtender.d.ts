﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartFieldListExtender.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartFieldListExtender implements IItemsExtender {
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
}
