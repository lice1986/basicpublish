﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationSerializableModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
import { IFederationDataSource } from './federationDataSource';
export interface ISerializableDataFederationDataSourceInfo {
    dataSource: any;
    dataSources: any;
}
export declare class SerializableDataFederationDataSource extends Disposable implements ISerializableDataFederationDataSourceInfo {
    private get _currentDataSources();
    private _collectDependentDataSources;
    constructor(dataSource: IFederationDataSource, serializer?: IModelSerializer);
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    collectDependentDataSources(): any[];
    serialize(): ISerializableDataFederationDataSourceInfo;
    getSerializableFederationDataSourceInfo(): ISerializableDataFederationDataSourceInfo;
    serializer: IModelSerializer;
    dataSources: ko.ObservableArray<any>;
    dataSource: IFederationDataSource;
}