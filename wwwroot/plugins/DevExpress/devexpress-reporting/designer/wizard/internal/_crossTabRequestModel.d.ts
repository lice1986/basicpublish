﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabRequestModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { ColumnSortOrder } from '../../../viewer/internal/_previewRequestWrapper';
import { PivotSummaryType } from '../reportWizardState';
export interface ICrossTabGroupFieldInfo extends IDataMemberInfo {
    sortOrder: string;
}
export interface ICrossTabDataFieldInfo extends IDataMemberInfo {
    summaryType: string;
}
export declare class CrossTabFieldInfoBase {
    constructor(info: IDataMemberInfo);
    __type: string;
    FieldName: string;
    DisplayText: string;
}
export declare class CrossTabGroupFieldInfo extends CrossTabFieldInfoBase {
    constructor(info: ICrossTabGroupFieldInfo);
    SortOrder: ColumnSortOrder;
}
export declare class CrossTabColumnFieldInfo extends CrossTabGroupFieldInfo {
    __type: string;
}
export declare class CrossTabRowFieldInfo extends CrossTabGroupFieldInfo {
    __type: string;
}
export declare class CrossTabDataFieldInfo extends CrossTabFieldInfoBase {
    __type: string;
    constructor(info: ICrossTabDataFieldInfo);
    SummaryType: PivotSummaryType;
}
