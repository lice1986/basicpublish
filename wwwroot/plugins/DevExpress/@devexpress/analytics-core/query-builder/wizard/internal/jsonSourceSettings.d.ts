﻿/**
* DevExpress Analytics (query-builder\wizard\internal\jsonSourceSettings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { JsonDataSource } from '../../dataSource/json/jsonDataSource';
import { ObjectProperties } from '../../../property-grid/propertygrid';
export interface IJsonDataSourceJsonSourcePageSettings extends IJsonDataSourceJsonSourceValidatable {
    isValid(): boolean;
    reset(): void;
    setValue(dataSource: JsonDataSource): void;
    isEmpty(): boolean;
    applySettings(dataSource: JsonDataSource): void;
    cssClass?: string | any;
    grid?: ObjectProperties;
}
export interface IJsonDataSourceJsonSourceValidatable {
    validationGroup?: {
        onInitialized: (args: any) => void;
        validate: () => any;
        onDisposing: (args: any) => void;
    };
    validationSummary?: {
        onInitialized: (args: any) => void;
        onDisposing: (args: any) => void;
    };
    _validatorsReady?: ko.Observable<boolean> | ko.Computed<boolean>;
    _validate?: () => void;
}
export interface IJsonDataSourceType {
    value: IJsonDataSourceJsonSourcePageSettings;
    displayValue: string;
    localizationId: string;
}
export declare const parameterTypeToPropertyMap: {
    [key: string]: string;
};
