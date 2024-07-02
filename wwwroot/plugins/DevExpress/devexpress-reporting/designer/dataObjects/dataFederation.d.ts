﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataFederation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFederationDataSource, ISerializableDataFederationDataSourceInfo, ISerializableSourceMapItem, SerializableDataFederationDataSource as AnalyticsSerializableFederationDataSource } from '@devexpress/analytics-core/analytics-data';
import { ISerializableModel, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectStorageItem } from './objectStorageItem';
export interface ISerializableDataFederationDataSource extends ISerializableModel {
    dataSources: ko.ObservableArray<any>;
    dataSource: DataFederationDataSource;
    serialize: () => ISerializableDataFederationDataSourceInfo;
}
export declare class DataFederationDataSource extends ObjectStorageItem implements IFederationDataSource {
    private _dsHelperProvider?;
    private _serializer?;
    static getDependentDataSources(item: ISerializableSourceMapItem, resultArray: Array<ISerializableSourceMapItem>): void;
    private _serializableModel;
    preInitProperties(model: any): void;
    constructor(model: any, _dsHelperProvider?: any, _serializer?: any);
    getSerializableModel(): SerializableDataFederationDataSource;
    get dependentDataSources(): string[];
    serializableSourceMap: ko.ObservableArray<ISerializableSourceMapItem>;
}
export declare class SerializableDataFederationDataSource extends AnalyticsSerializableFederationDataSource {
    constructor(dataSource: IFederationDataSource, model?: ISerializableDataFederationDataSourceInfo, dsHelperProvider?: any, serializer?: ModelSerializer);
    dispose(): void;
    dataSource: DataFederationDataSource;
}