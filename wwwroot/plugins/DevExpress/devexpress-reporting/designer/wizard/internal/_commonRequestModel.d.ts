﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_commonRequestModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit, IReportWizardState } from '../reportWizardState';
export interface ICustomLabelInformation {
    Height: number;
    HorizontalPitch: number;
    LeftMargin: number;
    RightMargin: number;
    PaperKindDataId: number;
    TopMargin: number;
    BottomMargin: number;
    Unit: GraphicsUnit;
    VerticalPitch: number;
    Width: number;
}
export declare class CommonRequestModel {
    CustomLabelInformation: ICustomLabelInformation;
    IgnoreNullValuesForSummary: boolean;
    LabelProductId: number;
    LabelProductDetailId: number;
    ReportTitle: string;
    ReportType: number;
    DataMember: string;
    DataMemberName: {
        'DisplayName': string;
        'Name': string;
        'DataMemberType': number;
    };
    constructor(state: IReportWizardState);
}
