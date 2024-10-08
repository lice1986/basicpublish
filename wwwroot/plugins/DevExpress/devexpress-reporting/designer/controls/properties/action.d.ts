﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\action.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ParameterBinding } from '../xrSubreportParameterBinding';
import * as ko from 'knockout';
import { ReportViewModel } from '../xrReport';
export declare class ActionTypeBase extends Disposable implements ISerializableModel {
    constructor(control: any, key?: string, addSubcsription?: boolean);
    updateActionType(objectType: string): void;
    subscribeToObjectType(): void;
    isPropertyVisible(name: string): boolean;
    getInfo: () => ISerializationInfoArray;
    key: ko.Observable<string>;
    name: ko.Observable<string>;
    _control: any;
}
export declare class NavigateToReportAction extends ActionTypeBase {
    constructor(key: string, model: any, control: any, serializer?: IModelSerializer, drillThroughReportViewModel?: (report: any, serializer: any) => any);
    private getParameters;
    private _assignParameters;
    private _initParameter;
    refreshParameterBindings(): void;
    updateParameters(): void;
    isPropertyVisible(name: string): boolean;
    reportSourceUrl: ko.Observable<string>;
    subreportParameters: ko.ObservableArray<string>;
    reportSource?: ReportViewModel;
    parameterBindings?: ko.ObservableArray<ParameterBinding>;
    drillThroughReportViewModel: (report: any, serializer: any) => any;
}
