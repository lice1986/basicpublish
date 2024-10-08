﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_types.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum ErrorSource {
    ReportCreation = 0,
    ReportLayout = 1,
    ReportExport = 2,
    ReportScripts = 3
}
export declare enum ErrorType {
    Error = 0,
    Warning = 1,
    Information = 2
}
export interface IErrorModel {
    code: string;
    showLink?: boolean;
    link?: string;
    description: string;
    errorSource: ErrorSource;
    errorType: ErrorType;
    message: string;
    controlName?: string;
}
export interface IErrorProvider {
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): void;
}
