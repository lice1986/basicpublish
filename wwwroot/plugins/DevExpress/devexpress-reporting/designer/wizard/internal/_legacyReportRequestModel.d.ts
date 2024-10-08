﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_legacyReportRequestModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INumericSize } from '@devexpress/analytics-core/analytics-elements';
import { PaperKind } from '../../utils/paperKind';
import { GraphicsUnit, ILegacyReportWizardState } from '../reportWizardState';
import { ReportLayout } from './layoutPageUtils';
import { ReportStyle } from './reportStylePageUtils';
import { CommonRequestModel } from './_commonRequestModel';
export declare class LegacyReportRequestModel extends CommonRequestModel {
    AdjustFieldWidth: boolean;
    Columns: Array<string>;
    ColumnInfo: {
        Name: string;
        DisplayName: string;
        TypeSpecifics: number;
    }[];
    DataSourceName: string;
    GroupingLevels: string[][];
    Layout: ReportLayout;
    Portrait: boolean;
    ReportStyleId: ReportStyle;
    SummaryOptions: {
        ColumnName: string;
        Flags: number;
    }[];
    UseMasterDetailBuilder: boolean;
    PaperKind: PaperKind;
    PaperSize: INumericSize;
    Margins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    Unit: GraphicsUnit;
    constructor(state: ILegacyReportWizardState);
}
