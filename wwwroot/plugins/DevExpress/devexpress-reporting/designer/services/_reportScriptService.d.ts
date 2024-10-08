﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportScriptService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../controls/xrReport';
export declare class ReportScriptService {
    static validateScripts(report: ReportViewModel): any;
    static getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any, report: any, editorInstance: any, guid: string): any;
    static setCodeDom(key: string, reportLayout: string): any;
}
