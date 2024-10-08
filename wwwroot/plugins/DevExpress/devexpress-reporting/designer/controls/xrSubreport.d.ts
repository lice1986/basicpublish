﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreport.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IArea, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ReportViewModel } from './xrReport';
import { ParameterBinding } from './xrSubreportParameterBinding';
export declare class XRSubreportViewModel extends XRControlViewModel {
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    private _getCurrentGenerateOwnPagesIsActive;
    private _clearReportModel;
    private _assignParameters;
    private _calculateSubreportPosition;
    private _subscribeStorages;
    private _initParameter;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: IModelSerializer);
    refreshParameterBindings(): void;
    isPropertyDisabled(propertyName: any): any;
    updateParameters(): void;
    cloneReportSource(): ReportViewModel;
    needProcessLocation: boolean;
    get root(): ReportViewModel;
    generateOwnPages: ko.Computed<boolean>;
    _generateOwnPages: ko.Observable<boolean> | ko.Computed<boolean>;
    generateOwnPagesIsActive: ko.Computed<boolean>;
    subreportParameters: ko.ObservableArray<string>;
    reportSource: ReportViewModel;
    reportSourceUrl: ko.Observable<string> | ko.Computed<string>;
    parameterBindings: ko.ObservableArray<ParameterBinding>;
    key: ko.Computed<string>;
}
export declare class XRSubreportSurface extends XRControlSurface {
    constructor(control: XRSubreportViewModel, context: ISurfaceContext);
    getAdornTemplate(): string;
    getResizableOptions(resizeHandler: any): any;
    processLocation(location: IArea): IArea;
    _control: XRSubreportViewModel;
}
