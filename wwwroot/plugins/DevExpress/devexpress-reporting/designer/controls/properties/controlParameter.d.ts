﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\controlParameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IModelSerializer, ISerializableModel, ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataBindingBase } from '../../dataObjects/dataBinding';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
export declare class ControlParameter extends DataBindingBase implements ISerializableModel {
    private _dataSourceHelper?;
    private _dataBindingsProvider?;
    static createNew(): ControlParameter;
    getInfo(): ISerializationInfo[];
    isEmpty(): boolean;
    constructor(model: object, serializer?: IModelSerializer, _dataSourceHelper?: ko.Observable<DataSourceHelper>, _dataBindingsProvider?: ko.Observable<FieldListProvider>);
    setDataMemberInfo(dataMemberInfo: IDataMemberInfo): void;
    get dataType(): string;
    get specifics(): string;
    get name(): string;
    generateValue(undoEngine: UndoEngine, dataSourceHelper: DataSourceHelper, dataSources: IDataSourceInfo[], dataBindingsProvider?: FieldListProvider): ko.Computed<string>;
    initDataMemberInfo(dataSourceHelper?: DataSourceHelper, dataBindingsProvider?: FieldListProvider): void;
    fakeBinding: any;
    visible: ko.Observable<boolean>;
    parameterName: ko.Observable<string>;
    dataMemberInfo: ko.Observable<IDataMemberInfo>;
}
