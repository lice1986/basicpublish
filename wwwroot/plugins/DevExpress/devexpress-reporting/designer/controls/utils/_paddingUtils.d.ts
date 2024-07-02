﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_paddingUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { XRReportElementViewModel } from '../xrReportelement';
interface IModelWithPadding extends Disposable {
    paddingObj?: PaddingModel;
    padding?: ko.Observable<string> | ko.Computed<string>;
    _padding?: ko.Observable<string>;
    dpi?: ko.Observable<number> | ko.Computed<number>;
}
export declare function createPaddingProperty(model: IModelWithPadding, parent: XRReportElementViewModel): void;
export {};
