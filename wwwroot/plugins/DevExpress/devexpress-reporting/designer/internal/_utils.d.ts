﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IEnumType } from '../../common/customTypes';
import { ReportViewModel } from '../controls/xrReport';
import { IDataSourceRefInfo } from '../utils/inititalizer';
export declare function recalculateUnit(value: any, dpi: number): number;
export declare const PromptBoolean: {
    False: string;
    True: string;
    Prompt: string;
};
export declare function correctModel(model: any): any;
export declare function createReportViewModel(newReportInfo: {
    reportModel: string;
    dataSourceRefs: IDataSourceRefInfo[];
    knownEnums: IEnumType[];
}, oldReport: ReportViewModel): ReportViewModel;
export declare function updateDataSourceRefs(report: ReportViewModel, dataSourceRefs: {
    Key: string;
    Value: IDataSourceRefInfo[];
}[]): void;
export declare function isNotParameter(control: any): boolean;
export declare function isControl(control: any): boolean;
export declare function updateSurfaceContentSizeLocalizationMode(surfaceSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): () => void;
