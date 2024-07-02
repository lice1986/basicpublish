﻿/**
* DevExpress HTML/JS Reporting (designer\controls\subreportViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from './xrReport';
export declare class SubreportViewModel extends ReportViewModel {
    static defaultReport: {
        '@ControlType': string;
        '@PageWidth': string;
        '@PageHeight': string;
        '@Version': string;
        '@Font': string;
        '@Dpi': string;
        Bands: {
            Item1: {
                '@ControlType': string;
                '@HeightF': string;
            };
            Item2: {
                '@ControlType': string;
                '@HeightF': string;
            };
            Item3: {
                '@ControlType': string;
                '@HeightF': string;
            };
        };
    };
    static from(model: any, serializer?: IModelSerializer): SubreportViewModel;
    static toJson(value: SubreportViewModel, serializer: any, refs: any): any;
    _initializeBands(): void;
    getInfo(): any;
    constructor(model: any, serializer?: IModelSerializer);
    serialize(): any;
    isAllSufficient: boolean;
    _model: any;
    objectStorageIsEmpty: ko.Observable<boolean>;
}
