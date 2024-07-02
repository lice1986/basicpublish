﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizardState.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { FieldTreeNode } from '@devexpress/analytics-core/analytics-wizard-internal';
import { ILabelDetails } from './internal/labelWizardUtils';
import { ReportLayout } from './internal/layoutPageUtils';
import { ReportStyle } from './internal/reportStylePageUtils';
import { ICrossTabDataFieldInfo, ICrossTabGroupFieldInfo } from './internal/_crossTabRequestModel';
import { IMasterDetailQueryInfo } from './internal/_masterDetailWizardUtils';
import { ISummaryOptions } from './internal/_summaryOptionsPageUtils';
export declare enum ReportType {
    Empty = 3,
    Standard = 0,
    Vertical = 1,
    Label = 2,
    Template = 5,
    CrossTab = 6
}
export declare enum PivotSummaryType {
    Count = 0,
    Sum = 1,
    Min = 2,
    Max = 3,
    Average = 4,
    StdDev = 5,
    StdDevp = 6,
    Var = 7,
    Varp = 8,
    Custom = 9,
    CountDistinct = 10,
    Median = 11,
    Mode = 12
}
export declare enum GraphicsUnit {
    World = 0,
    Display = 1,
    Pixel = 2,
    Point = 3,
    Inch = 4,
    Document = 5,
    Millimeter = 6
}
export interface IPageSetup {
    paperKind: string;
    unit: GraphicsUnit;
    width: number;
    height: number;
    landscape?: boolean;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
}
export interface ILegacyReportWizardState extends IReportWizardState {
    fields?: Array<IDataMemberInfo>;
    groups?: string[][];
    summaryOptionsColumns?: Array<IDataMemberInfo>;
    summaryOptions?: Array<ISummaryOptions>;
    ignoreNullValuesForSummary?: boolean;
    dataSource?: string;
    newDataSource?: string;
    fitFieldsToPage?: boolean;
    layout?: ReportLayout;
    portrait?: boolean;
    style?: ReportStyle;
}
export interface IColorSchemeState {
    baseColor?: string;
    name?: string;
}
export interface IReportTitleState {
    reportTitle?: string;
}
export interface IReportWizardState extends IDataSourceWizardState {
    pageSetup: IPageSetup;
    colorScheme: IColorSchemeState;
    reportType?: ReportType;
    reportTemplateID?: string;
    labelDetails?: ILabelDetails;
    reportTitle?: string;
    dataMember?: string;
    masterDetailInfoCollection?: IMasterDetailQueryInfo[];
    masterDetailGroups?: any[];
    masterDetailSummaryOptionsColumns?: any;
    ignoreNullValuesForSummary?: boolean;
    dataSource?: string;
    newDataSource?: string;
    masterDetailSummariesInfo?: {
        [key: string]: {
            column: IDataMemberInfo;
            summaryFunctions: number[];
        }[];
    };
    dataMemberPath?: string;
    dataMemberInfo?: IDataMemberInfo;
    crossTabFields?: FieldTreeNode[];
    crossTabColumnsFieldInfo?: ICrossTabGroupFieldInfo[];
    crossTabRowsFieldInfo?: ICrossTabGroupFieldInfo[];
    crossTabDataFieldInfo?: ICrossTabDataFieldInfo[];
    customData?: string;
}
export declare const defaultPageSetupState: IPageSetup;
export declare const defaultReportWizardState: IReportWizardState;