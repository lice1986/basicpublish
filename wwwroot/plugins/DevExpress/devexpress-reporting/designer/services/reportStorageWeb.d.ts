﻿/**
* DevExpress HTML/JS Reporting (designer\services\reportStorageWeb.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../controls/xrReport';
export declare class ReportStorageWeb {
    static getErrorMessageHandler(defaultErrorMessage?: string): (message: string, jqXHR: JQueryXHR, textStatus: string) => void;
    static getReportByUrl(url: string): JQueryPromise<ReportViewModel>;
    static getData(url: string): any;
    static setData(layout: string, url: string): any;
    static setNewData(layout: string, url: string): JQueryPromise<any>;
    static getUrls(subreports?: any): any;
}