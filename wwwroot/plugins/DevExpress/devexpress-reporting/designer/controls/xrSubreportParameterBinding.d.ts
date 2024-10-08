﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreportParameterBinding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializableModel, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataBindingBase } from '../dataObjects/dataBinding';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
export declare class ParameterBinding extends DataBindingBase implements ISerializableModel {
    private _dataSourceCallback;
    private _parametersCallback;
    private _reportDataSource;
    static createNew(): ParameterBinding;
    dispose(): void;
    getInfo(): any;
    updateParameter(pathRequest: PathRequest, dataSources: any): void;
    refresh(): void;
    initReportDataSource(dataSourceCallback: () => ObjectStorageItem): void;
    initSubreportParameters(parametersCallback: () => string[]): void;
    constructor(model: any, parent: any, serializer?: IModelSerializer);
    visible: ko.Observable<boolean>;
    parameterName: ko.Observable<string> | ko.Computed<string>;
    subreportParameters: ko.Computed<string[]>;
    fakeBinding: any;
}
