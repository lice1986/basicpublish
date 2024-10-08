﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\style.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRReportElementViewModel } from '../xrReportelement';
export declare class StyleModel extends Disposable {
    parent: XRReportElementViewModel;
    static unitProperties: string[];
    getInfo(): ISerializationInfoArray;
    constructor(model: any, parent: XRReportElementViewModel, serializer?: IModelSerializer);
    dpi: ko.Observable<number> | ko.Computed<number>;
    isPropertyModified(name: any): boolean;
    className: () => string;
    displayType(): any;
    name: ko.Observable<string> | ko.Computed<string>;
    paddingObj: PaddingModel;
    padding: ko.Observable<string>;
    controlType: string;
}
