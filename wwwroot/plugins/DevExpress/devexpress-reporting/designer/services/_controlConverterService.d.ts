﻿/**
* DevExpress HTML/JS Reporting (designer\services\_controlConverterService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAjaxSettings } from '@devexpress/analytics-core/analytics-internal';
export declare class ControlConverterService {
    static getXmlStringFromJson(controlJsonLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): (...params: (IAjaxSettings | any)[]) => any;
    static getControlModelFromXmlString(controlXmlLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): (...params: (IAjaxSettings | any)[]) => any;
}