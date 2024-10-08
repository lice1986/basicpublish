﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_designerErrorProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAjaxSettings } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { IErrorModel, IErrorProvider } from './_types';
export declare class DesignerErrorProvider extends Disposable implements IErrorProvider {
    private _report;
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): (...params: (IAjaxSettings | any)[]) => any;
    constructor(_report: ReportViewModel);
}
